<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.sysInfoName" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
      <div><el-button type="primary" @click="toCreate">创建</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="sysInfoList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.appId }}
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.manager }}
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
        <el-table-column fixed="right" label="应用列表" width="200">
          <template slot-scope="scope">
            <span>
              <router-link :to="{path:'/sysInfo/appInfoList/'+scope.row.appId}" style="color: #00a0e9;text-decoration:underline">应用管理</router-link>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { sysInfoPageList } from '@/api/sysInfo'
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
      sysInfoList: null,
      listLoading: true,
      isCreateEmotionShow: false,
      total: 0,
      listQuery: {
        sysInfoName: '',
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
      this.getList({ name: this.listQuery.sysInfoName })
    },
    getList() {
      this.listLoading = true
      sysInfoPageList(this.listQuery).then(response => {
        this.sysInfoList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toCreate() {
      this.$router.push({ path: '/sysInfo/sysInfoAdd/' })
    },
    appInfoList() {
      this.$router.push({ path: '/sysInfo/sysInfoAdd' })
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
