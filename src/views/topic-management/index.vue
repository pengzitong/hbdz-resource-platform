<template>
  <div class="topic-management-container">
    <div class="search-form">
      <el-form ref="searchForm" :model="searchForm" inline label-width="120px">
        <!--        <el-form-item prop="keyword" label="查询关键字：">-->
        <!--          <el-input-->
        <!--            @keyup.enter.native="query"-->
        <!--            style="width: 300px"-->
        <!--            v-model="searchForm.keyword"-->
        <!--            size="small"-->
        <!--            placeholder="请输入关键字（颜色、名称等）"-->
        <!--          ></el-input>-->
        <!--        </el-form-item>-->

        <el-form-item label="专题类别：" prop="topic_id">
          <el-select @change="query" size="small" v-model="searchForm.topic_id">
            <el-option
              v-for="item in topicsList"
              :label="item.name"
              :key="item.topic_id"
              :value="item.topic_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="button-group" style="text-align: right; margin: 0 20px 20px 0">
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
    </div>

    <div class="button-group">
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
        新增专题
      </el-button>
    </div>

    <div class="table-wrapper">
      <el-table class="mt-12" border :data="imagesList" stripe>
        <el-table-column prop="title" label="专题名称">
          <template slot-scope="scope">
            <el-link
              type="primary"
              style="font-weight: 400"
              @click="handleViewTopicDetail(scope.row)"
            >
              {{ scope.row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="topic_name" label="专题类别"></el-table-column>

        <el-table-column prop="cover_url" label="专题封面图片">
          <template slot-scope="scope">
            <el-image
              :preview-src-list="[
                env == 'development'
                  ? `http://tripod.wx-local.leqiai.cn/${scope.row.cover_url}`
                  : `${scope.row.cover_url}`
              ]"
              :src="
                env == 'development'
                  ? `http://tripod.wx-local.leqiai.cn/${scope.row.cover_url}`
                  : `${scope.row.cover_url}`
              "
              style="width: 80px; height: 50px"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="articles_id" label="专题ID"></el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              :loading="textButtonLoading"
              type="text"
              size="small"
              @click="handleView(scope.row)"
            >
              查看
            </el-button>
            <el-button
              :loading="textButtonLoading"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              :loading="textButtonLoading"
              type="text"
              size="small"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
        :current-page.sync="pageInfo.page"
        :page-size.sync="pageInfo.num"
        :page-count="pageInfo.all_page"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import Pagination from '@/components/pagination.vue'
import PaginationToQuery from '@/mixins/pagination-to-query'
import { IMineralProduct } from '@/models'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { deleteTopic, queryTopicsList } from '@/api/admin'
import { confirm } from '@/utils/decorator'
import { queryHomePageSource } from '@/api/home'

@Component({ components: { Pagination } })
export default class TopicManagement extends Mixins(PaginationToQuery) {
  private searchForm: any = {}

  pageInfo = {
    page: 1,
    num: 10,
    all_page: 0
  }

  private textButtonLoading = false

  private imagesList: IMineralProduct[] = []

  private topicsList = []

  private get env() {
    return process.env.VUE_APP_API_ENV
  }

  private async mounted() {
    this.query()
    const { important_topics } = await queryHomePageSource()
    this.topicsList = important_topics
  }

  private async query() {
    try {
      this.loading = true
      const params: any = {
        ...this.searchForm,
        page: this.pageInfo.page - 1,
        num: this.pageInfo.num
      }

      const { data, all_page } = await queryTopicsList(params)

      this.imagesList = [...data]
      this.pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      this.loading = false
    }
  }

  private handleReset() {
    ;(this.$refs.searchForm as ElForm).resetFields()
    this.query()
  }

  private handleAdd() {
    this.$router.push(`/topic-management/cu-detail?metaTitle=新增专题&type=add`)
  }

  handleViewTopicDetail({ articles_id }: any) {
    this.$router.push(
      `/topic-management/topic-detail?metaTitle=专题详情&articles_id=${articles_id}`
    )
  }

  private handleView({ articles_id }: any) {
    this.$router.push(
      `/topic-management/cu-detail?metaTitle=专题详情&articles_id=${articles_id}&type=view`
    )
  }

  private handleEdit({ articles_id }: any) {
    this.$router.push(
      `/topic-management/cu-detail?metaTitle=编辑专题&articles_id=${articles_id}&type=edit`
    )
  }

  @confirm('确认要删除此专题吗？')
  private async handleDelete({ articles_id }: any) {
    try {
      this.textButtonLoading = true
      await deleteTopic(articles_id)
      this.$message.success('删除成功')
      this.query()
    } catch (e) {
      console.log(e, 'handleDelete')
    } finally {
      this.textButtonLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/table.scss';
.topic-management-container {
  .search-form {
    padding: 10px 0;
  }
  .table-wrapper {
    ::v-deep .el-table {
      .el-table__header-wrapper,
      .el-table__body-wrapper {
        th {
          padding: 10px 0;
        }
        td {
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
