<template>
  <div class="header-container">
    <span class="collapse-button">
      <i
        @click="handleCollapseClick"
        class="mr-12"
        :class="sidebarStatus === 'opened' ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      ></i>
      <breadcrumb />
    </span>
    <el-button type="text" class="user-avatar" @click="handleLogout">注销</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Breadcrumb from '@/components/breadcrumb.vue'
import { confirm } from '@/utils/decorator'

@Component({ components: { Breadcrumb } })
export default class Header extends Vue {
  get sidebarStatus() {
    return this.$store.state.sidebarStatus
  }

  private handleCollapseClick() {
    const status = this.sidebarStatus === 'opened' ? 'closed' : 'opened'
    this.$store.commit('setSidebarStatus', status)
    console.log('handleCollapseClick')
  }

  @confirm('确定要退出登录吗？', '提示')
  private handleLogout() {
    console.log('logout')
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 50px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .collapse-button {
    font-size: 22px;
    display: flex;
    align-items: center;
  }
}
</style>
