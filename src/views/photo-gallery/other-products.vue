<template>
  <div class="other-products">
    <static-slider class="mb-40" />

    <div class="header-wrapper" v-scroll-animation="'ani-line'">
      <span class="header-title">火成岩</span>
      <span class="more-button" v-scroll-animation="'ani-opacity'">
        <i class="el-icon-d-arrow-right"></i>
        更多
      </span>
    </div>
    <div class="body-wrapper mb-20">
      <image-show class="mt-12" v-for="item in 10" :key="item" title="岩石精品" sub-title="sub title"></image-show>
      <div style="width: 250px; height: 0" v-for="item in 10" :key="item"></div>
    </div>
    <div class="header-wrapper" v-scroll-animation="'ani-line'">
      <span class="header-title">火成岩2</span>
      <span class="more-button" v-scroll-animation="'ani-opacity'">
        <i class="el-icon-d-arrow-right"></i>
        更多
      </span>
    </div>
    <div class="body-wrapper mb-20">
      <image-show class="mt-12" v-for="item in 10" :key="item"></image-show>
      <div style="width: 250px; height: 0" v-for="item in 10" :key="item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ImageShow from '@/components/image-show.vue'
import ScrollAnimation from '@/directives/scroll-animation'
import StaticSlider from '@/components/static-slider.vue'

@Component({
  components: { ImageShow, StaticSlider },
  directives: { ScrollAnimation }
})
export default class OtherProducts extends Vue {}
</script>

<style lang="scss" scoped>
@keyframes ani2 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.other-products {
  .header-wrapper {
    padding-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
    &.ani-line::after {
      content: '';
      border-bottom: 1.5px solid #ddd;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      animation: ani ease-in-out 0.8s;
      transform-origin: left;
    }

    .header-title {
      font-size: 18px;
      color: rgba(53, 53, 53, 0.8);
    }
    .more-button {
      display: flex;
      align-items: center;
      background-image: -webkit-linear-gradient(right, rgb(25, 111, 198), rgb(25, 111, 198), rgb(255, 255, 255));
      /*background-image: -webkit-linear-gradient(140deg, rgb(25, 111, 198) 25%, rgb(255, 255, 255) 65%, rgb(25, 111, 198) 100%);*/
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0;
      &.ani-opacity {
        animation: ani2 0.5s ease-in-out 0.6s forwards;
      }
    }
  }
  .body-wrapper {
    padding: 0 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -12px;
  }
}
</style>
