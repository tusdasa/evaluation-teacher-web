<template>
  <div class="app-container">
    <div>
      <div>
        <el-card class="box-card" style="width:40%;margin-top:20px;">
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
          <el-divider content-position="left">学生评价平均分</el-divider>
          <span>{{ result.studentResult }}</span>
          <el-divider content-position="left">学生评价标准差</el-divider>
          <span>{{ result.studentStandardDeviation }}</span>
          <el-divider content-position="left">学生评价众数</el-divider>
          <span>{{ result.studentMode }}</span>
          <el-divider content-position="left">教学督导评价</el-divider>
          <span>{{ result.teacherResult }}</span>
          <el-divider content-position="right">总分</el-divider>
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
        studentResult: 0,
        studentStandardDeviation: 0,
        studentMode: 0,
        teacherResult: 0,
        total: 0
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
