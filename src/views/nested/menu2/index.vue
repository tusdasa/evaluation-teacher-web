<template>
  <div class="app-container">
    <el-header>
      <h1>权限管理</h1>
      <p>不允许删除, 只允许更新</p>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="rights"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色" width="220">
          <template slot-scope="scope">
            {{ scope.row.id | roleFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="第一指标" width="220">
          <template slot-scope="scope">
            {{ scope.row.firstKpiId | kpiFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="第二指标" width="220">
          <template slot-scope="scope">
            {{ scope.row.firstKpiId | kpiFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="第三指标" width="400">
          <template slot-scope="scope">
            {{ scope.row.thirdKpiId | kpiFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="findById(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px">
              <el-form-item label="编辑">
                <el-cascader
                  :options="options"
                  :props="props"
                  clearable
                />
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
import { findAllRight, findRightById /*, updateRight */ } from '@/api/table'
export default {
  filters: {
    kpiFilter(KpiId) {
      let str = ''
      KpiId.forEach(element => {
        str = str + String(element) + ':'
      })
      return str
    },
    roleFilter(id) {
      const roleMap = {
        1: '学生',
        2: '教师',
        3: '教学督导',
        4: '管理员'
      }
      return roleMap[id]
    }
  },
  data() {
    return {
      direction: 'rtl',
      editDrawer: false,
      listLoading: false,
      rights: [],
      right: [],
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          }]
        }
      ]
    }
  },
  created() {
    findAllRight().then(response => {
      this.rights = response.table
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
    findById(id) {
      this.editDrawer = true
      findRightById(id)
    },
    update() {
      console.log(this.right)
    }
  }
}
</script>
