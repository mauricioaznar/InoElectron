<template>
    <div>
        <mau-responsive-button :onPositive="del"
                               :positiveName="'Eliminar'"
        >
        </mau-responsive-button>
    </div>
</template>

<script>
  import ApiFunctions from 'renderer/api/functions/GenericApiOperations'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  export default {
    name: 'MauCrudDel',
    data () {
      return {
        show: true
      }
    },
    props: {
      id: {
        required: true
      },
      entityType: {
        type: Object,
        required: true
      },
      callback: {
        type: Function
      },
      entity: {
        type: Object,
        required: true
      }
    },
    components: {
    },
    methods: {
      del: function () {
        this.$refs.confirmAction.show()
      },
      confirm: function () {
        ApiFunctions.del(this.entityType.apiName, this.id, cloneDeep(this.entity))
          .then(
            result => {
              this.$notify({
                group: 'foo',
                type: 'success',
                title: 'Operacion exitosa',
                text: '<span class="fa fa-check"></span>'
              })
              if (this.callback) {
                this.callback()
              }
            })
          .catch(
            error => {
              this.$notify({
                group: 'foo',
                type: 'danger',
                title: error,
                text: '<span class="fa fa-exclamation-circle"></span>'
              })
            }
          )
      }
    }
  }
</script>
