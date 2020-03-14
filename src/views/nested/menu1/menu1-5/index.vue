<template>
  <div class="app-container">
    <el-header>
      <h1>规则</h1>
    </el-header>
    <el-main>
      <el-button type="primary" @click="newDrawer = true">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="Levels"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.levelId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称" width="220">
          <template slot-scope="scope">
            {{ scope.row.levelName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="220">
          <template slot-scope="scope">
            {{ scope.row.levelType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分数" width="220">
          <template slot-scope="scope">
            {{ scope.row.levelSore }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="findLevel(scope.row.levelId)">编辑</el-button>
            <el-button type="danger" @click="deleteById(scope.row.levelId)">删除</el-button>
          </template>
        </el-table-column></el-table>
      <!-- 新建 -->
      <el-drawer
        title="新建"
        :visible.sync="newDrawer"
        :direction="direction"
        :before-close="newHandleClose"
      >
        <el-container>
          <el-main>
            <el-form ref="form" label-width="80px" :model="level">
              <el-form-item label="名称">
                <el-input v-model="level.levelName" />
              </el-form-item>
              <el-form-item label="类型">
                <el-input-number v-model="level.levelType" />
              </el-form-item>
              <el-form-item label="分数">
                <el-input-number v-model="level.levelSore" />
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
            <el-form ref="form" label-width="80px" :model="level">
              <el-form-item label="名称">
                <el-input v-model="level.levelName" />
              </el-form-item>
              <el-form-item label="类型">
                <el-input-number v-model="level.levelType" />
              </el-form-item>
              <el-form-item label="分数">
                <el-input-number v-model="level.levelSore" />
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
import { findAllLevels, findLevelById, deleteLevel, updateLevel, crateLevel } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      Levels: [],
      newDrawer: false,
      direction: 'rtl',
      editDrawer: false,
      level: {
        levelId: 0,
        levelName: '',
        levelType: 0,
        levelSore: 0
      }
    }
  },
  created() {
    findAllLevels().then(response => {
      this.Levels = response.table
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
        deleteLevel(id).then(response => {
          location.reload(true)
        })
      })
    },
    findLevel(id) {
      findLevelById(id).then(response => {
        this.editDrawer = true
        this.level = response.data
      })
    },
    update() {
      updateLevel(this.level).then(response => {
        location.reload(true)
      })
    },
    create() {
      crateLevel(this.level).then(response => {
        location.reload(true)
      })
    }
  }
}
</script>
