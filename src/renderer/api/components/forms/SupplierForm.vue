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
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseCategoryEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name]"
                        :label="SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultExpenseCategory"
                        :name="SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name) ? errors.first(SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(supplier.defaultExpenseCategory && supplier.defaultExpenseCategory.id ? supplier.defaultExpenseCategory.id : 0) + 'defaultExpenseSubcategory'"
                        :apiOperationOptions="defaultExpenseSubcategoryApiOperations"
                        :endpointName="expenseSubcategoryEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name]"
                        :label="SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultExpenseSubcategory"
                        :name="SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name) ? errors.first(SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseBranchEndpointName"
                        :initialObject="initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name]"
                        :label="SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.title"
                        :displayProperty="'name'"
                        v-model="supplier.defaultExpenseBranch"
                        :name="SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name"
                        :error="errors.has(SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name) ? errors.first(SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name) : ''"
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
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import SupplierPropertiesReference from 'renderer/api/propertiesReference/SupplierPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  export default {
    name: 'SupplierForm',
    data () {
      return {
        SupplierPropertiesReference: SupplierPropertiesReference,
        supplier: {
          name: '',
          defaultExpenseType: {},
          defaultExpenseCategory: {},
          defaultExpenseSubcategory: {},
          defaultExpenseBranch: {}
        },
        initialValues: {},
        expenseTypeEndpointName: EntityTypes.EXPENSE_TYPE.apiName,
        expenseCategoryEndpointName: EntityTypes.EXPENSE_CATEGORY.apiName,
        expenseSubcategoryEndpointName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
        expenseBranchEndpointName: EntityTypes.EXPENSE_BRANCH.apiName,
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
      defaultExpenseSubcategoryApiOperations: function () {
        if (this.supplier.defaultExpenseCategory && this.supplier.defaultExpenseCategory.id) {
          return {filterExacts: {expense_category_id: this.supplier.defaultExpenseCategory.id}}
        }
        return {}
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[SupplierPropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, SupplierPropertiesReference.NAME.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name)
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name] = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name)
      },
      setDefaultSubcategoryInitialValue: function (defaultExpenseCategory) {
        let defaultExpenseSubcategory = DefaultValuesHelper.object(this.initialObject, SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name)
        let initialDefaultSubcategory = {}
        if (!isObjectEmpty(defaultExpenseSubcategory)) {
          if (defaultExpenseSubcategory.expense_category_id === defaultExpenseCategory.id) {
            initialDefaultSubcategory = defaultExpenseSubcategory
          }
        }
        this.initialValues[SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name] = initialDefaultSubcategory
      },
      save: function () {
        let directParams = {
          [SupplierPropertiesReference.NAME.name]: this.supplier.name,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.relationship_id_name]: this.supplier.defaultExpenseType ? this.supplier.defaultExpenseType[GlobalEntityIdentifier] : null,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.relationship_id_name]: this.supplier.defaultExpenseCategory ? this.supplier.defaultExpenseCategory[GlobalEntityIdentifier] : null,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.relationship_id_name]: this.supplier.defaultExpenseSubcategory ? this.supplier.defaultExpenseSubcategory[GlobalEntityIdentifier] : null,
          [SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.relationship_id_name]: this.supplier.defaultExpenseBranch ? this.supplier.defaultExpenseBranch[GlobalEntityIdentifier] : null
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
      },
      'supplier.defaultExpenseCategory': function (defaultExpenseCategory) {
        this.setDefaultSubcategoryInitialValue(defaultExpenseCategory)
      }
    }
  }

</script>