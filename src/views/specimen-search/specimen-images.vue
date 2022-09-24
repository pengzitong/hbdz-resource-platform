<template>
  <div class="specimen-images">
    <el-form class="search-form" inline>
      <el-form-item label="平台资源号">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="资源中外文名">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="保存单位">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input size="small"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="specimen-list mt-12">
      <image-show
        width="185"
        height="229"
        title="标本图片"
        sub-title="sub-title"
        sub-background="#f5f5f5"
        class="mt-12"
        style="border: 1px solid #bdd2ed"
        v-for="item in 18"
        :key="item"
      />
      <div style="width: 250px; height: 0px" v-for="item in 18" :key="item"></div>
    </div>

    <pagination></pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import Pagination from '@/components/pagination.vue'
@Component({
  components: { ImageShow, Pagination }
})
export default class SpecimenImages extends Vue {}
</script>

<style lang="scss">
.specimen-images {
  .search-form {
    padding: 15px 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .specimen-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
