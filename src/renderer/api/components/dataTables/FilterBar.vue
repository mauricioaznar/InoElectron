<template>
  <div>
    <div class="form-group form-row mb-3">
      <mau-form-input-select-static
              :availableObjects="filterControls"
              :initialObjects="initialSelectedFilterControls"
              :displayProperty="'title'"
              :trackBy="'name'"
              :error="''"
              :multiselect="true"
              :name="'selectFilterControls'"
              v-model="selectedFilterControls"
              @keyup.enter.native="doFilter"
              class="col-md-10 col-sm-12"
      >
      </mau-form-input-select-static>
      <div class="col-md-2 col-sm-12">
        <button :disabled="buttonDisabled" class="btn-submit btn btn-primary w-100" @click="doFilter">Buscar</button>
      </div>
    </div>
    <div class="form-group form-row mb-3" v-for="selectedFilterControl in selectedFilterControls">
      <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
        <label>{{selectedFilterControl.title}}</label>
      </div>
      <mau-form-input-text
          v-if="selectedFilterControl.filterType === 'text' || selectedFilterControl.filterType === 'entity'"
          class="col-md-10"
          v-model="selectedFilterControl.value"
          :name="selectedFilterControl.name"
          :initialValue="selectedFilterControl.initialValue"
          v-validate="'required'"
          @keyup.enter.native="doFilter"
          :error="errors.has(selectedFilterControl.name) ? errors.first(selectedFilterControl.name) : ''"
      >
      </mau-form-input-text>
      <mau-form-input-select-static
          v-if="selectedFilterControl.filterType === 'date'"
          v-model="selectedFilterControl.filterDateMode"
          :initialObject="selectedFilterControl.initialFilterDateMode"
          :availableObjects="filterDateModes"
          class="col-sm-12 col-md-2"
          :displayProperty="'text'"
          :trackBy="'value'"
          :name="selectedFilterControl.name + 'filterDateModes'"
          v-validate="'required'"
          @keyup.enter.native="doFilter"
          :error="errors.has(selectedFilterControl.name + 'filterDateModes') ? errors.first(selectedFilterControl.name + 'filterDateModes') : ''"
      >
      </mau-form-input-select-static>
      <mau-form-input-date
          v-if="selectedFilterControl.filterType === 'date'"
          class="col-sm-12"
          :class="{'col-md-4': selectedFilterControl.filterDateMode.value === 'range', 'col-md-8': selectedFilterControl.filterDateMode.value !== 'range'}"
          v-model="selectedFilterControl.startDate"
          :name="selectedFilterControl.name + 'startDate'"
          :initialValue="selectedFilterControl.initialStartDate"
          v-validate="'required'"
          @keyup.enter.native="doFilter"
          :error="errors.has(selectedFilterControl.name + 'startDate') ? errors.first(selectedFilterControl.name + 'startDate') : ''"
      >
      </mau-form-input-date>
      <mau-form-input-date
          v-if="selectedFilterControl.filterType === 'date' && selectedFilterControl.filterDateMode.value === 'range'"
          class="col-sm-12 col-md-4"
          v-model="selectedFilterControl.endDate"
          :name="selectedFilterControl.name + 'endDate'"
          :initialValue="selectedFilterControl.initialEndDate"
          v-validate="'required'"
          @keyup.enter.native="doFilter"
          :error="errors.has(selectedFilterControl.name + 'endDate') ? errors.first(selectedFilterControl.name + 'endDate') : ''"
      >
      </mau-form-input-date>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FilterBar',
    data () {
      return {
        buttonDisabled: false,
        selectedFilterControls: [],
        initialSelectedFilterControls: [],
        filterControls: [],
        filterDateModes: [{ value: 'since', text: 'A partir de' }, { value: 'exact', text: 'Exacto' }, { value: 'range', text: 'Rango' }]
      }
    },
    props: {
      tableFields: {
        type: Array,
        required: true
      },
      localStoragePrefix: {
        type: String,
        required: true
      }
    },
    components: {
    },
    created () {
      this.getFieldControls(this.tableFields)
    },
    mounted () {
      this.doFilter()
    },
    methods: {
      getFieldControls: function (tableFields) {
        this.initialSelectedFilterControls = []
        this.filterControls = []
        let initialSelectedFilterControls = []
        let filterControls = []
        let localStorageControls = JSON.parse(window.localStorage.getItem(this.localStoragePrefix)) || []
        let tableFieldsLength = tableFields.length
        for (let i = 0; i < tableFieldsLength; i++) {
          let tableFieldObj = tableFields[i]
          if (!tableFieldObj.filterType) {
            continue
          }
          let filterControl = {}
          let savedFilterControl
          filterControl.filterType = tableFieldObj.filterType
          filterControl.name = tableFieldObj.name
          filterControl.title = tableFieldObj.title
          if (filterControl.filterType === 'text') {
            savedFilterControl = localStorageControls.find(localStorageControlObj => {
              return tableFieldObj.name === localStorageControlObj.name && tableFieldObj.filterType === localStorageControlObj.filterType
            })
            filterControl.initialValue = savedFilterControl ? savedFilterControl.value : ''
            filterControl.value = savedFilterControl ? savedFilterControl.value : ''
          }
          if (filterControl.filterType === 'entity') {
            savedFilterControl = localStorageControls.find(localStorageControlObj => {
              return tableFieldObj.name === localStorageControlObj.name &&
                      tableFieldObj.filterType === localStorageControlObj.filterType &&
                      tableFieldObj.entityName === localStorageControlObj.entityName &&
                      tableFieldObj.entityFieldName === localStorageControlObj.entityFieldName
            })
            filterControl.initialValue = savedFilterControl ? savedFilterControl.value : ''
            filterControl.entityName = tableFieldObj.entityName
            filterControl.entityFieldName = tableFieldObj.entityFieldName
            filterControl.value = savedFilterControl ? savedFilterControl.value : ''
          }
          if (filterControl.filterType === 'date') {
            console.log(savedFilterControl)
            savedFilterControl = localStorageControls.find(localStorageControlObj => {
              return tableFieldObj.name === localStorageControlObj.name &&
                      tableFieldObj.filterType === localStorageControlObj.filterType
            })
            filterControl.initialStartDate = savedFilterControl ? savedFilterControl.startDateValue : ''
            filterControl.startDate = filterControl.initialStartDate
            filterControl.initialEndDate = savedFilterControl ? savedFilterControl.endDateValue : ''
            filterControl.endDate = filterControl.initialEndDate
            filterControl.initialFilterDateMode =
              savedFilterControl && savedFilterControl.filterDateMode
                ? this.filterDateModes.find(filterDateModeObj => { return filterDateModeObj.value === savedFilterControl.filterDateMode.value }) : this.filterDateModes[0]
            filterControl.filterDateMode = filterControl.initialFilterDateMode
          }
          if (tableFieldObj.default || savedFilterControl) {
            initialSelectedFilterControls.push(filterControl)
          }
          filterControls.push(filterControl)
        }
        this.initialSelectedFilterControls = initialSelectedFilterControls
        this.selectedFilterControls = initialSelectedFilterControls
        this.filterControls = filterControls
      },
      doFilter () {
        let filterParams = {}
        let localStorageControls = []
        let filterEntityCount = 0
        let filterDateCount = 0
        let filterTextCount = 0
        this.selectedFilterControls.forEach(selectedFilterControlObj => {
          if (selectedFilterControlObj.filterType === 'text') {
            filterParams['filter_like_' + (filterTextCount + 1)] = selectedFilterControlObj.name
            filterParams['filter_like_value_' + (filterTextCount + 1)] = selectedFilterControlObj.value
            filterTextCount++
            localStorageControls.push({
              filterType: 'text',
              value: selectedFilterControlObj.value,
              name: selectedFilterControlObj.name
            })
          } else if (selectedFilterControlObj.filterType === 'date') {
            if (selectedFilterControlObj.filterDateMode.value === 'since') {
              filterParams['start_date_' + (filterDateCount + 1)] = selectedFilterControlObj.name
              filterParams['start_date_value_' + (filterDateCount + 1)] = selectedFilterControlObj.startDate
              filterDateCount++
            } else if (selectedFilterControlObj.filterDateMode.value === 'exact') {
              filterParams['filter_like_' + (filterTextCount + 1)] = selectedFilterControlObj.name
              filterParams['filter_like_value_' + (filterTextCount + 1)] = selectedFilterControlObj.startDate
              filterTextCount++
            } else if (selectedFilterControlObj.filterDateMode.value === 'range') {
              filterParams['start_date_' + (filterDateCount + 1)] = selectedFilterControlObj.name
              filterParams['start_date_value_' + (filterDateCount + 1)] = selectedFilterControlObj.startDate
              filterParams['end_date_' + (filterDateCount + 1)] = selectedFilterControlObj.name
              filterParams['end_date_value_' + (filterDateCount + 1)] = selectedFilterControlObj.endDate
              filterDateCount++
            }
            localStorageControls.push({
              filterType: 'date',
              name: selectedFilterControlObj.name,
              filterDateMode: selectedFilterControlObj.filterDateMode,
              startDateValue: selectedFilterControlObj.startDate,
              endDateValue: selectedFilterControlObj.endDate ? selectedFilterControlObj.endDate : ''
            })
          } else if (selectedFilterControlObj.filterType === 'entity') {
            filterParams['filter_entity_' + (filterEntityCount + 1)] = selectedFilterControlObj.entityName
            filterParams['filter_entity_property_' + (filterEntityCount + 1)] = selectedFilterControlObj.entityFieldName
            filterParams['filter_entity_value_' + (filterEntityCount + 1)] = selectedFilterControlObj.value
            filterEntityCount++
            localStorageControls.push({
              filterType: 'entity',
              name: selectedFilterControlObj.name,
              entityName: selectedFilterControlObj.entityName,
              entityFieldName: selectedFilterControlObj.entityFieldName,
              value: selectedFilterControlObj.value
            })
          }
        })
        this.$validator.validateAll().then((result) => {
          if (result) {
            window.localStorage.setItem(this.localStoragePrefix, JSON.stringify(localStorageControls))
            this.$emit('filter', filterParams)
          }
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>

</style>
