<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <mau-form-input-text
                :initialValue="initialValues[PropertiesReference.CODE.name]"
                v-model="bag.code"
                :label="PropertiesReference.CODE.title"
                :name="PropertiesReference.CODE.name"
                :error="errors.first(PropertiesReference.CODE.name)"
                v-validate="{
                            required: true,
                            remote_unique: {
                              entityType: bagEntityType,
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
          v-model="bag.description"
          :label="PropertiesReference.DESCRIPTION.title"
          :name="PropertiesReference.DESCRIPTION.name"
          :error="errors.first(PropertiesReference.DESCRIPTION.name)"
          v-validate="'required'"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 bag_currentGroupWeight">
        <div class="mb-1">
          <b-form-checkbox
                  v-model="hasGroupWeight">
            ¿Tiene peso por bulto?
          </b-form-checkbox>
        </div>
        <mau-form-input-number
                v-if="hasGroupWeight"
                :label="PropertiesReference.CURRENT_GROUP_WEIGHT.title"
                :name="PropertiesReference.CURRENT_GROUP_WEIGHT.name"
                :initialValue="initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name]"
                v-model="bag.currentGroupWeight"
                v-validate="'required|min_value:1'"
                :error="errors.first(PropertiesReference.CURRENT_GROUP_WEIGHT.name)"
        >
        </mau-form-input-number>

      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 bag_currentKiloPrice">
        <mau-form-input-number
                :label="PropertiesReference.CURRENT_KILO_PRICE.title"
                :name="PropertiesReference.CURRENT_KILO_PRICE.name"
                v-model="bag.currentKiloPrice"
                :initialValue="initialValues[PropertiesReference.CURRENT_KILO_PRICE.name]"
                v-validate="'required|min_value:1'"
                :error="errors.first(PropertiesReference.CURRENT_KILO_PRICE.name)"
                :type="'float'"

        >
        </mau-form-input-number>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-6 bag_width">
        <mau-form-input-number
                :label="PropertiesReference.WIDTH.title"
                :name="PropertiesReference.WIDTH.name"
                v-model="bag.width"
                :initialValue="initialValues[PropertiesReference.WIDTH.name]"
                v-validate="'required|min_value:1'"
                :error="errors.first(PropertiesReference.WIDTH.name)"
        >
        </mau-form-input-number>
      </div>
      <div class="col-sm-6 bag_length">
        <mau-form-input-number
                :label="PropertiesReference.LENGTH.title"
                :name="PropertiesReference.LENGTH.name"
                v-model="bag.length"
                :initialValue="initialValues[PropertiesReference.LENGTH.name]"
                v-validate="'required|min_value:1'"
                :error="errors.first(PropertiesReference.LENGTH.name)"
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
                v-model="bag.material"
                :name="PropertiesReference.MATERIAL.name"
                :error="errors.first(PropertiesReference.MATERIAL.name)"
                v-validate="'object_required'"
        >
        </mau-form-input-select>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 bag_type">
        <label>{{PropertiesReference.BAG_PACKING.title}}</label>
        <b-form-radio-group
                stacked
                :id="PropertiesReference.BAG_PACKING.name"
                v-model="bag.bagPacking"
                v-validate="'required'"
                class="form-control override-outline"
                :name="PropertiesReference.BAG_PACKING.name"
                :data-vv-name="PropertiesReference.BAG_PACKING.name"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.BAG_PACKING.name))"
        >
          <b-form-radio
                  v-for="bagPacking in availableBagPackings"
                  :value="bagPacking"
                  :key="bagPacking.id"
          >
            {{bagPacking.name}}
          </b-form-radio>
        </b-form-radio-group>
        <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.BAG_PACKING.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.BAG_PACKING.name) }}
                      </span>
        </div>
      </div>
    </div>
    <div class="container mb-2 text-right">
      <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import NormalizeObjects from 'renderer/api/functions/NormalizeObjects'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import MaskedInput from 'vue-text-mask'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'BagForm',
    data () {
      return {
        bag: {
          material: {},
          bagPacking: '',
          code: '',
          description: '',
          currentKiloPrice: '',
          currentGroupWeight: '',
          width: '',
          length: ''
        },
        hasGroupWeight: true,
        buttonDisabled: false,
        initialValues: {},
        materialEntityType: EntityTypes.MATERIAL,
        bagEntityType: EntityTypes.BAG,
        PropertiesReference: PropertiesReference
      }
    },
    components: {
      MauFormInputNumber,
      MauFormInputSelect,
      MauFormInputText,
      MaskedInput
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues()
      }
    },
    computed: {
      ...mapState({
        availableBagPackings: state => {
          let availableBagPackings = state.api.entity.bagPackings
          return NormalizeObjects.normalizeObjects(availableBagPackings, ['name'])
        }
      })
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      createDefaultInitialValues: function () {
        for (let propertyReference in PropertiesReference) {
          if (PropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[PropertiesReference[propertyReference].name] = PropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[PropertiesReference.DESCRIPTION.name] = this.initialObject[PropertiesReference.DESCRIPTION.name]
        this.initialValues[PropertiesReference.CODE.name] = this.initialObject[PropertiesReference.CODE.name]
        this.initialValues[PropertiesReference.LENGTH.name] = this.initialObject[PropertiesReference.WIDTH.name]
        this.initialValues[PropertiesReference.WIDTH.name] = this.initialObject[PropertiesReference.WIDTH.name]
        this.initialValues[PropertiesReference.CURRENT_KILO_PRICE.name] = this.initialObject[PropertiesReference.CURRENT_KILO_PRICE.name] + ''
        this.initialValues[PropertiesReference.MATERIAL.name] = this.initialObject[PropertiesReference.MATERIAL.name]
        if (this.initialObject[PropertiesReference.CURRENT_GROUP_WEIGHT.name]) {
          this.initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = this.initialObject[PropertiesReference.CURRENT_GROUP_WEIGHT.name]
          this.hasGroupWeight = true
        } else {
          this.initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = 0
          this.hasGroupWeight = false
        }
        this.bag.bagPacking = NormalizeObjects.normalizeObject(this.initialObject[PropertiesReference.BAG_PACKING.name], ['name'])
      },
      save: function () {
        let directParams = {
          [PropertiesReference.CODE.name]: this.bag.code,
          [PropertiesReference.DESCRIPTION.name]: this.bag.description,
          [PropertiesReference.WIDTH.name]: this.bag.width,
          [PropertiesReference.LENGTH.name]: this.bag.length,
          [PropertiesReference.CURRENT_KILO_PRICE.name]: this.bag.currentKiloPrice,
          [PropertiesReference.CURRENT_GROUP_WEIGHT.name]: this.hasGroupWeight ? this.bag.currentGroupWeight : 'null',
          // one to many
          [PropertiesReference.MATERIAL.relationship_id_name]: this.bag.material ? this.bag.material[GlobalEntityIdentifier] : null,
          [PropertiesReference.BAG_PACKING.relationship_id_name]: this.bag.bagPacking ? this.bag.bagPacking[GlobalEntityIdentifier] : null
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

<style>

</style>