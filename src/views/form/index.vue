<template>
  <div class="app-container">
    <div>
      <div>
        <el-card class="box-card" style="width:60%;margin-top:20px;margin:auto;">
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
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getResult } from '@/api/table'
export default {
  data() {
    return {
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
  created() {
    getResult().then(response => {
      if (response.code === 200) {
        this.result = response.data
      }
    })
  },
  methods: {
  }
}
</script>
