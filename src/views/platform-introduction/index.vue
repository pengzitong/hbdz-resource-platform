<template>
  <div class="platform-content-container">
    <div class="hover-button border-primary">
      <el-dropdown placement="right-end" :show-timeout="10">
        <span class="el-dropdown-link">
          <i class="el-icon-d-arrow-right"></i>
        </span>
        <el-dropdown-menu class="el-dropdown-menu__link" slot="dropdown">
          <el-dropdown-item style="padding: 0; line-height: 1"><a class="nav-target" href="#introduction">平台简介</a></el-dropdown-item>
          <el-dropdown-item style="padding: 0; line-height: 1"><a class="nav-target" href="#history">平台发展历程</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <introduction class="pb-30" />
    <history class="pb-30" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Introduction from '@/views/platform-introduction/introduction.vue'
import History from '@/views/platform-introduction/history.vue'
import { Route } from 'vue-router'

@Component({
  components: { History, Introduction }
})
export default class PlatformIntroduction extends Vue {
  private mounted() {
    location.hash = `#${this.$route.query.target}`
  }

  @Watch('$route')
  private routeChange(route: Route) {
    try {
      if (route.query.target) {
        location.hash = `#${route.query.target}`
      }
    } catch (e) {
      console.warn(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-button {
  position: fixed;
  left: 30px;
  top: 350px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 5px var(--primary-color);
  color: var(--primary-color);
  .el-dropdown-link {
    display: inline-block;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      /*transform: scaleY(2);*/
      transition: transform ease-in-out 0.5s;
    }
    &:hover i {
      transform: scale(1.5);
    }
  }
}

.el-dropdown-menu__link {
  .nav-target {
    color: var(--primary-color);
    text-decoration: none;
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
</style>
