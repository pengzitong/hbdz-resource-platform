<template>
  <!-- 分页列表 -->
  <div class="topics-list-container">
    <div class="topics-list" v-loading="loading">
      <image-show
        class="mb-30 border-primary"
        v-for="item in topicLists"
        :title="item.name"
        :key="item.articles_id"
        :src="item.cover_url"
        @title-click="handleClick(item)"
        @image-click="handleClick(item)"
      />
      <div
        style="width: 250px; height: 0"
        v-for="item in topicLists"
        :key="-item.articles_id"
      ></div>
    </div>

    <pagination
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
      :current-page.sync="pageInfo.page"
      :page-size.sync="pageInfo.num"
      :page-count="pageInfo.all_page"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import Pagination from '@/components/pagination.vue'
import { queryTopicLists } from '@/api/topic'
import { ITopicArticle } from '@/models'
import PaginationToQuery from '@/mixins/pagination-to-query'
import { Route } from 'vue-router'

@Component({
  components: { ImageShow, Pagination }
})
export default class TopicsList extends Mixins(PaginationToQuery) {
  // private loading = false
  // private pageInfo = {
  //   page: 1,
  //   num: 20,
  //   all_page: 0
  // }
  //
  // private handleCurrentChange(page: number) {
  //   this.pageInfo.page = page
  //   this.query()
  // }
  // private handleSizeChange(num: number) {
  //   this.pageInfo.page = 1
  //   this.pageInfo.num = num
  //   this.query()
  // }

  @Watch('$route')
  private routeChange(route: Route) {
    // console.log(route, 'topic-list')
    this.pageInfo.page = 1
    this.query()
  }

  private topicLists: ITopicArticle[] = []

  private mounted() {
    this.query()
  }

  private async query() {
    try {
      const { topic_id } = this.$route.query
      this.loading = true
      const { data, all_page } = await queryTopicLists({
        page: this.pageInfo.page - 1,
        num: this.pageInfo.num,
        topic_id
      })
      this.topicLists = [...data]
      this.pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      this.loading = false
    }
  }

  private handleClick({ articles_id, name }: any) {
    this.$router.push({
      path: `/important-topic/topic-detail?metaTitle=${name}专题详情`,
      query: { articles_id }
    })
  }
}
</script>

<style lang="scss" scoped>
.topics-list {
  /*padding: 0 12px;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
