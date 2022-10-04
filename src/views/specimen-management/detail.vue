<template>
  <div class="specimen-detail">
    <table class="specimen-detail-table mb-10">
      <!--护照信息-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">护照信息</span>
        </td>
      </tr>
      <tr
        v-for="(item, index) in data_fields_passport_information"
        :key="'data_fields_passport_information' + index"
      >
        <td v-if="item.left" :colspan="item.left.colspan">
          <span>{{ item.left.label }}：{{ passport_information[item.left.field] }}</span>
        </td>
        <td v-if="item.right">
          <span>{{ item.right.label }}：{{ passport_information[item.right.field] }}</span>
        </td>
      </tr>
      <!--标记信息-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">标记信息</span>
        </td>
      </tr>
      <tr
        v-for="(item, index) in data_fields_tag_information"
        :key="'data_fields_tag_information' + index"
      >
        <td v-if="item.left" :colspan="item.left.colspan">
          <span>
            {{ item.left.label }}：
            <span style="color: red" v-if="item.left.optional">（可选项）</span>
            {{ tag_information[item.left.field] }}
          </span>
        </td>
        <td v-if="item.right">
          <span>
            {{ item.right.label }}：
            <span style="color: red" v-if="item.right.optional">（可选项）</span>

            {{ tag_information[item.right.field] }}
          </span>
        </td>
      </tr>
      <!--基本特征特性描述信息-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">基本特征特性描述信息</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 0">
          <div>
            <table style="width: 100%">
              <tr>
                <td style="width: 10%; border: none">简要特征描述：</td>
                <td style="width: 90%; border-top: none">
                  {{ basic_features.feature_description }}
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr
        v-for="(item, index) in data_fields_basic_features"
        :key="'data_fields_basic_features' + index"
      >
        <td v-if="item.left" :colspan="item.left.colspan">
          <span>
            {{ item.left.label }}：
            <span style="color: red" v-if="item.left.optional">（可选项）</span>
            {{ basic_features[item.left.field] }}
          </span>
        </td>
        <td v-if="item.right">
          <span>
            {{ item.right.label }}：
            <span style="color: red" v-if="item.right.optional">（可选项）</span>

            {{ basic_features[item.right.field] }}
          </span>
        </td>
      </tr>
      <!--其他描述信息-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">其他描述信息</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 0">
          <div>
            <table style="width: 100%">
              <tr>
                <td style="width: 10%; border: none">图片资料：</td>
                <td style="width: 90%; border-top: none">
                  <el-image
                    :preview-src-list="supplementary_descriptive_information.image_urls"
                    style="width: 100px; height: 60px"
                    fit="cover"
                    :src="
                      supplementary_descriptive_information.image_urls &&
                      supplementary_descriptive_information.image_urls[0]
                    "
                  ></el-image>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">地址记录：{{ location_url }}</td>
      </tr>
      <!--收藏单位信息-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">收藏单位信息</span>
        </td>
      </tr>
      <tr
        v-for="(item, index) in data_fields_collection_unit"
        :key="'data_fields_collection_unit' + index"
      >
        <td v-if="item.left" :colspan="item.left.colspan">
          <span>{{ item.left.label }}：{{ collection_unit[item.left.field] }}</span>
        </td>
        <td v-if="item.right">
          <span>{{ item.right.label }}：{{ collection_unit[item.right.field] }}</span>
        </td>
      </tr>
      <!--共享方式-->
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">共享方式</span>
        </td>
      </tr>
      <tr
        v-for="(item, index) in data_fields_how_to_share"
        :key="'data_fields_how_to_share' + index"
      >
        <td v-if="item.left" :colspan="item.left.colspan">
          <span>{{ item.left.label }}：{{ how_to_share[item.left.field] }}</span>
        </td>
        <td v-if="item.right">
          <span>{{ item.right.label }}：{{ how_to_share[item.right.field] }}</span>
        </td>
      </tr>
    </table>

    <div class="print-wrapper">
      <el-button size="small" @click="$router.back()" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { querySpecimenDetail } from '@/api/specimen'
@Component
export default class SpecimenDetail extends Vue {
  private form: any = {}

  /** 护照信息 */
  get passport_information() {
    return this.form.passport_information || {}
  }
  /** 标记信息（类型与特征信息） */
  get tag_information() {
    return this.form.tag_information || {}
  }
  /** 基本特征特性描述信息 */
  get basic_features() {
    return this.form.basic_features || {}
  }
  /** 其他描述信息 */
  get supplementary_descriptive_information() {
    return this.form.supplementary_descriptive_information || {}
  }
  /** 收藏单位信息 */
  get collection_unit() {
    return this.form.collection_unit || {}
  }
  /** 共享方式 */
  get how_to_share() {
    return this.form.how_to_share || {}
  }

  get location_url() {
    return location.href
  }

  private data_fields_passport_information = [
    {
      left: { field: 'platform_resource_number', label: '平台资源号' },
      right: { field: 'resource_number', label: '资源编号' }
    },
    {
      left: { field: 'resource_name', label: '资源名称' },
      right: { field: 'foreign_language_name', label: '资源外文名称' }
    },
    {
      left: { field: 'origin', label: '产地' },
      right: { field: 'province', label: '省' }
    },
    {
      left: { field: 'country', label: '国家', colspan: 2 }
    }
  ]
  private data_fields_tag_information = [
    {
      left: { field: 'collation_code', label: '资源归类编码' },
      right: { field: 'main_use', label: '主要用途' }
    },
    {
      left: { field: 'formative_era', label: '资源形成时代', optional: true },
      right: { field: 'geological_occurrence', label: '地质产状或层位', optional: true }
    }
  ]
  private data_fields_basic_features = [
    {
      left: { field: 'specific_purpose', label: '具体用途', colspan: 2 }
    },
    {
      left: { field: 'provider', label: '资源提供者' },
      right: { field: 'provide_time', label: '资源提供时间' }
    },
    {
      left: { field: 'longitude', label: '经度', optional: true },
      right: { field: 'dimension', label: '纬度', optional: true }
    },
    {
      left: { field: 'elevation', label: '高程', colspan: 2, optional: true }
    }
  ]
  private data_fields_collection_unit = [
    {
      left: { field: 'save_unit', label: '保存单位', colspan: 2 }
    },
    {
      left: { field: 'specimen_number', label: '标本编号' },
      right: { field: 'stock_location', label: '库存位置号' }
    },
    {
      left: { field: 'collection_number', label: '采集号', optional: true },
      right: { field: 'save_num', label: '保存资源数量' }
    },
    {
      left: { field: 'save_resourcetype', label: '保存资源类型', colspan: 2 }
    }
  ]
  private data_fields_how_to_share = [
    {
      left: { field: 'how_to_share', label: '共享方式', colspan: 2 }
    },
    {
      left: { field: 'resource_status', label: '资源状态' },
      right: { field: 'obtain_channel', label: '获取途径' }
    },
    {
      left: { field: 'contact_information', label: '联系方式', colspan: 2 }
    },
    {
      left: { field: 'update_time', label: '数据最后更新时间', colspan: 2 }
    }
  ]

  private mounted() {
    this.queryDetail()
  }

  private async queryDetail() {
    try {
      const { specimen_number } = this.$route.query
      const { data } = await querySpecimenDetail(specimen_number as string)
      this.form = { ...data }
    } catch (e) {
      console.warn(e, 'queryDetail')
    }
  }

  private handlePrint() {
    window.print()
  }
}
</script>

<style lang="scss" scoped>
.specimen-detail {
  .specimen-detail-table {
    width: 100%;
    border-collapse: separate;
    border-right: 1px solid #e9ebef;
    border-bottom: 1px solid #e9ebef;
    border-radius: 4px;
    font-size: 13px;
    line-height: 20px;

    tr {
      text-align: left;
      &:nth-child(odd) {
        background: #f9f9f9;
      }
      td {
        padding: 8px 5px;
        width: 50%;
        border-left: 1px solid #e9ebef;
        border-top: 1px solid #e9ebef;
        transform: scale(1);
        .section-title {
          font-size: 18px;
          color: var(--primary-color);
        }
      }
      &:first-child {
        td:first-child {
          border-top-left-radius: 4px;
        }
        td:last-child {
          border-top-right-radius: 4px;
        }
      }
      &:last-child {
        td:first-child {
          border-bottom-left-radius: 4px;
        }
        td:last-child {
          border-bottom-right-radius: 4px;
        }
      }
    }
  }

  .print-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
