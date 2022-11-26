<template>
  <span class="foreign-language-name" v-html="name"></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class ForeignLanguageName extends Vue {
  @Prop({ type: String, default: '' }) private readonly name!: string
}
</script>

<style lang="scss" scoped>
.foreign-language-name {
  ::v-deep i {
    font-style: italic;
  }
}
</style>
