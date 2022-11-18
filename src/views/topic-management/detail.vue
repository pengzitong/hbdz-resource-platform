<template>
  <div class="specimen-management-container">
    <TopicDetail></TopicDetail>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TopicDetail from '@/views/important-topic/topic-detail.vue'
@Component({ components: { TopicDetail } })
export default class SpecimenManagement extends Vue {}
</script>
