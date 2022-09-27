<template>
  <div class="photo-management-detail pt-20">
    <el-form label-width="100px" style="width: 400px">
      <el-form-item label="库名称：">
        <el-input size="medium"></el-input>
      </el-form-item>
      <el-form-item label="分类名称：">
        <el-input size="medium"></el-input>
      </el-form-item>
      <el-form-item label="资源id：">
        <el-input size="medium"></el-input>
      </el-form-item>
      <el-form-item label="资源图片：">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
        <el-button size="small" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PhotoManagementDetail extends Vue {
  private dialogImageUrl = ''

  private handleRemove(file: any, fileList: any) {
    console.log(file, fileList)
  }

  private handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url
  }

  private handleSave() {
    console.log('handleSave')
    this.goBack()
  }

  private goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.photo-management-detail {
}
</style>
