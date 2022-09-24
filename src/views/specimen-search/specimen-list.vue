<template>
  <div class="specimen-list">
    <div class="left-wrapper">
      <div class="left-wrapper__title">
        <el-link type="primary">目录导航</el-link>
      </div>
      <div class="left-wrapper__content">
        <ant-tree :treeData="treeData" />
        <!--        <DemoTree />-->
      </div>
    </div>
    <div class="right-wrapper">
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AntTree from '@/components/ant-tree.vue'
import DemoTree from '@/components/demo-tree.vue'
import Pagination from '@/components/pagination.vue'
@Component({
  components: {
    AntTree,
    DemoTree,
    Pagination
  }
})
export default class SpecimenList extends Vue {
  private treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          // disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0' },
            { title: 'leaf', key: '0-0-0-1' }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }]
        }
      ]
    }
  ]

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

.specimen-list {
  display: flex;
  .left-wrapper {
    width: 240px;
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
