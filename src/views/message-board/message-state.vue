<template>
  <div class="message-state">
    <p>·尊重网上道德，遵守中华人民共和国的各项有关法律法规</p>
    <p>·承担一切因您的行为而直接或间接导致的民事或刑事法律责任</p>
    <p>·本资源共享平台留言板管理人员有权保留或删除其管辖留言中的任意内容</p>
    <p>·您在国家岩矿化石标本资源共享平台留言板发表的作品，平台有权在网站内转载或引用</p>
    <p>·参与本留言即表明您已经阅读并接受上述条款</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MessageState extends Vue {}
</script>

<style lang="scss" scoped>
.message-state {
  font-size: 14px;
  color: #333;
  background: rgba(19, 123, 199, 0.25);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
