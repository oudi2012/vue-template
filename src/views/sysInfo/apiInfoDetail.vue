<template>
  <div class="app-container">
    <el-form ref="apiInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="postForm.apiName" />
      </el-form-item>
      <el-form-item label="接口地址">
        <el-input v-model="postForm.remoteUrl" />
      </el-form-item>
      <el-form-item label="服务名称">
        <el-input v-model="postForm.serviceName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('apiInfoForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiInfoCreate } from '@/api/sysInfo'

export default {
  name: 'ApiInfoDetail',
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        apiName: '',
        appId: this.$route.params.appId,
        remoteUrl: '',
        serviceName: '',
        orderNo: 0,
        type: 1
      },
      rules: {
        apiName: [{ validator: validateRequire }],
        remoteUrl: [{ validator: validateRequire }],
        serviceName: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    createSysInfo(apiInfoForm) {
      this.$refs[apiInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          apiInfoCreate(this.postForm).then(() => {
            this.loading = false
            this.$message.success('创建成功!')
            this.$router.push({ path: '/sysInfo/apiInfoList/' + this.postForm.appId })
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/apiInfoList/' + this.postForm.appId })
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
