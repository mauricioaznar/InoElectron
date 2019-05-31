<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[ExpensePropertiesReference.NAME.name]"
                        v-model="expense.name"
                        :label="ExpensePropertiesReference.NAME.title"
                        :name="ExpensePropertiesReference.NAME.name"
                        :error="errors.has(ExpensePropertiesReference.NAME.name) ? errors.first(ExpensePropertiesReference.NAME.name) : ''"
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
  export default {
    name: 'ExpenseForm',
    data () {
      return {
        ExpensePropertiesReference: ExpensePropertiesReference,
        expense: {
          name: '',
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
        this.initialValues[ExpensePropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.NAME.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_CATEGORY.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_CATEGORY.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_BRANCH.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_BRANCH.name)
        this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
      },
      save: function () {
        let directParams = {
          [ExpensePropertiesReference.NAME.name]: this.expense.name,
          [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: this.expense.expenseType ? this.expense.expenseType[GlobalEntityIdentifier] : null,
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
      }
    }
  }

</script>
