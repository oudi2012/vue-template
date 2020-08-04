<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.templateName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="templateList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.tplId }}
          </template>
        </el-table-column>
        <el-table-column label="导出文件模板名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口名称" width="300" align="center">
          <template slot-scope="scope">
            {{ scope.row.apiName }}
          </template>
        </el-table-column>
        <el-table-column label="是否有合计" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.hasTotal }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="模板项列表" width="200">
          <template slot-scope="scope">
            <router-link :to="{path:'/sysInfo/appInfoList/'+scope.row.tplId}" style="color: #00a0e9;text-decoration:none">
              <el-button size="mini" type="success">模板项列表</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="remove(scope.row.tplId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { templatePageList, templateRemove } from '@/api/sysInfo'
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
      templateList: null,
      listLoading: true,
      isCreateEmotionShow: false,
      total: 0,
      listQuery: {
        apiId: this.$route.params.apiId,
        templateName: '',
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
      this.getList({ name: this.listQuery.templateName })
    },
    getList() {
      this.listLoading = true
      templatePageList(this.listQuery).then(response => {
        this.templateList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/sysInfo/templateAdd/' + this.listQuery.apiId })
    },
    remove(tplId) {
      this.listLoading = true
      templateRemove(tplId).then(response => {
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
