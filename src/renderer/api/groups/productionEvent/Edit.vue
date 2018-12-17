<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :entityType="entityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <production-event-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :userHasWritePrivileges="true"
        >
        </production-event-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import ProductionEventForm from 'renderer/api/components/forms/ProductionEventForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditProductionEvent',
    data () {
      return {
        entityType: EntityTypes.PRODUCTION_EVENT,
        entity: null,
        hostRelationshipIdName: 'production_event_id'
      }
    },
    props: {
      id: null
    },
    components: {
      ProductionEventForm,
      MauEntityPetitioner,
      MauSpinner
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>
