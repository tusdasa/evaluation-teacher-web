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
            <el-button type="danger" @click="deleteById(scope.row.calculationRuleId)">删除</el-button>
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
          <el-main>
            <el-form ref="form" label-width="80px" :model="Rule">
              <el-form-item>
                <p><strong>-1 未最高分无上限</strong></p>
              </el-form-item>
              <el-form-item label="最高分">
                <el-input v-model="Rule.maxScore" placeholder="最高分" />
              </el-form-item>
              <el-form-item label="最低分">
                <el-input v-model="Rule.minScore" placeholder="最低分" />
              </el-form-item>
              <el-form-item label="是否唯一">
                <el-select v-model="Rule.uniqueItem" placeholder="是否唯一">
                  <el-option value="1" label="不可叠加" />
                  <el-option value="0" label="可叠加" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <p><strong>等级和举证只能选一个</strong></p>
              </el-form-item>
              <el-form-item label="等级">
                <el-select v-model="Rule.levelType" placeholder="请选择">
                  <el-option v-for="f in levels" :key="f" :label="f" :value="f" />
                </el-select>
              </el-form-item>
              <el-form-item label="举证">
                <el-select v-model="Rule.evidenceType" placeholder="请选择">
                  <el-option v-for="f in evidence" :key="f" :label="f" :value="f" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="create">创建</el-button>
              </el-form-item>
            </el-form>
          </el-main>
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
              <el-form-item>
                <p><strong>-1 未最高分无上限</strong></p>
              </el-form-item>
              <el-form-item label="最高分">
                <el-input-number v-model="Rule.maxScore" placeholder="最高分" />
              </el-form-item>
              <el-form-item label="最低分">
                <el-input-number v-model="Rule.minScore" placeholder="最低分" />
              </el-form-item>
              <el-form-item label="是否唯一">
                <el-select v-model="Rule.uniqueItem" placeholder="是否唯一">
                  <el-option value="1" label="不可叠加" />
                  <el-option value="0" label="可叠加" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <p><strong>等级和举证只能选一个</strong></p>
              </el-form-item>
              <el-form-item label="等级">
                <el-select v-model="Rule.levelType" placeholder="请选择">
                  <el-option v-for="f in levels" :key="f" :label="f" :value="f" />
                </el-select>
              </el-form-item>
              <el-form-item label="举证">
                <el-select v-model="Rule.evidenceType" placeholder="请选择">
                  <el-option v-for="f in evidence" :key="f" :label="f" :value="f" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>
    </el-main>
  </div>
</template>
<script>
import { getAllCalculationRule, findCalculationRuleById, findAllLevels, findAllEvidence, createCalculationRule, updateCalculationRule, deleteCalculationRuleById } from '@/api/table'
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
        levelType: null,
        evidenceType: null
      },
      levels: [],
      evidence: []
    }
  },
  created() {
    getAllCalculationRule().then(response => {
      this.CalculationRule = response.table
      this.listLoading = false
    })
    findAllLevels().then(response => {
      // this.levels = response.table
      let tp = -1
      response.table.forEach(element => {
        if (tp === -1) {
          tp = element.levelType
          this.levels.push(tp)
        } else {
          if (tp !== element.levelType) {
            tp = element.levelType
            this.levels.push(tp)
          }
        }
      })
    })
    findAllEvidence().then(response => {
      // this.evidence = response.table
      let tp = -1
      response.table.forEach(element => {
        if (tp === -1) {
          tp = element.evidenceType
          this.evidence.push(tp)
        } else {
          if (tp !== element.evidenceType) {
            tp = element.evidenceType
            this.evidence.push(tp)
          }
        }
      })
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
      this.Rule.levelTyp = null
      this.Rule.evidenceType = null
      this.Rule.calculationRuleId = id
      findCalculationRuleById(id).then(response => {
        console.log(response)
        this.Rule.maxScore = response.data.maxScore
        this.Rule.minScore = response.data.minScore
        this.Rule.uniqueItem = response.data.uniqueItem
        if (response.data.levels != null) {
          this.Rule.levelType = response.data.levels[0].levelType
          this.Rule.evidenceType = null
        }
        if (response.data.evidence != null) {
          this.Rule.evidenceType = response.data.evidence.evidenceType
          this.Rule.levelType = null
        }
      })
    },
    create() {
      createCalculationRule(this.Rule).then(response => {
      })
    },
    update() {
      updateCalculationRule(this.Rule).then(response => {
        location.reload(true)
      })
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCalculationRuleById(id).then(response => {
          location.reload(true)
        })
      })
    }
  }
}
</script>
