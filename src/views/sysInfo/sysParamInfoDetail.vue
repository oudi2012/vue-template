<template>
  <div class="app-container">
    <el-form ref="sysParamInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="参数编码">
        <el-input v-model="postForm.paramCode" />
      </el-form-item>
      <el-form-item label="参数名称">
        <el-input v-model="postForm.paramName" />
      </el-form-item>
      <el-form-item label="参数值">
        <el-input v-model="postForm.paramValue" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('sysParamInfoForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sysParamInfoCreate, sysParamInfoUpdate, sysParamInfoFindById } from '@/api/sysInfo'

export default {
  name: 'SysParamInfoDetail',
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
        paramId: this.$route.params.paramId,
        paramCode: '',
        paramName: '',
        paramValue: ''
      },
      rules: {
        paramCode: [{ validator: validateRequire }],
        paramName: [{ validator: validateRequire }],
        paramValue: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.postForm.paramId) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      sysParamInfoFindById(this.postForm.paramId).then(res => {
        this.postForm.paramCode = res.data.paramCode
        this.postForm.paramName = res.data.paramName
        this.postForm.paramValue = res.data.paramValue
      })
    },
    createSysInfo(sysParamInfoForm) {
      this.$refs[sysParamInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          if (!this.postForm.paramId) {
            sysParamInfoCreate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('创建成功!')
              this.$router.push({ path: '/sysInfo/sysParamInfoList' })
            }).catch(e => {
              this.loading = false
            })
          } else {
            sysParamInfoUpdate(this.postForm).then(() => {
              this.loading = false
              this.$message.success('修改成功!')
              this.$router.push({ path: '/sysInfo/sysParamInfoList' })
            }).catch(e => {
              this.loading = false
            })
          }
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/sysParamInfoList/' })
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
