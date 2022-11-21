<template>
  <div class="specimen-management-container">
    <div class="search-form">
      <el-form inline label-width="120px">
        <el-form-item label="平台资源号：">
          <el-input
            v-model="searchForm.platform_resource_number"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源编号：">
          <el-input
            v-model="searchForm.resource_number"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源中文名称：">
          <el-input
            v-model="searchForm.resource_cn_name"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源外文名称：">
          <el-input
            v-model="searchForm.resource_en_name"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="产地：">
          <el-input
            v-model="searchForm.origin"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="省：">
          <el-select
            style="width: 168px"
            clearable
            placeholder="--请选择--"
            size="small"
            @change="query"
            v-model="searchForm.province"
          >
            <el-option
              v-for="(item, index) in china_province_list"
              :label="item"
              :value="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家：">
          <el-input
            v-model="searchForm.country"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="保存单位：">-->
        <!--          <el-select-->
        <!--            style="width: 168px"-->
        <!--            clearable-->
        <!--            placeholder="&#45;&#45;请选择&#45;&#45;"-->
        <!--            size="small"-->
        <!--            @change="query"-->
        <!--            v-model="searchForm.save_unit"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="(item, index) in save_unit_list"-->
        <!--              :label="item"-->
        <!--              :value="item"-->
        <!--              :key="index"-->
        <!--            ></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="资源提供者：">
          <el-input
            v-model="searchForm.provider"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源形成时代：">
          <el-input
            v-model="searchForm.formative_era"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="标本编号：">
          <el-input
            v-model="searchForm.specimen_number"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别：">
          <el-select
            style="width: 168px"
            placeholder="--请选择--"
            size="small"
            @change="query"
            v-model="searchForm.specimen_type"
          >
            <el-option
              v-for="(item, index) in specimen_type_list"
              :label="item.label"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存位置号：">
          <el-input
            v-model="searchForm.stock_location"
            size="small"
            placeholder="请输入"
            @keyup.enter.native="query"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="button-group" style="text-align: right; margin: 0 20px 20px 0">
      <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
    </div>

    <div class="button-group">
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
        新增标本
      </el-button>

      <!--      <el-button icon="el-icon-upload2" type="primary" size="small" @click="handleQuery">-->
      <!--        批量上传-->
      <!--      </el-button>-->
      <el-upload
        style="display: inline-block; margin-left: 10px"
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleImageFileChange"
        multiple
      >
        <el-button :loading="imageUploadLoading" icon="el-icon-upload2" type="primary" size="small">
          批量上传图片
        </el-button>
      </el-upload>

      <el-upload
        style="display: inline-block; margin-left: 10px"
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleFileChange"
        multiple
      >
        <el-button :loading="uploadLoading" icon="el-icon-upload2" type="primary" size="small">
          批量上传标本
        </el-button>
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>

      <el-button
        style="display: inline-block; margin-left: 10px"
        :loading="downloadLoading"
        icon="el-icon-download"
        type="warning"
        size="small"
        @click="handleDownload"
      >
        下载
      </el-button>
    </div>

    <div class="table-wrapper">
      <el-table v-loading="loading" class="mt-12" border :data="specimenLists" stripe>
        <el-table-column
          prop="platform_resource_number"
          show-overflow-tooltip
          label="平台资源号"
          width="100"
        ></el-table-column>
        <el-table-column prop="resource_name" show-overflow-tooltip label="资源名称">
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
        <el-table-column prop="foreign_language_name" show-overflow-tooltip label="资源外文名">
          <template slot-scope="scope">
            <ForeignLanguageName :name="scope.row.foreign_language_name" />
          </template>
        </el-table-column>
        <el-table-column prop="complete_origin" show-overflow-tooltip label="产地" />
        <el-table-column prop="collation_name" show-overflow-tooltip width="100" label="资源归类" />
        <el-table-column
          prop="stock_location"
          show-overflow-tooltip
          width="100"
          label="库存位置号"
        />
        <el-table-column
          prop="specimen_number"
          show-overflow-tooltip
          width="100"
          label="标本编号"
        />
        <el-table-column label="操作">
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
import { confirm } from '@/utils/decorator'
import PaginationToQuery from '@/mixins/pagination-to-query'
import { ISpecimen } from '@/models'
import { querySpecimenList } from '@/api/specimen'
import { deleteSpecimen, exportExcel, importExcelPost, importImagesPost } from '@/api/admin'
import { downloadFile } from '@/utils/common'
import { readFile } from '@/utils/readfile'
import QuerySelectLists from '@/mixins/querySelectLists'

@Component({ components: { Pagination } })
export default class SpecimenManagement extends Mixins<any>(PaginationToQuery, QuerySelectLists) {
  pageInfo = {
    page: 1,
    num: 10,
    all_page: 0
  }

  private specimen_type_list = [
    { label: '矿物标本', value: '矿物' },
    { label: '岩石标本', value: '岩石' },
    { label: '矿石标本', value: '矿石' },
    { label: '化石标本', value: '化石' }
  ]

  private searchForm: any = {}

  private uploadLoading = false
  private imageUploadLoading = false
  private downloadLoading = false
  private textButtonLoading = false

  private specimenLists: ISpecimen[] = []

  private mounted() {
    this.query()
  }

  private async query() {
    try {
      ;(this as any).loading = true
      const params: any = {
        ...this.searchForm,
        page: this.pageInfo.page - 1,
        num: this.pageInfo.num
      }

      const { data, all_page } = await querySpecimenList(params)

      this.specimenLists = [...data]
      this.pageInfo.all_page = all_page
    } catch (e) {
      console.warn(e)
    } finally {
      ;(this as any).loading = false
    }
  }

  private doImageUpload(file: any) {
    const callback = async (data: any) => {
      try {
        this.imageUploadLoading = true
        await importImagesPost(data)
        this.$message.success(`导入成功`)
      } catch (e) {
        console.log(e)
      } finally {
        this.imageUploadLoading = false
      }
    }
    readFile(file.raw, callback)
  }

  private doUpload(file: any) {
    const callback = async (data: any) => {
      try {
        this.uploadLoading = true
        const { success_num, fail_num, url } = await importExcelPost(data)
        this.$message.success(`导入结果：成功${success_num}条,失败${fail_num}条`)
        if (url) {
          downloadFile(url)
        }
        this.query()
      } catch (e) {
        console.log(e)
      } finally {
        this.uploadLoading = false
      }
    }
    readFile(file.raw, callback)
  }

  private handleFileChange(file: any) {
    const fileExt = file.name.replace(/.+\./, '')
    if (['xlsx', 'xls'].indexOf(fileExt.toLowerCase()) === -1) {
      this.$message.error('格式不符合要求，请上传.xlsx、.xls格式的文件')
      return
    }
    this.doUpload(file)
  }

  private handleImageFileChange(file: any) {
    const fileExt = file.name.replace(/.+\./, '')
    if (['zip'].indexOf(fileExt.toLowerCase()) === -1) {
      this.$message.error('格式不符合要求，请上传.zip格式的文件')
      return
    }
    this.doImageUpload(file)
  }

  private async handleDownload() {
    try {
      this.downloadLoading = true
      const params = {
        page: this.pageInfo.page,
        num: this.pageInfo.num,
        ...this.searchForm
      }
      const { url } = await exportExcel(params)
      console.log(url, 'url')
      downloadFile(url)
      this.$message.success('下载成功')
    } catch (e) {
      console.warn(e, 'handleDownload')
    } finally {
      this.downloadLoading = false
    }
  }
  private handleQuery() {
    this.pageInfo.page = 1
    this.query()
  }

  private handleReset() {
    this.searchForm = {}
    this.handleQuery()
  }

  private handleAdd() {
    this.$router.push(`/specimen-management/ud-detail?metaTitle=新增标本&type=add`)
  }

  private handleViewSpecimenDetail({ specimen_number }: any) {
    this.$router.push(
      `/specimen-management/detail?metaTitle=标本详情&specimen_number=${specimen_number}`
    )
  }

  private handleView({ specimen_number }: any) {
    this.$router.push(
      `/specimen-management/ud-detail?metaTitle=标本信息&type=view&specimen_number=${specimen_number}`
    )
  }

  private handleEdit({ specimen_number }: any) {
    // this.$router.push(
    //   `/specimen-management/ud-detail?metaTitle=编辑标本&type=edit&specimen_number=${specimen_number}`
    // )
    const routeData = this.$router.resolve({
      path: `/specimen-management/ud-detail?metaTitle=编辑标本&type=edit&specimen_number=${specimen_number}`
    })
    window.open(routeData.href, '_blank')
  }

  @confirm('确认要删除此标本吗？')
  private async handleDelete({ specimen_number }: any) {
    try {
      this.textButtonLoading = true
      await deleteSpecimen(specimen_number)
      this.$message.success('删除成功')
      this.handleQuery()
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
.specimen-management-container {
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
