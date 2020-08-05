<template>
  <div class="app-container">
    <el-form ref="templateItemForm" class="form-inline" :model="postForm" :rules="rules" label-width="150px">
      <el-form-item style="margin-bottom: 40px;" label-width="70px" label="模板项:">
        <el-input v-model="postForm.content" type="textarea" class="article-textarea" placeholder="Please enter the content" />
        <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }} 字</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSysInfo('templateItemForm')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { templateItemCreateList } from '@/api/sysInfo'

export default {
  name: 'TemplateItemDetail',
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
        content: '',
        tplId: this.$route.params.tplId
      },
      rules: {
        content: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content.length
    }
  },
  methods: {
    createSysInfo(templateForm) {
      this.$refs[templateForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const templateItemForm = {
            templateItemList: []
          }
          const nameTitleList = this.postForm.content.split(',')
          let nameTitle = []
          for (const item in nameTitleList) {
            nameTitle = nameTitleList[item].split(':')
            const templateItem = {
              tplId: this.postForm.tplId,
              colName: nameTitle[0],
              colTitle: nameTitle[1],
              orderNo: 0
            }
            templateItemForm.templateItemList.push(templateItem)
          }
          templateItemCreateList(templateItemForm).then(() => {
            this.loading = false
            this.$message.success('创建成功!')
            this.$router.push({ path: '/sysInfo/templateItemList/' + this.postForm.tplId })
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/sysInfo/templateItemList/' + this.postForm.tplId })
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
