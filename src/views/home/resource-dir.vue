<template>
  <div class="home-resource-dir border-primary">
    <div class="header">
      <span class="header-title">资源目录</span>
      <span class="header-icon"><i class="el-icon-arrow-right"></i></span>
    </div>
      <div class="body">
          <p class="resource">矿物标本（31523）</p>
          <p class="resource">矿物标本（31523）</p>
          <p class="resource">矿物标本（31523）</p>
          <p class="resource">矿物标本（31523）</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class resourceDir extends Vue {}
</script>

<style lang="scss" scoped>
.home-resource-dir {
  .header {
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    background-image: linear-gradient(
      to top,
      rgba(209, 229, 249, 0.5),
      rgba(255, 255, 255, 1),
      rgba(209, 229, 249, 0.8)
    );
    padding: 0 10px;
    color: var(--primary-color);
      display: flex;
      justify-content: space-between;
  }
    .body {
        padding: 10px;
        .resource {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: var(--primary-color);
        }
    }
}
</style>
