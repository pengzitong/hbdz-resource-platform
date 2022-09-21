<template>
  <div class="home-slider border-primary">
    <div class="slider-header">
      您是第
      <span class="visit-number">12343</span>
      位访问者
    </div>
    <div class="slider-body">
      <el-carousel height="180px">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="image-wrapper">
            <el-image class="display-image" fit="cover" :src="require('@/assets/images/news0.jpeg')"></el-image>
            <div class="display-image-label">图片描述文案</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class slider extends Vue {}
</script>

<style lang="scss" scoped>
.home-slider {
  .slider-header {
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    background-image: linear-gradient(to top, rgba(209, 229, 249, 0.5), rgba(255, 255, 255, 1), rgba(209, 229, 249, 0.8));
    padding-left: 10px;
    color: var(--primary-color);
    .visit-number {
      font-size: 18px;
      margin: 0 5px;
      font-family: fantasy;
    }
  }
  .slider-body {
    height: 180px;
    .image-wrapper {
      .display-image {
        width: 100%;
        height: 150px;
      }
      .display-image-label {
        position: absolute;
        bottom: 0px;
        height: 30px;
        line-height: 30px;
        background: rgba(53, 53, 53, 1);
        width: 100%;
        color: #fff;
        font-size: 13px;
        padding-left: 10px;
      }
    }
    .el-carousel ::v-deep .el-carousel__indicators {
      bottom: 25px;
    }
  }
}
</style>
