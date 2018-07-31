<template>
    <div>
        <masked-input
                :name="name"
                v-model="number"
                class="form-control"
                :guide="true"
                :mask="mask"
                :placeholder="placeholder"
        >
        </masked-input>
    </div>
</template>

<script>
  import Masks from 'renderer/api/functions/Masks'
  export default {
    name: 'MauFormInputRegularNumber',
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.value
      }
    },
    data () {
      return {
        number: '',
        initialNumber: '',
        mask: Masks.regularNumber
      }
    },
    created () {
      if (this.value) {
        this.number = this.value.toString()
      }
      if (this.initialValue) {
        this.number = this.initialValue.toString()
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      placeholder: {
        type: Number,
        default: function () {
          return 0
        }
      },
      initialValue: {
        type: Number
      },
      value: {}
    },
    watch: {
      number: function () {
        this.$emit('input', parseInt(this.number))
      }
    }
  }
</script>

<style>

</style>