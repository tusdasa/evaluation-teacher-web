<template>
  <div class="app-container">
    <el-header>
      <h1>规则</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="evidences"
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
          <template slot-scope="scope">
            <el-button type="primary" @click="findEvidence(scope.row.evidenceId)">编辑</el-button>
            <el-button type="danger" @click="deleteById(scope.row.evidenceId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建 -->
      <el-drawer
        title="新建"
        :visible.sync="newDrawer"
        :direction="direction"
        :before-close="newHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="evidence">
              <el-form-item label="名称">
                <el-input v-model="evidence.evidenceName" />
              </el-form-item>
              <el-form-item label="类型">
                <el-input-number v-model="evidence.evidenceType" />
              </el-form-item>
              <el-form-item label="分数">
                <el-input-number v-model="evidence.evidenceScore" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="create">创建</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-drawer>

      <!-- 编辑 -->
      <el-drawer
        title="编辑"
        :visible.sync="editDrawer"
        :direction="direction"
        :before-close="editHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="evidence">
              <el-form-item label="名称">
                <el-input v-model="evidence.evidenceName" />
              </el-form-item>
              <el-form-item label="类型">
                <el-input-number v-model="evidence.evidenceType" />
              </el-form-item>
              <el-form-item label="分数">
                <el-input-number v-model="evidence.evidenceScore" />
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
import { findAllEvidence, findEvidenceById, createEvidence, deleteEvidence, updateEvidence } from '@/api/table'
export default {
  filters: {
  },
  data() {
    return {
      listLoading: true,
      evidences: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      evidence: {
        evidenceId: 0,
        evidenceName: '',
        evidenceType: 0,
        evidenceScore: 0
      }
    }
  },
  created() {
    findAllEvidence().then(resonse => {
      this.evidences = resonse.table
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
    deleteById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEvidence(id).then(resonse => {
          location.reload(true)
        })
      })
    },
    findEvidence(id) {
      findEvidenceById(id).then(resonse => {
        this.editDrawer = true
        this.evidence = resonse.data
      })
    },
    update() {
      updateEvidence(this.evidence).then(resonse => {
        location.reload(true)
      })
    },
    create() {
      this.evidence.evidenceId = null
      createEvidence(this.evidence).then(resonse => {
        location.reload(true)
      })
    }
  }
}
</script>
