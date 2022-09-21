<template>
  <div class="layout-header">
    <div class="header-title">这里是一个测试文案</div>
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
  private topBanner = topBanner;
}
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 200px;
  background: url("~@/assets/images/top-banner.png") no-repeat center/100% 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "PingFangSC-Light";
  position: relative;
  .header-title {
    font-size: 35px;
    color: rgba(235, 235, 235);
  }
  .nav-wrapper {
    position: absolute;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    bottom: 0;
  }
}
</style>
