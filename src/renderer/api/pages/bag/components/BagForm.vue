<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12">
        <label><b>{{PropertiesReference.NAME.title}}</b></label>
        <div>{{bag.name}}</div>
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
          @input="updateCode"
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
                @input="updateCode"
        >
        </mau-form-input-number>

      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 bag_currentUnitPrice">
        <mau-form-input-number
                :label="PropertiesReference.CURRENT_UNIT_PRICE.title"
                :name="PropertiesReference.CURRENT_UNIT_PRICE.name"
                v-model="bag.currentUnitPrice"
                :initialValue="initialValues[PropertiesReference.CURRENT_UNIT_PRICE.name]"
                v-validate="'required|min_value:1'"
                :error="errors.first(PropertiesReference.CURRENT_UNIT_PRICE.name)"
                :type="'currency'"

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
                @input="updateCode"
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
                @input="updateCode"
        >
        </mau-form-input-number>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 bag_type">
        <label>{{PropertiesReference.BAG_TYPE.title}}</label>
        <b-form-radio-group
                stacked
                :id="PropertiesReference.BAG_TYPE.name"
                v-model="bag.bagType"
                v-validate="'required'"
                class="form-control override-outline"
                :name="PropertiesReference.BAG_TYPE.name"
                :data-vv-name="PropertiesReference.BAG_TYPE.name"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.BAG_TYPE.name))"
                @input="updateCode"
        >
          <b-form-radio
                  v-for="bagType in availableBagTypes"
                  :value="bagType"
                  :key="bagType.id"
          >
            {{bagType.name}}
          </b-form-radio>
        </b-form-radio-group>
        <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.BAG_TYPE.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.BAG_TYPE.name) }}
                      </span>
        </div>
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
                @input="updateCode"
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
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import NormalizeObjects from 'renderer/services/api/NormalizeObjects'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import MaskedInput from 'vue-text-mask'
  import MauFormInputNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputNumber.vue'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText.vue'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import getFirstCharactersFromWords from 'renderer/services/common/getFirstCharactersFromWords'
  export default {
    name: 'BagForm',
    data () {
      return {
        bag: {
          bagType: '',
          bagPacking: '',
          name: '',
          description: '',
          currentUnitPrice: '',
          currentGroupWeight: '',
          width: '',
          length: ''
        },
        hasGroupWeight: true,
        buttonDisabled: false,
        initialValues: {},
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
      this.updateCode()
      if (this.initialObject) {
        this.setInitialValues()
      }
    },
    computed: {
      ...mapState({
        availableBagTypes: state => {
          let availableBagTypes = state.api.entity.bagTypes
          return NormalizeObjects.normalizeObjects(availableBagTypes, ['name'])
        },
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
        this.initialValues[PropertiesReference.NAME.name] = this.initialObject[PropertiesReference.NAME.name]
        this.initialValues[PropertiesReference.LENGTH.name] = this.initialObject[PropertiesReference.WIDTH.name]
        this.initialValues[PropertiesReference.WIDTH.name] = this.initialObject[PropertiesReference.WIDTH.name]
        this.initialValues[PropertiesReference.CURRENT_UNIT_PRICE.name] = this.initialObject[PropertiesReference.CURRENT_UNIT_PRICE.name] + ''
        if (this.initialObject[PropertiesReference.CURRENT_GROUP_WEIGHT.name]) {
          this.initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = this.initialObject[PropertiesReference.CURRENT_GROUP_WEIGHT.name]
          this.hasGroupWeight = true
        } else {
          this.initialValues[PropertiesReference.CURRENT_GROUP_WEIGHT.name] = 0
          this.hasGroupWeight = false
        }
        this.bag.bagType = NormalizeObjects.normalizeObject(this.initialObject[PropertiesReference.BAG_TYPE.name], ['name'])
        this.bag.bagPacking = NormalizeObjects.normalizeObject(this.initialObject[PropertiesReference.BAG_PACKING.name], ['name'])
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.bag.name,
          [PropertiesReference.DESCRIPTION.name]: this.bag.description,
          [PropertiesReference.WIDTH.name]: this.bag.width,
          [PropertiesReference.LENGTH.name]: this.bag.length,
          [PropertiesReference.CURRENT_UNIT_PRICE.name]: this.bag.currentUnitPrice,
          [PropertiesReference.CURRENT_GROUP_WEIGHT.name]: this.hasGroupWeight ? this.bag.currentGroupWeight : 'null',
          // one to many
          [PropertiesReference.BAG_TYPE.relationship_id_name]: this.bag.bagType ? this.bag.bagType[GlobalEntityIdentifier] : null,
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
      },
      updateCode: function () {
        let bagTypeChars = (this.bag.bagType ? getFirstCharactersFromWords(this.bag.bagType.name) : '')
        let bagPackingChars = (this.bag.bagPacking ? getFirstCharactersFromWords(this.bag.bagPacking.name) : '')
        this.bag.name = 'B' + bagTypeChars + this.bag.width + 'X' + this.bag.length + bagPackingChars
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