<template>
  <div class="app-container">
    <el-header>
      <h1>第二指标</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="SecondKPI"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.secondKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属第一指标" width="330">
          <template slot-scope="scope">
            {{ getFirstKPIContent(scope.row.firstKpiId) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="330">
          <template slot-scope="scope">
            {{ scope.row.secondKpiContent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="getSecondKPIById(scope.row.secondKpiId, scope.row.firstKpiId)">编辑</el-button>
            <el-button type="danger" @click="deleteSecondKPIById(scope.row.secondKpiId)">删除</el-button>
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
              <el-form-item label="第二指标">
                <el-input v-model="KPI.secondKpiContent" placeholder="指标名" />
              </el-form-item>
              <el-form-item label="第一指标">
                <el-select v-model="KPI.firstKpiId" placeholder="指标名">
                  <el-option v-for="f in FirstKPI" :key="f.firstKpiI" :label="f.firsKpiContent" :value="f.firstKpiId" />
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
              <el-form-item label="第二指标">
                <el-input v-model="KPI.secondKpiContent" placeholder="指标名" />
              </el-form-item>
              <el-form-item label="第一指标">
                <el-select v-model="KPI.firstKpiId" placeholder="指标名">
                  <el-option v-for="f in FirstKPI" :key="f.firstKpiI" :label="f.firsKpiContent" :value="f.firstKpiId" />
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
import { getAllSecondKPI, getAllFirstKPI, findSecondKPIById, updateSecondKPI, createSecondKPI, deleteSecondKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      SecondKPI: [],
      FirstKPI: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      KPI: {
        secondKpiId: -1,
        firstKpiId: -1,
        secondKpiContent: ''
      }
    }
  },
  created() {
    getAllSecondKPI().then(response => {
      if (response.code === 200) {
        this.SecondKPI = response.table
        this.listLoading = false
      }
    })
    getAllFirstKPI().then(response => {
      this.FirstKPI = response.table
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
    getFirstKPIContent: function(firstKpiId) {
      let content
      this.FirstKPI.forEach(element => {
        if (element.firstKpiId === firstKpiId) {
          content = element.firsKpiContent
        }
      })
      return content
    },
    update() {
      updateSecondKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    create() {
      this.KPI.secondKpiId = null
      createSecondKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    getSecondKPIById(secondKpiId, firstKpiId) {
      this.editDrawer = true
      findSecondKPIById(secondKpiId, firstKpiId).then(response => {
        this.KPI.secondKpiId = secondKpiId
        this.KPI.firstKpiId = firstKpiId
        this.KPI.secondKpiContent = response.data.secondKpiContent
      })
    },
    deleteSecondKPIById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSecondKPI(id).then(response => {
          location.reload(true)
        })
      })
    }
  }
}
</script>
