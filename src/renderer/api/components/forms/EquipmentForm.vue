<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[EquipmentPropertiesReference.DESCRIPTION.name]"
                        v-model="equipment.description"
                        :label="EquipmentPropertiesReference.DESCRIPTION.title"
                        :name="EquipmentPropertiesReference.DESCRIPTION.name"
                        :error="errors.has(EquipmentPropertiesReference.DESCRIPTION.name) ? errors.first(EquipmentPropertiesReference.DESCRIPTION.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name]"
                        :label="EquipmentPropertiesReference.EQUIPMENT_CATEGORY.title"
                        :displayProperty="'name'"
                        :endpointName="equipmentCategoryEndpointName"
                        v-model="equipment.equipmentCategory"
                        :name="EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name"
                        :error="errors.has(EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name) ? errors.first(EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name]"
                        :label="EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.title"
                        :displayProperty="'name'"
                        :endpointName="equipmentSubcategoryEndpointName"
                        v-model="equipment.equipmentSubcategory"
                        :name="EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name"
                        :error="errors.has(EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name) ? errors.first(EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name]"
                        :label="EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.title"
                        :displayProperty="'name'"
                        :endpointName="equipmentMeasurementUnitEndpointName"
                        v-model="equipment.equipmentMeasurementUnit"
                        :name="EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name"
                        :error="errors.has(EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name) ? errors.first(EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import EquipmentPropertiesReference from 'renderer/api/propertiesReference/EquipmentPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  export default {
    name: 'EquipmentForm',
    data () {
      return {
        EquipmentPropertiesReference: EquipmentPropertiesReference,
        equipment: {
          description: '',
          equipmentCategory: {},
          equipmentSubcategory: {},
          equipmentMeasurementUnit: {}
        },
        initialValues: {},
        equipmentCategoryEndpointName: EntityTypes.EQUIPMENT_CATEGORY.apiName,
        equipmentSubcategoryEndpointName: EntityTypes.EQUIPMENT_SUBCATEGORY.apiName,
        equipmentMeasurementUnitEndpointName: EntityTypes.EQUIPMENT_MEASUREMENT_UNIT.apiName,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic
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
        this.initialValues[EquipmentPropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, EquipmentPropertiesReference.DESCRIPTION.name)
        this.initialValues[EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name] = DefaultValuesHelper.object(this.initialObject, EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.name)
        this.initialValues[EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name] = DefaultValuesHelper.object(this.initialObject, EquipmentPropertiesReference.EQUIPMENT_CATEGORY.name)
        this.initialValues[EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name] = DefaultValuesHelper.object(this.initialObject, EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.name)
      },
      save: function () {
        let directParams = {
          [EquipmentPropertiesReference.DESCRIPTION.name]: this.equipment.description,
          [EquipmentPropertiesReference.EQUIPMENT_MEASUREMENT_UNIT.relationship_id_name]: this.equipment.equipmentMeasurementUnit
            ? this.equipment.equipmentMeasurementUnit[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [EquipmentPropertiesReference.EQUIPMENT_SUBCATEGORY.relationship_id_name]: this.equipment.equipmentSubcategory
            ? this.equipment.equipmentSubcategory[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [EquipmentPropertiesReference.EQUIPMENT_CATEGORY.relationship_id_name]: this.equipment.equipmentCategory
            ? this.equipment.equipmentCategory[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
        }
        let indirectParams = {
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
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
