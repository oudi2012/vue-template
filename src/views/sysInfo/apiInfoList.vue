<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.apiInfoName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="apiInfoList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.apiId }}
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.apiName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属应用" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.appName }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.manager }}
          </template>
        </el-table-column>
        <el-table-column label="服务名称" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.serviceName }}
          </template>
        </el-table-column>
        <el-table-column label="排序编号" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="success" @click="toTmpList(scope.row.apiId)">配置导出文件模板</el-button>
            <el-button type="danger" @click="remove(scope.row.apiId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { apiInfoPageList, apiInfoRemove } from '@/api/sysInfo'
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
      apiInfoList: null,
      listLoading: true,
      isCreateEmotionShow: false,
      total: 0,
      listQuery: {
        appId: this.$route.params.appId,
        apiInfoName: '',
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
      this.getList({ appId: this.listQuery.appId, apiName: this.listQuery.apiInfoName })
    },
    getList() {
      this.listLoading = true
      apiInfoPageList(this.listQuery).then(response => {
        this.apiInfoList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/sysInfo/apiInfoAdd/' + this.listQuery.appId })
    },
    toTmpList(apiId) {
      this.$router.push({ path: '/sysInfo/templateList/' + apiId })
    },
    remove(apiId) {
      this.listLoading = true
      apiInfoRemove(apiId).then(response => {
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
      this.getList()
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
