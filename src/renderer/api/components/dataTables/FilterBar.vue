<template>
  <div>
    <div class="form-group form-row">
      <mau-form-input-select-static
              :availableObjects="options"
              :displayProperty="'title'"
              :trackBy="'title'"
              :error="''"
              :name="'selectStatic'"
              v-model="selectedOption"
              class="col-sm-12 col-md-2"
      >
      </mau-form-input-select-static>
      <mau-form-input-text
              v-model="filteredText"
              type="text"
              @keyup.enter.native="doFilter"
              :error="''"
              :name="'inputText'"
              :initialValue="''"
              class="col-sm-12 col-md-9"
              placeholder="Buscar...">
      </mau-form-input-text>
      <div class="col-md-1 col-sm-12">
        <button class="btn-submit btn btn-primary w-100" @click="doFilter">Buscar</button>
      </div>
    </div>
    <div class="form-group">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'FilterBar',
    data () {
      return {
        filteredText: '',
        options: [],
        selectedOption: '',
        initialObject: {},
        relationshipTableFields: ''
      }
    },
    props: {
      tableFields: {
        type: Array,
        required: true
      }
    },
    components: {
    },
    created () {
      this.getTableFieldOptions(this.tableFields)
    },
    methods: {
      getTableFieldOptions: function (tableFields) {
        let options = []
        let tableFieldsLength = tableFields.length
        for (let i = 0; i < tableFieldsLength; i++) {
          let tableFieldObj = tableFields[i]
          if (tableFieldObj.default) {
            this.selectedOption = tableFieldObj
          }
          if (!tableFieldObj.hidden) {
            options.push(tableFieldObj)
          }
        }
        this.options = options
      },
      doFilter () {
        let filterParams = {}
        if (!this.selectedOption.entity) {
          filterParams['filter'] = this.selectedOption.name
          filterParams['filter_value'] = this.filteredText
        }
        if (this.selectedOption.entity) {
          filterParams['filter'] = this.selectedOption.entityFieldName
          filterParams['filter_value'] = this.filteredText
          filterParams['filter_entity'] = this.selectedOption.entity
        }
        this.$emit('filter', filterParams)
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>

</style>
