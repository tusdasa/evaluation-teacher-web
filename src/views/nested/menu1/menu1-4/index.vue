<template>
  <div class="app-container">
    <el-header>
      <h1>计算规则</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="CalculationRule"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.calculationRuleId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="最高分" width="220">
          <template slot-scope="scope">
            {{ scope.row.maxScore | max }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="最低分" width="220">
          <template slot-scope="scope">
            {{ scope.row.minScore }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否唯一" width="220">
          <template slot-scope="scope">
            {{ scope.row.uniqueItem | unique }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="220">
          <template slot-scope="scope">
            {{ scope.row | calculationRuleType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="getCalculationRuleById(scope.row.calculationRuleId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建 -->
      <el-drawer
        title="新建"
        :visible.sync="newDrawer"
        :direction="direction"
        :before-close="newHandleClose"
      >
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-drawer>

      <!-- 编辑 -->
      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="Rule">
              <el-form-item label="最高分">
                <el-input v-model="Rule.maxScore" placeholder="最高分" />
              </el-form-item>
              <el-form-item label="最低分">
                <el-input v-model="Rule.minScore" placeholder="最低分" />
              </el-form-item>
              <el-form-item label="是否唯一">
                <el-select v-model="Rule.uniqueItem" placeholder="是否唯一">
                  <el-option value="1" label="唯一" />
                  <el-option value="0" label="可叠加" />
                </el-select>
              </el-form-item>
              <el-form-item label="类型">
                <el-cascader
                  :options="options"
                  :props="props"
                  collapse-tags
                  clearable>
                </el-cascader>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>
    </el-main>
  </div>
</template>
<script>
import { getAllCalculationRule, findCalculationRuleById, findAllLevels, findAllEvidence } from '@/api/table'
export default {
  filters: {
    unique(uniqueItem) {
      if (uniqueItem === 1) {
        return '不可重复'
      } else {
        return '可重复'
      }
    },
    max(maxScore) {
      if (maxScore === -1) {
        return '无上限'
      }
      return maxScore
    },
    calculationRuleType(obj) {
      if (obj.evidence !== undefined) {
        return '举证型'
      }
      if (obj.levels !== undefined) {
        return '等级型'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      CalculationRule: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      Rule: {
        calculationRuleId: 0,
        uniqueItem: 0,
        maxScore: 0,
        minScore: 0,
        levels: [],
        evidence: {}
      },
      levels: [],
      evidence: [],
      props: { multiple: true },
      options: [{
      }]
    }
  },
  created() {
    getAllCalculationRule().then(response => {
      this.CalculationRule = response.table
      this.listLoading = false
    })
    findAllLevels().then(response => {
    })
    findAllEvidence().then(response => {
      this.evidence = response.table
    })
  },
  methods: {
    editHandleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    newHandleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getCalculationRuleById(id) {
      this.editDrawer = true
      findCalculationRuleById(id).then(response => {
        console.log(response.data)
        this.Rule.maxScore = response.data.maxScore
        this.Rule.minScore = response.data.minScore
        this.Rule.uniqueItem = response.data.uniqueItem
      })
    }
  }
}
</script>
