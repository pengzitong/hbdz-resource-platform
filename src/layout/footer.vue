<template>
  <footer class="layout-footer">
    <pre class="copyright">

关于我们

Copyright©2000-2022  国家岩矿化石标本资源共享平台 版权所有|京ICP备08011785号-9

承办单位：中国地质大学（北京） 地址：北京市海淀区学院路29号（100083） Tel: 010-82322623 Email: nimrf@cugb.edu.cn

合作单位：中国地质博物馆 中科院古脊椎动物与古人类研究所 中科院南京地质古生物研究所 中国地质大学(武汉)博物馆 吉林大学博物馆

中国地质科学院矿产资源研究所 自贡恐龙博物馆 北京大学 河南省地质博物馆 成都理工大学博物馆 昆明理工大学博物馆

重庆自然博物馆 新疆地矿局博物馆 桂林理工大学地质博物馆 自然资源实物地质资料中心 上海自然博物馆 安徽省地质博物馆 东华理工大学

本网站所有数据版权归“国家岩矿化石标本资源共享平台”所有，如需引用，须向平台提出申请，获批后遵照 版权声明 相关内容执行。如未经授权擅自使用，本站将依法追究相关责任！
        </pre
    >
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Header extends Vue {
  private readonly s1!: string
}
</script>

<style lang="scss" scoped>
.layout-footer {
  /*height: 200px;*/
  background: url('~@/assets/images/top-banner.png') no-repeat center/100% 100%;
  .copyright {
    font-size: 14px;
    color: #ffffff;
    text-align: center;
  }
}
</style>
