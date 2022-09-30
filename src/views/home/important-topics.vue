<template>
  <section-container class="home-important-topics" title="重要专题">
    <div class="topics-list">
      <image-show
        v-for="item in sourceData"
        :key="item.topic_id"
        class="mt-12"
        :item="item"
        :src="`${$imageUrlHost}${item.url}`"
        :title="item.name"
        @title-click="handleClick"
        @image-click="handleClick"
      />
      <!--解决flex最后一行不居左问题-->
      <div v-for="item in sourceData" :key="-item.topic_id" style="width: 250px; height: 0px"></div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'
import ImageShow from '@/components/image-show.vue'
import { ITopic } from '@/models'
@Component({
  components: { ImageShow, SectionContainer }
})
export default class ImportantTopics extends Vue {
  @Prop({ default: () => [] }) sourceData!: ITopic[]
  private handleClick({ topic_id, name }: any) {
    console.log(topic_id, 'value')
    this.$router.push({
      path: `/important-topic/topic-list?metaTitle=${name}`,
      query: { topic_id }
    })
  }
}
</script>

<style lang="scss" scoped>
.home-important-topics {
  .topics-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -12px;
  }
}
</style>
