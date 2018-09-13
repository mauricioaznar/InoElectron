<template>
    <div>
        <mau-form-input-date-time
                :name="ProductionEventPropertiesReference.START_DATE_TIME.name"
                :label="'de inicio'"
                v-model="productionEvent.startDateTime"
                :initialValue="initialValues[ProductionEventPropertiesReference.START_DATE_TIME.name]"
                :error="errors.first(ProductionEventPropertiesReference.START_DATE_TIME.name)"
                :disabled="!userHasWritePrivileges"
                v-validate="'required'"
        >
        </mau-form-input-date-time>
        <mau-form-input-date-time
                :name="ProductionEventPropertiesReference.END_DATE_TIME.name"
                :label="'de fin'"
                v-model="productionEvent.endDateTime"
                :initialValue="initialValues[ProductionEventPropertiesReference.END_DATE_TIME.name]"
                :error="errors.first(ProductionEventPropertiesReference.END_DATE_TIME.name)"
                :disabled="!userHasWritePrivileges"
                v-validate="'required|date_format:YYYY-MM-DD HH:mm:ss|after:' + productionEvent.startDateTime"
        >
        </mau-form-input-date-time>
        <div class="form-group">
            <mau-form-input-select
                    :initialObject="initialValues[ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name]"
                    :label="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.title"
                    :displayProperty="'name'"
                    v-model="productionEvent.productionEventType"
                    :name="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name"
                    :data-vv-as="ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.title"
                    :error="errors.first(ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name)"
                    :entityType="productionEventTypeEntityType"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'object_required'"
            >
            </mau-form-input-select>
        </div>
        <div class="form-group" v-if="isMachineFailureTypeSelected">
            <mau-form-input-select
                    :initialObject="initialValues[ProductionEventPropertiesReference.MACHINE.name]"
                    :label="ProductionEventPropertiesReference.MACHINE.title"
                    :displayProperty="'name'"
                    v-model="productionEvent.machine"
                    :name="ProductionEventPropertiesReference.MACHINE.name"
                    :data-vv-as="ProductionEventPropertiesReference.MACHINE.title"
                    :error="errors.first(ProductionEventPropertiesReference.MACHINE.name)"
                    :entityType="machineEntityType"
                    :disabled="!userHasWritePrivileges"
                    v-validate="'object_required'"
            >
            </mau-form-input-select>
        </div>
        <div class="form-group">
            <label>Descripcion</label>
            <mau-editor
                    :id="'description'"
                    v-model="productionEvent.description"
                    :initialValue="initialValues[ProductionEventPropertiesReference.DESCRIPTION.name]">
            </mau-editor>
        </div>
        <div class="form-group">
            <production-event-check-table
                :initialChecks="initialValues[ProductionEventPropertiesReference.CHECKS.name]"
                :name="ProductionEventPropertiesReference.CHECKS.name"
                v-validate="'array_required'"
                v-model="productionEvent.checks"
            >

            </production-event-check-table>
            <span v-show="errors.has(ProductionEventPropertiesReference.CHECKS.name)" class="danger font-80">
              {{ errors.first(ProductionEventPropertiesReference.CHECKS.name) }}
            </span>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauEditor from 'renderer/components/mau-components/mau-editor/MauEditor.vue'
  import ProductionEventCheckTable from 'renderer/api/components/m2m/ProductionEventCheckTable.vue'
  import ProductionEventPropertiesReference from 'renderer/api/propertiesReference/ProductionEventPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    data () {
      return {
        ProductionEventPropertiesReference: ProductionEventPropertiesReference,
        productionEvent: {
          startDateTime: '',
          endDateTime: '',
          machine: {},
          productionEventType: {},
          description: '',
          checks: []
        },
        initialValues: [],
        buttonDisabled: false,
        machineEntityType: EntityTypes.MACHINE,
        productionEventTypeEntityType: EntityTypes.PRODUCTION_EVENT_TYPE
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
      MauFormInputDateTime,
      MauFormInputSelect,
      MauEditor,
      ProductionEventCheckTable
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
      isMachineFailureTypeSelected: function () {
        return this.productionEvent.productionEventType ? this.productionEvent.productionEventType[GlobalEntityIdentifier] === 2 : false
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
        this.initialValues[ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name)
        this.initialValues[ProductionEventPropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, ProductionEventPropertiesReference.DESCRIPTION.name)
        this.initialValues[ProductionEventPropertiesReference.CHECKS.name] = DefaultValuesHelper.array(this.initialObject, ProductionEventPropertiesReference.CHECKS.name)
      },
      save: function () {
        let directParams = {
          [ProductionEventPropertiesReference.START_DATE_TIME.name]: this.productionEvent.startDateTime,
          [ProductionEventPropertiesReference.END_DATE_TIME.name]: this.productionEvent.endDateTime,
          [ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.relationship_id_name]: this.productionEvent.productionEventType ? this.productionEvent.productionEventType[GlobalEntityIdentifier] : 'null',
          [ProductionEventPropertiesReference.DESCRIPTION.name]: this.productionEvent.description
        }
        if (this.isMachineFailureTypeSelected) {
          directParams[ProductionEventPropertiesReference.MACHINE.relationship_id_name] = this.productionEvent.machine ? this.productionEvent.machine[GlobalEntityIdentifier] : 'null'
        } else {
          directParams[ProductionEventPropertiesReference.MACHINE.relationship_id_name] = 'null'
        }
        let relayObjects = []
        let filteredProductionChecks = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          this.initialValues[ProductionEventPropertiesReference.CHECKS.name],
          this.productionEvent.checks,
          'id'
        )
        let productionCheckRelayObject = ManyToManyHelper.createRelayObject(filteredProductionChecks, EntityTypes.PRODUCTION_EVENT_CHECK)
        relayObjects.push(productionCheckRelayObject)
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