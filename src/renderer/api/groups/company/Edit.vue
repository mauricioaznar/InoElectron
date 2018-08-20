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
        <company-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :userHasWritePrivileges="true"
        >
        </company-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import CompanyForm from 'renderer/api/components/forms/CompanyForm.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditCompany',
    data () {
      return {
        entityType: EntityTypes.COMPANY,
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
      CompanyForm,
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
