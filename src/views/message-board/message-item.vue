<template>
  <div class="message-item border-primary">
    <div class="message-item-header">1</div>
    <div class="message-item-body">
      <el-image class="message-image" fit="cover" :src="require('@/assets/images/news0.jpeg')"></el-image>
      <div class="message-content">
        <p class="message-text">
          <span class="label">主题：</span>
          <span>留言标题</span>
        </p>
        <p class="message-text">
          <span class="label"></span>
          <span>留言内容</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-item'
}
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  flex-direction: column;
  .message-item-header {
    height: 30px;
    background: var(--primary-color);
    opacity: 0.1;
  }
  .message-item-body {
    display: flex;
    .message-image {
      width: 100px;
      height: 100px;
    }
    .message-content {
      margin: 12px 0 0 12px;
      font-size: 13px;
      color: #333;
      line-height: 1.5;
      .message-text {
        .label {
          display: inline-block;
          font-weight: bold;
          width: 40px;
        }
      }
    }
  }
}
</style>
