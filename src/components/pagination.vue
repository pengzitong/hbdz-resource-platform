<template>
  <div class="pagination-wrapper pt-20">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Pagination extends Vue {
  private currentPage = 0
  private handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`)
  }
  private handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`)
  }
}
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
