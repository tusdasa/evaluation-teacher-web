<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size:30px;">欢迎您</span>
        </div>
        <div vclass="text item">{{ name }} </div>
        <div vclass="text item">当前角色: {{ role }} </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      ss: '1212121'
    }
  },
  computed: {
    ...mapGetters(['name', 'role'])
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
    clear: both
  }

  .box-card {
    width: 500px;
  }
</style>
