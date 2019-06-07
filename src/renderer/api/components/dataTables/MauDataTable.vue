<template>
  <div class="vue-data-table">
    <div v-if="hasSearchBar">
      <slot name="search" :onFilterSet="onFilterSet">
        <filter-bar
                ref="filterBar"
                :tableFields="tableFields"
                :localStoragePrefix="localStoragePrefix"
                @loaded="isFilterBarLoading = false"
                @filter="onFilterSet">
        </filter-bar>
      </slot>
    </div>
    <div v-if="hasPagination" v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="d-flex mau-fade-component justify-content-end my-2">
      <vuetable-pagination-info
              ref="paginationInfo"
              :info-template="'{to} pagina(s), Total {total} resultados'"
              :no-data-template="'No hay resultados con los parametros dados'"
      >      // <----
        ></vuetable-pagination-info>
    </div>
    <mau-spinner
            v-show="isTableLoading"
            :sizeType="'dataTable'"
    >
    </mau-spinner>
    <div v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="vue-table mau-fade-component table-responsive">
      <vuetable ref="vuetable"
                :apiUrl="apiUrl"
                :apiMode="apiMode"
                :fields="tableFields"
                :no-data-template="''"
                :css="css.table"
                v-bind:paginationPath="paginationPath"
                :appendParams="appendParams"
                :loadOnStart="false"
                :perPage="perPage"
                :httpOptions="httpOptions"
                :row-class="newRowClassFunction"
                :query-params="{sort: 'sort', page: 'page', perPage: 'per_page'}"
                @vuetable:pagination-data="onPaginationData"
                @vuetable:loading="onLoading"
                @vuetable:load-success="onLoadSuccess"
      >
        <template slot="actions" slot-scope="props">
          <div class="custom-actions d-flex justify-content-around">
            <div v-for="action in actions" class="icon-button view-button custom-action"
                    @click="onAction(action, props.rowData)">
              <span :class="action.icon"></span>
            </div>
          </div>
        </template>
      </vuetable>
    </div>
    <div v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="d-flex mau-fade-component justify-content-center mb-4">
      <vuetable-pagination ref="pagination"
                           v-if="hasPagination"
                           :css="css.pagination"
                           :onEachSide="onEachSide"
                           @vuetable-pagination:change-page="onChangePage"
      >

      </vuetable-pagination>
    </div>
  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
  import FilterBar from './FilterBar.vue'
  import ItemsPerPage from 'renderer/components/mau-components/mau-data-table/datatable-components/ItemsPerPage.vue'
  import ItemsPerPageDefinition from 'renderer/components/mau-components/mau-data-table/data/items-per-page-definition'
  import Vue from 'vue'
  import DataTableStyles from 'renderer/components/mau-components/mau-data-table/data/data-table-styles'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import isEntityEditable from 'renderer/api/functions/isEntityEditable'
  export default {
    name: 'MauDataTable',
    components: {
      FilterBar,
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
      ItemsPerPage
    },
    data () {
      return {
        isTableLoading: true,
        isFilterBarLoading: true,
        perPage: 50,
        colorClasses: {},
        apiMode: true,
        httpOptions: '',
        appendParams: {},
        filterBarParams: {},
        paginationPath: 'links.pagination',
        itemsPerPage: ItemsPerPageDefinition,
        css: DataTableStyles
      }
    },
    created () {
      this.httpOptions = {headers: Vue.http.headers['common']}
      if (this.actions.length > 0) {
        this.tableFields.push({
          name: '__slot:actions',
          title: 'Acciones',
          hidden: true
        })
      }
    },
    props: {
      apiUrl: {
        type: String
      },
      rowClassFunction: {
        type: Function,
        default: function (entityObj) {
          return ''
        }
      },
      tableFields: {
        type: Array,
        required: true
      },
      onEachSide: {
        type: Number,
        default () {
          return 2
        }
      },
      hasPagination: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      hasSearchBar: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      localStoragePrefix: {
        type: String,
        required: true
      },
      actions: {
        type: Array,
        validator: function (array) {
          let isValid = true
          for (let index = 0; index < array.length; index++) {
            let obj = array[index]
            if (obj === null || typeof obj !== 'object') {
              console.error('Element at position ' + index + ' in array is not an object or is null')
              isValid = false
            }
            if (!obj.title) {
              console.error('Object at position ' + index + ' does not have \'title\' property defined')
              isValid = false
            }
            if (!obj.name) {
              console.error('Object at position ' + index + ' does not have \'name\' property defined')
              isValid = false
            }
            if (!obj.icon) {
              console.error('Object at position ' + index + ' does not have \'icon\' property defined')
              isValid = false
            }
          }
          return isValid
        },
        default: function () {
          return []
        }
      }
    },
    methods: {
      newRowClassFunction: function (entityObj) {
        let rowClass = this.rowClassFunction(entityObj)
        if (!isEntityEditable(entityObj)) {
          rowClass += ' edit-button-disabled'
        }
        return rowClass
      },
      onAction (action, data, index) {
        this.$emit('actionClicked', action, data)
      },
      onFilterSet (filterBarParams) {
        this.appendParams = filterBarParams
        this.$nextTick(() => {
          this.$refs.vuetable.refresh()
        })
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onLoadSuccess: function () {
        this.isTableLoading = false
      },
      onLoading: function () {
        this.isTableLoading = true
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      getThreeStateBoolean: DisplayFunctions.getThreeStateBoolean,
      getTwoStateBoolean: DisplayFunctions.getTwoStateBoolean,
      getNameFromObject: DisplayFunctions.getNameFromObject,
      getArrayLength: DisplayFunctions.getArrayLength,
      getValue: DisplayFunctions.getValue,
      getPersona: DisplayFunctions.getPersona,
      getTimeFromDateTime: DisplayFunctions.getTimeFromDateTime,
      getDate: DisplayFunctions.getDate,
      getNameArray: DisplayFunctions.getNameArray,
      getFirstNameFromArray: DisplayFunctions.getFirstNameFromArray,
      getProducts: DisplayFunctions.getProducts,
      getOrderSaleProducts: DisplayFunctions.getOrderSaleProducts,
      getPersonaArray: DisplayFunctions.getPersonaArray,
      getOrderSaleTotalCost: DisplayFunctions.getOrderSaleTotalCost,
      getMachineNames: DisplayFunctions.getMachineNames,
      getDateTime: DisplayFunctions.getDateTime,
      getPropertyFromObject: DisplayFunctions.getPropertyFromObject,
      getOrderSales: DisplayFunctions.getOrderSales,
      getOrderSalesProductsRequested: DisplayFunctions.getOrderSalesProductsRequested,
      getOrderSalesProductsNotRequested: DisplayFunctions.getOrderSalesProductsNotRequested,
      getEmployeeAttendanceImageForList: DisplayFunctions.getEmployeeAttendanceImageForList,
      getEmployeeAttendanceImageForView: DisplayFunctions.getEmployeeAttendanceImageForView
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  @media (max-width: 1258px) {
    .pagination-link-btn:first-child, .pagination-link-btn:last-child {
      display: none;
    }

    .pagination-link-btn:nth-child(2) {
      border-top-left-radius: $btn-border-radius !important;
      border-bottom-left-radius: $btn-border-radius !important;
    }

    .pagination-link-btn:nth-last-child(2) {
      border-top-right-radius: $btn-border-radius !important;
      border-bottom-right-radius: $btn-border-radius !important;
    }
  }
  .custom-action {
    min-width: 40px;
  }
  @media (max-width: 576px) {
    .hide-not-focused-btn:not(.focus) {
      display: none;
    }
  }
</style>
