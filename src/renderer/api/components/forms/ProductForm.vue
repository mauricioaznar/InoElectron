<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-select
                :initialObject="initialValues[PropertiesReference.PRODUCT_TYPE.name]"
                :label="PropertiesReference.PRODUCT_TYPE.title"
                :displayProperty="'name'"
                :entityType="productTypeEntityType"
                v-model="product.productType"
                :name="PropertiesReference.PRODUCT_TYPE.name"
                :error="errors.first(PropertiesReference.PRODUCT_TYPE.name)"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
        >
        </mau-form-input-select>
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
                              entityType: productEntityType,
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
              v-if="isBag"
              :disabled="!userHasWritePrivileges"
              v-model="product.requiresGroupWeight">
        ¿Require peso por bulto?
      </b-form-checkbox>
    </div>
    <div class="form-group ">
      <mau-form-input-number
              v-if="isBag && product.requiresGroupWeight"
              :label="PropertiesReference.CURRENT_GROUP_WEIGHT.title"
              :name="PropertiesReference.CURRENT_GROUP_WEIGHT.name"
              :initialValue="initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name]"
              v-model="product.currentGroupWeight"
              :error="errors.has(PropertiesReference.CURRENT_GROUP_WEIGHT.name) ? errors.first(PropertiesReference.CURRENT_GROUP_WEIGHT.name) : ''"
              :disabled="!userHasWritePrivileges"
              v-validate="'required|min_value:1'"
      >
      </mau-form-input-number>
    </div>
    <div class="form-group ">
      <b-form-checkbox
              v-if="isBag && product.requiresGroupWeight"
              :disabled="!userHasWritePrivileges"
              v-model="product.groupWeightStrict">
        ¿Require de validacion exacta?
      </b-form-checkbox>
    </div>
    <div class="form-group form-row">
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
    <div class="form-group form-row">
      <div :class="isBag ? 'col-sm-6' : 'col-sm-12'">
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
      <div v-if="isBag" class="col-sm-6">
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
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-select
                :initialObject="initialValues[PropertiesReference.MATERIAL.name]"
                :label="PropertiesReference.MATERIAL.title"
                :displayProperty="'name'"
                :entityType="materialEntityType"
                v-model="product.material"
                :name="PropertiesReference.MATERIAL.name"
                :error="errors.first(PropertiesReference.MATERIAL.name)"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
        >
        </mau-form-input-select>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-select
                v-if="isProductBag()"
                :initialObject="initialValues[PropertiesReference.PACKING.name]"
                :label="PropertiesReference.PACKING.title"
                :displayProperty="'name'"
                :entityType="packingEntityType"
                v-model="product.packing"
                :name="PropertiesReference.PACKING.name"
                :error="errors.first(PropertiesReference.PACKING.name)"
                :disabled="!userHasWritePrivileges"
                v-validate="'object_required'"
        >
        </mau-form-input-select>
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
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
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
        materialEntityType: EntityTypes.MATERIAL,
        productEntityType: EntityTypes.PRODUCT,
        productTypeEntityType: EntityTypes.PRODUCT_TYPE,
        packingEntityType: EntityTypes.PACKING,
        PropertiesReference: PropertiesReference
      }
    },
    computed: {
      isBag: function () {
        return this.product.productType[GlobalEntityIdentifier] === 1
      },
      userHasWritePrivileges: function () {
        return true
      }
    },
    components: {
      MauFormInputSelect
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
        this.initialValues[PropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DESCRIPTION.name)
        this.initialValues[PropertiesReference.CODE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CODE.name)
        this.initialValues[PropertiesReference.LENGTH.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LENGTH.name)
        this.initialValues[PropertiesReference.WIDTH.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.WIDTH.name)
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
      isProductBag: function () {
        return this.product && this.product.productType && this.product.productType[GlobalEntityIdentifier] === 1
      },
      save: function () {
        let directParams = {
          [PropertiesReference.CODE.name]: this.product.code,
          [PropertiesReference.DESCRIPTION.name]: this.product.description,
          [PropertiesReference.WIDTH.name]: this.product.width,
          [PropertiesReference.CURRENT_KILO_PRICE.name]: this.product.currentKiloPrice,
          // one to many
          [PropertiesReference.MATERIAL.relationship_id_name]: this.product.material ? this.product.material[GlobalEntityIdentifier] : null,
          [PropertiesReference.PACKING.relationship_id_name]: this.product.packing ? this.product.packing[GlobalEntityIdentifier] : null,
          [PropertiesReference.PRODUCT_TYPE.relationship_id_name]: this.product.productType ? this.product.productType[GlobalEntityIdentifier] : null
        }
        if (this.isBag) {
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
          if (this.initialObject) {
            directParams[PropertiesReference.PACKING.relationship_id_name] = null
          }
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
