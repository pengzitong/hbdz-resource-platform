<template>
  <section-container class="home-video-resource" title="视频资源">
    <div class="videos-list">
      <image-show
        align="left"
        title="图片标题"
        subTitle="副标题"
        v-for="(item, index) in 6"
        :key="index"
        :class="index > 3 ? 'mt-12' : ''"
        width="189"
        height="182"
        @click="handleClick"
      />
      <!--解决flex最后一行不居左问题-->
      <div
        v-for="(item, index) in 6"
        :key="index + 6"
        style="width: 189px; height: 0px"
      ></div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import SectionContainer from '@/components/section-container.vue'
@Component({
  components: { ImageShow, SectionContainer }
})
export default class VideoResource extends Vue {
  private handleClick(value: string) {
    console.log(value)
  }
}
</script>

<style lang="scss" scoped>
.home-video-resource {
  .videos-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
