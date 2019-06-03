<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :label="ExpensePropertiesReference.DESCRIPTION.title"
                        :name="ExpensePropertiesReference.DESCRIPTION.name"
                        v-model="expense.description"
                        :initialValue="initialValues[ExpensePropertiesReference.DESCRIPTION.name]"
                        :error="errors.has(ExpensePropertiesReference.DESCRIPTION.name) ? errors.first(ExpensePropertiesReference.DESCRIPTION.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.DATE.name"
                        :label="ExpensePropertiesReference.DATE.title"
                        v-model="expense.date"
                        :initialValue="initialValues[ExpensePropertiesReference.DATE.name]"
                        :error="errors.has(ExpensePropertiesReference.DATE.name) ? errors.first(ExpensePropertiesReference.DATE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-number
                        :label="ExpensePropertiesReference.TOTAL.title"
                        :name="ExpensePropertiesReference.TOTAL.name"
                        v-model="expense.total"
                        :initialValue="initialValues[ExpensePropertiesReference.TOTAL.name]"
                        :error="errors.has(ExpensePropertiesReference.TOTAL.name) ? errors.first(ExpensePropertiesReference.TOTAL.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                        :type="'float'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="supplierEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.SUPPLIER.name]"
                        :label="ExpensePropertiesReference.SUPPLIER.title"
                        :displayProperty="'name'"
                        v-model="expense.supplier"
                        :name="ExpensePropertiesReference.SUPPLIER.name"
                        :error="errors.has(ExpensePropertiesReference.SUPPLIER.name) ? errors.first(ExpensePropertiesReference.SUPPLIER.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.supplier && expense.supplier.id ? expense.supplier.id : 0) + 'expenseType'"
                        :endpointName="expenseTypeEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_TYPE.name]"
                        :label="ExpensePropertiesReference.EXPENSE_TYPE.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseType"
                        :name="ExpensePropertiesReference.EXPENSE_TYPE.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_TYPE.name) ? errors.first(ExpensePropertiesReference.EXPENSE_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.supplier && expense.supplier.id ? expense.supplier.id : 0) + 'expenseCategory'"
                        :endpointName="expenseCategoryEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_CATEGORY.name]"
                        :label="ExpensePropertiesReference.EXPENSE_CATEGORY.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseCategory"
                        :name="ExpensePropertiesReference.EXPENSE_CATEGORY.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_CATEGORY.name) ? errors.first(ExpensePropertiesReference.EXPENSE_CATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.supplier && expense.supplier.id ? expense.supplier.id : 0) + 'expenseBranch'"
                        :endpointName="expenseBranchEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_BRANCH.name]"
                        :label="ExpensePropertiesReference.EXPENSE_BRANCH.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseBranch"
                        :name="ExpensePropertiesReference.EXPENSE_BRANCH.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_BRANCH.name) ? errors.first(ExpensePropertiesReference.EXPENSE_BRANCH.name) : ''"
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
  import ExpensePropertiesReference from 'renderer/api/propertiesReference/ExpensePropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  export default {
    name: 'ExpenseForm',
    data () {
      return {
        ExpensePropertiesReference: ExpensePropertiesReference,
        expense: {
          description: '',
          total: '',
          date: '',
          expenseType: {},
          expenseCategory: {},
          expenseBranch: {},
          supplier: {}
        },
        initialValues: {},
        expenseTypeEndpointName: EntityTypes.EXPENSE_TYPE.apiName,
        expenseCategoryEndpointName: EntityTypes.EXPENSE_CATEGORY.apiName,
        expenseBranchEndpointName: EntityTypes.EXPENSE_BRANCH.apiName,
        supplierEndpointName: EntityTypes.SUPPLIER.apiName,
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
        this.initialValues[ExpensePropertiesReference.EXPENSE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DESCRIPTION.name)
        this.initialValues[ExpensePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE.name)
        this.initialValues[ExpensePropertiesReference.TOTAL.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.TOTAL.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_CATEGORY.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_CATEGORY.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_BRANCH.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_BRANCH.name)
        this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
      },
      setSupplierInitialValues: function () {
        let supplier = this.expense.supplier
        let initialExpenseType = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_TYPE.name] = isObjectEmpty(initialExpenseType) && !isObjectEmpty(supplier) ? supplier.default_expense_type : initialExpenseType
        let initialExpenseCategory = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_CATEGORY.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_CATEGORY.name] = isObjectEmpty(initialExpenseCategory) && !isObjectEmpty(supplier) ? supplier.default_expense_category : initialExpenseCategory
        let initialExpenseBranch = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_BRANCH.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_BRANCH.name] = isObjectEmpty(initialExpenseBranch) && !isObjectEmpty(supplier) ? supplier.default_expense_branch : initialExpenseBranch
      },
      save: function () {
        let directParams = {
          [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: this.expense.expenseType ? this.expense.expenseType[GlobalEntityIdentifier] : null,
          [ExpensePropertiesReference.DESCRIPTION.name]: this.expense.description,
          [ExpensePropertiesReference.TOTAL.name]: this.expense.total,
          [ExpensePropertiesReference.DATE.name]: this.expense.date,
          [ExpensePropertiesReference.EXPENSE_CATEGORY.relationship_id_name]: this.expense.expenseCategory ? this.expense.expenseCategory[GlobalEntityIdentifier] : null,
          [ExpensePropertiesReference.EXPENSE_BRANCH.relationship_id_name]: this.expense.expenseBranch ? this.expense.expenseBranch[GlobalEntityIdentifier] : null,
          [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : null
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
      'expense.supplier': function (supplier) {
        this.setSupplierInitialValues()
      }
    }
  }

</script>
