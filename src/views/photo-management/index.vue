<template>
  <div class="photo-management-container">
    <div class="search-form">
      <el-form inline label-width="120px">
        <el-form-item label="图片标题：">
          <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <el-input v-model="query.savePosition" size="small" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="button-group" style="text-align: right; margin: 0 20px 20px 0">
      <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
    </div>

    <div class="button-group">
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
        新增图片
      </el-button>
    </div>

    <div class="table-wrapper">
      <el-table class="mt-12" border :data="tableData" stripe>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
          <template slot-scope="scope">
            <el-link type="primary" style="font-weight: 400">
              {{ scope.row.name2 }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="name" label="图片" width="180">
          <template>
            <el-image
              :preview-src-list="[require('@/assets/images/logo.jpg')]"
              :src="require('@/assets/images/logo.jpg')"
              style="width: 80px; height: 80px"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Pagination from '@/components/pagination.vue'

@Component({ components: { Pagination } })
export default class PhotoManagement extends Vue {
  private query = {
    sourceName: '',
    savePosition: ''
  }

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

  private handleQuery() {
    console.log(this.query, 'query')
  }

  private handleReset() {
    console.log('reset')
  }

  private handleAdd() {
    this.$router.push('/photo-management/add')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/table.scss';
.photo-management-container {
  .search-form {
    padding: 10px 0;
  }
  .table-wrapper {
    ::v-deep .el-table {
      .el-table__header-wrapper,
      .el-table__body-wrapper {
        th {
          padding: 10px 0;
        }
        td {
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
