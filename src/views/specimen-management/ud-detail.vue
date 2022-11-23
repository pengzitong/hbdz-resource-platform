<template>
  <div class="specimen-management-detail">
    <!--    {{ form }}-->
    <el-form ref="form" :model="form" :rules="rules" inline label-width="140px">
      <div>
        <el-form-item label="标本图片：" prop="fileList">
          <el-upload
            :disabled="readonly"
            :class="{ hidePlus: readonly }"
            action=""
            accept="image/jpg,image/png"
            :auto-upload="false"
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

      <el-form-item
        :rules="[
          {
            required: item.required !== false,
            message: item.type == 'enum' ? `请选择${item.label}` : `请填写${item.label}`,
            trigger: 'blur'
          }
        ]"
        :prop="item.key"
        v-for="item in fields"
        :key="item.key"
        :label="item.label"
      >
        <el-select
          clearable
          filterable
          :allow-create="item.allowCreate"
          v-if="item.type === 'enum'"
          :multiple="item.multiple"
          style="width: 250px"
          placeholder="--请选择--"
          size="small"
          v-model="form[item.key]"
          :disabled="item.disabled || readonly"
        >
          <el-option
            v-for="(item, index) in selects_options[item.key]"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
        <el-tooltip
          v-else
          v-model="item.canTooltip"
          :content="item.tooltip"
          :disabled="!item.tooltip"
          placement="right"
          manual
        >
          <el-input
            style="width: 250px"
            size="small"
            :disabled="item.disabled || readonly"
            v-model="form[item.key]"
            @focus="item.canTooltip = true"
            @blur="item.canTooltip = false"
            @input="value => handleInputChange(value, item.key)"
            @change="value => handleInputChange(value, item.key)"
          ></el-input>
        </el-tooltip>
      </el-form-item>

      <br />
      <el-form-item v-if="!readonly" label=" ">
        <el-button type="primary" @click="handleSave" size="small">保存</el-button>
        <!--        <el-button @click="handleBack" size="small">返回</el-button>-->
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { udSpecimen, querySpecimentDetailForEdit, importSpecimenImage } from '@/api/admin'
import { readFile } from '@/utils/readfile'
import { querySelectLists } from '@/api/specimen'

@Component
export default class Detail extends Vue {
  private fields = [
    { key: 'image_paths', label: '图片资料', disabled: true },
    { key: 'specimen_number', label: '标本编号' },
    { key: 'resource_class_name', label: '类别', type: 'enum' }, // enum
    { key: 'collection_number', label: '采集号', required: false },
    { key: 'resource_name', label: '资源名称' },
    { key: 'foreign_language_name', label: '资源外文名' },
    {
      key: 'save_resourcetype',
      label: '保存资源类型',
      // tooltip: '请输入以英文逗号隔开的内容，1:标本 2:薄片 3:光片 4:模型（模具） 5:其他'
      type: 'enum',
      multiple: true
    },
    {
      key: 'save_num',
      label: '保存资源数量',
      tooltip: '请输入以英文逗号隔开的数字，须与"保存资源类型"选项一一对应'
    },
    { key: 'resource_status', label: '实物状态', type: 'enum' }, // enum
    { key: 'stock_location', label: '库存位置号' },
    { key: 'feature_description', label: '简要特征描述' },
    { key: 'provider', label: '资源提供者' },
    { key: 'provide_time', label: '资源提供日期', tooltip: '填写格式为220927,或"不详"' },
    { key: 'geological_occurrence', label: '地质产状或层位', required: false },
    { key: 'formative_era', label: '资源形成时代' },
    { key: 'country', label: '国家' },
    { key: 'province', label: '产地（省）', type: 'enum', allowCreate: true },
    { key: 'origin', label: '产地（市、县等）' },
    { key: 'longitude', label: '经度', required: false },
    { key: 'dimension', label: '纬度', required: false },
    { key: 'elevation', label: '高程', required: false },
    { key: 'main_use', label: '主要用途', type: 'enum', multiple: true },
    { key: 'specific_purpose', label: '具体用途' },
    { key: 'resource_classification', label: '资源归类编码' },
    { key: 'how_to_share', label: '共享方式', type: 'enum', multiple: true }, // enum
    { key: 'obtain_channel', label: '获取途径', type: 'enum' }, // enum
    { key: 'save_unit', label: '保存单位', disabled: true },
    { key: 'contact_information', label: '联系方式' }
  ]

  private selects_options = {
    save_resourcetype: [
      { label: '标本', value: '1' },
      { label: '薄片', value: '2' },
      { label: '光片', value: '3' },
      { label: '模型（模具）', value: '4' },
      { label: '其他', value: '5' }
    ],
    resource_class_name: [
      { label: '岩石', value: '岩石' },
      { label: '矿物', value: '矿物' },
      { label: '矿石', value: '矿石' },
      { label: '化石', value: '化石' }
    ],
    resource_status: [
      { label: '完整', value: '完整' },
      { label: '受损', value: '受损' },
      { label: '严重受损', value: '严重受损' },
      { label: '无实物', value: '无实物' }
    ],
    how_to_share: [
      { label: '公益性共享', value: '1' },
      { label: '公益性借用共享', value: '2' },
      { label: '合作研究共享', value: '3' },
      { label: '知识产权性交易共享', value: '4' },
      { label: '资源纯交易性共享', value: '5' },
      { label: '资源租赁性共享', value: '6' },
      { label: '资源交换性共享', value: '7' },
      { label: '收藏地共享', value: '8' },
      { label: '行政许可性共享', value: '9' }
    ],
    obtain_channel: [
      { label: '邮寄', value: '1' },
      { label: '现场获取', value: '2' },
      { label: '网上订购', value: '3' },
      { label: '其他', value: '4' }
    ],
    main_use: [
      { label: '工业原料', value: '1' },
      { label: '药用', value: '2' },
      { label: '建材', value: '3' },
      { label: '科学研究', value: '4' },
      { label: '观赏', value: '5' },
      { label: '其他', value: '6' }
    ],
    province: []
  }

  private province_list = []

  private form: any = {
    fileList: [],
    image_paths: '',
    save_unit: '湖北地质博物馆'
  }

  private rules = {
    fileList: [{ required: true, message: '请上传标本图片', trigger: 'blur' }]
  }

  private dialogImageUrl = ''
  private dialogVisible = false
  private uploading = false

  private get readonly() {
    return this.$route.query.type == 'view'
  }

  private async mounted() {
    const { china_province } = await querySelectLists()

    this.province_list = china_province.map((item: string) => ({
      label: item,
      value: item
    }))

    const { type } = this.$route.query
    if (type == 'edit' || type == 'view') {
      await this.queryDetail()
      if (this.form.country.indexOf('中国') > -1) {
        this.selects_options.province = this.province_list
      }
    }
  }

  private async queryDetail() {
    try {
      const { specimen_number } = this.$route.query
      const { data } = await querySpecimentDetailForEdit(specimen_number as string)
      this.form = { ...data }
      // 枚举且多选 类型转换
      this.form.how_to_share = (this.form.how_to_share && this.form.how_to_share.split(',')) || []
      this.form.save_resourcetype =
        (this.form.save_resourcetype && this.form.save_resourcetype.split(',')) || []
      this.form.main_use = (this.form.main_use && this.form.main_use.split(',')) || []

      // 标本图片转换
      this.form.fileList = this.form.image_paths || []
      this.form.image_paths =
        (this.form.image_paths && this.form.image_paths.map((item: any) => item.name).join(',')) ||
        ''
    } catch (e) {
      console.warn(e, 'queryDetail')
    }
  }

  private handleInputChange(value: any, key: string) {
    if (key === 'country') {
      if (value.indexOf('中国') > -1) {
        this.selects_options.province = this.province_list
      } else {
        this.$set(this.form, 'province', '')
        this.selects_options.province = []
      }
    }
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
        const { name, url } = await importSpecimenImage({ name: file.name, ...data })
        this.form.fileList.push({ name, url })
        if (this.form.image_paths) {
          this.form.image_paths += `,${name}`
        } else {
          this.form.image_paths += `${name}`
        }
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
    // console.log(fileList)
    this.form.fileList = fileList
    this.$delete(this.form, 'fileList')
    this.$set(this.form, 'fileList', fileList)
    this.form.image_paths = fileList.map((item: { name: string }) => item.name).join(',')
  }

  private handlePictureCardPreview(file: any) {
    this.dialogVisible = true
    this.dialogImageUrl = file.url
  }

  private handleSave() {
    ;(this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        try {
          const params = {
            ...this.form,
            how_to_share: (this.form.how_to_share && this.form.how_to_share.join(',')) || '',
            save_resourcetype:
              (this.form.save_resourcetype && this.form.save_resourcetype.join(',')) || '',
            main_use: (this.form.main_use && this.form.main_use.join(',')) || ''
          }
          await udSpecimen(params)
          this.$message.success('保存成功')
          this.handleBack()
        } catch (e) {
          console.warn(e, 'handleSave')
        }
      } else {
        return false
      }
    })
  }
  private handleBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.specimen-management-detail {
  .hidePlus ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
