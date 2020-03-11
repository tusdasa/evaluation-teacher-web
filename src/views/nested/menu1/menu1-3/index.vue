<template>
  <div class="app-container">
    <el-header>
      <h1>第三指标</h1>
    </el-header>
    <el-main>
      <el-button type="primary">新建</el-button>
      <el-table
        v-loading="listLoading"
        :data="ThirdKPI"
        element-loading-text="载入中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="220">
          <template slot-scope="scope">
            {{ scope.row.thirdKpiId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属第二指标" width="220">
          <template slot-scope="scope">
            {{ getSecondKPI(scope.row.secondKpiId) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="330">
          <template slot-scope="scope">
            {{ scope.row.thirdKpiContent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="计算规则" width="330">
          <template slot-scope="scope">
            {{ scope.row.calculationRuleId }}
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
import { getAllThirdKPI, getAllSecondKPI } from '@/api/table'
export default {
  data() {
    return {
      listLoading: true,
      ThirdKPI: [],
      SecondKPI: []
    }
  },
  created() {
    getAllThirdKPI().then(response => {
      this.ThirdKPI = response.table
      this.listLoading = false
    })
    getAllSecondKPI().then(response => {
      this.SecondKPI = response.table
    })
  },
  methods: {
    getSecondKPI: function(secondKpiId) {
      let content
      this.SecondKPI.forEach(element => {
        if (element.secondKpiId === secondKpiId) {
          content = element.secondKpiContent
        }
      })
      return content
    }
  }
}
</script>
