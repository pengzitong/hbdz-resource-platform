<template>
  <div class="topic-detail">
    <!--    <div class="hover-button border-primary">-->
    <!--      <el-dropdown placement="right-end" :show-timeout="10">-->
    <!--        <span class="el-dropdown-link">-->
    <!--          <i class="el-icon-d-arrow-right"></i>-->
    <!--        </span>-->
    <!--        <el-dropdown-menu class="el-dropdown-menu__link" slot="dropdown">-->
    <!--          <el-dropdown-item-->
    <!--            v-for="item in mockData"-->
    <!--            :key="item.hash"-->
    <!--            style="padding: 0; line-height: 1"-->
    <!--          >-->
    <!--            <a class="nav-target" :href="`#${item.hash}`">{{ item.title }}</a>-->
    <!--          </el-dropdown-item>-->
    <!--        </el-dropdown-menu>-->
    <!--      </el-dropdown>-->
    <!--    </div>-->
    <!--    <div :id="item.hash" class="topic-content" v-for="item in mockData" :key="item.hash">-->
    <!--      <div class="title">{{ item.title }}</div>-->
    <!--      <div class="article" v-html="item.content"></div>-->
    <!--    </div>-->
    <div class="topic-content">
      <div class="title">{{ article.title }}</div>
      <div class="article" v-html="parseHtml(article.content)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component
  // Watch
} from 'vue-property-decorator'
import Introduction from '@/views/platform-introduction/introduction.vue'
import History from '@/views/platform-introduction/history.vue'
import { queryTopicArticles } from '@/api/topic'
import { ITopicArticleDetail } from '@/models'
// import { Route } from 'vue-router'

@Component({
  components: { History, Introduction }
})
export default class TopicDetail extends Vue {
  // private mockData = [
  //   {
  //     title: '专题简介',
  //     hash: 'introduction',
  //     content: `
  //               <p>1.专题简介段落1，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <img style="text-align: center" src="http://www.nimrf.net.cn/uploadfiles/ztUpload/ckImage/201324163512.jpg"></img>
  //               <p>2.专题简介段落2，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落3，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落4，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落5，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落6，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落7，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落8，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题简介段落9，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //     `
  //   },
  //   {
  //     title: '专题历史',
  //     hash: 'history',
  //     content: `
  //               <p>1.专题历史段落1，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <img style="text-align: center" src="http://www.nimrf.net.cn/uploadfiles/ztUpload/ckImage/201324163512.jpg"></img>
  //               <p>2.专题历史段落2，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落3，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落4，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落5，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落6，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落7，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //               <p>2.专题历史段落8，是社会科技进步的重要标志，是增强国家竞争能力的基础性支撑，是国家安全的重要保障。通过国家科技基础条件平台建设，既要有效地促进科技资源的合理保护、科学管理和高效共享，为科技活动提供大量的、高质量的原始性创新资源，又要有效确保我国的生态安全、卫生安全、资源安全、社会安全及国家安全。</p>
  //     `
  //   }
  // ]

  private article: ITopicArticleDetail = {} as ITopicArticleDetail

  private mounted() {
    this.queryTopicArticles()
  }

  private async queryTopicArticles() {
    const { articles_id } = this.$route.query
    this.article = await queryTopicArticles(articles_id as string)
  }

  private parseHtml(html: string) {
    return html && html !== 'null' ? html : ''
  }

  // private mounted() {
  //   location.hash = `#${this.$route.query.target}`
  // }
  //
  // @Watch('$route')
  // private routeChange(route: Route) {
  //   try {
  //     if (route.query.target) {
  //       location.hash = `#${route.query.target}`
  //     }
  //   } catch (e) {
  //     console.warn(e)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.topic-detail {
  .hover-button {
    position: fixed;
    left: 30px;
    top: 350px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 2px 2px 5px var(--primary-color);
    color: var(--primary-color);
    .el-dropdown-link {
      display: inline-block;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        /*transform: scaleY(2);*/
        transition: transform ease-in-out 0.5s;
      }
      &:hover i {
        transform: scale(1.5);
      }
    }
  }

  .topic-content {
    font-size: 15px;
    line-height: 1.8;
    text-align: center;
    text-indent: 30px;

    ::v-deep p {
      text-align: left;
      margin-bottom: 10px;
    }
    .title {
      text-align: left;
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.el-dropdown-menu__link {
  .nav-target {
    color: var(--primary-color);
    text-decoration: none;
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
</style>
