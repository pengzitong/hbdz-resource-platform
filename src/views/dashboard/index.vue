<template>
  <div class="dashboard-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="box-card-title">
        <span>快捷入口</span>
      </div>
      <div
        v-for="item in entries"
        :key="item.path"
        class="entry-card"
        @click="$router.push(item.path)"
      >
        {{ item.name }}
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  private entries = [
    { path: '/photo-management/detail?metaTitle=新增图片', name: '新增图片' },
    { path: '/specimen-management/detail?metaTitle=新增标本', name: '新增标本' }
  ]
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .box-card {
    .box-card-title {
      color: var(--primary-color);
      font-size: 14px;
    }
    .entry-card {
      cursor: pointer;
      display: inline-block;
      background: var(--primary-color);
      text-align: center;
      line-height: 60px;
      font-size: 12px;
      color: #fff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      + .entry-card {
        margin-left: 20px;
      }
    }
  }
}
</style>
