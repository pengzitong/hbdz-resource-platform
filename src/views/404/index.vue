<template>
  <div class="not-found">
    <div class="tip-text">页面不存在.</div>
    <el-button @click="handleBack" size="small">返回上一页</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class NotFound extends Vue {
  private handleBack() {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  padding: 30px 20px;
  .tip-text {
    font-size: 30px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    color: var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
  }
}
</style>
