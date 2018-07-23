<template>
    <div>
        <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
        <mau-entity-petitioner
                :id="id"
                :entityType="entityType"
                @entityResult="entityResultHandler"
        ></mau-entity-petitioner>
        <mau-crud-del
                v-if="entity"
                :id="id"
                :entityType="entityType"
                :entity="entity"
        >
        </mau-crud-del>
    </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  export default {
    name: 'DelClient',
    data () {
      return {
        entityType: EntityTypes.CLIENT,
        entity: null
      }
    },
    components: {
      MauEntityPetitioner,
      MauSpinner
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