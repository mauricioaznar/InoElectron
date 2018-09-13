<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <vue-select
                v-model="selected"
                :label="displayProperty"
                :track-by="'id'"
                :multiple="multi"
                class="form-control override-form-control"
                :onSearch="search"
                :clearSearchOnSelect="hasClear"
                :options="options"
                :disabled="disabled"
                :class="getBootstrapValidationClass(error)"
        >
            <template slot="option" slot-scope="option">
                {{option[displayProperty]}}
            </template>
            <span slot="no-options">No se encontraron resultados.</span>
        </vue-select>
        <slot></slot>
        <div class="invalid-feedback">
          <span v-show="error" class="help is-danger">
            {{error}}
          </span>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select'
    import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import _ from 'lodash'
    export default {
      data () {
        return {
          selected: null,
          options: []
        }
      },
      inject: ['$validator'],
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
          type: [Object, Array]
        },
        name: {
          type: String
        },
        error: {
          type: String
        },
        entityType: {
          type: Object
        },
        availableOptions: {
          type: Array
        },
        displayProperty: {
          type: String,
          required: true
        },
        searchedProperties: {
          type: Array,
          default: function () {
            return [this.displayProperty]
          }
        },
        label: {
          type: String
        },
        initialObject: {
          type: [Object],
          default: function () {
            return {}
          }
        },
        initialObjects: {
          type: [Array],
          default: function () {
            return []
          }
        },
        hasClear: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        filterExact: {
          type: Object,
          default: function () {
            return {}
          }
        },
        multi: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        disabled: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      created () {
        if (this.multi) {
          if (Array.isArray(this.initialObjects) && this.initialObjects.length !== 0) {
            this.selected = cloneDeep(this.initialObjects)
          }
        } else {
          if (this.initialObject !== null && this.initialObject !== 'null' && typeof this.initialObject === 'object' && Object.keys(this.initialObject).length !== 0) {
            this.selected = cloneDeep(this.initialObject)
          }
        }
        if (this.entityType) {
          ApiOperations.getWithFilterExactWithoutPagination(this.entityType, this.filterExact).then(data => {
            this.options = data
          }).catch(e => {
            console.log(e)
          })
        }
        if (this.availableOptions) {
          this.options = this.availableOptions
        }
      },
      components: {
        VueSelect
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        updateValue: function (newValue) {
          if (this.multi) {

          } else {
            if (newValue === null) {
              newValue = {}
            }
          }
          this.$emit('input', newValue)
        },
        search (search, loading) {
          if (this.entityType) {
            loading(true)
            this.getOptions(search, loading, this)
          }
        },
        getOptions: _.debounce((search, loading, vm) => {
          let filterLikeObject = []
          for (let i = 0; i < vm.searchedProperties.length; i++) {
            filterLikeObject.push({[vm.searchedProperties[i]]: search})
          }
          ApiOperations.getWithFilterLikeWithFilterExactWithoutPagination(vm.entityType, filterLikeObject, vm.filterExact).then(res => {
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
        }
      }
    }
</script>

<style lang="scss">

</style>