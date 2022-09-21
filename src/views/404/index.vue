<template>
  <div class="not-found">
    <el-button type="text" @click="handleBack">页面走丢了，点击返回上一级页面</el-button>
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
  padding: 10px;
}
</style>
