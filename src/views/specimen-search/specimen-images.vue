<template>
  <div class="specimen-images">
    <el-form class="search-form" inline>
      <el-form-item label="平台资源号">
        <el-input
          size="small"
          v-model="searchForm.platform_resource_number"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源中外文名">
        <el-input
          size="small"
          v-model="searchForm.resource_name"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input
          size="small"
          v-model="searchForm.specimen_type"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="small" @click="query">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="specimen-list mt-12">
      <image-show
        v-for="item in specimenImageLists"
        width="185"
        height="229"
        :title="item.resource_name"
        :sub-title="item.foreign_language_name"
        :src="item.url"
        :item="item"
        :preview-src-list="specimenImageLists.map(data => data.url)"
        @title-click="handleSourceNameClick"
        sub-background="#f5f5f5"
        class="mt-12"
        style="border: 1px solid #bdd2ed"
        :key="item.specimen_number"
      />
      <div
        style="width: 185px; height: 0px"
        v-for="item in specimenImageLists"
        :key="'div-' + item.specimen_number"
      ></div>
    </div>

    <pagination
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
      :current-page.sync="pageInfo.page"
      :page-size.sync="pageInfo.num"
      :page-count="pageInfo.all_page"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import Pagination from '@/components/pagination.vue'
import PaginationToQuery from '@/mixins/pagination-to-query'
import { ISpecimen, ISpecimenImage } from '@/models'
import { querySpecimenImageList } from '@/api/specimen'
@Component({
  components: { ImageShow, Pagination }
})
export default class SpecimenImages extends Mixins(PaginationToQuery) {
  private searchForm: any = {
    platform_resource_number: undefined,
    resource_name: undefined,
    specimen_type: undefined
  }

  private specimenImageLists: ISpecimenImage[] = []

  private mounted() {
    this.query()
  }

  private async query() {
    try {
      this.loading = true
      const params: any = {
        ...this.searchForm,
        page: this.pageInfo.page - 1,
        num: this.pageInfo.num
      }
      const { data, all_page } = await querySpecimenImageList(params)
      this.specimenImageLists = [...data]
      this.pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      this.loading = false
    }
  }

  private handleSourceNameClick({ specimen_number }: ISpecimen) {
    this.$router.push({
      path: '/specimen-search/union-search-detail',
      query: { specimen_number }
    })
  }
}
</script>

<style lang="scss">
.specimen-images {
  .search-form {
    padding: 15px 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .specimen-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
