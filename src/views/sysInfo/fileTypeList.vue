<template>
  <div class="wrap">
    <div class="search-wrap">
      <div><el-input v-model="listQuery.name" placeholder="输入关键词" /></div>
      <div><el-button type="primary" @click="search">搜索</el-button></div>
    </div>
    <div class="table">
      <el-table v-loading="listLoading" :data="fileTypeList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="文件类型">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型名称" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="是否使用" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.used | usedFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="success" @click="toEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { fileTypePageList } from '@/api/sysInfo'
import Pagination from '@/components/Pagination'
import { formatDate } from '@/utils/date'

export default {
  components: { Pagination },
  filters: {
    usedFilter(type) {
      if (type === 0) {
        return '否'
      } else {
        return '是'
      }
    },
    dateFormat(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      fileTypeList: null,
      listLoading: true,
      isCreateEmotionShow: false,
      total: 0,
      listQuery: {
        name: '',
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
      this.getList({ name: this.listQuery.name })
    },
    getList() {
      this.listLoading = true
      fileTypePageList(this.listQuery).then(response => {
        this.fileTypeList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toEdit(id) {
      this.$router.push({ path: '/sysInfo/fileTypeEdit/' + id })
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
