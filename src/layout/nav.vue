<template>
  <nav class="layout-nav">
    <!--    {{ importantTopicNavLists }}-->

    <router-link class="nav-link main-link" to="/home">网站首页</router-link>

    <span
      v-if="false"
      class="drop-menu-wrapper main-link"
      @click="$router.push({ path: platformIntroductionNavLists[0].command })"
    >
      <el-dropdown placement="bottom" @command="handleCommand">
        <span class="nav-link">平台概况</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in platformIntroductionNavLists"
            :key="item.command"
            :command="item.command"
          >
            <span class="nav-link">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>

    <!--    <router-link class="nav-link" to="/about">标本查询</router-link>-->

    <span
      class="drop-menu-wrapper main-link"
      @click="$router.push({ path: specimenNavLists[0].command })"
    >
      <el-dropdown placement="bottom" @command="handleCommand">
        <span class="nav-link">标本查询</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in specimenNavLists"
            :key="item.command"
            :command="item.command"
          >
            <span class="nav-link">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>

    <!--    <router-link class="nav-link main-link" to="/about">重要专题</router-link>-->

    <span
      class="drop-menu-wrapper main-link"
      @click="$router.push({ path: importantTopicNavLists[0].command })"
    >
      <el-dropdown placement="bottom" @command="handleCommand">
        <span class="nav-link">重要专题</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in importantTopicNavLists"
            :key="item.command"
            :command="item.command"
          >
            <span class="nav-link">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>

    <span
      class="drop-menu-wrapper"
      @click="$router.push({ path: photoGalleryNavLists[0].command })"
    >
      <el-dropdown placement="bottom" @command="handleCommand">
        <span class="nav-link">精品图片库</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in photoGalleryNavLists"
            :key="item.command"
            :command="item.command"
          >
            <span class="nav-link">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>

    <router-link v-if="false" class="nav-link" to="/message-board">
      <!--留言板-->
      留言板
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({})
export default class Nav extends Vue {
  private readonly platformIntroductionNavLists = [
    { name: '平台简介', command: '/platform-introduction?target=' },
    { name: '平台发展历程', command: '/platform-introduction?target=history' }
  ]

  private readonly specimenNavLists = [
    {
      name: '矿物标本查询',
      command: '/specimen-search/specimen-list?metaTitle=矿物标本查询&specimen_type=矿物'
    },
    {
      name: '岩石标本查询',
      command: '/specimen-search/specimen-list?metaTitle=岩石标本查询&specimen_type=岩石'
    },
    {
      name: '矿石标本查询',
      command: '/specimen-search/specimen-list?metaTitle=矿石标本查询&specimen_type=矿石'
    },
    {
      name: '化石标本查询',
      command: '/specimen-search/specimen-list?metaTitle=化石标本查询&specimen_type=化石'
    },
    { name: '标本图片查询', command: '/specimen-search/specimen-images' },
    { name: '综合查询', command: '/specimen-search/union-search' }
  ]

  // private readonly importantTopicNavLists = [
  //   { name: '古生物化石群专题', command: '/important-topic/topic-list?metaTitle=古生物化石群专题' },
  //   { name: '矿床专题', command: '/important-topic/topic-list?metaTitle=矿床专题' }
  // ]

  @State('importantTopicNavLists') importantTopicNavLists: any

  private readonly photoGalleryNavLists = [
    {
      name: '矿物精品',
      command: '/photo-gallery/mineral-products?metaTitle=矿物精品&gallery_id=2'
    },
    {
      name: '岩石精品',
      command: '/photo-gallery/mineral-products?metaTitle=岩石精品&gallery_id=4'
    },
    {
      name: '矿石精品',
      command: '/photo-gallery/mineral-products?metaTitle=矿石精品&gallery_id=3'
    },
    {
      name: '化石精品',
      command: '/photo-gallery/mineral-products?metaTitle=化石精品&gallery_id=1'
    }
  ]

  private handleCommand(command: string) {
    this.$router.push(command)
  }
}
</script>

<style lang="scss" scoped>
.layout-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  /*animation: ani ease-in-out 0.6s;*/
  .nav-link {
    display: inline-block;
    color: #fff;
    line-height: 40px;
    font-size: 15px;
    position: relative;
  }
  .main-link {
    position: relative;
    line-height: 40px;
    margin-right: 100px;
    &::after {
      content: '|';
      position: absolute;
      height: 100%;
      right: -50px;
      top: 0;
    }
  }
  .drop-menu-wrapper {
    cursor: pointer;
  }
}
</style>
