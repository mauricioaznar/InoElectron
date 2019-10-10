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
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseInvoiceTypeEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name]"
                        :label="ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseInvoiceType"
                        :name="ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name) ? errors.first(ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :label="ExpensePropertiesReference.INVOICE_CODE.title"
                        :name="ExpensePropertiesReference.INVOICE_CODE.name"
                        v-model="expense.invoiceCode"
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_CODE.name]"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_CODE.name) ? errors.first(ExpensePropertiesReference.INVOICE_CODE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
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
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseInvoiceStatusEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name]"
                        :label="ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseInvoiceStatus"
                        :name="ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name) ? errors.first(ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row"
        >
            <div class="col-sm-12">
                <label>
                    Esta o fue provisionada?
                </label>
                <mau-form-input-check-box
                        :initialValue="initialHasProvisionDate"
                        v-model="hasProvisionDate"
                >

                </mau-form-input-check-box>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="hasProvisionDate === 1"
        >
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.INVOICE_PROVISION_DATE.name"
                        :label="ExpensePropertiesReference.INVOICE_PROVISION_DATE.title"
                        v-model="expense.invoiceProvisionDate"
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name]"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_PROVISION_DATE.name) ? errors.first(ExpensePropertiesReference.INVOICE_PROVISION_DATE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseInvoiceCdfiUseEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name]"
                        :label="ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseInvoiceCdfiUse"
                        :name="ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name) ? errors.first(ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.expenseType && expense.expenseType['id'] ? expense.expenseType['id'] : '0') + 'expenseInvoicePaymentForm' "
                        :endpointName="expenseInvoicePaymentFormEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name]"
                        :label="ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseInvoicePaymentForm"
                        :name="ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name) ? errors.first(ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.expenseType && expense.expenseType['id'] ? expense.expenseType['id'] : '0') + 'expenseInvoicePaymentMethod' "
                        :endpointName="expenseInvoicePaymentMethodEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name]"
                        :label="ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseInvoicePaymentMethod"
                        :name="ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name) ? errors.first(ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <expense-items
                v-model="expense.expenseItems"
                :initialValues="initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name]"
                @total="setTotal"
        >
        </expense-items>
        <expense-payments
                v-model="expense.expensePayments"
                :hasTax="true"
                :hasIeps="isExpenseInvoiceTypeWithIeps"
                :hasRetentions="isExpenseInvoiceTypeRetained"
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
  import EntityTypes from 'renderer/api/EntityTypes'
  import ExpensePropertiesReference from 'renderer/api/propertiesReference/ExpensePropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import ExpenseItems from 'renderer/api/components/m2m/ExpenseItems'
  import ExpensePayments from 'renderer/api/components/m2m/ExpensePayments'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import moment from 'moment'
  export default {
    name: 'ExpenseForm',
    data () {
      return {
        ExpensePropertiesReference: ExpensePropertiesReference,
        expense: {
          date: '',
          expenseMoneySource: {},
          supplier: {},
          expenseStatus: {},
          expenseInvoiceStatus: {},
          expenseInvoiceType: {},
          expenseInvoicePaymentForm: {},
          expenseInvoicePaymentMethod: {},
          expenseInvoiceCdfiUse: {},
          expenseItems: [],
          expensePayments: [],
          invoiceCode: '',
          invoiceProvisionDate: ''
        },
        initialValues: {},
        initialHasProvisionDate: 0,
        hasProvisionDate: 0,
        expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
        supplierEndpointName: EntityTypes.SUPPLIER.apiName,
        expenseItemEndpointName: EntityTypes.EXPENSE_ITEM.apiName,
        expenseStatusEndpointName: EntityTypes.EXPENSE_STATUS.apiName,
        expenseInvoiceStatusEndpointName: EntityTypes.EXPENSE_INVOICE_STATUS.apiName,
        expenseInvoiceTypeEndpointName: EntityTypes.EXPENSE_INVOICE_TYPE.apiName,
        expenseInvoicePaymentMethodEndpointName: EntityTypes.EXPENSE_INVOICE_PAYMENT_METHOD.apiName,
        expenseInvoicePaymentFormEndpointName: EntityTypes.EXPENSE_INVOICE_PAYMENT_FORM.apiName,
        expenseInvoiceCdfiUseEndpointName: EntityTypes.EXPENSE_INVOICE_CDFI_USE.apiName,
        buttonDisabled: false,
        total: 0
      }
    },
    components: {
      MauFormInputSelectDynamic,
      ExpenseItems,
      ExpensePayments
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
      isInitialObjectDefined: function () {
        return this.initialObject && this.initialObject.id
      },
      isExpenseInvoiceStatusPaid: function () {
        return this.expense && this.expense.expenseInvoiceStatus && this.expense.expenseInvoiceStatus[GlobalEntityIdentifier]
          ? this.expense.expenseInvoiceStatus[GlobalEntityIdentifier] === 3 : false
      },
      isExpenseInvoiceStatusProvisioned: function () {
        return this.expense && this.expense.expenseInvoiceStatus && this.expense.expenseInvoiceStatus[GlobalEntityIdentifier]
          ? this.expense.expenseInvoiceStatus[GlobalEntityIdentifier] === 2 : false
      },
      isExpenseInvoiceTypeRetained: function () {
        return this.expense && this.expense.expenseInvoiceType && this.expense.expenseInvoiceType[GlobalEntityIdentifier]
          ? this.expense.expenseInvoiceType[GlobalEntityIdentifier] === 2 : false
      },
      isExpenseInvoiceTypeWithIeps: function () {
        return this.expense && this.expense.expenseInvoiceType && this.expense.expenseInvoiceType[GlobalEntityIdentifier]
          ? this.expense.expenseInvoiceType[GlobalEntityIdentifier] === 3 : false
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[ExpensePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_STATUS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_CODE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_CODE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_PROVISION_DATE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_PAYMENTS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_PAYMENTS.name)
        if (moment(this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name], 'YYYY-MM-DD').isValid()) {
          this.initialHasProvisionDate = 1
        }
      },
      save: function () {
        let directParams = {
          [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: 2,
          [ExpensePropertiesReference.DATE.name]: this.expense.date,
          [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier
            ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_STATUS.relationship_id_name]: this.expense.expenseStatus
            ? this.expense.expenseStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.relationship_id_name]: this.expense.expenseInvoiceCdfiUse
            ? this.expense.expenseInvoiceCdfiUse[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.relationship_id_name]: this.expense.expenseInvoiceType
            ? this.expense.expenseInvoiceType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.relationship_id_name]: this.expense.expenseInvoiceStatus
            ? this.expense.expenseInvoiceStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.INVOICE_CODE.name]: this.expense.invoiceCode,
          [ExpensePropertiesReference.INVOICE_PROVISION_DATE.name]: this.hasProvisionDate
            ? this.expense.invoiceProvisionDate : '0000-00-00',
          [ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.relationship_id_name]: this.expense.expenseInvoicePaymentMethod
            ? this.expense.expenseInvoicePaymentMethod[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.relationship_id_name]: this.expense.expenseInvoicePaymentForm
            ? this.expense.expenseInvoicePaymentForm[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
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
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      }
    }
  }

</script>
