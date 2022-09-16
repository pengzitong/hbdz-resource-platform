<template>
  <div class="layout-container">
    <layout-header/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutHeader from './header.vue';

@Component({
  components: {
    LayoutHeader,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  
</style>