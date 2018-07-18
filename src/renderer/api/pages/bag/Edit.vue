<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </bag-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagForm from './components/BagForm.vue'
  import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditBag',
    data () {
      return {
        entityType: EntityTypes.BAG,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      BagForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG, ChildTypes.LIST)})
      }
    }
  }
</script>
