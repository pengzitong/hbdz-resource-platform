<template>
  <div class="layout-header">
    <div class="header-wrapper">
      <el-image
        @click="$router.push('/home')"
        class="header-logo"
        fit="cover"
        :src="require('@/assets/images/logo.jpg')"
      ></el-image>
      <div class="header-text">湖北地质博物馆标本资源库</div>
    </div>
    <div class="nav-wrapper">
      <layout-nav></layout-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutNav from './nav.vue'
import topBanner from '@/assets/images/top-banner.png'

@Component({
  components: {
    LayoutNav
  }
})
export default class Header extends Vue {
  private topBanner = topBanner
}
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 200px;
  background: url('~@/assets/images/top-banner.png') no-repeat center/100% 200px;
  overflow: hidden;
  font-family: 'PingFangSC-Light';
  position: relative;
  .header-wrapper {
    position: relative;
    text-align: center;
    margin: 0 auto;
    line-height: 200px;
    height: 200px;
    width: 1150px;
    font-size: 35px;
    color: rgba(235, 235, 235);
    .header-logo {
      position: absolute;
      left: 0;
      top: 12px;
      width: 100px;
      height: 55px;
    }
    .header-text {
      animation: ani ease-in-out 0.6s;
    }
  }
  .nav-wrapper {
    position: absolute;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    bottom: 0;
  }
}
</style>
