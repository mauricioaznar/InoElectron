<template>
    <div>
        <b-form-select v-if="tripleboolean" v-model="selected" :options="triplebooleanOptions"/>
        <b-form-checkbox
                v-if="!tripleboolean"
                v-model="selected"
                value="1"
                unchecked-value="0">
        </b-form-checkbox>
    </div>
</template>

<script>
  export default {
    name: 'MauFormInputBoolean',
    data () {
      return {
        selected: null,
        selectableOptions: [],
        triplebooleanOptions: [
          { value: 1, text: 'Completado' },
          { value: 0, text: 'Incompleto' },
          { value: -1, text: 'No aplica' }
        ],
        simpleOptions: [
          { value: 1, text: 'Entregado' },
          { value: 0, text: 'No entregado' }
        ]
      }
    },
    props: {
      initialValue: {
        type: Number,
        default: function () {
          return -1
        }
      },
      tripleboolean: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    created () {
      this.selected = this.initialValue
    },
    watch: {
      selected: function (newSelected) {
        this.$emit('input', newSelected)
      },
      initialValue: function (newInitialValue) {
        this.selected = newInitialValue
      }
    }
  }
</script>
