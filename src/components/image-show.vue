<template>
  <div
    class="image-show"
    :class="border ? 'border' : ''"
    :style="{
      '--width': width + 'px',
      '--height': height + 'px',
      '--align': align
    }"
    @click="handleClick('测试参数')"
  >
    <div class="image-block" @click="handleImageClick">
      <el-image fit="cover" :src="src" class="display-image"></el-image>
    </div>
    <div class="image-title" @click="handleTitleClick" :style="{ backgroundColor: subBackground }">
      <div class="image-main-title">{{ title }}</div>
      <div class="image-sub-title" v-if="subTitle">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component
export default class ImageShow extends Vue {
  @Prop({ default: 250 }) private readonly width!: number
  @Prop({ default: 195 }) private readonly height!: number
  @Prop({
    type: String,
    default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    required: false
  })
  private readonly src!: string
  @Prop({ type: String, default: '标题' }) private readonly title!: string
  @Prop(String) private readonly subTitle!: string
  @Prop(String) private readonly subBackground!: string
  @Prop({ default: 'center' }) private readonly align!: string
  @Prop({ default: true }) private readonly border!: boolean
  // @Emit('click')
  private handleClick(test: string) {
    console.log('click', test)
    // return 111
    //  此处的写法相当于 this.$emit('click', 111, test)
  }
  @Emit('image-click')
  private handleImageClick() {
    console.log('1')
  }
  @Emit('title-click')
  private handleTitleClick() {
    console.log('2')
  }
}
</script>

<style lang="scss" scoped>
.image-show {
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  flex-shrink: 0;
  width: var(--width);
  height: var(--height);
  .image-block {
    flex: 1;
    overflow: hidden;
    width: 100%;
    .display-image {
      width: 100%;
      height: 100%;
    }
  }
  .image-title {
    /*height: 25px;*/
    padding: 5px 10px;
    color: var(--primary-color);
    text-align: var(--align);
    .image-sub-title {
      font-size: 12px;
      line-height: 18px;
      color: #777777;
    }
  }
}
</style>
