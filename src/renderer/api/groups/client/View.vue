<template>
  <div class="container">
      <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
      <mau-entity-petitioner
              :id="id"
              :entityType="entityType"
              @entityResult="entityResultHandler"
      >
      </mau-entity-petitioner>
      <persona-view v-if="entity" :persona="entity"></persona-view>
  </div>
</template>

<script>
  import PersonaView from 'renderer/api/components/template/PersonaView.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  export default {
    name: 'ViewClient',
    data () {
      return {
        entity: null,
        entityType: EntityType.CLIENT
      }
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
      PersonaView
    },
    props: {
      id: null
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>

<style lang="scss">

</style>
