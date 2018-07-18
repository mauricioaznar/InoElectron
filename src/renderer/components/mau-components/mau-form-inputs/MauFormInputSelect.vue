<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <vue-select
                v-model="selected"
                :label="displayProperty"
                :track-by="'id'"
                class="form-control override-form-control"
                :onSearch="search"
                :clearSearchOnSelect="hasClear"
                :options="options"
                :class="getBootstrapValidationClass(error)"
        >
            <template slot="option" slot-scope="option">
                {{option[displayProperty]}}
            </template>
            <span slot="no-options">No se encontraron resultados.</span>
        </vue-select>
        <div class="invalid-feedback">
          <span v-show="error" class="help is-danger">
            {{error}}
          </span>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select'
    import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import ApiOperations from 'renderer/services/api/ApiOperations'
    import _ from 'lodash'
    export default {
      data () {
        return {
          selected: null,
          options: []
        }
      },
      $_veeValidate: {
        name () {
          return this.name
        },
        value () {
          return this.value
        }
      },
      props: {
        value: {
          type: [Object]
        },
        name: {
          type: String
        },
        error: {
          type: String,
          required: false
        },
        entityType: {
          type: Object,
          required: true
        },
        displayProperty: {
          type: String,
          default: 'name'
        },
        label: {
          type: String
        },
        initialObject: {
          type: Object,
          default: function () {
            return {}
          }
        },
        hasClear: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      created () {
        if (typeof this.initialObject === 'object' && Object.keys(this.initialObject).length !== 0) {
          this.selected = cloneDeep(this.initialObject)
        }
        ApiOperations.getWithoutPagination(this.entityType).then(data => {
          this.options = data
        }).catch(e => {
          console.log(e)
        })
      },
      components: {
        VueSelect
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        updateValue: function (newValue) {
          if (newValue === null) {
            newValue = {}
          }
          this.$emit('input', newValue)
        },
        search (search, loading) {
          loading(true)
          this.getOptions(search, loading, this)
        },
        getOptions: _.debounce((search, loading, vm) => {
          ApiOperations.getWithoutPagination(vm.entityType, vm.displayProperty, search).then(res => {
            vm.options = res
            loading(false)
          }).catch(e => {
            console.log(e)
          })
        }, 250)
      },
      watch: {
        selected: function (newValue) {
          this.updateValue(newValue)
        },
        initialObject: function (newInitialObject) {
          this.selected = newInitialObject
        }
      }
    }
</script>
