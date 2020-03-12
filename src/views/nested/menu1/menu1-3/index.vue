<template>
  <div class="app-container">
    <el-header>
      <h1>第三指标</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="ThirdKPI"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.thirdKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属第二指标" width="220">
          <template slot-scope="scope">
            {{ getSecondKPI(scope.row.secondKpiId) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="330">
          <template slot-scope="scope">
            {{ scope.row.thirdKpiContent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="计算规则" width="330">
          <template slot-scope="scope">
            {{ scope.row.calculationRuleId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="getThirdKPIById(scope.row.thirdKpiId, scope.row.secondKpiId)">编辑</el-button>
            <el-button type="danger" @click="delteThirdKPIById(scope.row.thirdKpiId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑 -->
      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="KPI">
              <el-form-item label="第三指标">
                <el-input v-model="KPI.thirdKpiContent" placeholder="指标名" />
              </el-form-item>
              <el-form-item label="第二指标">
                <el-select v-model="KPI.secondKpiId" placeholder="指标名">
                  <el-option v-for="f in SecondKPI" :key="f.secondKpiId" :label="f.secondKpiContent" :value="f.secondKpiId" />
                </el-select>
              </el-form-item>
              <el-form-item label="计算规则">
                <el-select v-model="KPI.calculationRuleId" placeholder="指标名">
                  <el-option label="测试" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>

      <!-- 新建 -->
      <el-drawer
        title="新建"
        :visible.sync="newDrawer"
        :direction="direction"
        :before-close="newHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="KPI">
              <el-form-item label="第三指标">
                <el-input v-model="KPI.thirdKpiContent" placeholder="指标名" />
              </el-form-item>
              <el-form-item label="第二指标">
                <el-select v-model="KPI.secondKpiId" placeholder="指标名">
                  <el-option v-for="f in SecondKPI" :key="f.secondKpiId" :label="f.secondKpiContent" :value="f.secondKpiId" />
                </el-select>
              </el-form-item>
              <el-form-item label="计算规则">
                <el-select v-model="KPI.calculationRuleId" placeholder="指标名">
                  <el-option label="测试" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="create">创建</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>
    </el-main>
  </div>
</template>
<script>
import { getAllThirdKPI, getAllSecondKPI, findThirdKPIById, updateThirdKPI, createThirdKPI, deleteThirdKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      ThirdKPI: [],
      SecondKPI: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      KPI: {
        thirdKpiId: -1,
        secondKpiId: -1,
        thirdKpiContent: '',
        calculationRuleId: -1
      }
    }
  },
  created() {
    getAllThirdKPI().then(response => {
      this.ThirdKPI = response.table
      this.listLoading = false
    })
    getAllSecondKPI().then(response => {
      this.SecondKPI = response.table
    })
  },
  methods: {
    getSecondKPI: function(secondKpiId) {
      let content
      this.SecondKPI.forEach(element => {
        if (element.secondKpiId === secondKpiId) {
          content = element.secondKpiContent
        }
      })
      return content
    },
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
    update() {
      updateThirdKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    create() {
      this.KPI.thirdKpiId = null
      createThirdKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    delteThirdKPIById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteThirdKPI(id).then(response => {
          location.reload(true)
        })
      })
    },
    getThirdKPIById(thirdKpiId, secondKpiId) {
      this.editDrawer = true
      findThirdKPIById(thirdKpiId).then(response => {
        this.KPI.thirdKpiId = thirdKpiId
        this.KPI.secondKpiId = secondKpiId
        this.KPI.thirdKpiContent = response.data.thirdKpiContent
        this.KPI.calculationRuleId = response.data.calculationRuleId
      })
    }
  }
}
</script>
