<template>
  <div class="app-container">
    <el-header>
      <h1>数据统计</h1>
    </el-header>
    <el-main>
      <p>学生评价记录:<strong> {{ snumber }}</strong></p>
      <p>教学督导评价记录:<strong> {{ tnumber }}</strong></p>
      <div style="margin-top: 100px;">
        <p style="color: orangered;margin-bottom: 40px;"><strong style="font-size: x-large;">注意: 本操作应当在本学期评教结束后操作, 数据已经保存在</strong></p>
        <el-button type="danger" @click="deleteAllStudent">清空当前学期学生评价信息</el-button>
        <el-button type="danger" @click="deleteAllTeacher">清空当前学期教学督导评价信息</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getCountStudent, getCountTeacher, getDeleteAllStudent, getDeleteAllTeacher } from '@/api/table'
export default {
  data() {
    return {
      snumber: 0,
      tnumber: 0
    }
  },
  created() {
    getCountStudent().then(response => {
      this.snumber = response.data
    })
    getCountTeacher().then(response => {
      this.tnumber = response.data
    })
  },
  methods: {
    deleteAllStudent: function() {
      this.$prompt('请输入"删除记录"四个字', '危险操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === '删除记录') {
          getDeleteAllStudent(response => {
            location.reload(true)
          })
        }
      })
    },
    deleteAllTeacher: function() {
      this.$prompt('请输入"删除记录"四个字', '危险操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === '删除记录') {
          getDeleteAllTeacher(response => {
            location.reload(true)
          })
        }
      })
    }
  }
}
</script>
