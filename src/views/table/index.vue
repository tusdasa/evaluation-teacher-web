<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="载入中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="工号" width="220">
        <template slot-scope="scope">
          {{ scope.row.workId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="220">
        <template slot-scope="scope">
          {{ scope.row.teacherName }}
        </template>
      </el-table-column>
      <el-table-column label="职称" width="220" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.professional.professionalTitle }}</p>
        </template>
      </el-table-column>
      <el-table-column label="二级学院" width="220" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.department.departmentName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-model="direction" type="primary" @click="evauationTeacher(scope.row.workId)">评价</el-button>
        </template>
      </el-table-column>
      <!-- department -->
      <!--
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
       -->
    </el-table>

    <el-drawer :with-header="false" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-container>
        <el-main>
          <el-form ref="form" :model="form">
            <el-form-item v-for="(k, index) in kpiList" :key="k.thirdKpiId">
              <p><strong>{{ index + 1 }}、{{ k.thirdKpiContent }}</strong></p>
              <el-select v-model="form.kpi[index]" placeholder="请选择评价">
                <el-option label="很好" value="6" />
                <el-option label="较好" value="4" />
                <el-option label="一般" value="2" />
                <el-option label="较差" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="sumbitEvaluation">提交评价</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-drawer>

  </div>
</template>

<script>
import { getList, getKpiList, sendEvaluationData } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      drawer: false,
      direction: 'rtl',
      kpiList: null,
      result: null,
      currentWorkId: null,
      form: {
        kpi: []
      }
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  created() {
    this.fetchData()
    this.fetchKpi()
  },
  methods: {
    evauationTeacher(workId) {
      this.drawer = true
      this.workId = workId
    },
    sumbitEvaluation() {
      const teacherEvaluation = {}
      const lists = []
      // this.form.kpi;
      if (this.form.kpi < this.kpiList.length) {
        this.$message.error('未完成')
        return
      }
      let flag = false
      for (let i = 0; i < this.form.kpi.length; i++) {
        const temp = {}
        temp.kid = this.kpiList[i].thirdKpiId
        temp.score = this.form.kpi[i]
        if (temp.score === undefined || temp.score === null) {
          flag = true
          break
        }
        lists.push(temp)
      }
      if (flag) {
        this.$message.error('未完成')
        return
      } else {
        teacherEvaluation.workId = this.workId
        teacherEvaluation.secondKpiList = lists
        sendEvaluationData(teacherEvaluation).then(response => {
          if (response.code === 200) {
            this.$message({
              message: '评价成功',
              type: 'success'
            })
            this.drawer = false
            location.reload()
          } else {
            this.$message.error('错误')
          }
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        if (response.code === 200) {
          this.list = response.table
        } else {
          this.list = null
        }
        this.listLoading = false
      })
    },
    fetchKpi() {
      // @opened="fetchKpi"
      getKpiList().then(response => {
        this.kpiList = response.table
      })
    }
  }
}
</script>
<style>
.el-drawer.rtl{
  overflow: scroll
}
.nodisplay{
  display: none;
}
</style>
