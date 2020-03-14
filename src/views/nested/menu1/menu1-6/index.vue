<template>
  <div class="app-container">
    <el-header>
      <h1>规则</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="evidence"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.evidenceId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.evidenceName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="220">
          <template slot-scope="scope">
            {{ scope.row.evidenceType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分数" width="220">
          <template slot-scope="scope">
            {{ scope.row.evidenceScore }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <el-button type="primary" @click="editDrawer = true">编辑</el-button>
          <el-button type="danger" @click="deleteById">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 新建 -->
      <el-drawer
        title="新建"
        :visible.sync="newDrawer"
        :direction="newDirection"
        :before-close="newHandleClose"
      >
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-drawer>

      <!-- 编辑 -->
      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="editDirection"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            1
          </el-main>
        </el-container>
      </el-drawer>
    </el-main>
  </div>
</template>
<script>
import { findAllEvidence } from '@/api/table'
export default {
  filters: {
  },
  data() {
    return {
      listLoading: true,
      evidence: [],
      newDrawer: false,
      newDirection: 'rtl',
      editDrawer: false,
      editDirection: 'rtl'
    }
  },
  created() {
    findAllEvidence().then(resonse => {
      this.evidence = resonse.table
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
    deleteById() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      })
    }
  }
}
</script>
