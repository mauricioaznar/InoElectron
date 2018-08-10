<template>
    <div>
        <label
                v-if="label"
        >
            {{ label }}
        </label>
        <masked-input
                class="form-control"
                v-model="numberString"
                :mask="mask"
                @input="updateValue"
                @change="updateValue"
                @blur="$emit('blur')"
                :disabled="disabled"
                :class="getBootstrapValidationClass(error)">
        </masked-input>
        <div class="invalid-feedback">
                  <span v-show="error" class="help is-danger">
                    {{error}}
                  </span>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import Masks from 'renderer/api/functions/Masks'
  export default {
    name: 'MauFormInputNumber',
    data () {
      return {
        numberString: '',
        mask: ''
      }
    },
    created () {
      if (this.initialValue) {
        let initialNumberString = this.initialValue.toString()
        this.numberString = initialNumberString
        this.updateValue(initialNumberString)
      }
      if (this.type === 'regular') {
        this.mask = this.negative ? Masks.regularNumberNegative : Masks.regularNumber
      }
      if (this.type === 'float') {
        this.mask = this.negative ? Masks.floatNumberNegative : Masks.floatNumber
      }
    },
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.numberString
      }
    },
    props: {
      value: [Number, String],
      initialValue: [Number, String],
      name: String,
      label: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      },
      negative: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      type: {
        type: String,
        default: 'regular',
        validator: val => {
          return (
            ['regular', 'currency', 'float'].indexOf(val) !== -1
          )
        }
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      updateValue (numberString) {
        this.$emit('input', numberString)
      }
    },
    watch: {
      value: function (val) {
        this.numberString = val.toString()
        this.updateValue(this.numberString)
      }
    }
  }
</script>
