<template>
  <div class="table-responsive">
    <table class="vuetable table table-striped table-hover">
      <slot></slot>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'MauTable',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">

</style>
