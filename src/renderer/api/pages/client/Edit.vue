<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler">

    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form
          :initialObject="entity"
          :saveFunction="params.saveFunction">
        </persona-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import PersonaForm from 'renderer/api/components/generic/persona/PersonaForm.vue'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditClient',
    data () {
      return {
        entityType: EntityTypes.CLIENT,
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      MauEntityPetitioner,
      PersonaForm,
      MauSpinner
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.CLIENT, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>
