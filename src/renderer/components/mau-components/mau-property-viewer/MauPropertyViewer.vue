<template>
  <div>
    <mau-property-viewer-row
      v-for="(value, index) in properties"
      :key="index"
      :label="value.title"
      :value="displayProperty(value)">
    </mau-property-viewer-row>
  </div>
</template>

<script>
  import MauPropertyViewerRow from './MauPropertyViewerRow.vue'
  export default {
    name: 'MauPropertyViewer',
    data () {
      return {

      }
    },
    props: {
      properties: {
        type: Array,
        required: true,
        validator: function (value) {
          let isValid = true
          for (let i = 0; i < value.length; i++) {
            if (!(value[i].hasOwnProperty('title')) || !(value[i].hasOwnProperty('display')) || !(value[i].hasOwnProperty('name'))) {
              isValid = false
            }
          }
          return isValid
        }
      },
      entity: {
        type: Object,
        required: true
      }
    },
    computed: {
    },
    components: {
      MauPropertyViewerRow
    },
    methods: {
      displayProperty: function (value) {
        if (value.arguments && value.arguments.length > 0) {
          let finalApplyArray = [this.entity[value.name]].concat(value.arguments)
          return value.display.apply(this, finalApplyArray)
        }
        return value.display(this.entity[value.name])
      }
    },
    created () {
    }
  }
</script>

<style lang="scss">

</style>
