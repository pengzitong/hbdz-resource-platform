import { Component, Mixins } from 'vue-property-decorator'
import { querySelectLists } from '@/api/specimen'

@Component
export default class extends Mixins() {
  private china_province_list = []
  private save_unit_list = []

  private async mounted() {
    const { china_province, save_unit } = await querySelectLists()
    this.china_province_list = china_province
    this.save_unit_list = save_unit
  }
}
