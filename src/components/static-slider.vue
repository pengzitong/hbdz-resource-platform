<template>
  <el-carousel class="el-carousel" height="460px">
    <el-carousel-item v-for="item in 4" :key="item">
      <div class="image-wrapper">
        <el-image class="display-image" fit="cover" :src="require('@/assets/images/news0.jpeg')"></el-image>
        <div class="display-image-label">图片描述文案图片描述文案图片描述文案图片描图片描述文案图片描述文案图片描述文案图片描述文案</div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class StaticSlider extends Vue {}
</script>

<style lang="scss" scoped>
.image-wrapper {
  .display-image {
    width: 100%;
    height: 460px;
  }
  .display-image-label {
    position: absolute;
    bottom: 0px;
    /*height: 60px;*/
    line-height: 25px;
    background: rgba(53, 53, 53, 1);
    width: 100%;
    color: #fff;
    font-size: 13px;
    padding-left: 10px;
  }
}
.el-carousel ::v-deep .el-carousel__indicators {
  bottom: 25px;
  left: unset;
  right: 2%;
  transform: translateX(0);
}
</style>
