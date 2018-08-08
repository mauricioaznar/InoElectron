<template>
  <div>
    <label
            v-if="label"
            class="form__label">
      {{ label }}
    </label>
    <div class="override-form-control form-control"
         :class="getBootstrapValidationClass(error)"
    >
      <flat-pickr
              v-model="date"
              :config="config"
              @input="updateValue"
              @change="updateValue"
      >
      </flat-pickr>
    </div>
    <div class="invalid-feedback">
      <span v-show="error" class="help is-danger">
        {{error}}
      </span>
    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import {Spanish} from '../../../../../node_modules/flatpickr/dist/l10n/es'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  const rangeSeparator = ' al '
  Spanish.rangeSeparator = rangeSeparator
  export default {
    name: 'MauFormInputDateTime',
    data () {
      return {
        date: '',
        recentlyCreated: true,
        config: {
        },
        rangeConfig: {
          conjunction: ' - ',
          mode: 'range',
          locale: Spanish
        },
        dateConfig: {
          wrap: true,
          altInput: true,
          altFormat: 'Y-m-d',
          dateFormat: 'Y-m-d',
          locale: Spanish
        },
        timeConfig: {
          wrap: true,
          enableTime: true,
          dateFormat: 'H:i',
          locale: Spanish,
          time_24hr: true,
          minDate: '7:00',
          maxDate: '19:00',
          minuteIncrement: 10
        },
        dateTimeConfig: {
          enableTime: true,
          wrap: true,
          altInput: true,
          altFormat: 'Y-m-d h:i K',
          dateFormat: 'Y-m-d H:i:S',
          locale: Spanish
        }
      }
    },
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.date
      }
    },
    props: {
      value: String,
      initialValue: String,
      name: String,
      error: {
        type: String,
        required: false
      },
      label: {
        type: String
      },
      inputType: {
        type: String,
        default: function () {
          return 'date'
        },
        validator: function (date) {
          return ['date', 'time', 'range', 'dateTime'].indexOf(date) !== -1
        }
      }
    },
    components: {
      flatPickr
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      updateValue: function (val) {
        this.$emit('input', val)
      }
    },
    created () {
      this.date = this.value
      if (this.initialValue) {
        let momentDate = moment(this.initialValue)
        if (momentDate.isValid()) {
          this.date = this.initialValue
        }
      }
      if (this.inputType === 'date') {
        this.config = this.dateConfig
      } else if (this.inputType === 'time') {
        this.config = this.timeConfig
      } else if (this.inputType === 'range') {
        this.config = this.rangeConfig
      } else if (this.inputType === 'dateTime') {
        this.config = this.dateTimeConfig
      } else {
        console.error('please specify a valid dateTime input type')
      }
      this.updateValue(this.date)
    }
  }
</script>

<style lang="scss">

</style>
