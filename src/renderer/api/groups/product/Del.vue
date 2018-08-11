<template>
    <div>
        <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
        <mau-entity-petitioner
                :id="id"
                :entityType="entityType"
                @entityResult="entityResultHandler"
        ></mau-entity-petitioner>
        <mau-crud-del
                v-if="entity"
                :id="id"
                :entityType="entityType"
                :entity="entity"
                :callback="callback"
        >
        </mau-crud-del>
    </div>
</template>

<script>
  import Entities from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'DelBag',
    data () {
      return {
        entityType: Entities.PRODUCT,
        entity: null
      }
    },
    components: {
      MauEntityPetitioner,
      MauSpinner
    },
    props: {
      id: null
    },
    computed: {
      ...mapGetters([
        'groupDefaultRouteObject'
      ])
    },
    created () {
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      },
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route)})
      }
    }
  }
</script>
