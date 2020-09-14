<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.fileName" placeholder="文件名" /></div><div><el-input v-model="listQuery.code" placeholder="code码" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="queueInfoList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="接口名称" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.apiName }}
          </template>
        </el-table-column>
        <el-table-column label="code" width="300" align="center">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="文件名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.fileName }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.state | stateFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" @click="toEdit(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { queueInfoPageList } from '@/api/sysInfo'
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
    stateFormat(state) {
      if (state === 10) {
        return '等待执行'
      } else if (state === 20) {
        return '运行中'
      } else if (state === 30) {
        return '完成'
      } else if (state === 40) {
        return '导出失败'
      } else {
        return '其它'
      }
    },
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      queueInfoList: null,
      listLoading: true,
      total: 0,
      listQuery: {
        fileName: null,
        code: null,
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
      this.getList({ fileName: this.listQuery.fileName, code: this.listQuery.code })
    },
    getList() {
      this.listLoading = true
      queueInfoPageList(this.listQuery).then(response => {
        this.queueInfoList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toEdit(id) {
      this.$router.push({ path: '/queueInfo/queueInfoEdit/' + id })
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
