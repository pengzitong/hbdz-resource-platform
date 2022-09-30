<template>
  <div class="home-container">
    <div class="home-left">
      <!--欢迎模块-->
      <!--      <welcome class="mb-12" />-->
      <!--标本检索-->
      <specimen-searching class="mb-12" :photoGalleryConditionList="bestPhotoGallery" />
      <!--重要专题-->
      <important-topics class="mb-12" :sourceData="importantTopics" />
      <!--视频资源-->
      <!--      <video-resource class="mb-12" />-->
      <!--矿晶三维-->
      <!--      <mineral-3d class="mb-12" />-->
      <!--精品图片库-->
      <quality-photo-gallery class="mb-12" :sourceData="bestPhotoGallery" />
      <!--最新动态-->
      <!--      <latest-news class="mb-12" />-->
    </div>
    <div class="home-right" v-if="false">
      <!--轮播图-->
      <slider class="mb-12" />
      <!--资源目录-->
      <resource-dir class="mb-12" />
      <!--浏览排行-->
      <browse-ranking class="mb-12" />
      <!--测试js组件-->
      <test />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Welcome from '@/views/home/welcome.vue'
import SpecimenSearching from '@/views/home/specimen-searching.vue'
import ImportantTopics from '@/views/home/important-topics.vue'
import VideoResource from '@/views/home/video-resource.vue'
import Mineral3d from '@/views/home/mineral-3d.vue'
import QualityPhotoGallery from '@/views/home/quality-photo-gallery.vue'
import LatestNews from '@/views/home/latest-news.vue'
import Slider from '@/views/home/slider.vue'
import ResourceDir from '@/views/home/resource-dir.vue'
import BrowseRanking from '@/views/home/browse-ranking.vue'
import { queryHomePageSource } from '@/api/home.ts'
// import { IResponseBody } from 'axios'
import { ITopic, IPhoto } from '@/models'
import Test from '@/views/home/test.vue'
import { Route } from 'vue-router'
import { NavigationGuardNext } from 'vue-router'
import { Mutation } from 'vuex-class'

@Component({
  components: {
    Test,
    BrowseRanking,
    ResourceDir,
    Slider,
    LatestNews,
    QualityPhotoGallery,
    Mineral3d,
    VideoResource,
    ImportantTopics,
    SpecimenSearching,
    Welcome
  }
})
export default class Home extends Vue {
  private importantTopics: ITopic[] = []
  private bestPhotoGallery: IPhoto[] = []

  @Mutation('setImportantTopicNavLists') setImportantTopicNavLists: any

  private async mounted() {
    // const res: IResponseBody<IArticle> = await getArticleDetail()
    this.queryHomePageSource()
  }

  private async queryHomePageSource() {
    const res = await queryHomePageSource()
    this.importantTopics = res.important_topics
    this.bestPhotoGallery = res.best_photo_gallery

    // 根据获取到的专题更新专题下拉菜单组
    const importantTopicNavLists = this.importantTopics.map(({ name, topic_id }) => ({
      name,
      command: `/important-topic/topic-list?metaTitle=${name}&topic_id=${topic_id}`
    }))
    this.setImportantTopicNavLists(importantTopicNavLists)
  }

  // 测试页面路由拦截用法
  private beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
    next()
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  .home-left {
    flex: 1;
  }
  .home-right {
    margin-left: 20px;
    width: 310px;
  }
}
</style>
