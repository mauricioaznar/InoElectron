<template>
    <div>
        <mau-form-group-date-time
                :name="ProductionEventPropertiesReference.START_DATE_TIME.name"
                :label="'de inicio'"
                v-model="productionEvent.startDateTime"
                :initialValue="initialValues[ProductionEventPropertiesReference.START_DATE_TIME.name]"
                :error="errors.has(ProductionEventPropertiesReference.START_DATE_TIME.name) ? errors.first(ProductionEventPropertiesReference.START_DATE_TIME.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'required'"
        >
        </mau-form-group-date-time>
        <mau-form-group-date-time
                :name="ProductionEventPropertiesReference.END_DATE_TIME.name"
                :label="'de fin'"
                v-model="productionEvent.endDateTime"
                :initialValue="initialValues[ProductionEventPropertiesReference.END_DATE_TIME.name]"
                :error="errors.has(ProductionEventPropertiesReference.END_DATE_TIME.name) ? errors.first(ProductionEventPropertiesReference.END_DATE_TIME.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="{
                  date_format:  'yyyy-MM-dd HH:mm:ss',
                  after: productionEvent.startDateTime
                }"
        >
        </mau-form-group-date-time>
        <div class="form-group" v-if="isMachineRequired">
            <mau-form-input-select-dynamic
                    :initialObject="initialValues[ProductionEventPropertiesReference.MACHINE.name]"
                    :label="ProductionEventPropertiesReference.MACHINE.title"
                    :displayProperty="'name'"
                    v-model="productionEvent.machine"
                    :name="ProductionEventPropertiesReference.MACHINE.name"
                    :data-vv-as="ProductionEventPropertiesReference.MACHINE.title"
                    :error="errors.has(ProductionEventPropertiesReference.MACHINE.name) ? errors.first(ProductionEventPropertiesReference.MACHINE.name) : ''"
                    :endpointName="machineEndpointName"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'object_required'"
            >
            </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
            <mau-form-input-select-dynamic
                    :apiOperationOptions="{filterOrderBy: 'id|asc'}"
                    :initialObjects="initialValues[ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name]"
                    :label="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.title"
                    :displayProperty="'name'"
                    v-model="productionEvent.productionEventTypes"
                    :name="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name"
                    :data-vv-as="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.title"
                    :error="errors.has(ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name) ? errors.first(ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name) : ''"
                    :endpointName="productionEventTypeEndpointName"
                    :disabled="!userHasWritePrivileges"
                    :multiselect="true"
                    v-validate="'object_required'"
            >
            </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
            <mau-form-input-select-dynamic
                    :initialObject="initialValues[ProductionEventPropertiesReference.REPORT_EMPLOYEE.name]"
                    :label="ProductionEventPropertiesReference.REPORT_EMPLOYEE.title"
                    :displayProperty="'fullname'"
                    v-model="productionEvent.reportEmployee"
                    :name="ProductionEventPropertiesReference.REPORT_EMPLOYEE.name"
                    :data-vv-as="ProductionEventPropertiesReference.REPORT_EMPLOYEE.title"
                    :error="errors.has(ProductionEventPropertiesReference.REPORT_EMPLOYEE.name) ? errors.first(ProductionEventPropertiesReference.REPORT_EMPLOYEE.name) : ''"
                    :endpointName="employeeEndpointName"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'object_required'"
            >
            </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
            <mau-form-input-text
                    :label="ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.title"
                    :name="ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name"
                    v-model="productionEvent.reportEmployeeDescription"
                    :initialValue="initialValues[ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name]"
                    :error="errors.has(ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name) ? errors.first(ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name) : ''"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'required'"
            >
            </mau-form-input-text>
        </div>
        <div class="form-group">
            <mau-form-input-select-dynamic
                    :endpointName="employeeEndpointName"
                    :apiOperationOptions="maintenanceEmployeeApiOperationOptions"
                    :initialObject="initialValues[ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name]"
                    :label="ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.title"
                    :displayProperty="'fullname'"
                    v-model="productionEvent.maintenanceEmployee"
                    :name="ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name"
                    :data-vv-as="ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.title"
                    :error="errors.has(ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name) ? errors.first(ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name) : ''"
                    :disabled="!userHasWritePrivileges"
                    v-validate="{
                        object_required: productionEvent.endDateTime !== ''
                    }"
            >
            </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
            <mau-form-input-text
                    :label="ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.title"
                    :name="ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name"
                    v-model="productionEvent.maintenanceEmployeeDescription"
                    :initialValue="initialValues[ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name]"
                    :error="errors.has(ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name) ? errors.first(ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name) : ''"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'required'"
            >
            </mau-form-input-text>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import ProductionEventPropertiesReference from 'renderer/api/propertiesReference/ProductionEventPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  export default {
    data () {
      return {
        ProductionEventPropertiesReference: ProductionEventPropertiesReference,
        productionEvent: {
          startDateTime: '',
          endDateTime: '',
          machine: {},
          reportEmployee: {},
          maintenanceEmployee: {},
          productionEventTypes: {},
          maintenanceEmployeeDescription: '',
          reportEmployeeDescription: ''
        },
        initialValues: {},
        buttonDisabled: false,
        machineEndpointName: EntityTypes.MACHINE.apiName,
        employeeEndpointName: EntityTypes.EMPLOYEE.apiName,
        productionEventTypeEndpointName: EntityTypes.PRODUCTION_EVENT_TYPE.apiName
      }
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
    components: {
      MauFormInputSelectDynamic
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
      isMachineRequired: function () {
        return true
      },
      maintenanceEmployeeApiOperationOptions: function () {
        return {filterExacts: {employee_type_id: 3}}
      },
      isEditMode: function () {
        return this.initialValues[GlobalEntityIdentifier] && this.initialValues[GlobalEntityIdentifier] > 0
      },
      userHasWritePrivileges: function () {
        return true
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[ProductionEventPropertiesReference.START_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, ProductionEventPropertiesReference.START_DATE_TIME.name)
        this.initialValues[ProductionEventPropertiesReference.END_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, ProductionEventPropertiesReference.END_DATE_TIME.name)
        this.initialValues[ProductionEventPropertiesReference.MACHINE.name] = DefaultValuesHelper.object(this.initialObject, ProductionEventPropertiesReference.MACHINE.name)
        this.initialValues[ProductionEventPropertiesReference.REPORT_EMPLOYEE.name] = DefaultValuesHelper.object(this.initialObject, ProductionEventPropertiesReference.REPORT_EMPLOYEE.name)
        this.initialValues[ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name] = DefaultValuesHelper.object(this.initialObject, ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name)
        this.initialValues[ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name] = DefaultValuesHelper.array(this.initialObject, ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name)
        this.initialValues[ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name)
        this.initialValues[ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name)
      },
      save: function () {
        let directParams = {
          [ProductionEventPropertiesReference.START_DATE_TIME.name]: this.productionEvent.startDateTime,
          [ProductionEventPropertiesReference.END_DATE_TIME.name]: this.productionEvent.endDateTime,
          [ProductionEventPropertiesReference.REPORT_EMPLOYEE.relationship_id_name]: this.productionEvent.reportEmployee ? this.productionEvent.reportEmployee[GlobalEntityIdentifier] : null,
          [ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.relationship_id_name]: this.productionEvent.maintenanceEmployee ? this.productionEvent.maintenanceEmployee[GlobalEntityIdentifier] : null,
          [ProductionEventPropertiesReference.MACHINE.relationship_id_name]: this.isMachineRequired === true && this.productionEvent.machine ? this.productionEvent.machine[GlobalEntityIdentifier] : this.isEditMode ? 'null' : null,
          [ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name]: this.productionEvent.maintenanceEmployeeDescription,
          [ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name]: this.productionEvent.reportEmployeeDescription
        }
        let relayObjects = []
        let initialProductionEventTypesM2mStructuredObjects = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name], 'production_event_type_id')
        let productionEventTypesM2mStructuredObjects = ManyToManyHelper.createM2MStructuredObjects(this.productionEvent.productionEventTypes, 'production_event_type_id')
        let productionEventTypesM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          initialProductionEventTypesM2mStructuredObjects,
          productionEventTypesM2mStructuredObjects,
          'id'
        )
        let productionEventTypesRelayObjects = ManyToManyHelper.createRelayObject(productionEventTypesM2mFilteredObject, EntityTypes.PRODUCTION_E_PRODUCTION_ET)
        relayObjects.push(productionEventTypesRelayObjects)
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, relayObjects)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .font-80 {
        font-size: 80%;
    }
</style>
