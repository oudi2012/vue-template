<template>
  <div class="app-container">
    <el-form ref="sysInfoForm" class="form-inline" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="文件类型" prop="name">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item label="类型名称" prop="title">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item label="是否使用">
        <el-select v-model="postForm.used" value-key="used" size="mini">
          <el-option v-for="item in file_type" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSysInfo('sysInfoForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fileTypeFind, fileTypeUpdate } from '@/api/sysInfo'

const file_type = [
  { key: 0, value: '否' },
  { key: 1, value: '是' }
]

export default {
  name: 'FileTypeDetail',
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
      file_type: file_type,
      postForm: {
        name: '',
        title: '',
        id: this.$route.params.id,
        used: 0
      },
      rules: {
        name: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    findItem() {
      fileTypeFind(this.postForm.id).then(res => {
        this.postForm.name = res.data.name
        this.postForm.title = res.data.title
        this.postForm.used = res.data.used
      })
    },
    updateSysInfo(sysInfoForm) {
      this.$refs[sysInfoForm].validate((valid) => {
        if (valid) {
          this.loading = true
          fileTypeUpdate(this.postForm).then(() => {
            this.loading = false
            this.$message.success('保存成功!')
            this.$router.push({ path: '/sysInfo/fileTypeList' })
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/fileTypeList' })
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
