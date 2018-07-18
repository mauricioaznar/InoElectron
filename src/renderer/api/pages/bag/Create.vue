<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-form :saveFunction="params.save"></bag-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BagForm from './components/BagForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateBag',
    data () {
      return {
        entityType: EntityTypes.BAG
      }
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
