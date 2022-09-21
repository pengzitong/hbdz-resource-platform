<template>
  <section-container class="home-mineral-3d" title="矿晶三维">
    <span class="minerals-list-arrow__left">
      <i class="el-icon-arrow-left"></i>
    </span>
    <span class="minerals-list-arrow__right">
      <i class="el-icon-arrow-right"></i>
    </span>
    <div class="minerals-list" @mouseenter="animation = false" @mouseleave="animation = true">
      <div
        class="minerals-wrapper"
        :style="{
          '--translateX1': translateX1 + 'px',
          '--translateX2': translateX2 + 'px'
        }"
      >
        <div ref="imageList1" class="image-list1">
          <image-show v-for="(item, index) in 4" align="left" :title="'图片标题' + index" subTitle="副标题" :key="index" class="mr-12" width="189" height="182" @click="handleClick" />
        </div>
        <div ref="imageList2" class="image-list2">
          <image-show v-for="(item, index) in 4" align="left" :title="'图片标题' + index + 101" subTitle="副标题" :key="index + 101" class="mr-12" width="189" height="182" @click="handleClick" />
        </div>
      </div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import SectionContainer from '@/components/section-container.vue'
@Component({
  components: { ImageShow, SectionContainer }
})
export default class Mineral3d extends Vue {
  private translateX1: number = 0
  private translateX2: number = 0
  @Ref('imageList1') readonly imageList1!: HTMLDivElement
  @Ref('imageList2') readonly imageList2!: HTMLDivElement
  private animation: boolean = true
  private listWidth: number = 0

  private mounted() {
    this.listWidth = this.imageList1.clientWidth
    this.doAnimation()
  }

  private doAnimation() {
    const loop = () => {
      if (this.animation) {
        // 控制第一个列表imageList1滚动轨迹
        this.translateX1 -= 1
        if (this.translateX1 <= -this.listWidth) {
          this.translateX1 = this.listWidth
        }
        // 控制第二个列表imageList2滚动轨迹
        this.translateX2 -= 1
        if (this.translateX2 <= -this.listWidth * 2) {
          this.translateX2 = 0
        }
      }
      window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
  }

  private handleClick(value: string) {
    console.log(value)
  }
}
</script>

<style lang="scss" scoped>
.home-mineral-3d {
  position: relative;
  .minerals-list-arrow__left,
  .minerals-list-arrow__right {
    display: inline-block;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 5px;
  }
  .minerals-list-arrow__right {
    left: unset;
    right: 5px;
  }
  .minerals-list {
    overflow-x: auto;
    margin: 0 20px;
    position: relative;
    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      display: none;
      /*background-color:transparent;*/
    }

    .minerals-wrapper {
      display: flex;
      .image-list1 {
        display: inline-flex;
        transform: translateX(var(--translateX1));
      }
      .image-list2 {
        display: inline-flex;
        transform: translateX(var(--translateX2));
      }
    }
  }
}
</style>
