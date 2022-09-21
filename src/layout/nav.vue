<template>
  <nav class="layout-nav">
    <router-link class="nav-link" to="/home">
      <!--网站首页-->
      菜单1
    </router-link>
    <span class="vertical-line">|</span>
    <router-link class="nav-link" to="/about">
      <!--            平台概况-->
      菜单1
    </router-link>
    <span class="vertical-line">|</span>
    <router-link class="nav-link" to="/about">
      <!--标本查询-->
      菜单1
    </router-link>
    <span class="vertical-line">|</span>
    <router-link class="nav-link" to="/about">
      <!--            系统矿物学-->
      菜单1
    </router-link>
    <span class="vertical-line">|</span>
    <router-link class="nav-link" to="/about">
      <!--            精品图片库-->
      菜单1
    </router-link>
    <span class="vertical-line">|</span>
    <router-link class="nav-link" to="/message-board">
      <!--留言板-->
      留言板
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
.layout-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  .nav-link {
    display: inline-block;
    color: #fff;
    line-height: 40px;
  }
  .vertical-line {
    display: inline-block;
    margin: 0 20px;
  }
}
</style>
