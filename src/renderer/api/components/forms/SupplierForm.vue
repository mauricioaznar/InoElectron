<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[SupplierPropertiesReference.NAME.name]"
                        v-model="supplier.name"
                        :label="SupplierPropertiesReference.NAME.title"
                        :name="SupplierPropertiesReference.NAME.name"
                        :error="errors.has(SupplierPropertiesReference.NAME.name) ? errors.first(SupplierPropertiesReference.NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseTypeEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name]"
                        :label="SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultExpenseType"
                        :name="SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name) ? errors.first(SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :apiOperationOptions="{filterOrderBy: 'expense_category_id|asc'}"
                        :endpointName="expenseSubcategoryEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name]"
                        :label="SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultExpenseSubcategory"
                        :name="SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name) ? errors.first(SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="defaultBranchEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_BRANCH.name]"
                        :label="SupplierPropertiesReference.DEFAULT_BRANCH.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultBranch"
                        :name="SupplierPropertiesReference.DEFAULT_BRANCH.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_BRANCH.name) ? errors.first(SupplierPropertiesReference.DEFAULT_BRANCH.name) : ''"
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
  import SupplierPropertiesReference from 'renderer/api/propertiesReference/SupplierPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'SupplierForm',
    data () {
      return {
        SupplierPropertiesReference: SupplierPropertiesReference,
        supplier: {
          name: '',
          defaultExpenseType: {},
          defaultExpenseSubcategory: {},
          defaultBranch: {}
        },
        initialValues: {},
        expenseTypeEndpointName: EntityTypes.EXPENSE_TYPE.apiName,
        expenseSubcategoryEndpointName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
        defaultBranchEndpointName: EntityTypes.BRANCH.apiName,
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
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[SupplierPropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, SupplierPropertiesReference.NAME.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_BRANCH.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_BRANCH.name)
      },
      save: function () {
        let directParams = {
          [SupplierPropertiesReference.NAME.name]: this.supplier.name,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.relationship_id_name]: this.supplier.defaultExpenseType ? this.supplier.defaultExpenseType[GlobalEntityIdentifier] : null,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.relationship_id_name]: this.supplier.defaultExpenseSubcategory ? this.supplier.defaultExpenseSubcategory[GlobalEntityIdentifier] : null,
          [SupplierPropertiesReference.DEFAULT_BRANCH.relationship_id_name]: this.supplier.defaultBranch ? this.supplier.defaultBranch[GlobalEntityIdentifier] : null
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
