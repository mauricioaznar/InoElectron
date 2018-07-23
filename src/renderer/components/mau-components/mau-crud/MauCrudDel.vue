<template>
    <div>
        <mau-responsive-button :onPositive="del"
                               :positiveName="'Eliminar'"
        >
        </mau-responsive-button>
        <b-modal ref="confirmAction" centered title="Desea confirmar la accion" :cancel-title="'Cancelar'" @ok="confirm">
        </b-modal>
    </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import ChildTypes from 'renderer/api/ChildTypes'
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
        let _this = this
        ApiFunctions.del(this.entityType, this.id, cloneDeep(this.entity))
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
              setTimeout(function () {
                _this.$router.push(RouteObjectHelper.createPath(_this.entityType, ChildTypes.LIST))
              }, 2000)
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
