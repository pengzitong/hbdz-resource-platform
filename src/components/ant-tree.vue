<template>
  <div style="margin-left: 20px">
    <a-tree
      default-expand-all
      show-icon
      show-line
      :selected-keys="selectedKeys"
      :tree-data="treeData"
      :replaceFields="{ children: 'child_params', title: 'name', key: 'class_no' }"
      @select="onSelect"
    >
      <span slot="title" slot-scope="scope">{{ scope.name }}({{ scope.num }})</span>
      <span slot="switcherIcon">
        <span class="folder-wrapper">
          <a-icon class="icon-arrow" type="down" />
          <i class="el-icon-folder el-icon-folder-closed" />
          <i class="el-icon-folder-opened" />
        </span>
      </span>
    </a-tree>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/lib/tree/style'
import { Tree, Icon } from 'ant-design-vue'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
// import Tree from 'ant-design-vue/lib/tree/index.js'

@Component({
  components: {
    [Tree.name]: Tree,
    [Icon.name]: Icon
  }
})
export default class AntTree extends Vue {
  @Prop({ default: () => [] }) private readonly treeData!: Array<any>
  @Prop({ default: () => [] }) private readonly selectedKeys!: any[]

  @Emit('change')
  private onSelect(checkedKeys: string[]) {
    // this.$emit('update:selected-keys', checkedKeys)
    // this.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
/*::v-deep .ant-tree li .ant-tree-node-content-wrapper:hover {*/
/*background-color: unset;*/
/*}*/
.folder-wrapper {
  margin-left: -2px;
  .icon-arrow {
    transform: translateX(-3px);
  }
}

.ant-tree-switcher_close {
  .el-icon-folder-opened {
    display: none;
  }
}
.ant-tree-switcher_open {
  .el-icon-folder-closed {
    display: none;
  }
}

.el-icon-folder-closed,
.el-icon-folder-opened {
  font-size: 17px;
  transform: translateY(2px);
  color: #666;
}
</style>
