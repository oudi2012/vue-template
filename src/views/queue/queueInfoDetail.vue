<template>
  <div class="app-container">
    <el-form ref="queueInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="code" prop="code">
        <el-input v-model="postForm.code" readonly />
      </el-form-item>
      <el-form-item label="文件名称">
        <el-input v-model="postForm.fileName" readonly />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="postForm.state" value-key="state" size="mini">
          <el-option v-for="item in stateList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSysInfo('queueInfoForm')">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queueInfoFindById, queueInfoUpdate } from '@/api/sysInfo'

const stateList = [
  { key: 10, value: '等待执行' },
  { key: 20, value: '运行中' },
  { key: 30, value: '完成' },
  { key: 40, value: '导出失败' }
]

export default {
  name: 'QueueInfoDetail',
  data() {
    return {
      stateList: stateList,
      postForm: {
        code: '',
        fileName: '',
        id: this.$route.params.id,
        state: 0
      }
    }
  },
  created() {
    this.findInfoById()
  },
  methods: {
    findInfoById() {
      queueInfoFindById(this.postForm.id).then(res => {
        this.loading = false
        this.postForm.code = res.data.code
        this.postForm.fileName = res.data.fileName
        this.postForm.state = res.data.state
      }).catch(e => {
        this.loading = false
      })
    },
    updateSysInfo(queueInfoForm) {
      this.$refs[queueInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          queueInfoUpdate(this.postForm).then(() => {
            this.loading = false
            this.$message.success('修改成功!')
            this.$router.push({ path: '/queueInfo/queueInfoList' })
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/queueInfo/queueInfoList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 35%;
    .el-input,.el-select{width:100%}
  }
  .line{
    text-align: center;
  }
</style>
