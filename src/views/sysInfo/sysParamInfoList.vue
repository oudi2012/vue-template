<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.paramName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="sysParamInfoList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.paramId }}
          </template>
        </el-table-column>
        <el-table-column label="参数编码">
          <template slot-scope="scope">
            <span>{{ scope.row.paramCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参数名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.paramName }}
          </template>
        </el-table-column>
        <el-table-column label="参数值" align="center">
          <template slot-scope="scope">
            {{ scope.row.paramValue }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="success" @click="toEdit(scope.row.paramId)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { sysParamInfoPageList } from '@/api/sysInfo'
import Pagination from '@/components/Pagination'
import { formatDate } from '@/utils/date'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      sysParamInfoList: null,
      listLoading: true,
      total: 0,
      listQuery: {
        paramName: '',
        pageIndex: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    search() {
      this.getList({ paramName: this.listQuery.paramName })
    },
    getList() {
      this.listLoading = true
      sysParamInfoPageList(this.listQuery).then(response => {
        this.sysParamInfoList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/sysInfo/sysParamInfoAdd' })
    },
    toEdit(paramId) {
      this.$router.push({ path: '/sysInfo/sysParamInfoEdit/' + paramId })
    }
  }
}
</script>

<style scoped>
  .wrap{
    padding: 20px;
  }
  .search-wrap{
    display: flex;
  }
  .search-wrap>div{
    margin-right: 20px;
  }
  .table{
    margin-top: 20px;
  }
</style>
