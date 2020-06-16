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
      :relationshipIdName="'client_id'"
    >
      <template slot-scope="params">
        <client-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :userHasWritePrivileges="true"
        >
        </client-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import ClientForm from 'renderer/api/components/forms/ClientForm.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
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
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    components: {
      MauEntityPetitioner,
      ClientForm,
      MauSpinner
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
