<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <production-event-form :saveFunction="params.save"></production-event-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import ProductionEventForm from 'renderer/api/components/forms/ProductionEventForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateProductionEvent',
    data () {
      return {
        entityType: EntityTypes.PRODUCTION_EVENT,
        hostRelationshipIdName: 'production_event_id'
      }
    },
    components: {
      ProductionEventForm
    },
    computed: {
      ...mapGetters([
        'groupDefaultRouteObject'
      ])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
