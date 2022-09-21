<template>
    <section-container class="home-quality-photo-gallery" title="精品图片库">
        <div class="gallery-list">
            <image-show
                    v-for="(item, index) in 4"
                    :key="index"
                    :width="185"
                    :height="167"
                    @click="handleClick"
            />
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
    export default class qualityPhotoGallery extends Vue {
        private handleClick(value: string) {
            console.log(value, 'value')
        }
    }
</script>

<style lang="scss" scoped>
    .home-quality-photo-gallery {
        .gallery-list {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
