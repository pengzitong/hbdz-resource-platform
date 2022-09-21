<template>
  <section-container class="home-latest-news" title="测试js组件">这个是一个测试组件，用来测试</section-container>
</template>

<script>
import SectionContainer from '@/components/section-container.vue'
export default {
  name: 'Test',
  components: {
    SectionContainer
  },
  mounted() {
    console.log('哈哈，测试组件生效了')
  }
}
</script>

<style scoped></style>
