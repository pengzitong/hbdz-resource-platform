<template>
  <div style="margin-left: 20px">
    <!--    {{ selectedKeys }}-->
    <a-tree default-expand-all show-icon show-line :selected-keys="selectedKeys" :tree-data="treeData" @select="onSelect">
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

<script>
import 'ant-design-vue/lib/tree/style'

import Tree from 'ant-design-vue/lib/tree'
import { Icon } from 'ant-design-vue'

export default {
  name: 'CustomTree',
  components: {
    [Tree.name]: Tree,
    [Icon.name]: Icon
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedKeys: ['0-0-0-0']
    }
  },
  methods: {
    onSelect(checkedKeys, info) {
      console.log(checkedKeys, 'checkedKeys')
      this.selectedKeys = checkedKeys
    }
  }
}
</script>

<style lang="scss" scoped>
/*::v-deep .ant-tree li .ant-tree-node-content-wrapper:hover {*/
/*background-color: unset;*/
/*}*/
.folder-wrapper {
  margin-left: -10px;
  .icon-arrow {
    transform: translateX(-10px);
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
