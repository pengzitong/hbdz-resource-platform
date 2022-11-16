<template>
  <div class="specimen-management-detail">
    <!--    {{ form }}-->
    <el-form ref="form" :model="form" inline label-width="120px">
      <el-form-item
        :rules="[{ required: item.required !== false, message: '请输入' }]"
        :prop="item.key"
        v-for="item in fields"
        :key="item.key"
        :label="item.label"
      >
        <el-input size="small" v-model="form[item.key]"></el-input>
      </el-form-item>

      <br />
      <el-form-item label=" ">
        <el-button type="primary" @click="handleSave" size="small">保存</el-button>
        <el-button @click="handleBack" size="small">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { udSpecimen } from '@/api/admin'
import { querySpecimenDetail } from '@/api/specimen'

@Component
export default class Detail extends Vue {
  private fields = [
    { label: '标本编号', key: 'specimen_number' },
    // { label: '资源类名', key: 'resource_class_name' },// todo enum
    { label: '采集号', key: 'collection_number', required: false },
    { label: '资源名称', key: 'resource_name' },
    { label: '资源外文名', key: 'foreign_language_name' },
    { key: 'save_resourcetype', label: '保存资源类型' },
    { key: 'save_num', label: '保存资源数量' },
    // { key: 'resource_status', label: '实物状态' },// todo enum
    { key: 'stock_location', label: '库存编号' },
    { key: 'feature_description', label: '简要特征描述' },
    { key: 'provider', label: '资源提供者' },
    { key: 'provide_time', label: '资源提供日期' },
    { key: 'geological_occurrence', label: '地质产状或层位' },
    { key: 'formative_era', label: '资源形成时代' },
    { key: 'origin', label: '产地' },
    { key: 'province', label: '省' },
    { key: 'country', label: '国家' },
    { key: 'longitude', label: '经度', required: false },
    { key: 'dimension', label: '纬度', required: false },
    { key: 'elevation', label: '高程', required: false },
    { key: 'main_use', label: '主要用途' },
    { key: 'specific_purpose', label: '具体用途' },
    { key: 'image_paths', label: '图片资料' },
    { key: 'resource_classification', label: '资源归类编码' },
    { key: 'how_to_share', label: '共享方式' }, // todo enum
    { key: 'obtain_channel', label: '获取途径' }, // todo enum
    { key: 'save_unit', label: '保存单位' },
    { key: 'contact_information', label: '联系方式' }
  ]

  private form = {}

  private mounted() {
    this.queryDetail()
  }

  private async queryDetail() {
    try {
      const { specimen_number } = this.$route.query
      const {
        data: {
          basic_features,
          collection_unit,
          how_to_share,
          other,
          passport_information,
          supplementary_descriptive_information,
          tag_information
        }
      } = await querySpecimenDetail(specimen_number as string)
      this.form = {
        ...basic_features,
        ...collection_unit,
        ...how_to_share,
        ...other,
        ...passport_information,
        ...supplementary_descriptive_information,
        ...tag_information
      }
    } catch (e) {
      console.warn(e, 'queryDetail')
    }
  }

  private handleSave() {
    ;(this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        try {
          // todo save
          const params = {
            ...this.form
          }
          const res = await udSpecimen(params)
          console.log(res, 'res')
        } catch (e) {
          console.warn(e, 'login')
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

<style lang="scss" scoped></style>
