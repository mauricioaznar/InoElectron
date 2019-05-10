<template>
  <div class="form-row">
    <div class="form-group col-md-6">
      <mau-form-input-date
              :label="'Fecha ' + label"
              v-model="date"
              :initialValue="initialDate"
              :inputType="'date'"
              :name="name + 'date'"
              :error="error"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-date>
    </div>
    <div class="form-group col-md-3">
      <mau-form-input-select-static
              :label="'Hora ' + label"
              :availableObjects="availableHours"
              :error="error"
              v-model="hour"
              :initialObject="initialHour"
              :displayProperty="'value'"
              :trackBy="'value'"
              :name="name + 'hour'"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-select-static>
    </div>
    <div class="form-group col-md-3">
      <mau-form-input-select-static
              :label="'Hora ' + label"
              :availableObjects="availableMinutes"
              :error="error"
              v-model="minute"
              :initialObject="initialMinute"
              :displayProperty="'value'"
              :trackBy="'value'"
              :name="name + 'minute'"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-select-static>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'MauFormInputDateTime',
    data () {
      return {
        dateTime: '',
        date: '',
        hour: '',
        minute: '',
        initialDate: '',
        initialMinute: {},
        initialHour: {}
      }
    },
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.dateTime
      }
    },
    props: {
      value: String,
      initialValue: String,
      error: {
        type: String
      },
      label: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      availableHours: {
        type: Array,
        default: function () {
          return [
            { value: '00' },
            { value: '01' },
            { value: '02' },
            { value: '03' },
            { value: '04' },
            { value: '05' },
            { value: '06' },
            { value: '07' },
            { value: '08' },
            { value: '09' },
            { value: '10' },
            { value: '11' },
            { value: '12' },
            { value: '13' },
            { value: '14' },
            { value: '15' },
            { value: '16' },
            { value: '17' },
            { value: '18' },
            { value: '19' },
            { value: '20' },
            { value: '21' },
            { value: '22' },
            { value: '23' }
          ]
        }
      },
      availableMinutes: {
        type: Array,
        default: function () {
          return [
            { value: '00' },
            { value: '01' },
            { value: '02' },
            { value: '03' },
            { value: '04' },
            { value: '05' },
            { value: '06' },
            { value: '07' },
            { value: '08' },
            { value: '09' },
            { value: '10' },
            { value: '11' },
            { value: '12' },
            { value: '13' },
            { value: '14' },
            { value: '15' },
            { value: '16' },
            { value: '17' },
            { value: '18' },
            { value: '19' },
            { value: '20' },
            { value: '21' },
            { value: '22' },
            { value: '23' },
            { value: '24' },
            { value: '25' },
            { value: '26' },
            { value: '27' },
            { value: '28' },
            { value: '29' },
            { value: '30' },
            { value: '31' },
            { value: '32' },
            { value: '33' },
            { value: '34' },
            { value: '35' },
            { value: '36' },
            { value: '37' },
            { value: '38' },
            { value: '39' },
            { value: '40' },
            { value: '41' },
            { value: '42' },
            { value: '43' },
            { value: '44' },
            { value: '45' },
            { value: '46' },
            { value: '48' },
            { value: '49' },
            { value: '50' },
            { value: '51' },
            { value: '52' },
            { value: '53' },
            { value: '54' },
            { value: '55' },
            { value: '56' },
            { value: '57' },
            { value: '58' },
            { value: '59' }
          ]
        }
      }
    },
    components: {
    },
    methods: {
      updateValue: function (val) {
        this.dateTime = val
        this.$emit('input', val)
      },
      dateChanged: function () {
        if (this.date && this.hour && this.minute) {
          this.updateValue(this.date + ' ' + this.hour.value + ':' + this.minute.value + ':00')
        } else {
          this.updateValue('')
        }
      }
    },
    created () {
      let momentDate = moment(this.initialValue)
      if (momentDate.isValid()) {
        this.initialDate = moment(this.initialValue).format('YYYY-MM-DD')
        this.initialHour = { value: moment(this.initialValue).format('HH') }
        this.initialMinute = { value: moment(this.initialValue).format('mm') }
      }
    }
  }
</script>

<style lang="scss">
</style>
