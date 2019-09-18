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
      :relationshipIdName="'expense_id'"
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <note-expense-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :userHasWritePrivileges="true"
        >
        </note-expense-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import NoteExpenseForm from './components/NoteExpenseForm.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditNoteExpense',
    data () {
      return {
        entityType: EntityTypes.NOTE_EXPENSE,
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
      NoteExpenseForm,
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
