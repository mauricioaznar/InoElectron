<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <supplier-form :saveFunction="params.save"></supplier-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import SupplierForm from 'renderer/api/components/forms/SupplierForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
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
      SupplierForm
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
