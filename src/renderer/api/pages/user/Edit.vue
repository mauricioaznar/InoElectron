<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityType="entityType"
      :callback="callback">
      <template slot-scope="params">
        <user-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </user-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import UserForm from './components/UserForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditUser',
    data () {
      return {
        entityType: EntityTypes.USER
      }
    },
    props: {
      id: null
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
