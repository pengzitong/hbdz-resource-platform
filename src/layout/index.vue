<template>
  <div class="layout-container" :class="!showAll ? 'hide-page' : ''">
    <el-switch v-if="false" class="switch-button" v-model="showAll" />
    <layout-header />
    <div class="layout-content">
      <breadcrumb />
      <router-view></router-view>
    </div>
    <layout-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutHeader from './header.vue'
import LayoutFooter from './footer.vue'
import Breadcrumb from '@/components/breadcrumb.vue'

@Component({
  components: {
    LayoutHeader,
    LayoutFooter,
    Breadcrumb
  }
})
export default class Home extends Vue {
  private showAll: boolean = true
}
</script>

<style lang="scss" scoped>
.layout-container {
  min-width: 1150px;
  &.hide-page {
    display: none;
  }
  .switch-button {
    position: fixed;
    z-index: 10;
    right: 10px;
    top: 10px;
  }
  .layout-content {
    margin: 0 auto;
    max-width: 1150px;
  }
}
</style>
