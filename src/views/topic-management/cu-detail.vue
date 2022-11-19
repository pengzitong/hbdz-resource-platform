<template>
  <div class="topic-management-detail pt-20">
    <el-form ref="form" inline :model="form" :rules="rules" label-width="120px">
      <div>
        <el-form-item label="专题名称：" prop="title">
          <el-input
            :disabled="readonly"
            style="width: 520px"
            size="small"
            v-model="form.title"
          ></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="专题类别：" prop="topic_id">
          <el-select :disabled="readonly" size="small" v-model="form.topic_id">
            <el-option
              v-for="item in topicsList"
              :label="item.name"
              :key="item.topic_id"
              :value="item.topic_id"
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

      <div v-for="(item, index) in form.data" :key="index">
        <div v-if="item.type === topicType.TEXT">
          <el-form-item
            :label="`段落${index + 1} (文本)：`"
            :prop="`data.${index}.value`"
            :rules="{
              required: true,
              message: '请输入文本',
              trigger: ['blur', 'change']
            }"
          >
            <el-input
              :disabled="readonly"
              style="width: 520px"
              type="textarea"
              v-model="item.value"
            ></el-input>
          </el-form-item>
          <span
            style="display: inline-block; margin-top: 13px"
            v-if="form.data.length > 1 && !readonly"
            @click="handleDeleteItem(index)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </div>

        <!--        {{ form }}-->
        <div v-if="item.type === topicType.IMAGE">
          <el-form-item
            :label="`段落${index + 1} (图片)：`"
            :prop="`data.${index}.fileList`"
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

          <el-form-item label="图片描述：" prop="describe">
            <el-input
              style="width: 240px"
              :disabled="readonly"
              type="textarea"
              v-model="item.describe"
            ></el-input>
          </el-form-item>

          <span
            style="display: inline-block; margin-top: 13px"
            v-if="form.data.length > 1 && !readonly"
            @click="handleDeleteItem(index)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </div>

      <div v-if="!readonly">
        <el-form-item label=" ">
          <el-button size="mini" round @click="handleAddContent(topicType.TEXT)">
            新增文本
          </el-button>
          <el-button size="mini" round @click="handleAddContent(topicType.IMAGE)">
            新增图片
          </el-button>
        </el-form-item>
      </div>

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
import { Component, Vue } from 'vue-property-decorator'
import { queryTopicDetailForEdit, addTopic, editTopic, uploadTopicImages } from '@/api/admin'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { readFile } from '@/utils/readfile'
import { topicModel, topicType } from './model'
import { queryHomePageSource } from '@/api/home'

@Component
export default class TopicManagementCUDetail extends Vue {
  private topicType = topicType

  private form: topicModel = {
    fileList: [],
    data: [
      {
        type: topicType.TEXT,
        value: ''
      },
      {
        type: topicType.IMAGE,
        describe: '',
        fileList: []
      }
    ]
  }

  private topicsList = []

  private dialogImageUrl = ''
  private dialogVisible = false
  private uploading = false
  private itemUploading = false

  private rules = {
    title: [{ required: true, message: '请填写专题名称', trigger: 'change' }],
    fileList: [{ required: true, message: '请上传专题封面', trigger: 'blur' }],
    // category_name: [{ required: true, message: '请填写分类名称' }],
    gallery_id: [{ required: true, message: '请选择分类' }],
    specimen_djh: [{ required: true, message: '请填写标本编号' }]
    // describe: [{ required: true, message: '请填写图片描述' }]
  }

  private get readonly() {
    return this.$route.query.type == 'view'
  }

  private async mounted() {
    const { important_topics } = await queryHomePageSource()
    this.topicsList = important_topics

    const { type } = this.$route.query
    if (!type || type == 'add') return
    const { articles_id } = this.$route.query
    const res: topicModel = await queryTopicDetailForEdit(articles_id as string)
    this.form = { ...res }
    this.form.fileList = [
      { url: this.handleUrl(this.form.cover_url || ''), name: this.form.cover_url || '' }
    ]
    this.form.data.forEach(item => {
      if (item.type === topicType.IMAGE) {
        item.fileList = [{ url: this.handleUrl(item.name || ''), name: item.name || '' }]
      }
    })
  }

  private handleUrl(url: string) {
    return process.env.VUE_APP_API_ENV == 'development'
      ? `http://tripod.wx-local.leqiai.cn/${url}`
      : `${window.location.hostname}/${url}`
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
        const { name, url } = await uploadTopicImages({ name: file.name, ...data })
        this.form.fileList.push({ name, url })
        this.form.cover_url = name
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
    this.form.cover_url = ''
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
        const { name, url } = await uploadTopicImages({ name: file.name, ...data })
        currentItemFileList.push({ name, url })
        // this.form.fileList.push({ url })
        // this.form.image_name = name
        console.log(name)
        ;(this.$refs.form as ElForm).validateField(`data.${currentItemIndex}.fileList`)
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
    this.form.data[currentItemIndex].fileList = []
    this.$delete(this.form.data[currentItemIndex], 'fileList')
    this.$set(this.form.data[currentItemIndex], 'fileList', [])
  }

  private handlePictureCardPreview(file: any) {
    this.dialogVisible = true
    this.dialogImageUrl = file.url
  }

  private handleSave() {
    ;(this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        try {
          const params = { ...this.form }
          params.cover_url = params.fileList[0].name // 封面
          params.data.forEach(item => {
            if (item.type === topicType.IMAGE) {
              item.name = (item.fileList && item.fileList[0].name) || ''
            }
          })
          const { type, articles_id } = this.$route.query
          if (type == 'edit') {
            await editTopic(params, articles_id as string)
          } else if (type == 'add') {
            await addTopic(params)
          }
          this.$message.warning('保存成功')
          this.goBack()
        } catch (e) {
          console.warn(e, 'handleSave')
        }
      } else {
        return false
      }
    })
  }

  private handleAddContent(type: string) {
    console.log(type)
    switch (type) {
      case topicType.TEXT:
        this.form.data.push({
          type,
          value: ''
        })
        break
      case topicType.IMAGE:
        this.form.data.push({
          type,
          describe: '',
          fileList: []
        })
        break
      default:
        break
    }
  }

  private handleDeleteItem(index: number) {
    this.form.data.splice(index, 1)
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
