<template>
  <div class="special-title">
    <div class="style-container" v-if="type === 'diamond'" v-scroll-animation="'ani1'">
      <div class="icon opacity-4"></div>
      <div class="icon opacity-6"></div>
      <div class="icon opacity-8"></div>
      <div class="text">{{ title }}</div>
      <div class="icon opacity-8"></div>
      <div class="icon opacity-6"></div>
      <div class="icon opacity-4"></div>
    </div>
    <div class="style-container" v-if="type === 'line'">
      <div class="line-left"></div>
      <div class="text">{{ title }}</div>
      <div class="line-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ScrollAnimation from '@/directives/scroll-animation'

@Component({
  directives: { ScrollAnimation }
})
export default class SpecialTitle extends Vue {
  @Prop({ type: String, required: true }) private readonly title!: string
  @Prop({ type: String, default: 'line' }) private readonly type!: string
}
</script>

<style lang="scss" scoped>
@keyframes ani1 {
  from {
    transform: rotateY(0) rotateZ(40deg) skewY(10deg);
  }
  to {
    transform: rotateY(360deg) rotateZ(40deg) skewY(10deg);
  }
}
@keyframes ani2 {
  from {
    transform: translateX(300px);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes ani3 {
  from {
    transform: translateX(-300px);
  }
  to {
    transform: translateX(0);
  }
}
.special-title .style-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  .icon {
    border-radius: 2px;
    height: 12px;
    width: 12px;
    transform: rotateZ(40deg) skewY(10deg);
    background: var(--primary-color);
    margin: 0 10px;
    /*animation: ani1 ease-out 1s;*/
  }
  &.ani1 .icon {
    animation: ani1 ease-out 1s;
  }
  .text {
    font-family: cursive;
    font-size: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 20px;
    color: var(--primary-color);
    transform: translateY(-1px);
  }
  .line-left {
    width: 200px;
    height: 3px;
    background-image: linear-gradient(to left, var(--primary-color), rgba(255, 255, 255, 1));
    animation: ani3 ease-in-out 0.6s;
  }
  .line-right {
    width: 200px;
    height: 3px;
    background-image: linear-gradient(to right, var(--primary-color), rgba(255, 255, 255, 1));
    animation: ani2 ease-in-out 0.6s;
  }
}
</style>
