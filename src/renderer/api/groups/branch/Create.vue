<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="relationshipIdName"
    >
      <template slot-scope="params">
        <branch-form :saveFunction="params.save"></branch-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BranchForm from 'renderer/api/components/forms/BranchForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateBranch',
    data () {
      return {
        entityType: EntityTypes.BRANCH,
        relationshipIdName: 'branch_id'
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      BranchForm
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
