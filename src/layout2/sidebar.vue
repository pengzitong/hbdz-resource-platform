<template>
  <div class="sidebar-container">
    <div class="menu-title">
      <el-image
        class="menu-title-logo"
        fit="cover"
        :src="require('@/assets/images/logo.png')"
      ></el-image>
      <span class="menu-title-text" :class="isCollapse ? 'collapse' : ''">湖北地质博物馆</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#64e0db"
    >
      <router-link to="/dashboard">
        <el-menu-item index="/dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <router-link to="/specimen-management">
        <el-menu-item index="/specimen-management">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">标本管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/photo-management">
        <el-menu-item index="/photo-management">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图片库管理</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Sidebar extends Vue {
  get sidebarStatus() {
    return this.$store.state.sidebarStatus
  }

  get isCollapse() {
    return this.$store.state.sidebarStatus === 'closed'
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta?.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  private activeMenuIndex: string = '1-4-1'

  // private isCollapse = false
  private handleOpen(key: string, keyPath: any) {
    console.log(key, keyPath)
  }
  private handleClose(key: string, keyPath: any) {
    console.log(key, keyPath)
  }
}
</script>
<style lang="scss" scoped>
.sidebar-container {
  .menu-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    &-logo {
      width: 50px;
    }
    &-text {
      display: inline-block;
      padding: 0 5px;
      color: #fff;
      width: 130px;
      box-sizing: border-box;
      transition: all 0.5s ease-in-out;
      overflow: hidden;
      white-space: nowrap;
      &.collapse {
        width: 0;
        padding: 0;
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
</style>
