<template>
  <div class="mineral-products">
    <static-slider :banners="banners" class="mb-40" />
    <el-form class="search-form" :inline="true" align="center" @submit.native.prevent>
      <el-form-item>
        <el-input
          class="search-input"
          v-model="search"
          size="medium"
          @keyup.enter.native="handleQuery"
          placeholder="请输入查询关键字（名称、颜色等）"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
      </el-form-item>
      <br />
      <el-form-item class="search-radio-wrapper">
        <div class="search-radio">
          <div
            class="search-radio-item border-primary"
            :class="item.category_name === activeCategory ? 'active' : ''"
            v-for="(item, index) in category_info"
            :key="index"
            @click="handleCategoryChange(item)"
          >
            {{ item.category_name }}（{{ item.num }}）
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div class="mineral-products-wrapper mb-30" v-loading="listLoading">
      <image-show
        v-for="(item, index) in pageData"
        :item="item"
        :title="item.resource_name"
        :sub-title="item.foreign_language_name"
        :src="item.image_url"
        :key="item.specimen_number + index"
        :preview-src-list="pageData.map(data => data.image_url)"
        class="mb-12"
        @title-click="handleTitleClick(item)"
      />
      <div style="width: 250px; height: 0" v-for="(item, index) in pageData" :key="index"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import StaticSlider from '@/components/static-slider.vue'
import ImageShow from '@/components/image-show.vue'
import LoadMore from '@/mixins/load-more'
import { queryPhotoGalleryList, queryPhotoGallerySummary } from '@/api/photo-gallery'
import { IMineralProduct } from '@/models'

@Component({
  components: { ImageShow, StaticSlider }
})
export default class MineralProducts extends Mixins<any>(LoadMore) {
  private search: string = ''

  private pageInfo = {
    page: 0,
    num: 20,
    all_page: 0
  }

  private pageData: IMineralProduct[] = []

  private finished: boolean = false

  private listLoading: boolean = false

  private requestId: number = 0

  private photoGallerySummary: any = {}

  private activeCategory: string = '全部'

  get banners() {
    return this.photoGallerySummary?.banners || []
  }

  get category_info() {
    return this.photoGallerySummary?.category_info || {}
  }

  @Watch('$route')
  private routeChange() {
    location.reload()
  }

  private mounted() {
    // 加载类别
    this.queryPhotoGallerySummary()
    this.init()

    window.onbeforeunload = () => {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    }
  }

  private init() {
    this.pageInfo.page = 0
    this.finished = false
    this.listLoading = false
    this.pageData = []
    this.search = this.$route.query.keyword as string
    // 加载list
    this.query()
  }

  private async queryPhotoGallerySummary() {
    try {
      const { gallery_id }: any = this.$route.query
      this.photoGallerySummary = await queryPhotoGallerySummary(gallery_id)
    } catch (e) {
      console.log(e, 'queryPhotoGallerySummary')
    }
  }

  private handleCategoryChange({ category_name }: any) {
    this.activeCategory = category_name

    window.scrollTo(0, 0)
    // do init
    this.init()
  }

  private handleQuery() {
    this.pageInfo.page = 0
    this.finished = false
    this.listLoading = false
    this.pageData = []
    this.query()
  }

  private async query(flag?: boolean) {
    if (this.finished) {
      return
    }
    const { gallery_id } = this.$route.query
    const params = {
      page: this.pageInfo.page,
      num: this.pageInfo.num,
      gallery_id,
      keyword: this.search,
      // specimen_type,
      category_name: this.activeCategory
    }

    this.listLoading = true
    const id = ++this.requestId
    const res: any = await queryPhotoGalleryList(params)
    if (id !== this.requestId) return
    if (flag) {
      // 下一页
      this.pageData = [...this.pageData, ...(res.data || [])]
    } else {
      // 初次加载
      this.pageData = res.data || []
    }
    this.finished = this.pageInfo.page >= res.all_page
    this.listLoading = false
  }

  private handleTitleClick({ specimen_number }: any) {
    this.$router.push(`/specimen-search/union-search-detail?specimen_number=${specimen_number}`)
  }
}
</script>

<style lang="scss" scoped>
.mineral-products {
  .search-form {
    .search-input {
      width: 450px;
    }
    .search-radio-wrapper {
      width: 100%;
      ::v-deep .el-form-item__content {
        width: 100%;
      }
      .search-radio {
        width: 100%;
        display: flex;
        &-item {
          flex: 1;
          color: #333;
          cursor: pointer;
          &.active {
            background-color: var(--primary-color);
            color: #ffffff;
          }
        }
      }
    }
  }
  .mineral-products-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
