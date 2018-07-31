<template>
  <div v-if="entity">
    <slot :entity="entity"></slot>
  </div>
</template>

<script>
  export default {
    name: 'MauCrudView',
    data () {
      return {
        entity: null
      }
    },
    props: {
      callback: {
        type: Function
      }
    },
    created () {
      this.entity = this.$store.getters.requestedEntity
    },
    components: {
    },
    methods: {

    }
  }
</script>
