<template>
  <div class="home-browse-ranging border-primary">
    <div class="header">
      <span class="header-title">浏览排行</span>
      <span class="header-icon"><i class="el-icon-arrow-right"></i></span>
    </div>
    <div class="body">
      <div class="specimen" v-for="(item, index) in 5" :key="index">
        <el-image
          class="specimen-image"
          :src="require('@/assets/images/news0.jpeg')"
        ></el-image>
        <div class="specimen-content">
          <p class="specimen-title">紫水晶(晶体)</p>
          <p class="specimen-code">2362C0001400000147</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class browseRanking extends Vue {}
</script>

<style lang="scss" scoped>
.home-browse-ranging {
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
    .specimen {
      display: flex;
      align-items: center;
      & + .specimen {
        margin-top: 12px;
      }
      .specimen-image {
        width: 60px;
        height: 45px;
      }
      .specimen-content {
        margin-left: 12px;
        .specimen-title,
        .specimen-code {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
