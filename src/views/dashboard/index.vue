<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <div class="grid-content">
          <div class="dashboard-text">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size:30px;">欢迎您</span>
              </div>
              <div vclass="text item">{{ name }}</div>
              <div vclass="text item">{{ id }}</div>
              <div vclass="text item">当前角色: {{ role | roleFilter }}</div>
            </el-card>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <el-calendar v-model="value" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  filters: {
    roleFilter(role) {
      const roleMap = {
        student: '学生',
        teacher: '老师',
        supervisor: '教学督导',
        main: '负责人',
        other: '其他'
      }
      return roleMap[role]
    }
  },
  data() {
    return {
      value: new Date()
    }
  },
  computed: {
    ...mapGetters(['name', 'role', 'id'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    line-height: 46px;
  }
}
.text {
  font-size: 12px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 500px;
}
</style>
