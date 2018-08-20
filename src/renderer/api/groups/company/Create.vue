<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <company-form :saveFunction="params.save"></company-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import CompanyForm from 'renderer/api/components/forms/CompanyForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateCompany',
    data () {
      return {
        entityType: EntityTypes.COMPANY
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      CompanyForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
        }
      }
    }
  }
</script>
