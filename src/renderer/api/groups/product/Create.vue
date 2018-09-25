<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <product-form :saveFunction="params.save"></product-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import ProductForm from '../../components/forms/ProductForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import EntityActions from 'renderer/api/store/entityActions.js'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateProduct',
    data () {
      return {
        entityType: EntityTypes.PRODUCT
      }
    },
    components: {
      ProductForm
    },
    computed: {
      ...mapGetters([
        'groupDefaultRouteObject'
      ])
    },
    methods: {
      callback: function () {
        this.$store.dispatch(EntityActions.GET_PRODUCTS)
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
