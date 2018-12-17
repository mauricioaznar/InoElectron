<template>
  <div>
    <div class="mau-entity-view-row row">
      <div class="mau-entity-view-row-label col-md-3 d-flex justify-content-sm-start justify-content-md-start align-items-center">{{label}}:</div>
      <div class="col-md-9" v-html="value"></div>
    </div>
    <hr>
  </div>
</template>

<script>
  // import ClientStorePropertiesReference from '../store/ClientStorePropertiesReference'
  export default {
    name: 'MauEntityViewRow',
    data () {
      return {

      }
    },
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .mau-entity-view-row {
    .mau-entity-view-row-label {
      font-weight: 600;
    }
  }
</style>
