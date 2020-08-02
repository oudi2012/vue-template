<template>
  <div class="app-container">
    <el-form ref="sysInfoForm" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="系统名称" prop="name">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item label="系统负责人">
        <el-input v-model="postForm.manager" />
        <el-input v-model="postForm.parentId" type="hidden" />
        <el-input v-model="postForm.orderNo" type="hidden" />
        <el-input v-model="postForm.type" type="hidden" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('sysInfoForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { sysInfoCreate } from '@/api/sysInfo'

  export default {
    name: 'SysInfoDetail',
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
          parentId: 0,
          manager: '',
          orderNo: 0,
          type: 1
        },
        rules: {
          name: [{ validator: validateRequire }]
        }
      }
    },
    methods: {
      createSysInfo(sysInfoForm) {
        this.$refs[sysInfoForm].validate((valid) => {
          if (valid) {
            this.loading = true
            sysInfoCreate(this.postForm).then(() => {
              this.loading = false
            }).catch(() => {
              console.log('error !!')
              this.loading = false
            })
            this.$message('提交成功!')
            this.reload()
          }
        })
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
