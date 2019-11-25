<template>
    <div>
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
                expenseCategory: expense.supplier && expense.supplier.id ? expense.supplier.default_expense_category : {},
                branch: expense.supplier && expense.supplier.id ? expense.supplier.default_branch : {},
                expenseSubcategory: expense.supplier && expense.supplier.id ? expense.supplier.default_expense_subcategory : {}
                }"
        >
        </expense-items>
        <expense-payments
                v-model="expense.expensePayments"
                :initialValues="initialValues[ExpensePropertiesReference.EXPENSE_PAYMENTS.name]"
                :initialFirstExpensePayment="{subtotal: total, date: expense.date}"
        >

        </expense-payments>
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
    import ExpensePayments from 'renderer/api/components/m2m/ExpensePayments'
    export default {
      data () {
        return {
          ExpensePropertiesReference: ExpensePropertiesReference,
          expense: {
            date: '',
            supplier: {},
            expenseStatus: {},
            expenseItems: [],
            expensePayments: []
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
        ExpenseItems,
        ExpensePayments
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
          this.initialValues[ExpensePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_STATUS.name)
          this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_PAYMENTS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_PAYMENTS.name)
        },
        save: function () {
          let directParams = {
            [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: 1,
            [ExpensePropertiesReference.DATE.name]: this.expense.date,
            [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
            [ExpensePropertiesReference.EXPENSE_STATUS.relationship_id_name]: this.expense.expenseStatus ? this.expense.expenseStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          }
          let relayObjects = []
          let expenseItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name],
            this.expense.expenseItems,
            'id'
          )
          let expensePaymentsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[ExpensePropertiesReference.EXPENSE_PAYMENTS.name],
            this.expense.expensePayments,
            'id'
          )
          let expenseItemsRelayObjects = ManyToManyHelper.createRelayObject(expenseItemsM2mFilteredObject, EntityTypes.EXPENSE_ITEM)
          let expensePaymentsRelayObjects = ManyToManyHelper.createRelayObject(expensePaymentsM2mFilteredObject, EntityTypes.EXPENSE_PAYMENT)
          relayObjects.push(expenseItemsRelayObjects)
          relayObjects.push(expensePaymentsRelayObjects)
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
