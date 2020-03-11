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
        <el-table-column align="center" label="所属第一指标" width="330">
          <template slot-scope="scope">
            {{ getFirstKPIContent(scope.row.firstKpiId) }}
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
import { getAllSecondKPI, getAllFirstKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      SecondKPI: [],
      FirstKPI: []
    }
  },
  created() {
    getAllSecondKPI().then(response => {
      if (response.code === 200) {
        this.SecondKPI = response.table
        this.listLoading = false
      }
    })
    getAllFirstKPI().then(response => {
      this.FirstKPI = response.table
    })
  },
  methods: {
    getFirstKPIContent: function(firstKpiId) {
      let content
      this.FirstKPI.forEach(element => {
        if (element.firstKpiId === firstKpiId) {
          content = element.firsKpiContent
          // break
        }
      })
      return content
    }
  }
}
</script>
