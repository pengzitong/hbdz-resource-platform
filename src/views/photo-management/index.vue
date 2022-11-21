<template>
  <div class="photo-management-container">
    <div class="search-form">
      <el-form ref="searchForm" :model="searchForm" inline label-width="120px">
        <el-form-item prop="keyword" label="查询关键字：">
          <el-input
            @keyup.enter.native="query"
            style="width: 300px"
            v-model="searchForm.keyword"
            size="small"
            placeholder="请输入关键字（颜色、名称等）"
          ></el-input>
        </el-form-item>
        <el-form-item prop="gallery_id" label="类别：">
          <el-select @change="query" size="small" v-model="searchForm.gallery_id">
            <el-option
              v-for="item in category"
              :label="item.name"
              :key="item.gallery_id"
              :value="item.gallery_id"
            ></el-option>
          </el-select>
          <!--          <el-input v-model="searchForm.gallery_id" size="small" placeholder="请输入"></el-input>-->
        </el-form-item>
      </el-form>
    </div>

    <div class="button-group" style="text-align: right; margin: 0 20px 20px 0">
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
    </div>

    <div class="button-group">
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
        新增图片
      </el-button>
    </div>

    <div class="table-wrapper">
      <el-table class="mt-12" border :data="imagesList" stripe>
        <el-table-column prop="resource_name" label="标本名称" width="180">
          <template slot-scope="scope">
            <el-link
              type="primary"
              style="font-weight: 400"
              @click="handleViewSpecimenDetail(scope.row)"
            >
              {{ scope.row.resource_name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="foreign_language_name" label="标本外文名" width="180">
          <template slot-scope="scope">
            <ForeignLanguageName :name="scope.row.foreign_language_name" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片" width="180">
          <template slot-scope="scope">
            <el-image
              :preview-src-list="[scope.row.image_url]"
              :src="scope.row.image_url"
              style="width: 80px; height: 50px"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="specimen_number" label="标本号"></el-table-column>
        <el-table-column prop="best_photo_gallery_id" label="图片ID"></el-table-column>
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
import { queryPhotoGalleryList } from '@/api/photo-gallery'
import { IMineralProduct } from '@/models'
import qs from 'qs'
import { Form as ElForm } from 'element-ui/types/element-ui'
import { deleteGalleryImage } from '@/api/admin'
import { confirm } from '@/utils/decorator'

@Component({ components: { Pagination } })
export default class PhotoManagement extends Mixins(PaginationToQuery) {
  private searchForm: any = {
    gallery_id: 2
  }

  pageInfo = {
    page: 1,
    num: 10,
    all_page: 0
  }
  private textButtonLoading = false

  private readonly category = [
    { name: '矿物精品', gallery_id: 2 },
    { name: '岩石精品', gallery_id: 4 },
    { name: '矿石精品', gallery_id: 3 },
    { name: '化石精品', gallery_id: 1 }
  ]

  private imagesList: IMineralProduct[] = []

  private mounted() {
    this.query()
  }

  private async query() {
    try {
      this.loading = true
      const params: any = {
        ...this.searchForm,
        page: this.pageInfo.page - 1,
        num: this.pageInfo.num
      }

      const { data, all_page } = await queryPhotoGalleryList(params)

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
    this.$router.push(
      // `/photo-management/detail?metaTitle=新增图片&type=add&gallery_id=${this.searchForm.gallery_id}`
      `/photo-management/detail?metaTitle=新增图片&type=add&gallery_id=${this.searchForm.gallery_id}`
    )
  }

  handleViewSpecimenDetail({ specimen_number }: any) {
    this.$router.push(
      `specimen-management/detail?metaTitle=标本详情&specimen_number=${specimen_number}`
    )
  }

  private handleView(row: any) {
    this.$router.push(
      `/photo-management/detail?metaTitle=图片详情&gallery_id=${
        this.searchForm.gallery_id
      }&${qs.stringify(row)}&type=view`
    )
  }

  private handleEdit(row: any) {
    this.$router.push(
      `/photo-management/detail?metaTitle=编辑图片&gallery_id=${
        this.searchForm.gallery_id
      }&${qs.stringify(row)}&type=edit`
    )
  }

  @confirm('确认要删除此图片吗？')
  private async handleDelete({ best_photo_gallery_id }: any) {
    try {
      this.textButtonLoading = true
      await deleteGalleryImage(best_photo_gallery_id)
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
.photo-management-container {
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
