<template>
  <section-container class="home-important-topics" title="重要专题">
    <div class="topics-list">
      <image-show
        v-for="(item, index) in 5"
        :key="index"
        :class="index > 2 ? 'mt-12' : ''"
        @click="handleClick"
      />
      <!--解决flex最后一行不居左问题-->
      <div
        v-for="(item, index) in 5"
        :key="index + 5"
        style="width: 250px; height: 0px"
      ></div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'
import ImageShow from '@/components/image-show.vue'
@Component({
  components: { ImageShow, SectionContainer }
})
export default class ImportantTopics extends Vue {
  private handleClick(value: string) {
    console.log(value, 'value')
  }
}
</script>

<style lang="scss" scoped>
.home-important-topics {
  .topics-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
