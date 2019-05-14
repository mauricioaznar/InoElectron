<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <vue-select
                class="form-control p-0"
                :class="getBootstrapValidationClass(error)"
                v-model="selected"
                :multiple="multiselect"
                :label="displayProperty"
                :onSearch="search"
                :track-by="'id'"
                :options="options">
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
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
    import _ from 'lodash'
    import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
    export default {
      name: 'MauFormInputSelectObjectDynamic',
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
          return this.selected
        }
      },
      props: {
        endpointName: {
          type: String,
          required: true
        },
        apiOperationOptions: {
          type: Object,
          default: function () {
            return {
              paginate: false
            }
          }
        },
        label: {
          type: String
        },
        multiselect: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        initialObject: {
          type: Object,
          default: function () {
            return {}
          }
        },
        initialObjects: {
          type: Array,
          default: function () {
            return []
          }
        },
        error: {
          type: String,
          required: true
        },
        displayProperty: {
          type: String,
          required: true
        },
        searchProperty: {
          type: String,
          default: function () {
            return this.displayProperty
          }
        },
        name: {
          type: String,
          required: true
        }
      },
      created () {
        if (this.multiselect === false && !isObjectEmpty(this.initialObject)) {
          this.selected = this.initialObject
        } else if (this.multiselect === true && this.initialObjects.length > 0) {
          this.selected = cloneDeep(this.initialObjects)
        }
        GenericApiOperations.list(this.endpointName, this.apiOperationOptions).then(res => {
          this.options = res
        }).catch(e => {
          console.log(e)
        })
      },
      components: {
        VueSelect
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        search: function (search, loading) {
          if (this.endpointName) {
            loading(true)
            this.getOptions(search, loading, this)
          }
        },
        getOptions: _.debounce((search, loading, vm) => {
          let apiOperationOptions = vm.apiOperationOptions
          let searchProperty = vm.searchProperty
          apiOperationOptions.filterLikes = {[searchProperty]: search}
          GenericApiOperations.list(vm.endpointName, vm.apiOperationOptions).then(res => {
            vm.options = res
            loading(false)
          }).catch(e => {
            console.log(e)
          })
        }, 250)
      },
      watch: {
        selected: function (newValue) {
          this.$emit('input', newValue)
        }
      }
    }
</script>

<style lang="scss">
</style>
