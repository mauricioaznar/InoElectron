<template>
    <div>
        <b-form-select
                v-model="selectedValue"
                class="form-control custom-select"
                @input="valueUpdated"
        >
            <slot></slot>
        </b-form-select>
    </div>
</template>

<script>
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

        initialValue: {
          type: Number
        }
      },
      methods: {
        valueUpdated: function () {
          this.$emit('input', this.selectedValue)
        }
      }
    }
</script>