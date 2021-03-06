<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[BranchPropertiesReference.NAME.name]"
                        v-model="branch.name"
                        :label="BranchPropertiesReference.NAME.title"
                        :name="BranchPropertiesReference.NAME.name"
                        :error="errors.has(BranchPropertiesReference.NAME.name) ? errors.first(BranchPropertiesReference.NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <equipment-transaction-items
                        :label="'Insumos generales'"
                        v-model="branch.branchesEquipments"
                        :initialValues="initialValues[BranchPropertiesReference.BRANCHES_EQUIPMENTS.name]"
                        :requiresMinQuantity="true"
                        :requiresMaxQuantity="true"
                        :requiresFirstItem="false"
                >

                </equipment-transaction-items>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import BranchPropertiesReference from 'renderer/api/propertiesReference/BranchPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import EquipmentTransactionItems from 'renderer/api/components/m2m/EquipmentTransactionItems'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'BranchForm',
    data () {
      return {
        BranchPropertiesReference: BranchPropertiesReference,
        branch: {
          name: '',
          branchesEquipments: []
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic,
      EquipmentTransactionItems
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.setInitialValues()
    },
    computed: {
      userHasWritePrivileges: function () {
        return true
      },
      isInitialObjectDefined: function () {
        return this.initialObject && this.initialObject.id
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[BranchPropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, BranchPropertiesReference.NAME.name)
        this.initialValues[BranchPropertiesReference.BRANCHES_EQUIPMENTS.name] = DefaultValuesHelper.array(this.initialObject, BranchPropertiesReference.BRANCHES_EQUIPMENTS.name)
      },
      save: function () {
        let directParams = {
          [BranchPropertiesReference.NAME.name]: this.branch.name
        }
        let relayObjects = []
        let branchesEquipments = []
        branchesEquipments = branchesEquipments.concat(this.branch.branchesEquipments)
        let branchesEquipmentsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          this.initialValues[BranchPropertiesReference.BRANCHES_EQUIPMENTS.name],
          branchesEquipments,
          'id'
        )
        let branchesEquipmentsRelayObjects = ManyToManyHelper.createRelayObject(branchesEquipmentsM2mFilteredObject, EntityTypes.BRANCH_EQUIPMENT)
        relayObjects.push(branchesEquipmentsRelayObjects)
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, relayObjects)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      },
      machines: function (machines) {
        machines.forEach(machine => {
          if (!machine.branchesEquipments && !machine.initialBranchesEquipments) {
            machine.branchesEquipments = []
            machine.initialBranchesEquipments = []
          }
        })
      }
    }
  }

</script>
