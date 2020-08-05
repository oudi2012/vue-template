<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.templateItemName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="templateItemList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="模板项标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.colTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模板项名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.colName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { templateItemPageList, templateItemRemove } from '@/api/sysInfo'
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
      templateItemList: null,
      listLoading: true,
      isCreateEmotionShow: false,
      total: 0,
      listQuery: {
        tplId: this.$route.params.tplId,
        templateItemName: '',
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
      this.getList({ tplId: this.listQuery.tplId, colName: this.listQuery.templateItemName })
    },
    getList() {
      this.listLoading = true
      templateItemPageList(this.listQuery).then(response => {
        this.templateItemList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/sysInfo/templateItemAdd/' + this.listQuery.tplId })
    },
    remove(id) {
      this.listLoading = true
      templateItemRemove(id).then(response => {
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
