<template>
  <div class="app-container">
    <el-header>
      <h1>学期</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="create()">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="terms"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.termId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="学期" width="220">
          <template slot-scope="scope">
            {{ scope.row.termName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="学期开始时间" width="220">
          <template slot-scope="scope">
            {{ scope.row.startTime | dateConvert }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="学期结束时间" width="220">
          <template slot-scope="scope">
            {{ scope.row.endTime | dateConvert }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="update(scope.row.academicYearId)">编辑</el-button>
            <el-button type="danger">删除</el-button>
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
            <el-form ref="form" label-width="80px">
              <el-form-item label="学期名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="学期时间">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-button type="primary">更新</el-button>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>

      <!-- 创建 -->
      <el-drawer
        title="创建"
        :visible.sync="createDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px">
              <el-form-item label="学期名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="学期时间">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-button type="primary">创建</el-button>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>

    </el-main>
  </div>
</template>

<script>
import { findAllTerm } from '@/api/table'
export default {
  filters: {
    dateConvert(value) {
      return new Date(parseInt(value / 1000) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
  },
  data() {
    return {
      listLoading: false,
      direction: 'rtl',
      editDrawer: false,
      createDrawer: false,
      terms: []
    }
  },
  created() {
    findAllTerm().then(response => {
      this.terms = response.table
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
    update(id) {
      this.editDrawer = true
    },
    delete(id) {

    },
    create() {
      this.createDrawer = true
    },
    findById(id) {

    }
  }
}
</script>
