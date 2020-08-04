<template>
  <div class="app-container">
    <el-form ref="templateForm" class="form-inline" :model="postForm" :rules="rules" label-width="150px">
      <el-form-item label="导出文件模板名称" prop="name">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item label="是否有合计:">
        <el-radio-group v-model="postForm.hasTotal">
          <el-radio label="0">无</el-radio>
          <el-radio label="1">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('templateForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { templateCreate } from '@/api/sysInfo'

export default {
  name: 'TemplateDetail',
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
        name: '',
        apiId: this.$route.params.apiId,
        hasTotal: '0',
        orderNo: 0,
        type: 1
      },
      rules: {
        name: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    createSysInfo(templateForm) {
      this.$refs[templateForm].validate((valid) => {
        if (valid) {
          this.loading = true
          templateCreate(this.postForm).then(() => {
            this.loading = false
            this.$message.success('创建成功!')
            this.$router.push({ path: '/sysInfo/templateList/' + this.postForm.apiId })
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/templateList/' + this.postForm.apiId })
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
