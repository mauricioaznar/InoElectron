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
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
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
    computed: {
      ...mapGetters([
        'groupDefaultRouteObject'
      ])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
