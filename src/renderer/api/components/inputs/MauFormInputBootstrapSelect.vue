<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <b-form-select
                v-model="selectedValue"
                class="form-control custom-select"
                :class="getBootstrapValidationClass(error)"
                :disabled="disabled"
                :options="availableOptions"
                @input="valueUpdated"
        >
            <slot></slot>
        </b-form-select>
        <div class="invalid-feedback">
            <span v-show="error" class="help is-danger">
            {{error}}
            </span>
        </div>
    </div>
</template>

<script>
    import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
    export default {
      data () {
        return {
          selectedValue: '',
          selected: {}
        }
      },
      created () {
        this.selectedValue = this.initialValue
        this.valueUpdated()
      },
      props: {
        initialValue: [Number, String],
        availableOptions: {
          type: Array,
          default: function () {
            return []
          }
        },
        label: String,
        error: String,
        disabled: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        valueUpdated: function () {
          this.$emit('input', this.selectedValue)
        }
      }
    }
</script>