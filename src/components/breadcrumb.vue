<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)" class="link">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component
export default class Breadcrumb extends Vue {
  private levelList: any[] = []
  @Watch('$route', { immediate: false, deep: false })
  private routerChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    // if (route.path.startsWith('/redirect/')) {
    //   return
    // }
    this.getBreadcrumb()
  }

  private mounted() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    // only show routes with meta.title
    let matched: any = this.$route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]

    // 如果匹配到的首层路由不是首页，需要拼上
    if (!this.isHome(first) && !this.isDashboard(first)) {
      const name = first && first.name

      // todo list 增加路由判断
      const managePlatformRoutesName = [
        'SpecimenManagement',
        'PhotoManagement',
        'SpecimenManagementDetail',
        'PhotoManagementDetail'
      ]
      if (name && managePlatformRoutesName.includes(name.trim())) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      } else {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }
    }

    this.levelList = matched.filter(
      (item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    )
  }

  private isHome(route: Route) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'home'
  }

  private isDashboard(route: Route) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'dashboard'
  }

  private handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(path)
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  .no-redirect {
    cursor: text;
    font-weight: 500;
    color: var(--primary-color);
  }
  .link {
    /*color: var(--primary-color);*/
  }
}
</style>
