<template>
  <div class="publish-message">
    <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules" class="rule-form" label-width="100px">
      <el-form-item label="主题" prop="title">
        <el-input v-model="ruleForm.title" size="small"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="内容" prop="content">
        <el-input style="width: 800px" :rows="6" type="textarea" v-model="ruleForm.content" size="small"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="您的称呼" prop="nickName">
        <el-input v-model="ruleForm.nickName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="您的邮箱">
        <el-input v-model="ruleForm.email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code" size="small"></el-input>
      </el-form-item>
      <br />
      <el-form-item label=" ">
        <el-button type="primary" @click="handleSubmit" size="small">提交留言</el-button>
        <el-button type="default" @click="handleClear" size="small">清空留言</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

interface IRuleForm {
  title?: string
  content?: ''
  nickName?: string
  email?: string
  code?: string
}

@Component
export default class PublishMessage extends Vue {
  @Ref('ruleForm') readonly ruleFormRef!: HTMLFormElement

  private ruleForm: IRuleForm = {}

  private rules: any = {
    title: [{ required: true, message: '请填写标题' }],
    content: [{ required: true, message: '请填写内容' }],
    nickName: [{ required: true, message: '请填写您的称呼' }],
    code: [{ required: true, message: '请填写验证码' }]
  }

  private handleSubmit() {
    this.ruleFormRef.validate((valid: boolean) => {
      if (valid) {
        alert('submit!')
      } else {
        return false
      }
    })
  }

  private handleClear() {
    this.ruleFormRef.resetFields()
  }
}
</script>

<style lang="scss" scoped>
.publish-message {
  font-size: 14px;
  color: #333;
  background: rgba(19, 123, 199, 0.25);
  padding: 5px;
}
</style>
