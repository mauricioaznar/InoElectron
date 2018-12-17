<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form :saveFunction="params.save" :clientMode="true"></persona-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import PersonaForm from 'renderer/api/components/forms/PersonaForm.vue'
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
      PersonaForm
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
