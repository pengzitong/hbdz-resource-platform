<template>
  <div class="layout-container">
    <div class="left-wrapper">
      <side-bar />
    </div>
    <div class="right-wrapper">
      <layout-header />
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
    <!--    <layout-header />-->
    <!--    <div class="layout-content">-->
    <!--      <breadcrumb />-->
    <!--      <router-view></router-view>-->
    <!--    </div>-->
    <!--    <layout-footer />-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutHeader from './header.vue'
import LayoutFooter from './footer.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import SideBar from './sidebar.vue'

@Component({
  components: {
    LayoutHeader,
    LayoutFooter,
    Breadcrumb,
    SideBar
  }
})
export default class dashboard extends Vue {}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  /*min-width: 1150px;*/
  display: flex;
  .left-wrapper {
    height: 100vh;
    overflow: auto;
    background: #545c64;
  }
  .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .layout-content {
      padding: 12px;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
