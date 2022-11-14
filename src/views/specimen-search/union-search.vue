<template>
  <div class="union-search">
    <el-form label-width="110px" :inline="true" align="center">
      <table class="search-table mb-10">
        <tr>
          <td>
            <el-form-item class="td-form-item" label="平台资源号：">
              <el-input v-model="form.platform_resource_number" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源编号：">
              <el-input v-model="form.resource_number" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="资源名称：">
              <el-input v-model="form.resource_cn_name" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源外文名称：">
              <el-input v-model="form.resource_en_name" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="产地：">
              <el-input v-model="form.origin" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="省：">
              <el-select
                style="width: 168px"
                clearable
                placeholder="--请选择--"
                size="small"
                v-model="form.province"
              >
                <el-option
                  v-for="(item, index) in china_province_list"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="国家：">
              <el-input v-model="form.country" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="库存位置：">
              <el-select
                style="width: 168px"
                clearable
                placeholder="--请选择--"
                size="small"
                v-model="form.save_unit"
              >
                <el-option
                  v-for="(item, index) in save_unit_list"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item class="td-form-item" label="资源提供者：">
              <el-input v-model="form.provider" size="small"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item class="td-form-item" label="资源形成时代：">
              <el-input v-model="form.formative_era" size="small"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="td-form-item" label="标本编号：">
              <el-input v-model="form.specimen_number" size="small"></el-input>
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
        <el-button size="small" @click="handleReset">重新输入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuerySelectLists from '@/mixins/querySelectLists'
@Component
export default class UnionSearch extends Mixins(QuerySelectLists) {
  private form: any = {}

  private handleSearch() {
    this.$store.commit('setCacheQuery', {
      ...this.form // 传递给下一个页面使用
    })
    this.$router.push('/specimen-search/union-search-list')
  }

  private handleReset() {
    this.form = {}
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
