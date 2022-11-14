<template>
  <div class="specimen-list">
    <div class="left-wrapper">
      <div class="left-wrapper__title">
        <el-link type="primary">目录导航</el-link>
      </div>
      <div class="left-wrapper__content">
        <ant-tree
          v-if="treeData.length"
          :treeData="treeData"
          :selected-keys.sync="selectedKeys"
          @change="handleSelectedKeysChange"
        />
        <!--        <DemoTree />-->
      </div>
    </div>
    <div class="right-wrapper">
      <el-form class="search-form" inline>
        <el-form-item label="资源中外文名">
          <el-input
            v-model="searchForm.resource_name"
            size="small"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存位置">
          <el-select
            clearable
            placeholder="--请选择--"
            size="small"
            @change="query"
            v-model="searchForm.save_unit"
          >
            <el-option
              v-for="(item, index) in save_unit_list"
              :label="item"
              :value="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地">
          <el-input
            v-model="searchForm.origin"
            size="small"
            style="width: 120px"
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
        <el-table-column
          prop="platform_resource_number"
          show-overflow-tooltip
          label="平台资源号"
          width="100"
        ></el-table-column>
        <el-table-column prop="resource_name" show-overflow-tooltip label="资源名称">
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
        <el-table-column prop="foreign_language_name" show-overflow-tooltip label="资源外文名" />
        <el-table-column prop="complete_origin" show-overflow-tooltip label="产地" width="200" />
        <el-table-column prop="collation_name" show-overflow-tooltip label="资源归类" width="80" />
        <el-table-column
          prop="stock_location"
          show-overflow-tooltip
          label="库存位置号"
          width="100"
        />
        <el-table-column prop="specimen_number" show-overflow-tooltip label="标本编号" width="80" />
      </el-table>

      <pagination
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
        :current-page.sync="pageInfo.page"
        :page-size.sync="pageInfo.num"
        :page-count="pageInfo.all_page"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import AntTree from '@/components/ant-tree.vue'
// import DemoTree from '@/components/demo-tree.vue'
import Pagination from '@/components/pagination.vue'
import { querySpecimenClassification, querySpecimenList } from '@/api/specimen'
import { ISpecimen } from '@/models'
import PaginationToQuery from '@/mixins/pagination-to-query'
import QuerySelectLists from '@/mixins/querySelectLists'
@Component({
  components: {
    AntTree,
    // DemoTree,
    Pagination
  }
})
export default class SpecimenList extends Mixins<any>(PaginationToQuery, QuerySelectLists) {
  private selectedKeys: string[] = []

  private searchForm: any = {
    resource_name: undefined,
    save_unit: undefined,
    origin: undefined,
    specimen_type: undefined
  }

  private treeData = []

  private specimenLists: ISpecimen[] = []

  @Watch('$route')
  private routeChange() {
    this.init() // 分页各种信息也要重置才行
    // location.reload() // 粗暴方式
  }

  private mounted() {
    this.init()
  }

  private init() {
    this.resetFields()
    const { specimen_type }: any = this.$route.query
    this.searchForm.specimen_type = specimen_type
    this.querySpecimenClassification()
    this.query()
  }

  private resetFields() {
    this.searchForm = {}
    this.selectedKeys = []
    this.treeData = []
    ;(this as any).pageInfo.page = 1
  }

  private async querySpecimenClassification() {
    try {
      const { specimen_type = '矿物' }: any = this.$route.query
      const { data } = await querySpecimenClassification()
      this.treeData = data.filter((item: { name: string }) => item.name === specimen_type)
    } catch (e) {
      console.warn(e, 'querySpecimenClassification')
    }
  }

  private async query() {
    try {
      ;(this as any).loading = true
      const params: any = {
        ...this.searchForm,
        page: (this as any).pageInfo.page - 1,
        num: (this as any).pageInfo.num,
        class_no: (this as any).selectedKeys[0]
      }

      const { data, all_page } = await querySpecimenList(params)

      this.specimenLists = [...data]
      ;(this as any).pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      ;(this as any).loading = false
    }
  }

  private handleSelectedKeysChange(selectedKeys: string[]) {
    this.selectedKeys = selectedKeys
    ;(this as any).pageInfo.page = 1
    this.query()
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

.specimen-list {
  display: flex;
  min-height: 800px;
  .left-wrapper {
    width: 300px;
    min-height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    &__title {
      padding: 8px 15px;
      white-space: nowrap;
      border-radius: 3px 3px 0 0;
      background-color: #fbfbfb;
      background-image: -webkit-linear-gradient(top, #fff, #f5f5f5);
    }
    &__content {
      padding: 15px 10px;
    }
  }
  .right-wrapper {
    flex: 1;
    margin-left: 10px;
    .search-form {
      padding: 15px 10px;
      background-color: #f5f5f5;
      border-radius: 4px;

      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>
