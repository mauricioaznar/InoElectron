<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <user-form :saveFunction="params.save"></user-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import UserForm from './components/UserForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateUser',
    data () {
      return {
        entityType: EntityTypes.USER
      }
    },
    components: {
      UserForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.USER, ChildTypes.LIST)})
      }
    }
  }
</script>
