<template>
  <div>
    <div class="form-group form-row">
      <b-form-select
              :options="options"
              :label="'text'"
              v-model="selectedOption"
              class="col-sm-12 col-md-2 override-form-control form-control"
      >
      </b-form-select>
      <b-form-input v-model="filteredText"
                    type="text"
                    @keyup.enter.native="doFilter"
                    class="col-sm-12 col-md-9 form-control"
                    placeholder="Buscar...">
      </b-form-input>
      <button class="btn-submit btn btn-primary col-md-1 col-sm-12" @click="doFilter">Buscar</button>
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
          let option = {}
          let tableFieldObj = tableFields[i]
          option.value = tableFieldObj
          option.text = tableFieldObj.title
          if (tableFieldObj.default) {
            this.selectedOption = option
          }
          if (!tableFieldObj.hidden) {
            options.push(option)
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
