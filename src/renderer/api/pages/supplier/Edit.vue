<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </persona-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import PersonaForm from 'renderer/api/components/generic/persona/PersonaForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditSupplier',
    data () {
      return {
        entityApiName: EntityTypes.SUPPLIER
      }
    },
    props: {
      id: null
    },
    components: {
      PersonaForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.SUPPLIER, ChildTypes.LIST)})
      }
    }
  }
</script>
