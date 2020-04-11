<template>
    <div>
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
                <mau-form-input-text
                        :label="ExpensePropertiesReference.INTERNAL_CODE.title"
                        :name="ExpensePropertiesReference.INTERNAL_CODE.name"
                        v-model="expense.internalCode"
                        :initialValue="initialValues[ExpensePropertiesReference.INTERNAL_CODE.name]"
                        :error="errors.has(ExpensePropertiesReference.INTERNAL_CODE.name) ? errors.first(ExpensePropertiesReference.INTERNAL_CODE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
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
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseMoneySourceEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name]"
                        :label="ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseMoneySource"
                        :name="ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name) ? errors.first(ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row" v-if="expense.expenseInvoicePaymentForm.id === 3">
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.DATE_EMITTED.name"
                        :label="ExpensePropertiesReference.DATE_EMITTED.title + ' (transferencia de fondos)'"
                        v-model="expense.dateEmitted"
                        :initialValue="initialValues[ExpensePropertiesReference.DATE_EMITTED.name]"
                        :error="errors.has(ExpensePropertiesReference.DATE_EMITTED.name) ? errors.first(ExpensePropertiesReference.DATE_EMITTED.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseInvoicePaymentFormTransfer"
        >
            <div class="col-sm-12">
                <label>
                    Ya se pago?
                </label>
                <mau-form-input-check-box
                        :initialValue="initialHasDatePaid"
                        v-model="hasDatePaid"
                >

                </mau-form-input-check-box>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="!isExpenseInvoicePaymentFormTransfer || hasDatePaid"
        >
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.DATE_PAID.name"
                        :label="ExpensePropertiesReference.DATE_PAID.title + ' (spei, dia de la transferencia, dia del pago)'"
                        v-model="expense.datePaid"
                        :initialValue="initialValues[ExpensePropertiesReference.DATE_PAID.name]"
                        :error="errors.has(ExpensePropertiesReference.DATE_PAID.name) ? errors.first(ExpensePropertiesReference.DATE_PAID.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
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

        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-number
                        :key="ExpensePropertiesReference.TAX.name + total"
                        :initialValue="initialValues[ExpensePropertiesReference.TAX.name] ? initialValues[ExpensePropertiesReference.TAX.name] : initialTax"
                        v-model="expense.tax"
                        :label="ExpensePropertiesReference.TAX.title"
                        :placeholder="''"
                        :type="'float'"
                        :error="errors.has(ExpensePropertiesReference.TAX.name) ? errors.first(ExpensePropertiesReference.TAX.name) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row" v-if="isExpenseInvoiceTypeRetained">
            <div class="col-sm-12">
                <mau-form-input-number
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name]"
                        v-model="expense.invoiceIsrRetained"
                        :label="ExpensePropertiesReference.INVOICE_ISR_RETAINED.title"
                        :placeholder="''"
                        :type="'float'"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_ISR_RETAINED.name) ? errors.first(ExpensePropertiesReference.INVOICE_ISR_RETAINED.name) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row" v-if="isExpenseInvoiceTypeRetained">
            <div class="col-sm-12">
                <mau-form-input-number
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name]"
                        v-model="expense.invoiceTaxRetained"
                        :label="ExpensePropertiesReference.INVOICE_TAX_RETAINED.title"
                        :placeholder="''"
                        :type="'float'"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_TAX_RETAINED.name) ? errors.first(ExpensePropertiesReference.INVOICE_TAX_RETAINED.name) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row" v-if="isExpenseInvoiceTypeWithIeps">
            <div class="col-sm-12">
                <mau-form-input-number
                        :initialValue="initialValues[ExpensePropertiesReference.IEPS.name]"
                        v-model="expense.ieps"
                        :label="ExpensePropertiesReference.IEPS.title"
                        :placeholder="''"
                        :type="'float'"
                        :error="errors.has(ExpensePropertiesReference.IEPS.name) ? errors.first(ExpensePropertiesReference.IEPS.name) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :label="ExpensePropertiesReference.COMMENTS.title"
                        :name="ExpensePropertiesReference.COMMENTS.name"
                        v-model="expense.comments"
                        :initialValue="initialValues[ExpensePropertiesReference.COMMENTS.name]"
                        :error="errors.has(ExpensePropertiesReference.COMMENTS.name) ? errors.first(ExpensePropertiesReference.COMMENTS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
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
          datePaid: '',
          dateEmitted: '',
          comments: '',
          internalCode: '',
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
          tax: 0,
          ieps: 0,
          invoiceIsrRetained: 0,
          invoiceTaxRetained: 0,
          invoiceCode: '',
          invoiceProvisionDate: ''
        },
        initialValues: {},
        initialTax: 0,
        initialHasProvisionDate: 0,
        hasProvisionDate: 0,
        initialHasDatePaid: 1,
        hasDatePaid: 1,
        expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
        supplierEndpointName: EntityTypes.SUPPLIER.apiName,
        expenseItemEndpointName: EntityTypes.EXPENSE_ITEM.apiName,
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
      },
      isExpenseInvoicePaymentFormTransfer: function () {
        return this.expense && this.expense.expenseInvoiceType && this.expense.expenseInvoicePaymentForm[GlobalEntityIdentifier]
          ? this.expense.expenseInvoicePaymentForm[GlobalEntityIdentifier] === 3 : false
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[ExpensePropertiesReference.DATE_EMITTED.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE_EMITTED.name)
        this.initialValues[ExpensePropertiesReference.TAX.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.TAX.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_ISR_RETAINED.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_TAX_RETAINED.name)
        this.initialValues[ExpensePropertiesReference.IEPS.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.IEPS.name)
        this.initialValues[ExpensePropertiesReference.INTERNAL_CODE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INTERNAL_CODE.name)
        this.initialValues[ExpensePropertiesReference.COMMENTS.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.COMMENTS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_CODE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_CODE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_PROVISION_DATE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        if (moment(this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name], 'YYYY-MM-DD').isValid()) {
          this.initialHasProvisionDate = 1
        }
        this.initialValues[ExpensePropertiesReference.DATE_PAID.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE_PAID.name)
        if (this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name].id === 3) {
          if (moment(this.initialValues[ExpensePropertiesReference.DATE_PAID.name], 'YYYY-MM-DD').isValid()) {
            this.initialHasDatePaid = 1
          } else {
            this.initialHasDatePaid = 0
          }
        }
      },
      save: function () {
        let directParams = {
          [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: 2,
          [ExpensePropertiesReference.DATE_EMITTED.name]: this.isExpenseInvoicePaymentFormTransfer ? this.expense.dateEmitted : this.expense.datePaid,
          [ExpensePropertiesReference.COMMENTS.name]: this.expense.comments,
          [ExpensePropertiesReference.INTERNAL_CODE.name]: this.expense.internalCode,
          [ExpensePropertiesReference.TAX.name]: this.expense.tax,
          [ExpensePropertiesReference.INVOICE_TAX_RETAINED.name]: this.expense.invoiceTaxRetained,
          [ExpensePropertiesReference.INVOICE_ISR_RETAINED.name]: this.expense.invoiceIsrRetained,
          [ExpensePropertiesReference.IEPS.name]: this.expense.ieps,
          [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier
            ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.relationship_id_name]: this.expense.expenseInvoiceCdfiUse
            ? this.expense.expenseInvoiceCdfiUse[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.relationship_id_name]: this.expense.expenseInvoiceType
            ? this.expense.expenseInvoiceType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.relationship_id_name]: this.expense.expenseInvoiceStatus
            ? this.expense.expenseInvoiceStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.relationship_id_name]: this.expense.expenseMoneySource
            ? this.expense.expenseMoneySource[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.INVOICE_CODE.name]: this.expense.invoiceCode,
          [ExpensePropertiesReference.INVOICE_PROVISION_DATE.name]: this.hasProvisionDate
            ? this.expense.invoiceProvisionDate : '0000-00-00',
          [ExpensePropertiesReference.DATE_PAID.name]: !this.isExpenseInvoicePaymentFormTransfer ? this.expense.datePaid
            : (this.hasDatePaid ? this.expense.datePaid : '0000-00-00'),
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
        this.initialTax = total - (total / 1.16)
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
