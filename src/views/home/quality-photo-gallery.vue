<template>
  <section-container class="home-quality-photo-gallery" title="精品图片库">
    <div class="gallery-list">
      <image-show
        class="image-show mt-12"
        v-for="item in sourceData"
        :key="item.gallery_id"
        :title="item.name"
        :src="`${$imageUrlHost}${item.url}`"
        @image-click="handleClick(item)"
        @title-click="handleClick(item)"
      />
      <div v-for="item in sourceData" :key="-item.gallery_id" style="width: 250px; height: 0"></div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import SectionContainer from '@/components/section-container.vue'
import { IPhoto } from '@/models'
@Component({
  components: { ImageShow, SectionContainer }
})
export default class qualityPhotoGallery extends Vue {
  @Prop({ default: () => [] }) sourceData!: IPhoto[]

  private handleClick({ gallery_id, name }: any) {
    this.$router.push(`/photo-gallery/mineral-products?metaTitle=${name}&gallery_id=${gallery_id}`)
  }
}
</script>

<style lang="scss" scoped>
.home-quality-photo-gallery {
  .gallery-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -12px;
  }
}
</style>
