<template>
  <div class="message-board border-primary mb-12">
    <special-title title="平台留言" class="mb-12" />
    <message-item class="mb-12" />
    <message-item class="mb-12" />
    <message-item class="mb-12" />
    <message-item class="mb-12" />
    <message-item class="mb-12" />
    <special-title title="我要留言" class="mb-12" type="diamond" />
    <publish-message class="mb-12" />
    <message-state />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SpecialTitle from '@/components/special-title.vue'
import MessageItem from '@/views/message-board/message-item.vue'
import PublishMessage from '@/views/message-board/publish-message.vue'
import MessageState from '@/views/message-board/message-state.vue'

@Component({
  components: { MessageState, PublishMessage, MessageItem, SpecialTitle }
})
export default class MessageBoard extends Vue {}
</script>

<style lang="scss" scoped>
.message-board {
  padding: 12px;
}
</style>
