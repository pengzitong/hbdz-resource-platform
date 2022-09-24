<template>
  <div class="union-search">
    <el-form label-width="110px" :inline="true" align="center">
      <table class="search-table mb-10">
        <tr>
          <td>
            <el-form-item class="td-form-item" label="平台资源号：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源编号：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="资源名称：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源外文名称：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="产地：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="省：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="国家：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="保存单位：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item class="td-form-item" label="资源提供者：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源形成时代：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="标本编号：">
              <el-input v-model="form.platFormSourceNo" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="库存位置号：">
              <el-input v-model="form.sourceNo" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
        <el-button size="small">重新输入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class UnionSearch extends Vue {
  private form = {
    platFormSourceNo: '',
    sourceNo: ''
  }

  private handleSearch() {
    this.$router.push('/specimen-search/union-search-list')
  }
}
</script>

<style lang="scss" scoped>
.search-table {
  width: 100%;
  border-collapse: separate;
  border-right: 1px solid #e9ebef;
  border-bottom: 1px solid #e9ebef;
  border-radius: 4px;

  tr {
    text-align: center;
    &:nth-child(odd) {
      background: #f9f9f9;
    }
    td {
      width: 50%;
      border-left: 1px solid #e9ebef;
      border-top: 1px solid #e9ebef;
      transform: scale(1);
      .td-form-item {
        margin: 2px;
      }
    }
    &:first-child {
      td:first-child {
        border-top-left-radius: 4px;
      }
      td:last-child {
        border-top-right-radius: 4px;
      }
    }
    &:last-child {
      td:first-child {
        border-bottom-left-radius: 4px;
      }
      td:last-child {
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>
