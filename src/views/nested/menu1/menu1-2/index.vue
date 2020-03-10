<template>
  <div class="app-container">
    <el-header>
      <h1>第二指标</h1>
    </el-header>
    <el-main>
      <el-button type="primary">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="SecondKPI"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.secondKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属第一指标" width="220">
          <template slot-scope="scope">
            {{ scope.row.firstKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="330">
          <template slot-scope="scope">
            {{ scope.row.secondKpiContent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="220">
          <el-button type="primary">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import { getAllSecondKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      SecondKPI: []
    }
  },
  created() {
    getAllSecondKPI().then(response => {
      this.SecondKPI = response.table
      this.listLoading = false
      console.log(this.SecondKPI)
    })
  }
}
</script>
