<template>
  <div class="specimen-management-container">
    <div class="search-form">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="简单查询">
          <el-form inline label-width="120px">
            <el-form-item label="资源中文名称：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源外文名称：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产地：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="综合查询">
          <el-form inline label-width="120px">
            <el-form-item label="平台资源号：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源编号：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源中文名称：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源外文名称：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产地：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="省：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="国家：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="保存位置：">
              <el-input v-model="query.savePosition" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源提供者：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源形成时代：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="标本编号：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="库存号位置：">
              <el-input v-model="query.sourceName" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="button-group" style="text-align: right; margin: 0 20px 20px 0">
      <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
    </div>

    <div class="button-group">
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
        新增标本
      </el-button>
      <el-button icon="el-icon-upload2" type="primary" size="small" @click="handleQuery">
        批量上传
      </el-button>
      <el-button icon="el-icon-download" type="warning" size="small" @click="handleQuery">
        下载
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
export default class SpecimenManagement extends Vue {
  private query = {
    sourceName: '',
    savePosition: ''
  }

  private tabPosition = 'top'

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
    this.$router.push('/specimen-management/add')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/table.scss';
.specimen-management-container {
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
