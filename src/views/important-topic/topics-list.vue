<template>
  <div class="topics-list">
    <image-show
      class="mt-30 border-primary"
      title="xxxx专题图片标题"
      v-for="item in 11"
      :key="item"
      @title-click="handleClick"
    />
    <div v-for="item in 11" style="width: 250px; height: 0" :key="item"></div>
    <pagination />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import Pagination from '@/components/pagination.vue'
@Component({
  components: { ImageShow, Pagination }
})
export default class TopicsList extends Vue {
  private handleClick() {
    this.$router.push('/important-topic/topic-detail')
  }
}
</script>

<style lang="scss" scoped>
.topics-list {
  margin-top: -30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
