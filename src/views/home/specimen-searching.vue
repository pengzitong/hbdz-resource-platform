<template>
  <section-container class="home-specimen-searching" title="标签检索">
    <div class="search-form-wrapper border">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="标本查询">
          <el-input
            v-model="searchForm.searchKeyword"
            placeholder="请输入查询关键词"
          ></el-input>
          <el-radio-group v-model="searchForm.searchCondition">
            <el-radio
              v-for="({ label, value }, index) in conditionList"
              :label="value"
              :key="index"
              >{{ label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUnionSearch"
            >综合查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="search-form-wrapper border mt-20">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="标本查询">
          <el-input
            v-model="searchForm.searchKeyword"
            placeholder="请输入查询关键词"
          ></el-input>
          <el-radio-group v-model="searchForm.searchCondition">
            <el-radio
              v-for="({ label, value }, index) in conditionList"
              :label="value"
              :key="index"
              >{{ label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUnionSearch"
            >综合查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'

interface ISearchForm {
  searchKeyword: string | undefined;
  searchCondition: string | undefined;
}

@Component({
  components: { SectionContainer }
})
export default class SpecimenSearching extends Vue {
  private searchForm: ISearchForm = {
    searchKeyword: undefined,
    searchCondition: 'ch'
  };

  // Array<any> or any[]
  private readonly conditionList: any[] = [
    { label: '资源中文名', value: 'ch' },
    { label: '资源外文名', value: 'en' },
    { label: '产地', value: 'area' }
  ];

  private handleSearch() {
    console.log(this.searchForm, 'this.searchForm')
  }

  private handleUnionSearch() {
    console.log(this.searchForm, 'this.searchForm')
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
