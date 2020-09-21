<template>
  <div class="app-container">
    <el-form ref="testRequestForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="userId">
        <el-input v-model="postForm.userId" />
      </el-form-item>
      <el-form-item label="code">
        <el-input v-model="postForm.code" />
      </el-form-item>
      <el-form-item label="params">
        <el-input v-model="postForm.params" type="textarea" class="article-textarea" placeholder="Please enter the params" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('testRequestForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { testRequestUrl } from '@/api/sysInfo'

export default {
  name: 'TestRequestDetail',
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
        userId: '',
        code: '',
        params: ''
      },
      rules: {
        userId: [{ validator: validateRequire }],
        code: [{ validator: validateRequire }],
        params: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    createSysInfo(testRequestForm) {
      this.$refs[testRequestForm].validate((valid) => {
        if (valid) {
          this.loading = true
          testRequestUrl(this.postForm.userId, this.postForm.code, this.postForm.params).then(() => {
            this.loading = false
            this.$message.success('请求成功!')
          }).catch(e => {
            this.loading = false
          })
        }
      })
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
  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      border: 1px solid #bfcbd9;
      border-radius: 5px;
      height: 300px;
    }
  }
</style>
