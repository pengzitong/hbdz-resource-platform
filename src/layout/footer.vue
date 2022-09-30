<template>
  <footer class="layout-footer mt-30">
    <pre class="copyright">

关于我们

Copyright©2000-2022  湖北地质博物馆标本资源库 版权所有

地址：武汉市江汉区利济北路250附4号（430022） Tel: 027-85833247 Email:

本网站所有数据版权归“湖北地质博物馆标本资源库”所有，如需引用，须向平台提出申请，获批后遵照 版权声明 相关内容执行。如未经授权擅自使用，本站将依法追究相关责任！
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
