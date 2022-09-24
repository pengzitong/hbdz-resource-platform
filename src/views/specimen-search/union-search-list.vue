<template>
  <div class="union-search-list">
    <el-form class="search-form" inline>
      <el-form-item label="资源中外文名">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="保存单位">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table class="mt-12" border :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="资源名称" width="180">
        <template slot-scope="scope">
          <el-link type="primary" style="font-weight: 400" @click="handleSourceNameClick">
            {{ scope.row.name2 }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <pagination />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Pagination from '@/components/pagination.vue'
@Component({
  components: {
    Pagination
  }
})
export default class UnionSearchList extends Vue {
  private tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      name2: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      name2: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      name2: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name2: '王小虎',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ]

  private handleSourceNameClick() {
    this.$router.push('/specimen-search/union-search-detail')
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
