<template>
  <section-container class="home-latest-news" title="最新动态">
    <div class="news">
      <div class="news-text">这个是一个测试的动态文案</div>
      <div class="news-time">2020-10-10</div>
    </div>
    <div class="news">
      <div class="news-text">这个是一个测试的动态文案</div>
      <div class="news-time">2020-10-10</div>
    </div>
    <div class="news">
      <div class="news-text">这个是一个测试的动态文案</div>
      <div class="news-time">2020-10-10</div>
    </div>
    <div class="news">
      <div class="news-text">这个是一个测试的动态文案</div>
      <div class="news-time">2020-10-10</div>
    </div>
    <div class="news">
      <div class="news-text">这个是一个测试的动态文案</div>
      <div class="news-time">2020-10-10</div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'

@Component({
  components: { SectionContainer }
})
export default class latestNews extends Vue {}
</script>

<style lang="scss" scoped>
.home-latest-news {
  .news {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .news-text {
      font-size: 14px;
      color: var(--primary-color);
    }
    .news-time {
      font-size: 12px;
      color: #cccccc;
    }
  }
}
</style>
