<template>
  <footer class="layout-footer mt-30">
    <pre class="copyright">

关于我们

Copyright©2000-2022  国家岩矿化石标本资源共享平台 版权所有|京ICP备08011785号-9

承办单位：中国地质大学（北京） 地址：北京市海淀区学院路29号（100083） Tel: 010-82322623 Email: nimrf@cugb.edu.cn

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
