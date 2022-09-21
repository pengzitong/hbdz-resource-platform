<template>
  <!-- 写一个table -->
  <!-- 封装一个分页？ -->
  <!-- 做一个无限加载？ -->
  <div class="test">
    <div style="text-align: right">
      <el-button type="primary">查询</el-button>
    </div>
    <el-table :data="listData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column
        prop="username"
        label="操作账号"
        width="180"
      ></el-table-column>
      <el-table-column prop="requestIp" label="ip"></el-table-column>

      <el-table-column prop="address" label="ip来源"></el-table-column>
      <el-table-column prop="browser" label="浏览器"></el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 20px">
      <el-pagination
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :total="50"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUser } from '@/api/index'
// import { AxiosPromise } from 'axios';
import { IList } from '@/models'

interface ICarewords {
  id: number
  careTips: string
  triggerKey: string
  pictureFowardUrl?: string
}

@Component({
  name: 'Test'
})
export default class Test extends Vue {
  // private listData: ICarewords[] = []
  private listData: Array<ICarewords> = []
  private page = 1

  created(): void {
    console.log('页面生命周期created!')
  }

  mounted(): void {
    console.log('mounted!')
    this.queryList()

    function printLabel(labelledObj: { label: string }) {
      console.log(labelledObj.label)
    }
    printLabel({ size: 10, label: 'Size 10 Object' } as { label: string })

    this.testInterface()
  }

  // ts: interface  额外属性检查可能导致报错，解决方式：1.字符串索引签名 2.使用as 3.使用别的属性接收
  private testInterface() {
    // ---------普通接口-----------
    interface SquareConfig {
      width?: number
      color?: string
      [name: string]: any // 1.字符串索引签名方式解决报错
    }
    let mySquare: SquareConfig
    mySquare = { width: 100, color: '#f00' }
    console.log(mySquare)

    let mySquare2: SquareConfig
    mySquare2 = { width: 100, aa: '111' } // 如果没有上面的字符串索引签名会报错
    mySquare2 = { width: 100, aa: '111' } as SquareConfig // 2.使用as方式解决报错
    const obj = { width: 100, aa: '111' } // 3.使用别的属性接收
    mySquare2 = obj
    console.log(mySquare2)
    // ---------函数-----------
    interface SearchFunc {
      (source: string, subString: string): boolean
    }
    let fun1: SearchFunc
    fun1 = (s, str) => {
      console.log(s, str)
      return true
    }
    fun1('s', 'sss')
  }

  /**
   * 获取列表数据
   */
  private async queryList() {
    // const res = await getListData('manager/logs', {
    //   page: this.page,
    //   size: 10
    // })
    // this.listData = res?.content || []
    // console.log(res)
  }

  private queryUser = async () => {
    const params: IList = {
      username: '章三',
      age: 10
    }
    const res = await getUser(params)
    console.log(res, 'res')
  }

  private handlePageChange(currentPage: number) {
    this.page = currentPage
    this.queryList()
  }
}
</script>
