<template>
  <div class="vue-data-table">
    <div v-if="hasSearchBar">
      <slot name="search" :onFilterSet="onFilterSet">
        <filter-bar
                :tableFields="tableFields"
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
            :medium="true"
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
                :http-options="httpOptions"
                :appendParams="moreParams"
                :perPage="perPage"
                :row-class="newRowClassFunction"
                :query-params="{sort: 'sort', page: 'page', perPage: 'per_page'}"
                @vuetable:pagination-data="onPaginationData"
                @vuetable:loading="onLoading"
                @vuetable:load-success="onLoadSuccess"
      >
        <template slot="actions" slot-scope="props">
          <div class="custom-actions d-flex justify-content-around">
            <div v-if="viewFunction" class="icon-button view-button custom-action"
                    @click="viewFunction(props.rowData)">
              <span class="fa fa-fw fa-eye"></span>
            </div>
            <div v-if="editFunction" class="ml-2 icon-button edit-button custom-action"
                    @click="editFunction(props.rowData)">
              <span class="fa fa-fw fa-edit"></span>
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
  import FilterBar from '../mau-filters/FilterBar.vue'
  import ItemsPerPage from './datatable-components/ItemsPerPage.vue'
  import ItemsPerPageDefinition from './data/items-per-page-definition'
  import Vue from 'vue'
  import DataTableStyles from './data/data-table-styles'
  import {getHeaders} from 'renderer/services/api/ApiHTPPHeaders'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import isEntityEditable from 'renderer/services/api/isEntityEditable'

  export default {
    name: 'MauDataTable',
    components: {
      FilterBar,
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
      ItemsPerPage
    },
    created () {
      if (!this.tableFields.find(tableField => { return tableField.name === '__slot:actions' })) {
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
      editFunction: {
        type: Function
      },
      viewFunction: {
        type: Function
      }
    },
    data () {
      return {
        isTableLoading: true,
        perPage: 50,
        colorClasses: {},
        httpOptions: {
          headers: getHeaders()
        },
        apiMode: true,
        moreParams: {

        },
        paginationPath: 'links.pagination',
        itemsPerPage: ItemsPerPageDefinition,
        css: DataTableStyles
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
        console.log('action: ' + action, data, index)
      },
      onFilterSet (filterParams) {
        if (this.apiMode) {
          this.moreParams = filterParams
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onItemsPerPage (itemsPerPageValue) {
        this.perPage = itemsPerPageValue
        Vue.nextTick(() => this.$refs.vuetable.refresh())
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
      getBooleanIcon: DisplayFunctions.getBooleanIcon,
      getNameFromObject: DisplayFunctions.getNameFromObject,
      getArrayLength: DisplayFunctions.getArrayLength,
      getValue: DisplayFunctions.getValue,
      getPersona: DisplayFunctions.getPersona,
      getTimeFromDateTime: DisplayFunctions.getTimeFromDateTime,
      getDateFromDateTime: DisplayFunctions.getDateFromDateTime,
      getDate: DisplayFunctions.getDate,
      getNameArray: DisplayFunctions.getNameArray,
      getBagWithUnits: DisplayFunctions.getBagWithUnits,
      getPersonaArray: DisplayFunctions.getPersonaArray,
      getPersonaInformation: DisplayFunctions.getPersonaInformation,
      getBagOrderSaleTotal: DisplayFunctions.getBagOrderSaleTotal
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
