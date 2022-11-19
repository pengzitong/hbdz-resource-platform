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
      <!--      <el-form-item label="保存单位">-->
      <!--        <el-select-->
      <!--          clearable-->
      <!--          placeholder="&#45;&#45;请选择&#45;&#45;"-->
      <!--          size="small"-->
      <!--          @change="query"-->
      <!--          v-model="searchForm.save_unit"-->
      <!--        >-->
      <!--          <el-option-->
      <!--            v-for="(item, index) in save_unit_list"-->
      <!--            :label="item"-->
      <!--            :value="item"-->
      <!--            :key="index"-->
      <!--          ></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="库存位置号">
        <el-input
          style="width: 150px"
          v-model="searchForm.stock_location"
          size="small"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input
          style="width: 150px"
          v-model="searchForm.origin"
          size="small"
          @keyup.enter.native="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select size="small" @change="query" v-model="searchForm.specimen_type">
          <el-option
            v-for="(item, index) in specimen_type_list"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
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
      <el-table-column prop="foreign_language_name" label="资源外文名">
        <template slot-scope="scope">
          <span class="language-name" v-html="scope.row.foreign_language_name"></span>
        </template>
      </el-table-column>
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
import QuerySelectLists from '@/mixins/querySelectLists'

@Component({
  components: {
    Pagination
  }
})
export default class UnionSearchList extends Mixins<any>(PaginationToQuery, QuerySelectLists) {
  private searchForm = {
    resource_name: undefined,
    resource_cn_name: undefined,
    save_unit: undefined,
    stock_location: undefined,
    origin: undefined,
    specimen_type: ''
  }

  private specimen_type_list = [
    { label: '--全部--', value: '' },
    { label: '矿物标本', value: '矿物' },
    { label: '岩石标本', value: '岩石' },
    { label: '矿石标本', value: '矿石' },
    { label: '化石标本', value: '化石' }
  ]

  private specimenLists: ISpecimen[] = []

  private mounted() {
    const { resource_cn_name, resource_en_name, save_unit, stock_location, origin }: any =
      this.$store.state.cacheQuery
    resource_en_name && (this.searchForm.resource_name = resource_en_name)
    resource_cn_name && (this.searchForm.resource_name = resource_cn_name)
    save_unit && (this.searchForm.save_unit = save_unit)
    stock_location && (this.searchForm.stock_location = stock_location)
    origin && (this.searchForm.origin = origin)
    this.query()
  }

  private async query() {
    try {
      ;(this as any).loading = true
      let params: any = {
        ...this.searchForm,
        page: (this as any).pageInfo.page - 1,
        num: (this as any).pageInfo.num
      }
      const { resource_cn_name, resource_en_name }: any = this.$store.state.cacheQuery

      if (resource_cn_name || resource_en_name) {
        // 如果外部携带了字段过来，优先按外层的条件查
        params.resource_name = ''
        params.resource_cn_name = resource_cn_name || ''
        params.resource_en_name = resource_en_name || ''
      }

      params = {
        ...this.$store.state.cacheQuery,
        ...params
      }

      // 仅使用一次即清空store，否则用户在手动修改查询条件下此处判断会有冲突
      this.$store.commit('setCacheQuery', {})

      const { data, all_page } = await querySpecimenList(params)

      this.specimenLists = [...data]
      ;(this as any).pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      ;(this as any).loading = false
    }
  }

  private handleSourceNameClick({ specimen_number }: ISpecimen) {
    // this.$router.push({
    //   path: '/specimen-search/union-search-detail',
    //   query: { specimen_number }
    // })
    const routeData = this.$router.resolve({
      path: '/specimen-search/union-search-detail',
      query: { specimen_number }
    })
    window.open(routeData.href, '_blank')
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
  .language-name {
    font-style: italic;
  }
}
</style>
