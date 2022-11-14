<template>
  <div class="layout-header">
    <div class="header-wrapper">
      <el-image
        @click="$router.push('/home')"
        class="header-logo"
        fit="cover"
        :src="require('@/assets/images/logo.png')"
      ></el-image>
      <div class="header-text">
        <div class="cn-title">湖北地质博物馆标本资源库</div>
        <div class="en-title">Specimen Resource Bank of Hubei Geological Museum</div>
      </div>
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
  //background: url('~@/assets/images/top-banner.png') no-repeat center/100% 200px;
  background: rgb(37, 90, 88);
  overflow: hidden;
  font-family: 'PingFangSC-Light';
  position: relative;
  .header-wrapper {
    position: relative;
    text-align: center;
    margin: 0 auto;
    // line-height: 200px;
    height: 200px;
    width: 1150px;
    font-size: 35px;
    color: rgba(235, 235, 235);
    display: flex;
    align-items: center;
    justify-content: center;
    .header-logo {
      position: absolute;
      left: 0;
      top: 33px;
      width: 150px;
      height: 93px;
    }
    .header-text {
      transform: translateY(-20px);
      font-family: cursive;
      text-shadow: 4px 4px 2px #000;
      /*animation: ani ease-in-out 0.6s;*/
      .cn-title {
        font-size: 50px;
        letter-spacing: 8px;
        height: 50px;
        line-height: 50px;
      }
      .en-title {
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        word-spacing: 8px;
        text-shadow: 3px 3px 2px #000;
      }
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
