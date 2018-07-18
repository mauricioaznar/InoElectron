<template>
    <div>
            <div class="form-group form-row search-container">
                <b-form-input v-model="filteredText"
                              type="text"
                              @keyup.enter.native="doFilter"
                              placeholder="Buscar documentos..."
                              class="col-sm-12 col-md-6"
                                >
                </b-form-input>
                <mau-form-input-date-time
                        :inputType="'range'"
                        v-model="rangeDate"
                        class="col-sm-12 col-md-3 no-padding"
                        :initialValue="rangeDate">
                </mau-form-input-date-time>
                <b-btn class="col-sm-12 col-md-1 btn-collapse py-1"
                       aria-controls="collapse4"
                       v-b-modal.advancedSearchModal
                >
                    <span class="fa fa-gear"></span>
                </b-btn>
                <button class="btn-submit btn btn-primary col-md-1 col-sm-12 py-2" @click="doFilter">Buscar</button>
                <a class="btn-submit btn btn-excel col-md-1 col-sm-12 py-2" :class="{disabled: !startDateExcel && !endDateExcel}" :href="excelRoute + 'start_date=' + startDateExcel + '&end_date=' + endDateExcel">
                    <button class="">Excel</button>
                </a>
            </div>
            <b-modal class="mau-custom-modal" id="advancedSearchModal" ref="advancedSearchModal" title="Busqueda Avanzada">
                <!--<div class="form-group">-->
                    <!--<vue-select v-model="users" class="form-control" :multiple="true" :options="availableUsers">-->
                    <!--</vue-select>-->
                <!--</div>-->
                <div class="form-group mb-3">
                    <label>Operacion</label>
                    <b-form-select v-model="operation" :options="availableOperations" class="form-control" :select-size="1"></b-form-select>
                </div>
                <div class="form-group mb-3">
                    <label>Entidad</label>
                    <b-form-select v-model="entitySelectedFilter" :options="entityFilters" class="form-control" :select-size="1"></b-form-select>
                </div>
                <!--<div class="form-group">-->
                    <!--<vue-select v-model="attachments" class="form-control" :multiple="false" :options="availableAttachments">-->
                    <!--</vue-select>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<vue-select v-model="groups" class="form-control" :multiple="false" :options="availableGroups">-->
                    <!--</vue-select>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<vue-select v-model="grantors" class="form-control" :multiple="false" :options="availableGrantors">-->
                    <!--</vue-select>-->
                <!--</div>-->
                <div class="form-group mb-3">
                    <label>Filtros de documento</label>
                    <b-form-checkbox-group v-model="documentSelectedFilter" class="form-control" :options="documentFilters"></b-form-checkbox-group>
                </div>
                <div class="form-group mb-3">
                    <label>Tipo</label>
                    <b-form-radio-group v-model="documentTypeSelectedFilter" class="form-control" :options="availableDocumentTypes"></b-form-radio-group>
                </div>
                <div class="form-group mb-3">
                    <label>Status</label>
                    <b-form-radio-group v-model="documentStatusSelectedFilter" class="form-control" :options="availableDocumentStatuses"></b-form-radio-group>
                </div>
                <div class="form-group mb-3">
                    <label>Filtros de contacto</label>
                    <b-form-checkbox-group v-model="contactSelectedFilter" class="form-control" :options="contactFilters"></b-form-checkbox-group>
                </div>
                <button class="btn-submit btn btn-primary col-sm-12" @click="doFilter">Buscar</button>
                <div slot="modal-footer" class="no-padding">
                </div>
            </b-modal>
        </div>
</template>

<script>
  import {mapState} from 'vuex'
  import VueSelect from 'vue-select'
  import moment from 'moment'
  import {getApiRoute, ApiRouteTypes} from 'renderer/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import EntityActions from 'renderer/api/store/entityActions'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import isDefined from 'renderer/services/common/isDefined'
  import getArrayFromProperty from 'renderer/services/common/getArrayFromProperty'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  export default {
    name: 'AdvancedFilter',
    data () {
      return {
        filteredText: '',
        rangeDate: moment().startOf('year').format('L') + ' al ' + moment().startOf('year').add(1, 'years').format('L'),
        clients: '',
        documentStatus: '',
        documentType: '',
        operation: '',
        attachments: '',
        documentStatusSelectedFilter: '',
        documentTypeSelectedFilter: '',
        documentSelectedFilter: '',
        entitySelectedFilter: '',
        contactSelectedFilter: '',
        excelRoute: '',
        groups: '',
        endDateExcel: moment().startOf('year').add(1, 'years').format('L'),
        startDateExcel: moment().startOf('year').format('L'),
        grantors: '',
        users: '',
        documentFilters: [
          {text: 'Folio', value: 'folio'},
          {text: 'Numero de acta', value: 'file_number'},
          {text: 'Tomo/Libro', value: 'tome'}
        ],
        entityFilters: [
          {text: 'Cliente', value: 'client'},
          {text: 'Abogado', value: 'lawyer'},
          {text: 'Otorgante', value: 'grantor'}
        ],
        contactFilters: [
          {text: 'Nombre', value: 'fullname'},
          {text: 'Telefono', value: 'housephone'},
          {text: 'Email', value: 'email'}
        ],
        showCollapse: false
      }
    },
    created () {
      this.getInitialData()
      this.excelRoute = getApiRoute(EntityTypes.EXCEL, ApiRouteTypes.EXCEL)
      this.documentSelectedFilter = ['folio', 'file_number', 'tome']
      this.contactSelectedFilter = ['housephone', 'email', 'fullname']
    },
    computed: {
      ...mapState({
        availableClients: state => getArrayFromProperty(state.api.entity.clients, 'name'),
        availableDocumentStatuses: state => state.api.entity.documentStatuses.map(obj => {
          return {value: obj.id, text: obj.name}
        }),
        availableDocumentTypes: state => state.api.entity.documentTypes.map(obj => {
          return {value: obj.id, text: obj.name}
        }),
        availableOperations: state => state.api.entity.operations.map(obj => {
          return {value: obj.id, text: obj.name}
        }),
        availableAttachments: state => getArrayFromProperty(state.api.entity.attachments, 'name'),
        availableGroups: state => getArrayFromProperty(cloneDeep(state.api.entity.groups), 'name'),
        availableGrantors: state => getArrayFromProperty(state.api.entity.grantors, 'fullname'),
        availableUsers: state => getArrayFromProperty(state.api.entity.users, 'fullname')
      })
    },
    components: {
      MauFormInputSelect,
      VueSelect
    },
    methods: {
      getInitialData: function () {
        this.$store.dispatch(EntityActions.GET_OPERATIONS)
        // this.$store.dispatch(EntityActions.GET_LAWYERS) TODO Erase lawyers
      },
      getRangeDate: function () {
        let startDate
        let endDate
        let includesSeparator = this.rangeDate.includes(' al ')
        if (includesSeparator) {
          let rangeDate = this.rangeDate.split(' al ')
          startDate = rangeDate[0]
          endDate = rangeDate[1]
        }
        return {endDate, startDate}
      },
      getSearchQuery: function () {
        let {endDate, startDate} = this.getRangeDate()
        const searchQuery =
          {
            q: this.filteredText,
            start_date: startDate,
            end_date: endDate
          }
        // Number
        let documentTypeValue = this.documentTypeSelectedFilter
        if (!isNaN(documentTypeValue) && documentTypeValue > 0) {
          searchQuery.document_type_id = documentTypeValue
        }
        let documentValue = this.documentSelectedFilter
        if (isDefined(documentValue) && documentValue.length > 0) {
          searchQuery.document_filters = documentValue.join('|')
        }
        let contactValue = this.contactSelectedFilter
        if (isDefined(contactValue) && documentValue.length > 0) {
          searchQuery.contact_filters = contactValue.join('|')
        }
        // String
        let entityValue = this.entitySelectedFilter
        if (isDefined(entityValue) && entityValue.length > 0) {
          searchQuery.entity_filters = entityValue
        }
        let operationValue = this.operation
        if (isDefined(operationValue) && operationValue.length > 0) {
          searchQuery.operation_id = operationValue.id
        }
        let statusValue = this.documentStatusSelectedFilter
        // console.log(statusValue)
        if (statusValue !== '') {
          searchQuery.document_status_id = statusValue
        }
        return searchQuery
      },
      doFilter () {
        let searchQuery = this.getSearchQuery()
        this.$refs.advancedSearchModal.hide()
        this.$emit('filter', searchQuery)
      }
    },
    mounted () {
      this.doFilter()
    },
    watch: {
      rangeDate: function () {
        let {startDate, endDate} = this.getRangeDate()
        this.startDateExcel = startDate
        this.endDateExcel = endDate
      }
    }
  }
</script>

<style lang="scss" scoped>
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }
    .no-padding {
        padding: 0;
    }
</style>
