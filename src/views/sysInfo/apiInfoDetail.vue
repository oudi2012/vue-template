<template>
  <div class="app-container">
    <el-form ref="apiInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="postForm.apiName" />(英文表示)
      </el-form-item>
      <el-form-item label="接口描述">
        <el-input v-model="postForm.apiTitle" />(汉语表示)
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
import { apiInfoCreate, apiInfoFind, apiInfoUpdate } from '@/api/sysInfo'

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
        apiId: this.$route.params.apiId,
        appId: this.$route.params.appId,
        apiTitle: '',
        serviceName: '',
        orderNo: 0,
        type: 1
      },
      rules: {
        apiName: [{ validator: validateRequire }],
        apiTitle: [{ validator: validateRequire }],
        serviceName: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.postForm.apiId) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      apiInfoFind(this.postForm.apiId).then(res => {
        this.postForm.apiName = res.data.apiName
        this.postForm.apiTitle = res.data.apiTitle
        this.postForm.serviceName = res.data.serviceName
      })
    },
    createSysInfo(apiInfoForm) {
      this.$refs[apiInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.postForm.apiId) {
            apiInfoUpdate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('保存成功!')
              this.$router.push({ path: '/sysInfo/apiInfoList/' + this.postForm.appId })
            }).catch(e => {
              this.loading = false
            })
          } else {
            apiInfoCreate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('创建成功!')
              this.$router.push({ path: '/sysInfo/apiInfoList/' + this.postForm.appId })
            }).catch(e => {
              this.loading = false
            })
          }
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
