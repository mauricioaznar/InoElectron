<template>
    <div class="container">
        <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
        <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
    </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/UserPropertiesReference'
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  export default {
    name: 'MyProfileAuth',
    data () {
      return {
        entity: null,
        propertiesReference: [PropertiesReference.ID, PropertiesReference.COST, PropertiesReference.NICKNAME, PropertiesReference.EMAIL, PropertiesReference.PHONE]
      }
    },
    created () {
      GenericApiOperations.getCurrentUser().then(result => {
        this.entity = result
      })
    },
    components: {
    },
    props: {
    }
  }
</script>

<style lang="scss">

</style>
