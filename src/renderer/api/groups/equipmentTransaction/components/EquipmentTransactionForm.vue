<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="EquipmentTransactionPropertiesReference.DATE_EMITTED.name"
                        :label="EquipmentTransactionPropertiesReference.DATE_EMITTED.title"
                        v-model="equipmentTransaction.dateEmitted"
                        :initialValue="initialValues[EquipmentTransactionPropertiesReference.DATE_EMITTED.name]"
                        :error="errors.has(EquipmentTransactionPropertiesReference.DATE_EMITTED.name) ? errors.first(EquipmentTransactionPropertiesReference.DATE_EMITTED.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name]"
                        :label="EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.title"
                        :displayProperty="'name'"
                        :endpointName="equipmentTransactionStatusEndpointName"
                        v-model="equipmentTransaction.equipmentTransactionStatus"
                        :name="EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name"
                        :error="errors.has(EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name) ? errors.first(EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name]"
                        :label="EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.title"
                        :displayProperty="'name'"
                        :endpointName="equipmentTransactionTypeEndpointName"
                        v-model="equipmentTransaction.equipmentTransactionType"
                        :name="EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name"
                        :error="errors.has(EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name) ? errors.first(EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentTransactionPropertiesReference.BRANCH.name]"
                        :label="EquipmentTransactionPropertiesReference.BRANCH.title"
                        :displayProperty="'name'"
                        :endpointName="branchEndpointName"
                        v-model="equipmentTransaction.branch"
                        :name="EquipmentTransactionPropertiesReference.BRANCH.name"
                        :error="errors.has(EquipmentTransactionPropertiesReference.BRANCH.name) ? errors.first(EquipmentTransactionPropertiesReference.BRANCH.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentTransactionPropertiesReference.SUPPLIER.name]"
                        :label="EquipmentTransactionPropertiesReference.SUPPLIER.title"
                        :displayProperty="'name'"
                        :endpointName="supplierEndpointName"
                        v-model="equipmentTransaction.supplier"
                        :name="EquipmentTransactionPropertiesReference.SUPPLIER.name"
                        :error="errors.has(EquipmentTransactionPropertiesReference.SUPPLIER.name) ? errors.first(EquipmentTransactionPropertiesReference.SUPPLIER.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <equipment-transaction-items
                    v-model="equipmentTransaction.equipmentTransactionItems"
                    :initialValues="initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_ITEMS.name]"

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
  import EntityTypes from 'renderer/api/EntityTypes'
  import EquipmentTransactionPropertiesReference from 'renderer/api/propertiesReference/EquipmentTransactionPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import EquipmentTransactionItems from './EquipmentTransactionItems'
  export default {
    name: 'ExpenseForm',
    data () {
      return {
        EquipmentTransactionPropertiesReference: EquipmentTransactionPropertiesReference,
        equipmentTransaction: {
          dateEmitted: '',
          branch: {},
          supplier: {},
          equipmentTransactionType: {},
          equipmentTransactionStatus: {},
          equipmentTransactionItems: []
        },
        initialValues: {},
        equipmentTransactionStatusEndpointName: EntityTypes.EQUIPMENT_TRANSACTION_STATUS.apiName,
        equipmentTransactionTypeEndpointName: EntityTypes.EQUIPMENT_TRANSACTION_TYPE.apiName,
        branchEndpointName: EntityTypes.BRANCH.apiName,
        supplierEndpointName: EntityTypes.SUPPLIER.apiName,
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
      },
      total: function () {
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[EquipmentTransactionPropertiesReference.DATE_EMITTED.name] = DefaultValuesHelper.simple(this.initialObject, EquipmentTransactionPropertiesReference.DATE_EMITTED.name)
        this.initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name] = DefaultValuesHelper.object(this.initialObject, EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name)
        this.initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name] = DefaultValuesHelper.object(this.initialObject, EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name)
        this.initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_ITEMS.name)
        this.initialValues[EquipmentTransactionPropertiesReference.BRANCH.name] = DefaultValuesHelper.object(this.initialObject, EquipmentTransactionPropertiesReference.BRANCH.name)
        this.initialValues[EquipmentTransactionPropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, EquipmentTransactionPropertiesReference.SUPPLIER.name)
      },
      save: function () {
        let directParams = {
          [EquipmentTransactionPropertiesReference.DATE_EMITTED.name]: this.equipmentTransaction.dateEmitted,
          [EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.relationship_id_name]: this.equipmentTransaction.equipmentTransactionStatus ? this.equipmentTransaction.equipmentTransactionStatus['id'] : (this.isInitialObjectDefined ? 'null' : null),
          [EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.relationship_id_name]: this.equipmentTransaction.equipmentTransactionType ? this.equipmentTransaction.equipmentTransactionType['id'] : (this.isInitialObjectDefined ? 'null' : null),
          [EquipmentTransactionPropertiesReference.SUPPLIER.relationship_id_name]: this.equipmentTransaction.supplier ? this.equipmentTransaction.supplier['id'] : (this.isInitialObjectDefined ? 'null' : null),
          [EquipmentTransactionPropertiesReference.BRANCH.relationship_id_name]: this.equipmentTransaction.branch ? this.equipmentTransaction.branch['id'] : (this.isInitialObjectDefined ? 'null' : null)
        }
        let relayObjects = []
        let equipmentTransactionItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          this.initialValues[EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_ITEMS.name],
          this.equipmentTransaction.equipmentTransactionItems,
          'id'
        )
        let equipmentTransactionItemsRelayObjects = ManyToManyHelper.createRelayObject(equipmentTransactionItemsM2mFilteredObject, EntityTypes.EQUIPMENT_TRANSACTION_ITEM)
        relayObjects.push(equipmentTransactionItemsRelayObjects)
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
      }
    }
  }

</script>
