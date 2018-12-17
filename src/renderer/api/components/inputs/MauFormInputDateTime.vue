<template>
  <div class="form-row">
    <div class="form-group col-md-6">
      <mau-form-input-date
              :label="'Fecha ' + label"
              v-model="date"
              :initialValue="initialValues['date']"
              :inputType="'date'"
              :error="error"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-date>
    </div>
    <div class="form-group col-md-3">
      <mau-form-input-bootstrap-select
              :label="'Hora ' + label"
              :availableOptions="availableHours"
              :error="error"
              v-model="hour"
              :initialValue="initialValues['hour']"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-bootstrap-select>
    </div>
    <div class="form-group col-md-3   ">
      <mau-form-input-bootstrap-select
              :label="'Minuto ' + label"
              :availableOptions="availableMinutes"
              :error="error"
              v-model="minute"
              :initialValue="initialValues['minute']"
              :disabled="disabled"
              @input="dateChanged"
      >
      </mau-form-input-bootstrap-select>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import MauFormInputBootstrapSelect from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
  import MauFormInputDate from 'renderer/api/components/inputs/MauFormInputDate.vue'
  export default {
    name: 'MauFormInputDateTime',
    data () {
      return {
        dateTime: '',
        date: '',
        hour: '',
        minute: '',
        initialValues: {}
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
        type: String,
        required: false
      },
      label: {
        type: String
      },
      name: String,
      disabled: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      availableHours: {
        type: Array,
        default: function () {
          return ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        }
      },
      availableMinutes: {
        type: Array,
        default: function () {
          return ['00', '30']
        }
      }
    },
    components: {
      MauFormInputBootstrapSelect,
      MauFormInputDate
    },
    methods: {
      updateValue: function (val) {
        this.dateTime = val
        this.$emit('input', val)
      },
      dateChanged: function () {
        if (this.date && this.hour && this.minute) {
          this.updateValue(this.date + ' ' + this.hour + ':' + this.minute + ':00')
        } else {
          this.updateValue('')
        }
      }
    },
    created () {
      let momentDate = moment(this.initialValue)
      if (momentDate.isValid()) {
        this.initialValues['date'] = moment(this.initialValue).format('YYYY-MM-DD')
        this.initialValues['hour'] = moment(this.initialValue).format('HH')
        this.initialValues['minute'] = moment(this.initialValue).format('mm')
      } else {
        this.initialValues['date'] = ''
        this.initialValues['hour'] = ''
        this.initialValues['minute'] = ''
      }
    }
  }
</script>

<style lang="scss">
</style>
