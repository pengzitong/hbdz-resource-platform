<template>
  <section-container class="home-welcome">
    <div class="welcome-content">
      <div class="left-wrapper">
        <el-image class="welcome-img"></el-image>
      </div>
      <div class="right-wrapper">
        <div class="welcome-title">欢迎访问</div>
        <div class="welcome-text">
          “测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案测试的欢迎文案属国家科技基础条件平台的重要组成部分及成果之一。平台系统整合了我国收藏的具有科学价值的岩矿化石标本资源30万余件，除发布标本信息、古生物化石群专题、典型矿床专题、珠宝玉石特色专题、地学专题、系统矿物学查询系统、精美视频外，还设有全球各国及地区的岩矿化石标本资源网链接。为地学领域科学研究、科技创新、专业教学、科学普及提供服务。
        </div>
        <el-button type="text" class="welcome-button fr"
          >点击了解更多内容</el-button
        >
      </div>
    </div>
  </section-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SectionContainer from '@/components/section-container.vue'

@Component({
  components: { SectionContainer }
})
export default class Welcome extends Vue {}
</script>

<style lang="scss" scoped>
.home-welcome {
  .welcome-content {
    display: flex;
    align-items: center;
    .left-wrapper {
      .welcome-img {
        width: 280px;
        height: 200px;
      }
    }
    .right-wrapper {
      flex: 1;
      margin-left: 20px;
      .welcome-title {
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #dcdfe6;
        /*color: #000099;*/
        color: var(--primary-color);
      }
      .welcome-text {
        margin-top: 10px;
        text-align: justify;
        line-height: 1.5;
        text-indent: 32px;
        /*&:first-letter {*/
        /*    margin-left: 32px;*/
        /*}*/
      }
      .welcome-button {
        color: var(--primary-color);
      }
    }
  }
}
</style>
