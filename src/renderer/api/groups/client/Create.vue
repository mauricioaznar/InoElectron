<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <client-form :saveFunction="params.save"></client-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import ClientForm from 'renderer/api/components/forms/ClientForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateClient',
    data () {
      return {
        entityType: EntityTypes.CLIENT
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      ClientForm
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
