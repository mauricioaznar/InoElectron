<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form :saveFunction="params.save"></persona-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import PersonaForm from 'renderer/api/components/generic/persona/PersonaForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateSupplier',
    data () {
      return {
        entityType: EntityTypes.SUPPLIER
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      PersonaForm
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.SUPPLIER, ChildTypes.LIST)})
        }
      }
    }
  }
</script>
