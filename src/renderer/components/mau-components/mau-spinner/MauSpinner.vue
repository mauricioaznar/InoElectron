<template>
    <div
            class="mau-spinner-container"
            :class="{
                'appSize': appSize,
                'dataTableSize': dataTableSize,
                'routerSize': routerSize
            }"
    >
      <ring-loader :color="'#000000'" class="spinner-position"></ring-loader>
    </div>
</template>

<script>
  import RingLoader from 'vue-spinner/src/RingLoader.vue'
  export default {
    name: 'MauSpinner',
    data () {
      return {
        appSize: this.sizeType === 'app',
        dataTableSize: this.sizeType === 'dataTable',
        routerSize: this.sizeType === 'router'
      }
    },
    props: {
      sizeType: {
        type: String,
        required: true,
        validator: function (value) {
          return ['app', 'dataTable', 'router'].indexOf(value) !== -1
        }
      }
    },
    components: {
      RingLoader
    }
  }
</script>

<style lang="scss">
    @import "../../../sass/variables";
    .mau-spinner-container {
        position: relative;
        &.appSize {
            height: 100vh;
        }
        &.dataTableSize {
            height: 74vh;
        }
        &.routerSize {
            height: 75vh;
        }
    }
    .spinner-position {
        text-align: center;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
</style>