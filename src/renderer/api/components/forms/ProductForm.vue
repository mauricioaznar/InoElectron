<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-select-dynamic
                :initialObject="initialValues[PropertiesReference.PRODUCT_TYPE.name]"
                :label="PropertiesReference.PRODUCT_TYPE.title"
                :displayProperty="'name'"
                :endpointName="productTypeEndpointName"
                v-model="product.productType"
                :name="PropertiesReference.PRODUCT_TYPE.name"
                :error="errors.has(PropertiesReference.PRODUCT_TYPE.name) ? errors.first(PropertiesReference.PRODUCT_TYPE.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
        >
        </mau-form-input-select-dynamic>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-text
                :initialValue="initialValues[PropertiesReference.CODE.name]"
                v-model="product.code"
                :label="PropertiesReference.CODE.title"
                :name="PropertiesReference.CODE.name"
                :error="errors.has(PropertiesReference.CODE.name) ? errors.first(PropertiesReference.CODE.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="{
                            required: true,
                            remote_unique: {
                              endpointName: productEndpointName,
                              columnName: PropertiesReference.CODE.name,
                              initialValue: initialValues[PropertiesReference.CODE.name]
                            }
                           }"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-text
          :initialValue="initialValues[PropertiesReference.DESCRIPTION.name]"
          v-model="product.description"
          :label="PropertiesReference.DESCRIPTION.title"
          :name="PropertiesReference.DESCRIPTION.name"
          :error="errors.has(PropertiesReference.DESCRIPTION.name) ? errors.first(PropertiesReference.DESCRIPTION.name) : ''"
          :disabled="!userHasWritePrivileges"
          v-validate="'required'"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group ">
      <b-form-checkbox
              v-if="isBag || isOthers"
              :disabled="!userHasWritePrivileges"
              v-model="product.requiresGroupWeight">
        ¿Require peso por bulto?
      </b-form-checkbox>
    </div>
    <div class="form-group ">
      <mau-form-input-number
              v-if="(isBag || isOthers) && product.requiresGroupWeight"
              :label="PropertiesReference.CURRENT_GROUP_WEIGHT.title"
              :name="PropertiesReference.CURRENT_GROUP_WEIGHT.name"
              :initialValue="initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name]"
              v-model="product.currentGroupWeight"
              :error="errors.has(PropertiesReference.CURRENT_GROUP_WEIGHT.name) ? errors.first(PropertiesReference.CURRENT_GROUP_WEIGHT.name) : ''"
              :disabled="!userHasWritePrivileges"
              v-validate="'required'"
              :type="'float'"
      >
      </mau-form-input-number>
    </div>
    <div class="form-group ">
      <b-form-checkbox
              v-if="(isBag || isOthers) && product.requiresGroupWeight"
              :disabled="!userHasWritePrivileges"
              v-model="product.groupWeightStrict">
        ¿Require de validacion exacta?
      </b-form-checkbox>
    </div>
    <div class="form-group form-row"
    >
      <div class="col-sm-12">
        <mau-form-input-number
                :label="PropertiesReference.CURRENT_KILO_PRICE.title"
                :name="PropertiesReference.CURRENT_KILO_PRICE.name"
                v-model="product.currentKiloPrice"
                :initialValue="initialValues[PropertiesReference.CURRENT_KILO_PRICE.name]"
                :error="errors.has(PropertiesReference.CURRENT_KILO_PRICE.name) ? errors.first(PropertiesReference.CURRENT_KILO_PRICE.name) : ''"
                :type="'float'"
                :disabled="!userHasWritePrivileges"
                v-validate="'required|min_value:1'"

        >
        </mau-form-input-number>
      </div>
    </div>
    <div class="form-group form-row"
      v-if="isBag || isRoll || isOthers"
    >
      <div :class="(isBag || isOthers) ? 'col-sm-6' : 'col-sm-12'">
        <mau-form-input-number
                :label="PropertiesReference.WIDTH.title"
                :name="PropertiesReference.WIDTH.name"
                v-model="product.width"
                :type="'float'"
                :initialValue="initialValues[PropertiesReference.WIDTH.name]"
                :error="errors.has(PropertiesReference.WIDTH.name) ? errors.first(PropertiesReference.WIDTH.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'required|min_value:1'"
        >
        </mau-form-input-number>
      </div>
      <div v-if="(isBag || isOthers)" class="col-sm-6">
        <mau-form-input-number
                :label="PropertiesReference.LENGTH.title"
                :name="PropertiesReference.LENGTH.name"
                v-model="product.length"
                :type="'float'"
                :initialValue="initialValues[PropertiesReference.LENGTH.name]"
                :error="errors.has(PropertiesReference.LENGTH.name) ? errors.first(PropertiesReference.LENGTH.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'required|min_value:1'"
        >
        </mau-form-input-number>
      </div>
    </div>
    <div class="form-group form-row"
         v-if="isBag || isRoll"
    >
      <div class="col-sm-12">
        <mau-form-input-number
                :label="PropertiesReference.CALIBRE.title"
                :name="PropertiesReference.CALIBRE.name"
                v-model="product.calibre"
                :type="'float'"
                :initialValue="initialValues[PropertiesReference.CALIBRE.name]"
                :error="errors.has(PropertiesReference.CALIBRE.name) ? errors.first(PropertiesReference.CALIBRE.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'required|min_value:1'"
        >
        </mau-form-input-number>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-select-dynamic
                :key="'material' + (this.product.productType[GlobalEntityIdentifier] ? this.product.productType[GlobalEntityIdentifier] : '')"
                :initialObject="initialValues[PropertiesReference.MATERIAL.name]"
                :apiOperationOptions="materialApiOperationsOptions"
                :label="PropertiesReference.MATERIAL.title"
                :displayProperty="'name'"
                :endpointName="materialEndpointName"
                v-model="product.material"
                :name="PropertiesReference.MATERIAL.name"
                :error="errors.has(PropertiesReference.MATERIAL.name) ? errors.first(PropertiesReference.MATERIAL.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
        >
        </mau-form-input-select-dynamic>
      </div>
    </div>
    <div class="form-group form-row"
         v-if="(isBag || isOthers)">
      <div class="col-sm-12">
        <mau-form-input-select-dynamic
                :initialObject="initialValues[PropertiesReference.PACKING.name]"
                :label="PropertiesReference.PACKING.title"
                :displayProperty="'name'"
                :endpointName="packingEndpointName"
                v-model="product.packing"
                :name="PropertiesReference.PACKING.name"
                :error="errors.has(PropertiesReference.PACKING.name) ? errors.first(PropertiesReference.PACKING.name) : ''"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
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
  import PropertiesReference from 'renderer/api/propertiesReference/ProductPropertiesReference'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  export default {
    name: 'ProductForm',
    data () {
      return {
        product: {
          material: {},
          packing: {},
          productType: {},
          code: '',
          calibre: '',
          description: '',
          currentKiloPrice: '',
          currentGroupWeight: '',
          groupWeightStrict: true,
          requiresGroupWeight: true,
          width: '',
          length: ''
        },
        buttonDisabled: false,
        initialValues: {},
        materialEndpointName: EntityTypes.MATERIAL.apiName,
        productTypeEndpointName: EntityTypes.PRODUCT_TYPE.apiName,
        packingEndpointName: EntityTypes.PACKING.apiName,
        productEndpointName: EntityTypes.PRODUCT.apiName,
        PropertiesReference: PropertiesReference,
        GlobalEntityIdentifier: GlobalEntityIdentifier
      }
    },
    computed: {
      isBag: function () {
        return this.product.productType[GlobalEntityIdentifier] === 1
      },
      isRoll: function () {
        return this.product.productType[GlobalEntityIdentifier] === 2
      },
      isPellet: function () {
        return this.product.productType[GlobalEntityIdentifier] === 3
      },
      isOthers: function () {
        return this.product.productType[GlobalEntityIdentifier] === 4
      },
      userHasWritePrivileges: function () {
        return true
      },
      materialApiOperationsOptions: function () {
        let filterExacts = {[PropertiesReference.PRODUCT_TYPE.relationship_id_name]: this.product.productType[GlobalEntityIdentifier] ? this.product.productType[GlobalEntityIdentifier] : ''}
        return {filterExacts: filterExacts}
      }
    },
    components: {
      MauFormInputSelectDynamic
    },
    props: {
      initialObject: {
        type: Object,
        validator: function (obj) {
          return obj !== null
        }
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
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        console.log(PropertiesReference)
        this.initialValues[PropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DESCRIPTION.name)
        this.initialValues[PropertiesReference.CODE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CODE.name)
        this.initialValues[PropertiesReference.LENGTH.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LENGTH.name)
        this.initialValues[PropertiesReference.WIDTH.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.WIDTH.name)
        this.initialValues[PropertiesReference.CALIBRE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CALIBRE.name)
        this.initialValues[PropertiesReference.CURRENT_KILO_PRICE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CURRENT_KILO_PRICE.name)
        this.initialValues[PropertiesReference.MATERIAL.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.MATERIAL.name)
        this.initialValues[PropertiesReference.PRODUCT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.PRODUCT_TYPE.name)
        this.initialValues[PropertiesReference.PACKING.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.PACKING.name)
        this.initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CURRENT_GROUP_WEIGHT.name)
        if (this.initialObject) {
          this.product.groupWeightStrict = this.initialObject[PropertiesReference.GROUP_WEIGHT_STRICT.name] === 1
          this.product.requiresGroupWeight = this.initialObject[PropertiesReference.CURRENT_GROUP_WEIGHT.name] !== null
        }
      },
      save: function () {
        let directParams = {
          [PropertiesReference.CODE.name]: this.product.code,
          [PropertiesReference.DESCRIPTION.name]: this.product.description,
          [PropertiesReference.WIDTH.name]: (this.isBag || this.isRoll || this.isOthers) ? this.product.width : 0,
          [PropertiesReference.CURRENT_KILO_PRICE.name]: this.product.currentKiloPrice,
          // one to many
          [PropertiesReference.MATERIAL.relationship_id_name]: this.product.material ? this.product.material[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [PropertiesReference.PACKING.relationship_id_name]: this.product.packing && (this.isBag || this.isOthers) ? this.product.packing[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [PropertiesReference.PRODUCT_TYPE.relationship_id_name]: this.product.productType ? this.product.productType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
        }
        if (this.isBag || this.isOthers) {
          if (this.product.requiresGroupWeight) {
            directParams[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = this.product.currentGroupWeight
            directParams[PropertiesReference.GROUP_WEIGHT_STRICT.name] = this.product.groupWeightStrict ? 1 : 0
          } else {
            directParams[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = null
            directParams[PropertiesReference.GROUP_WEIGHT_STRICT.name] = 0
          }
          directParams[PropertiesReference.LENGTH.name] = this.product.length
        } else {
          directParams[PropertiesReference.GROUP_WEIGHT_STRICT.name] = -1
          directParams[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = null
          directParams[PropertiesReference.LENGTH.name] = null
          directParams[PropertiesReference.PACKING.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
        }
        if (this.isBag || this.isRoll) {
          directParams[PropertiesReference.CALIBRE.name] = this.product.calibre
        } else {
          directParams[PropertiesReference.CALIBRE.name] = 0
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, {})
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

<style>

</style>
