<template>
  <div class="photo-management-detail pt-20">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 400px">
      <el-form-item label="资源图片：" prop="fileList">
        <el-upload
          :disabled="readonly"
          :class="{ hidePlus: uploading || (form.fileList && form.fileList.length >= 1) }"
          action=""
          accept="image/jpg,image/png"
          :auto-upload="false"
          :limit="1"
          list-type="picture-card"
          :file-list="form.fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片名称：" prop="image_name">
        <el-input disabled size="small" v-model="form.image_name"></el-input>
      </el-form-item>
      <!--      <el-form-item label="图片描述：" prop="description">-->
      <!--        <el-input-->
      <!--          :disabled="readonly"-->
      <!--          autosize-->
      <!--          size="small"-->
      <!--          type="textarea"-->
      <!--          v-model="form.description"-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="类别：" prop="gallery_id">
        <el-select size="small" v-model="form.gallery_id">
          <el-option
            v-for="item in category"
            :label="item.name"
            :key="item.gallery_id"
            :value="item.gallery_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="分类名称：" prop="category_name">-->
      <!--        <el-input :disabled="readonly" size="small" v-model="form.category_name"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="标本编号：" prop="specimen_djh">
        <el-input :disabled="readonly" size="small" v-model="form.specimen_djh"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button v-if="!readonly" type="primary" size="small" @click="handleSave">保存</el-button>
        <!--        <el-button size="small" @click="goBack">返回</el-button>-->
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { importImage, uploadGalleryImage } from '@/api/admin'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { readFile } from '@/utils/readfile'

@Component
export default class PhotoManagementDetail extends Vue {
  private form: any = {
    fileList: []
  }

  private readonly category = [
    { name: '矿物精品', gallery_id: '2' },
    { name: '岩石精品', gallery_id: '4' },
    { name: '矿石精品', gallery_id: '3' },
    { name: '化石精品', gallery_id: '1' }
  ]

  private dialogImageUrl = ''
  private dialogVisible = false
  private uploading = false

  private rules = {
    fileList: [{ required: true, message: '请上传图片', trigger: 'change' }],
    // category_name: [{ required: true, message: '请填写分类名称' }],
    gallery_id: [{ required: true, message: '请选择分类' }],
    specimen_djh: [{ required: true, message: '请填写标本编号' }]
    // description: [{ required: true, message: '请填写图片描述' }]
  }

  private get readonly() {
    return this.$route.query.type == 'view'
  }

  private mounted() {
    const {
      specimen_number: specimen_djh,
      // category_name,
      gallery_id,
      image_name,
      // description,
      image_url,
      type
    } = this.$route.query
    if (!type || type == 'add') return
    this.form = {
      specimen_djh,
      // category_name,
      gallery_id,
      image_name
      // description
    }
    this.form.fileList = [{ url: image_url }]
  }

  private handleChange(file: any, fileList: any) {
    const fileExt = file.name.replace(/.+\./, '')
    if (['jpg', 'png'].indexOf(fileExt.toLowerCase()) === -1) {
      this.$message.error('格式不符合要求，请上传.jpg、.png格式图片')
      fileList.splice(-1, 1)
      return
    }
    this.doImageUpload(file)
  }

  private doImageUpload(file: any) {
    this.uploading = true
    /** @param data: { data: "base64 data" }*/
    const callback = async (data: any) => {
      try {
        const { name, url } = await importImage({ name: file.name, ...data })
        this.form.fileList.push({ url })
        this.form.image_name = name
        ;(this.$refs.form as ElForm).validateField('fileList')
      } catch (e) {
        console.log(e, 'doImageUpload')
      } finally {
        this.uploading = false
      }
    }
    readFile(file.raw, callback)
  }

  private handleRemove(file: any, fileList: any) {
    this.form.fileList = fileList
    this.$delete(this.form, 'fileList')
    this.$set(this.form, 'fileList', fileList)
    this.form.image_name = ''
  }

  private handlePictureCardPreview(file: any) {
    this.dialogVisible = true
    this.dialogImageUrl = file.url
  }

  private handleSave() {
    ;(this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        try {
          const {
            // category_name,
            gallery_id,
            // description,
            image_name,
            specimen_djh
          } = this.form
          const { type, best_photo_gallery_id } = this.$route.query
          const params = {
            // category_name,
            // description,
            image_name,
            specimen_djh,
            gallery_id
          }
          const photo_gallery_id = type == 'edit' ? best_photo_gallery_id : ''
          await uploadGalleryImage(params, photo_gallery_id as string)
          this.$message.success('保存成功')
          this.goBack()
        } catch (e) {
          console.warn(e, 'login')
        }
      } else {
        return false
      }
    })
  }

  private goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.photo-management-detail {
  .hidePlus ::v-deep .el-upload--picture-card {
    display: none;
  }

  /*去除upload组件过渡效果*/
  ::v-deep .el-upload-list__item {
    transition: none !important;
  }
  ::v-deep .el-upload-list__item-thumbnail {
    /* 图片在方框内显示长边 */
    object-fit: scale-down !important;
  }
}
</style>
