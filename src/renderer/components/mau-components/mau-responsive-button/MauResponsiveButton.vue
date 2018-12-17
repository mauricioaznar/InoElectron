<template>
  <div>
    <div class="d-flex justify-content-around justify-content-md-end">
      <button v-if="onPositive && canPositive" class="btn btn-primary" @click="onPositive">{{positiveName}}</button>
      <button v-if="onNegative" :class="{'ml-md-4': onPositive}" class="btn btn-secondary" @click="onNegative">{{negativeName}}</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MauResponsiveButton',
    data () {
      return {
      }
    },
    props: {
      onPositive: {
        type: Function,
        required: true
      },
      positiveName: {
        type: String,
        default: function () {
          return 'Guardar'
        }
      },
      canPositive: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      onNegative: {
        type: Function
      },
      negativeName: {
        type: String,
        default: function () {
          return 'Eliminar'
        }
      }
    },
    computed: {
    },
    components: {
    },
    created () {
    }
  }
</script>

<style lang="scss">

</style>
