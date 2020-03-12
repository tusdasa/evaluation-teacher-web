<template>
  <div class="app-container">
    <el-header>
      <h1>第一指标</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="FirstKPI"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.firstKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="330">
          <template slot-scope="scope">
            {{ scope.row.firsKpiContent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="getFirstKPIById(scope.row.firstKpiId)">编辑</el-button>
            <el-button type="danger" @click="deleteFirstKPIById(scope.row.firstKpiId)">删除</el-button>
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
            <el-form ref="form" label-width="50px" :model="KPI">
              <el-form-item label="第一指标">
                <el-input v-model="KPI.firsKpiContent" placeholder="指标" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="create">创建</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>
      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="50px" :model="KPI">
              <el-form-item label="第一指标">
                <el-input v-model="KPI.firsKpiContent" placeholder="指标" />
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
import { getAllFirstKPI, getFirstKPIById, updateFirstKPI, createFirstKPI, deleteFirstKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      FirstKPI: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      KPI: {
        firstKpiId: -1,
        firsKpiContent: ''
      }
    }
  },
  created() {
    getAllFirstKPI().then(response => {
      this.FirstKPI = response.table
      this.listLoading = false
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
    getFirstKPIById(id) {
      this.editDrawer = true
      getFirstKPIById(id).then(response => {
        this.KPI.firstKpiId = response.data.firstKpiId
        this.KPI.firsKpiContent = response.data.firsKpiContent
        console.log(this.KPI)
      })
    },
    update() {
      updateFirstKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    create() {
      createFirstKPI(this.KPI).then(response => {
        location.reload(true)
      })
    },
    deleteFirstKPIById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFirstKPI(id).then(response => {
          location.reload(true)
        })
      })
    }
  }
}
</script>
