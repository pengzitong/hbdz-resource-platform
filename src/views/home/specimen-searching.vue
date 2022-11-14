<template>
  <section-container class="home-specimen-searching" title="标签检索">
    <div class="search-form-wrapper">
      <el-form :inline="true" :model="searchForm" class="search-form" label-width="100px">
        <el-form-item label="标本查询">
          <el-input
            style="width: 603px; display: block"
            v-model="searchForm.keyword"
            placeholder="请输入查询关键词"
          ></el-input>
          <el-radio-group v-model="searchForm.match_filed_key">
            <el-radio
              v-for="({ label, value }, index) in conditionList"
              :label="value"
              :key="index"
            >
              {{ label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUnionSearch">综合查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-form-wrapper mt-20">
      <el-form :inline="true" :model="photoSearchForm" class="search-form" label-width="100px">
        <el-form-item label="图片库查询">
          <el-input
            style="width: 603px; display: block"
            v-model="photoSearchForm.keyword"
            placeholder="请输入查询关键词"
          ></el-input>
          <el-radio-group v-model="photoSearchForm.match_filed_key">
            <el-radio
              v-for="({ label, value }, index) in photoGalleryConditionList"
              :label="value"
              :key="index"
            >
              {{ label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleImageSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section-container>
</template>

<script lang="ts">
import {
  Vue,
  Component
  // Prop, Watch
} from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'
// import { IPhoto } from '@/models'

interface ISearchForm {
  keyword: string | undefined
  match_filed_key: string | undefined
}

@Component({
  components: { SectionContainer }
})
export default class SpecimenSearching extends Vue {
  private searchForm: ISearchForm = {
    keyword: undefined,
    match_filed_key: 'resource_cn_name'
  }

  // Array<any> or any[]
  private readonly conditionList: any[] = [
    { label: '资源中文名', value: 'resource_cn_name' },
    { label: '资源外文名', value: 'resource_en_name' },
    { label: '库存位置', value: 'save_unit' },
    { label: '产地', value: 'origin' }
  ]

  private photoSearchForm: any = {
    keyword: '',
    match_filed_key: '矿物'
  }

  // @Prop({ default: () => [] }) readonly photoGalleryConditionList!: IPhoto[]

  // @Watch('photoGalleryConditionList')
  // private photoGalleryConditionListChange([first]: IPhoto[]) {
  //   this.photoSearchForm.match_filed_key = first.gallery_id
  //   console.log('photoGalleryConditionList')
  // }

  private readonly photoGalleryConditionList = [
    { label: '矿物精品', value: '矿物', gallery_id: '2' },
    { label: '岩石精品', value: '岩石', gallery_id: '4' },
    { label: '矿石精品', value: '矿石', gallery_id: '3' },
    { label: '化石精品', value: '化石', gallery_id: '1' }
  ]

  /** 标本查询 */
  private handleSearch() {
    const { keyword, match_filed_key } = this.searchForm
    if (!keyword) {
      this.$message.warning('请输入查询关键词')
      return
    }
    this.$store.commit('setCacheQuery', {
      [match_filed_key as string]: keyword // 传递给下一个页面使用
    })
    this.$router.push({
      path: '/specimen-search/union-search-list'
    })
  }

  /** 标本综合查询 */
  private handleUnionSearch() {
    this.$router.push('/specimen-search/union-search')
  }

  /** 图片库查询 */
  private handleImageSearch() {
    console.log(this.photoSearchForm.match_filed_key, 'this.photoSearchForm.match_filed_key')
    const [{ label: metaTitle, value: specimen_type, gallery_id }] =
      this.photoGalleryConditionList.filter(
        item => item.value == this.photoSearchForm.match_filed_key
      )
    // const path =
    //   this.photoSearchForm.match_filed_key == '矿物'
    //     ? '/photo-gallery/mineral-products'
    //     : `/photo-gallery/other-products`
    const path = '/photo-gallery/mineral-products'
    this.$router.push({
      path,
      query: {
        metaTitle,
        specimen_type,
        gallery_id,
        keyword: this.photoSearchForm.keyword
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.home-specimen-searching {
  .search-form-wrapper {
    padding: 10px 20px;
    .search-form {
      padding: 15px 0;
      ::v-deep .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>
