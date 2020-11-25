<template>
  <div class="app-container">
    <el-form ref="sysInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="应用编码" prop="name">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item label="应用名称" prop="title">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item label="应用对接人">
        <el-input v-model="postForm.manager" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSysInfo('sysInfoForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sysInfoCreate, sysInfoUpdate, sysInfoFind } from '@/api/sysInfo'

export default {
  name: 'AppInfoDetail',
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
        title: '',
        appId: this.$route.params.appId,
        parentId: this.$route.params.parentId,
        manager: '',
        orderNo: 0,
        type: 1
      },
      rules: {
        name: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.postForm.appId) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      sysInfoFind(this.postForm.appId).then(res => {
        this.postForm.name = res.data.name
        this.postForm.manager = res.data.manager
        this.postForm.title = res.data.title
      })
    },
    updateSysInfo(sysInfoForm) {
      this.$refs[sysInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.postForm.appId) {
            sysInfoUpdate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('保存成功!')
              this.$router.push({ path: '/sysInfo/appInfoList/' + this.postForm.parentId })
            }).catch(e => {
              this.loading = false
            })
          } else {
            sysInfoCreate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('创建成功!')
              this.$router.push({ path: '/sysInfo/appInfoList/' + this.postForm.parentId })
            }).catch(e => {
              this.loading = false
            })
          }
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/appInfoList/' + this.postForm.parentId })
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
