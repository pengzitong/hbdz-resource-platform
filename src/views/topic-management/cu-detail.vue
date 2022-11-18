<template>
  <div class="topic-management-detail pt-20">
    <el-form ref="form" inline :model="form" :rules="rules" label-width="120px">
      <div>
        <el-form-item label="专题名称：" prop="topic_name">
          <el-input style="width: 520px" size="small" v-model="form.topic_name"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="专题类别：" prop="gallery_id">
          <el-select size="small" v-model="form.gallery_id">
            <el-option
              v-for="item in category"
              :label="item.name"
              :key="item.gallery_id"
              :value="item.gallery_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="专题封面：" prop="fileList">
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
      </div>

      <div v-for="(item, index) in form.contentList" :key="index">
        <div v-if="item.type === contentTypeEnum.TEXT">
          <el-form-item
            :label="`段落${index + 1} (文本)：`"
            :prop="`contentList.${index}.text`"
            :rules="{
              required: true,
              message: '请输入文本',
              trigger: ['blur', 'change']
            }"
          >
            <el-input style="width: 520px" type="textarea" v-model="item.text"></el-input>
          </el-form-item>
        </div>

        <div v-if="item.type === contentTypeEnum.IMAGE">
          <el-form-item
            :label="`段落${index + 1} (图片)：`"
            :prop="`contentList.${index}.fileList`"
            :rules="{
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change']
            }"
          >
            <!--            {{ uploading }}{{ item.fileList }}-->
            <el-upload
              :disabled="readonly"
              :class="{
                hidePlus: itemUploading || (item.fileList && item.fileList.length >= 1)
              }"
              action=""
              accept="image/jpg,image/png"
              :auto-upload="false"
              :limit="1"
              list-type="picture-card"
              :file-list="item.fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="(file, fileList) => handleRemoveForContent(file, fileList, index)"
              :on-change="
                (file, fileList) => handleChangeForContent(file, fileList, item.fileList, index)
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="图片描述：" prop="category_name">
            <el-input
              style="width: 240px"
              :disabled="readonly"
              type="textarea"
              v-model="item.description"
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <div>
        <el-form-item label=" ">
          <el-button size="mini" round @click="handleAddContent(contentTypeEnum.TEXT)">
            新增文本
          </el-button>
          <el-button size="mini" round @click="handleAddContent(contentTypeEnum.IMAGE)">
            新增图片
          </el-button>
        </el-form-item>
      </div>
      {{ form }}

      <div style="border-top: 1px dashed #ccc; padding-top: 20px">
        <el-form-item label=" ">
          <el-button v-if="!readonly" type="primary" size="small" @click="handleSave">
            保存
          </el-button>
          <el-button size="small" @click="goBack">返回</el-button>
        </el-form-item>
      </div>
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
export default class TopicManagementCUDetail extends Vue {
  private contentTypeEnum = {
    TEXT: 'text',
    IMAGE: 'image'
  }

  private form: any = {
    fileList: [],
    contentList: [
      {
        type: 'text',
        text: ''
      },
      {
        type: 'image',
        description: '描述',
        fileList: [
          // {
          //   url: 'https://tripod.wx-local.leqiai.cn//upload/important_topics/banners/矿物晶体专题封面图.JPG'
          // }
        ]
      }
    ]
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
  private itemUploading = false

  private rules = {
    topic_name: [{ required: true, message: '请填写专题名称', trigger: 'change' }],
    fileList: [{ required: true, message: '请上传专题封面', trigger: 'blur' }],
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

  /** 段落图片上传 */
  private handleChangeForContent(
    file: any,
    fileList: any,
    currentItemFileList: any,
    currentItemIndex: number
  ) {
    const fileExt = file.name.replace(/.+\./, '')
    if (['jpg', 'png'].indexOf(fileExt.toLowerCase()) === -1) {
      this.$message.error('格式不符合要求，请上传.jpg、.png格式图片')
      fileList.splice(-1, 1)
      return
    }
    this.doImageUploadForContent(file, currentItemFileList, currentItemIndex)
  }

  /** 段落图片上传 */
  private doImageUploadForContent(file: any, currentItemFileList: any, currentItemIndex: number) {
    this.itemUploading = true
    /** @param data: { data: "base64 data" }*/
    const callback = async (data: any) => {
      try {
        const { name, url } = await importImage({ name: file.name, ...data })
        currentItemFileList.push({ url })
        // this.form.fileList.push({ url })
        // this.form.image_name = name
        console.log(name)
        ;(this.$refs.form as ElForm).validateField(`contentList.${currentItemIndex}.fileList`)
      } catch (e) {
        console.log(e, 'doImageUploadForContent')
      } finally {
        this.itemUploading = false
      }
    }
    readFile(file.raw, callback)
  }

  /** 段落图片删除 */
  private handleRemoveForContent(file: any, fileList: any, currentItemIndex: any) {
    this.form.contentList[currentItemIndex].fileList = []
  }

  private handlePictureCardPreview(file: any) {
    this.dialogVisible = true
    this.dialogImageUrl = file.url
  }

  private handleSave() {
    console.log('handleSave')
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
          this.$message.warning('保存成功')
          this.goBack()
        } catch (e) {
          console.warn(e, 'login')
        }
      } else {
        return false
      }
    })
  }

  private handleAddContent(type: string) {
    console.log(type)
    switch (type) {
      case this.contentTypeEnum.TEXT:
        this.form.contentList.push({
          type,
          text: ''
        })
        break
      case this.contentTypeEnum.IMAGE:
        this.form.contentList.push({
          type,
          description: '描述',
          fileList: [
            {
              url: 'https://tripod.wx-local.leqiai.cn//upload/important_topics/banners/矿物晶体专题封面图.JPG'
            }
          ]
        })
        break
      default:
        break
    }
  }

  private goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.topic-management-detail {
  .hidePlus ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
