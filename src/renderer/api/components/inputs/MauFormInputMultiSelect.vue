<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <vue-select
                v-model="selectedObjects"
                :multiple="true"
                :label="displayProperty"
                :track-by="'id'"
                class="form-control override-form-control"
                :clearSearchOnSelect="hasClear"
                :options="availableObjects"
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
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import isDefined from 'renderer/services/common/isDefined'
  export default {
    data () {
      return {
        selectedObjects: []
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
        type: [Array]
      },
      name: {
        type: String
      },
      error: {
        type: String,
        required: false
      },
      availableObjects: {
        type: Array,
        required: true
      },
      displayProperty: {
        type: String,
        default: 'name'
      },
      label: {
        type: String
      },
      initialObjects: {
        type: Array,
        default: function () {
          return []
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
      if (Array.isArray(this.initialObjects) && this.initialObjects.length !== 0) {
        this.selectedObjects = cloneDeep(this.initialObjects)
      }
    },
    components: {
      VueSelect
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      updateValue: function (newValue) {
        this.$emit('input', newValue)
      }
    },
    watch: {
      selectedObjects: function (newValue) {
        this.updateValue(newValue)
      },
      availableObjects: function (newAvailableObjects) {
        let newSelectedObjects = []
        let initialObjects = cloneDeep(this.initialObjects)
        if (isDefined(initialObjects)) {
          initialObjects.forEach(initialObj => {
            let newAvailableObjResult = newAvailableObjects.find(newAvailableObj => {
              return newAvailableObj[GlobalEntityIdentifier] === initialObj[GlobalEntityIdentifier]
            })
            if (newAvailableObjResult) {
              newSelectedObjects.push(newAvailableObjResult)
            }
          })
        }
        this.selectedObjects = newSelectedObjects
      }
    }
  }
</script>