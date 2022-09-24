<template>
  <div class="specimen-detail">
    <table class="specimen-detail-table mb-10">
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">护照信息</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
        <td>
          <span>平台资源号：2311C0001000000004</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center">
          <span class="section-title">基本特征特性描述信息</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 0">
          <div>
            <table style="width: 100%">
              <tr>
                <td style="width: 10%; border: none">简要特征描述：</td>
                <td style="width: 90%; border-top: none">
                  花粉粒长28.7-37微米,宽20-29微米。花粉粒极面轮廓宽椭圆形,长椭圆形,侧面观形如篮子或元宝。外壁厚约2.3微米,内层厚于外层,远极面微凸呈平弧状,由长形的两片面组成,其间为沟,沟长达两端,宽1-3微米,直或微弯曲,体两端外壁略加厚或不加厚,近极面中部垂直于长轴方向有两个近圆形的突起,由一细条带相连,表面为内颗粒状纹饰。
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>

    <div class="print-wrapper">
      <el-button size="small" @click="handlePrint">打印本页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class SpecimenDetail extends Vue {
  private form = {
    platFormSourceNo: '',
    sourceNo: ''
  }

  private handlePrint() {
    window.print()
  }
}
</script>

<style lang="scss" scoped>
.specimen-detail {
  .specimen-detail-table {
    width: 100%;
    border-collapse: separate;
    border-right: 1px solid #e9ebef;
    border-bottom: 1px solid #e9ebef;
    border-radius: 4px;
    font-size: 13px;
    line-height: 20px;

    tr {
      text-align: left;
      &:nth-child(odd) {
        background: #f9f9f9;
      }
      td {
        padding: 8px 5px;
        width: 50%;
        border-left: 1px solid #e9ebef;
        border-top: 1px solid #e9ebef;
        transform: scale(1);
        .section-title {
          font-size: 18px;
          color: var(--primary-color);
        }
      }
      &:first-child {
        td:first-child {
          border-top-left-radius: 4px;
        }
        td:last-child {
          border-top-right-radius: 4px;
        }
      }
      &:last-child {
        td:first-child {
          border-bottom-left-radius: 4px;
        }
        td:last-child {
          border-bottom-right-radius: 4px;
        }
      }
    }
  }

  .print-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
