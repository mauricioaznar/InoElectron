<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.DATE_PAID.name"
                        :label="ExpensePropertiesReference.DATE_PAID.title"
                        v-model="expense.datePaid"
                        :initialValue="initialValues[ExpensePropertiesReference.DATE_PAID.name]"
                        :error="errors.has(ExpensePropertiesReference.DATE_PAID.name) ? errors.first(ExpensePropertiesReference.DATE_PAID.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
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
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseStatusEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name]"
                        :label="ExpensePropertiesReference.EXPENSE_STATUS.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseStatus"
                        :name="ExpensePropertiesReference.EXPENSE_STATUS.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_STATUS.name) ? errors.first(ExpensePropertiesReference.EXPENSE_STATUS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <expense-items
                v-model="expense.expenseItems"
                :initialValues="initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name]"
                @total="setTotal"
                :initialFirstExpenseItem="{
                branch: expense.supplier && expense.supplier.id ? expense.supplier.default_branch : {},
                expenseSubcategory: expense.supplier && expense.supplier.id ? expense.supplier.default_expense_subcategory : {}
                }"
        >
        </expense-items>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
    import ExpensePropertiesReference from 'renderer/api/propertiesReference/ExpensePropertiesReference'
    import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
    import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic'
    import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
    import EntityTypes from 'renderer/api/EntityTypes'
    import ExpenseItems from 'renderer/api/components/m2m/ExpenseItems'
    export default {
      data () {
        return {
          ExpensePropertiesReference: ExpensePropertiesReference,
          expense: {
            datePaid: '',
            supplier: {},
            expenseStatus: {},
            expenseItems: []
          },
          buttonDisabled: false,
          initialValues: {},
          expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
          expenseStatusEndpointName: EntityTypes.EXPENSE_STATUS.apiName,
          supplierEndpointName: EntityTypes.SUPPLIER.apiName,
          total: 0
        }
      },
      computed: {
        userHasWritePrivileges: function () {
          return true
        },
        isInitialObjectDefined: function () {
          return this.initialObject && this.initialObject.id
        }
      },
      props: {
        initialObject: {
          type: Object
        },
        saveFunction: {
          required: true,
          type: Function
        }
      },
      created () {
        this.setInitialValues()
      },
      components: {
        MauFormInputSelectDynamic,
        ExpenseItems
      },
      mounted () {
        FormSubmitEventBus.onEvent(function (isSuccess) {
          if (isSuccess === false) {
            this.buttonDisabled = false
          }
        }.bind(this))
      },
      methods: {
        setInitialValues: function () {
          this.initialValues[ExpensePropertiesReference.DATE_PAID.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE_PAID.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_STATUS.name)
          this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        },
        save: function () {
          let directParams = {
            [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: 1,
            [ExpensePropertiesReference.DATE_PAID.name]: this.expense.datePaid,
            [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
            [ExpensePropertiesReference.EXPENSE_STATUS.relationship_id_name]: this.expense.expenseStatus ? this.expense.expenseStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          }
          let relayObjects = []
          let expenseItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name],
            this.expense.expenseItems,
            'id'
          )
          let expenseItemsRelayObjects = ManyToManyHelper.createRelayObject(expenseItemsM2mFilteredObject, EntityTypes.EXPENSE_ITEM)
          relayObjects.push(expenseItemsRelayObjects)
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.buttonDisabled = true
              this.saveFunction(directParams, relayObjects)
            }
          })
        },
        setTotal: function (total) {
          this.total = total
        }
      }
    }
</script>
