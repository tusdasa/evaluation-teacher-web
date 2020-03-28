<template>
  <div class="app-container">
    <el-header>
      <h1>成绩汇总</h1>
    </el-header>
    <el-main>
      <el-button type="primary" round @click="watchResult">计算成绩</el-button>
      <el-table
        :data="lists"
        style="width: 100%"
        row-key="workId"
      >
        <el-table-column
          prop="workId"
          label="工号"
          width="180"
        />
        <el-table-column
          prop="teacherName"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="professional.professionalTitle"
          label="职称"
          width="180"
        />
        <el-table-column
          prop="department.departmentName"
          label="学院"
          width="180"
        />
        <el-table-column
          label="总分"
          width="180"
        >
          <template slot-scope="scope">
            {{ totalScore(scope.row.workId) }}
          </template>
        </el-table-column>
        <el-table-column
          label="详细"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="watchDatail(scope.row.workId)">详细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;">
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          :total="500"
          :page-sizes="[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
          :page-size="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <el-dialog
        title="成绩详情"
        :visible.sync="dialogVisible"
        center
        width="60%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <div>
            <el-card class="box-card" style="width:100%;margin-top:20px;margin:auto;margin-bottom:10px;text-align: left;">
              <el-divider content-position="left">工号</el-divider>
              <span>{{ result.id }}</span>
              <el-divider />
              <span>{{ result.teacherName }}</span>
              <el-divider />
              <span>{{ result.academicYearName }}</span>
              <el-divider />
              <span>{{ result.departmentName }}</span>
              <el-divider />
              <span>{{ result.professionalTitle }}</span>
              <el-card class="box-card" style="margin-top:20px;">
                <span>{{ result.firstTerm.termName }}</span>
                <el-divider content-position="left">学生评价平均分</el-divider>
                <span>{{ result.firstTerm.studentResult }}</span>
                <el-divider content-position="left">学生评价标准差</el-divider>
                <span>{{ result.firstTerm.studentStandardDeviation }}</span>
                <el-divider content-position="left">学生评价众数</el-divider>
                <span>{{ result.firstTerm.studentModeMax }}</span>
                <span>,</span>
                <span>{{ result.firstTerm.studentModeMin }}</span>
                <el-divider content-position="left">参与评价班级数量</el-divider>
                <span>{{ result.firstTerm.classCount }}</span>
                <el-divider content-position="left">参与评价的学生数量</el-divider>
                <span>{{ result.firstTerm.studentCount }}</span>
                <el-divider content-position="left">教学督导评价</el-divider>
                <span>{{ result.firstTerm.teacherResult }}</span>
                <el-divider content-position="left">总分</el-divider>
                <span>{{ result.firstTerm.total }}</span>
              </el-card>
              <el-card class="box-card" style="margin-top:20px;">
                <span>{{ result.secondTerm.termName }}</span>
                <el-divider content-position="left">学生评价平均分</el-divider>
                <span>{{ result.secondTerm.studentResult }}</span>
                <el-divider content-position="left">学生评价标准差</el-divider>
                <span>{{ result.secondTerm.studentStandardDeviation }}</span>
                <el-divider content-position="left">学生评价众数</el-divider>
                <span>{{ result.secondTerm.studentModeMax }}</span>
                <span>,</span>
                <span>{{ result.secondTerm.studentModeMin }}</span>
                <el-divider content-position="left">参与评价班级数量</el-divider>
                <span>{{ result.secondTerm.classCount }}</span>
                <el-divider content-position="left">参与评价的学生数量</el-divider>
                <span>{{ result.secondTerm.studentCount }}</span>
                <el-divider content-position="left">教学督导评价</el-divider>
                <span>{{ result.secondTerm.teacherResult }}</span>
                <el-divider content-position="left">总分</el-divider>
                <span>{{ result.secondTerm.total }}</span>
              </el-card>
              <el-divider content-position="left">总分</el-divider>
              <span>{{ result.total }}</span>
            </el-card>
          </div>
          <el-button type="primary" @click="close">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import { getDepartmentTeacher, getDepartmentTeacherResult } from '@/api/table'
export default {
  data() {
    return {
      lists: [
        {
          department: {
            departmentId: 0,
            departmentName: ''
          },
          professional: {
            professionalId: 0,
            professionalTitle: ''
          },
          teacherName: '',
          workId: 0,
          total: 0
        }
      ],
      currentPage: 0,
      currentSize: 5,
      dialogVisible: false,
      resultList: [],
      ok: true,
      result: {
        id: 0,
        teacherName: '未获取到',
        academicYearName: '未获取到',
        departmentName: '未获取到',
        professionalTitle: '未获取到',
        studentScore: 0,
        teacherScore: 0,
        total: 0,
        firstTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        },
        secondTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        }
      }
    }
  },
  computed: {
    totalScore() {
      return function(val) {
        let v = 0
        this.resultList.forEach(element => {
          if (element.id === val) {
            v = element.total
          }
        })
        return v
      }
    }
  },
  watch: {
    currentPage: function(val) {
      getDepartmentTeacher(this.currentPage, this.currentSize).then(response => {
        this.lists = response.table
      })
    },
    currentSize: function(val) {
      getDepartmentTeacher(this.currentPage, this.currentSize).then(response => {
        this.lists = response.table
      })
    }
  },
  created() {
    getDepartmentTeacher(this.currentPage, this.currentSize).then(response => {
      this.lists = response.table
      this.lists.forEach(element => {
        element.total = 0
      })
    })
  },
  methods: {
    close() {
      this.dialogVisible = false
      this.result = {
        id: 0,
        teacherName: '未获取到',
        academicYearName: '未获取到',
        departmentName: '未获取到',
        professionalTitle: '未获取到',
        studentScore: 0,
        teacherScore: 0,
        total: 0,
        firstTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        },
        secondTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        }
      }
    },
    handleSizeChange(val) {
      this.currentSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val - 1
    },
    handleClose(done) {
      this.result = {
        id: 0,
        teacherName: '未获取到',
        academicYearName: '未获取到',
        departmentName: '未获取到',
        professionalTitle: '未获取到',
        studentScore: 0,
        teacherScore: 0,
        total: 0,
        firstTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        },
        secondTerm: {
          termId: 0,
          termName: '',
          studentResult: 0,
          studentModeMax: 0,
          studentModeMin: 0,
          studentStandardDeviation: 0,
          studentCount: 0,
          classCount: 0,
          teacherResult: 0,
          total: 0
        }
      }
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    watchDatail(id) {
      this.dialogVisible = true
      this.resultList.forEach(element => {
        if (element.id === id) {
          this.result = element
          return
        }
      })
    },
    watchResult() {
      const ids = []
      this.lists.forEach(element => {
        ids.push(element.workId)
      })
      getDepartmentTeacherResult({ 'firstIds': ids }).then(response => {
        if (response.code === 200) {
          this.ok = false
          this.resultList = response.table
          this.lists.forEach(element => {
            response.table.forEach(el => {
              if (el.id === element.workId) {
                element.total = el.total
              }
            })
          })
          this.ok = true
        }
      })
    }
  }
}
</script>
