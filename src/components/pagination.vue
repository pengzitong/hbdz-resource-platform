<template>
  <div class="pagination-wrapper pt-20">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-count="pageCount"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Pagination extends Vue {
  @Prop({ default: 1 }) currentPage!: number
  @Prop({ default: 5 }) pageSize!: number
  @Prop({ default: 0 }) pageCount: number = 0

  @Emit('sizeChange')
  private handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`)
  }
  @Emit('currentChange')
  private handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`)
  }
}
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
