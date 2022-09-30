<template>
  <div class="union-search-list">
    <el-form class="search-form" inline>
      <el-form-item label="资源中外文名">
        <el-input
          v-model="searchForm.resource_name"
          size="small"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="保存单位">
        <el-input
          v-model="searchForm.save_unit"
          size="small"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="searchForm.origin" size="small" @keyup.enter.native="query"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input
          v-model="searchForm.specimen_type"
          size="small"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="small" @click="query">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      class="mt-12"
      border
      :data="specimenLists"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="platform_resource_number" label="平台资源号"></el-table-column>
      <el-table-column prop="resource_name" label="资源名称" width="200">
        <template slot-scope="scope">
          <el-link
            type="primary"
            style="font-weight: 400"
            @click="handleSourceNameClick(scope.row)"
          >
            {{ scope.row.resource_name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="foreign_language_name" label="资源外文名" />
      <el-table-column prop="complete_origin" label="产地" width="300" />
      <el-table-column prop="collation_name" label="资源归类" />
      <el-table-column prop="stock_location" label="库存位置号" />
      <el-table-column prop="specimen_number" label="标本编号" />
    </el-table>

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
import Pagination from '@/components/pagination.vue'
import { querySpecimenList } from '@/api/specimen'
import { ISpecimen } from '@/models'
import PaginationToQuery from '@/mixins/pagination-to-query'

@Component({
  components: {
    Pagination
  }
})
export default class UnionSearchList extends Mixins(PaginationToQuery) {
  private searchForm = {
    resource_name: undefined,
    resource_cn_name: undefined,
    save_unit: undefined,
    origin: undefined,
    specimen_type: undefined
  }

  private specimenLists: ISpecimen[] = []

  private mounted() {
    const { resource_cn_name, resource_en_name, save_unit, origin }: any =
      this.$store.state.cacheQuery
    resource_en_name && (this.searchForm.resource_name = resource_en_name)
    resource_cn_name && (this.searchForm.resource_name = resource_cn_name)
    save_unit && (this.searchForm.save_unit = save_unit)
    origin && (this.searchForm.origin = origin)
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
      const { resource_cn_name, resource_en_name }: any = this.$store.state.cacheQuery
      // 仅使用一次即清空store，否则用户在手动修改查询条件下此处判断会有冲突
      this.$store.commit('setCacheQuery', {})

      if (resource_cn_name || resource_en_name) {
        // 如果外部携带了字段过来，优先按外层的条件查
        params.resource_name = undefined
        params.resource_cn_name = resource_cn_name
        params.resource_en_name = resource_en_name
      }

      const { data, all_page } = await querySpecimenList(params)

      this.specimenLists = [...data]
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

<style lang="scss" scoped>
@import '~@/assets/scss/table.scss';
.union-search-list {
  .search-form {
    padding: 15px 10px;
    background-color: #f5f5f5;
    border-radius: 4px;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
