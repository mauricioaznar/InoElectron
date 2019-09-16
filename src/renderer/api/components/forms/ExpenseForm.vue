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
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeNote"
        >
            <div class="col-sm-12">
                <label>
                    Tiene iva?
                </label>
                <mau-form-input-check-box
                        :initialValue="initialHasNoteTax"
                        v-model="hasNoteTax"
                >

                </mau-form-input-check-box>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-number
                        :label="ExpensePropertiesReference.SUBTOTAL.title"
                        :name="ExpensePropertiesReference.SUBTOTAL.name"
                        v-model="expense.subtotal"
                        :initialValue="initialValues[ExpensePropertiesReference.SUBTOTAL.name]"
                        :error="errors.has(ExpensePropertiesReference.SUBTOTAL.name) ? errors.first(ExpensePropertiesReference.SUBTOTAL.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                        :type="'float'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || (isExpenseTypeNote && hasNoteTax)"
        >
            <div class="col-sm-12">
                <mau-form-input-number
                        :label="ExpensePropertiesReference.TAX.title"
                        :name="ExpensePropertiesReference.TAX.name"
                        v-model="expense.tax"
                        :initialValue="initialValues[ExpensePropertiesReference.TAX.name]"
                        :error="errors.has(ExpensePropertiesReference.TAX.name) ? errors.first(ExpensePropertiesReference.TAX.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                        :type="'float'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice && isExpenseInvoiceTypeWithIeps"
        >
            <div class="col-sm-12">
                <mau-form-input-number
                        :label="ExpensePropertiesReference.IEPS.title"
                        :name="ExpensePropertiesReference.IEPS.name"
                        v-model="expense.ieps"
                        :initialValue="initialValues[ExpensePropertiesReference.IEPS.name]"
                        :error="errors.has(ExpensePropertiesReference.IEPS.name) ? errors.first(ExpensePropertiesReference.IEPS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                        :type="'float'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice && isExpenseInvoiceTypeRetained"
        >
            <div class="col-sm-12">
                <mau-form-input-number
                        :type="'float'"
                        :label="ExpensePropertiesReference.INVOICE_ISR_RETAINED.title"
                        :name="ExpensePropertiesReference.INVOICE_ISR_RETAINED.name"
                        v-model="expense.invoiceIsrRetained"
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name]"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_ISR_RETAINED.name) ? errors.first(ExpensePropertiesReference.INVOICE_ISR_RETAINED.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice && isExpenseInvoiceTypeRetained"
        >
            <div class="col-sm-12">
                <mau-form-input-number
                        :type="'float'"
                        :label="ExpensePropertiesReference.INVOICE_TAX_RETAINED.title"
                        :name="ExpensePropertiesReference.INVOICE_TAX_RETAINED.name"
                        v-model="expense.invoiceTaxRetained"
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name]"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_TAX_RETAINED.name) ? errors.first(ExpensePropertiesReference.INVOICE_TAX_RETAINED.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <label>Total</label>
                <div>
                    {{total}}
                </div>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice"
        >
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
                        :key="(expense.supplier && expense.supplier.id ? expense.supplier.id : 0) + 'expenseMoneySource'"
                        :endpointName="expenseMoneySourceEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name]"
                        :label="ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseMoneySource"
                        :name="ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name) ? errors.first(ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || isExpenseTypeNote"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || isExpenseTypeNote"
        >
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.supplier && expense.supplier.id ? String(expense.supplier.id) : '0') + (expense.expenseCategory && expense.expenseCategory.id ? String(expense.expenseCategory.id) : '0') + 'expenseSubcategory'"
                        :endpointName="expenseSubcategoryEndpointName"
                        :apiOperationOptions="expenseSubcategoryApiOperations"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name]"
                        :label="ExpensePropertiesReference.EXPENSE_SUBCATEGORY.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseSubcategory"
                        :name="ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name) ? errors.first(ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>

        <expense-item-table
            :initialExpenseItems="initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name]"
        >
        </expense-item-table>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || isExpenseTypeNote"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice"
        >
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
             v-if="isExpenseTypeInvoice && !isExpenseInvoiceStatusProvisioned"
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
            v-if="hasProvisionDate === 1 || isExpenseInvoiceStatusProvisioned"
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
        <div class="form-group form-row"
             v-if="(isExpenseTypeInvoice && isExpenseInvoiceStatusPaid) || isExpenseTypeComplement"
        >
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.INVOICE_PAID_DATE.name"
                        :label="ExpensePropertiesReference.INVOICE_PAID_DATE.title"
                        v-model="expense.invoicePaidDate"
                        :initialValue="initialValues[ExpensePropertiesReference.INVOICE_PAID_DATE.name]"
                        :error="errors.has(ExpensePropertiesReference.INVOICE_PAID_DATE.name) ? errors.first(ExpensePropertiesReference.INVOICE_PAID_DATE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || isExpenseTypeComplement"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeInvoice || isExpenseTypeComplement"
        >
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
        <div class="form-group form-row"
             v-if="isExpenseTypeComplement"
        >
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :key="(expense.expenseType && expense.expenseType['id'] ? expense.expenseType['id'] : '0') + 'complementExpense' "
                        :endpointName="expenseEndpointName"
                        :apiOperationOptions="complementExpenseInvoiceApiOperations"
                        :initialObject="initialValues[ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name]"
                        :label="ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.title"
                        :displayProperty="'invoice_code'"
                        v-model="expense.complementExpenseInvoice"
                        :name="ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name"
                        :error="errors.has(ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name) ? errors.first(ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name) : ''"
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
  import ExpenseItemTable from 'renderer/api/components/m2m/ExpenseItemTable'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  import moment from 'moment'
  export default {
    name: 'ExpenseForm',
    data () {
      return {
        ExpensePropertiesReference: ExpensePropertiesReference,
        expense: {
          description: '',
          subtotal: '',
          tax: 0,
          ieps: 0,
          date: '',
          expenseType: {},
          expenseMoneySource: {},
          expenseCategory: {},
          expenseSubcategory: {},
          expenseBranch: {},
          supplier: {},
          expenseStatus: {},
          expenseInvoiceStatus: {},
          expenseInvoiceType: {},
          expenseInvoicePaymentForm: {},
          expenseInvoicePaymentMethod: {},
          expenseInvoiceCdfiUse: {},
          complementExpenseInvoice: {},
          expenseItems: [],
          invoiceTaxRetained: '',
          invoiceIsrRetained: '',
          invoiceCode: '',
          invoicePaidDate: '',
          invoiceProvisionDate: ''
        },
        initialValues: {},
        hasNoteTax: 0,
        initialHasNoteTax: 0,
        initialHasProvisionDate: 0,
        hasProvisionDate: 0,
        expenseEndpointName: EntityTypes.EXPENSE.apiName,
        expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
        expenseCategoryEndpointName: EntityTypes.EXPENSE_CATEGORY.apiName,
        expenseSubcategoryEndpointName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
        expenseBranchEndpointName: EntityTypes.EXPENSE_BRANCH.apiName,
        supplierEndpointName: EntityTypes.SUPPLIER.apiName,
        expenseTypeEndpointName: EntityTypes.EXPENSE_TYPE.apiName,
        expenseItemEndpointName: EntityTypes.EXPENSE_ITEM.apiName,
        expenseStatusEndpointName: EntityTypes.EXPENSE_STATUS.apiName,
        expenseInvoiceStatusEndpointName: EntityTypes.EXPENSE_INVOICE_STATUS.apiName,
        expenseInvoiceTypeEndpointName: EntityTypes.EXPENSE_INVOICE_TYPE.apiName,
        expenseInvoicePaymentMethodEndpointName: EntityTypes.EXPENSE_INVOICE_PAYMENT_METHOD.apiName,
        expenseInvoicePaymentFormEndpointName: EntityTypes.EXPENSE_INVOICE_PAYMENT_FORM.apiName,
        expenseInvoiceCdfiUseEndpointName: EntityTypes.EXPENSE_INVOICE_CDFI_USE.apiName,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic,
      ExpenseItemTable
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
      expenseSubcategoryApiOperations: function () {
        if (this.expense.expenseCategory && this.expense.expenseCategory.id) {
          return {filterExacts: {expense_category_id: this.expense.expenseCategory.id}}
        }
        return {}
      },
      complementExpenseInvoiceApiOperations: function () {
        return {filterExacts: {expense_invoice_payment_method_id: 1, expense_type_id: 2}}
      },
      isExpenseTypeInvoice: function () {
        return this.expense && this.expense.expenseType && this.expense.expenseType[GlobalEntityIdentifier]
          ? this.expense.expenseType[GlobalEntityIdentifier] === 2 : false
      },
      isExpenseTypeNote: function () {
        return this.expense && this.expense.expenseType && this.expense.expenseType[GlobalEntityIdentifier]
          ? this.expense.expenseType[GlobalEntityIdentifier] === 1 : false
      },
      isExpenseTypeComplement: function () {
        return this.expense && this.expense.expenseType && this.expense.expenseType[GlobalEntityIdentifier]
          ? this.expense.expenseType[GlobalEntityIdentifier] === 3 : false
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
      total: function () {
        let subtotal = (this.expense.subtotal && this.expense.subtotal > 0) ? this.expense.subtotal : 0
        let tax = (this.expense.tax && this.expense.tax > 0) ? this.expense.tax : 0
        let ieps = (this.expense.ieps && this.expense.ieps > 0) ? this.expense.ieps : 0
        let invoiceTaxRetained = (this.expense.invoiceTaxRetained && this.expense.invoiceTaxRetained > 0) ? this.expense.invoiceTaxRetained : 0
        let invoiceIsrRetained = (this.expense.invoiceIsrRetained && this.expense.invoiceIsrRetained > 0) ? this.expense.invoiceIsrRetained : 0
        return subtotal + tax + ieps - invoiceTaxRetained - invoiceIsrRetained
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[ExpensePropertiesReference.EXPENSE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name)
        this.initialValues[ExpensePropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DESCRIPTION.name)
        this.initialValues[ExpensePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_ISR_RETAINED.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_TAX_RETAINED.name)
        this.initialValues[ExpensePropertiesReference.SUBTOTAL.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.SUBTOTAL.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_CATEGORY.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_CATEGORY.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_BRANCH.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_BRANCH.name)
        this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
        this.initialValues[ExpensePropertiesReference.TAX.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.TAX.name)
        this.initialHasNoteTax = this.initialValues[ExpensePropertiesReference.TAX.name] > 0 ? 1 : 0
        this.initialValues[ExpensePropertiesReference.IEPS.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.IEPS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_STATUS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name)
        this.initialValues[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_CODE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_CODE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_PAID_DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_PAID_DATE.name)
        this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.INVOICE_PROVISION_DATE.name)
        if (moment(this.initialValues[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name], 'YYYY-MM-DD').isValid()) {
          this.initialHasProvisionDate = 1
        }
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
      setInitialExpenseSubcategory: function (expenseCategory) {
        let expenseSubcategory = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name)
        let initialSubcategory = {}
        if (!isObjectEmpty(expenseSubcategory)) {
          if (expenseSubcategory.expense_category_id === expenseCategory.id) {
            initialSubcategory = expenseSubcategory
          } else {
            this.expense.expenseSubcategory = {}
          }
        } else {
          if (!isObjectEmpty(this.expense.supplier)) {
            if (this.expense.supplier.default_expense_subcategory.expense_category_id === expenseCategory.id) {
              initialSubcategory = this.expense.supplier.default_expense_subcategory
            }
          }
        }
        this.initialValues[ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name] = initialSubcategory
      },
      save: function () {
        let directParams = {
          [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: this.expense.expenseType ? this.expense.expenseType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.relationship_id_name]: this.expense.expenseMoneySource ? this.expense.expenseMoneySource[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.DESCRIPTION.name]: this.expense.description,
          [ExpensePropertiesReference.SUBTOTAL.name]: this.expense.subtotal,
          [ExpensePropertiesReference.DATE.name]: this.expense.date,
          [ExpensePropertiesReference.EXPENSE_CATEGORY.relationship_id_name]: this.expense.expenseCategory ? this.expense.expenseCategory[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_BRANCH.relationship_id_name]: this.expense.expenseBranch ? this.expense.expenseBranch[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_SUBCATEGORY.relationship_id_name]: this.expense.expenseSubcategory ? this.expense.expenseSubcategory[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
          [ExpensePropertiesReference.EXPENSE_STATUS.relationship_id_name]: this.expense.expenseStatus ? this.expense.expenseStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
        }
        if (this.isExpenseTypeNote) {
          directParams[ExpensePropertiesReference.TAX.name] = this.hasNoteTax === 1 ? this.expense.tax : 0
        }
        if (this.isExpenseTypeInvoice) {
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.relationship_id_name] = this.expense.expenseInvoiceCdfiUse
            ? this.expense.expenseInvoiceCdfiUse[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.relationship_id_name] = this.expense.expenseInvoiceType
            ? this.expense.expenseInvoiceType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.relationship_id_name] = this.expense.expenseInvoiceStatus
            ? this.expense.expenseInvoiceStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.INVOICE_CODE.name] = this.expense.invoiceCode
          directParams[ExpensePropertiesReference.IEPS.name] = this.isExpenseInvoiceTypeWithIeps ? this.expense.ieps : 0
          directParams[ExpensePropertiesReference.TAX.name] = this.expense.tax
          directParams[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name] = this.isExpenseInvoiceTypeRetained ? this.expense.invoiceIsrRetained : ''
          directParams[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name] = this.isExpenseInvoiceTypeRetained ? this.expense.invoiceTaxRetained : ''
          directParams[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name] = this.isExpenseInvoiceStatusProvisioned || this.hasProvisionDate
            ? this.expense.invoiceProvisionDate : '0000-00-00'
        } else {
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.INVOICE_CODE.name] = ''
          directParams[ExpensePropertiesReference.INVOICE_ISR_RETAINED.name] = ''
          directParams[ExpensePropertiesReference.IEPS.name] = 0
          directParams[ExpensePropertiesReference.INVOICE_TAX_RETAINED.name] = ''
          directParams[ExpensePropertiesReference.INVOICE_PROVISION_DATE.name] = '0000-00-00'
        }
        if (this.isExpenseTypeComplement || this.isExpenseTypeInvoice) {
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.relationship_id_name] = this.expense.expenseInvoicePaymentMethod
            ? this.expense.expenseInvoicePaymentMethod[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.relationship_id_name] = this.expense.expenseInvoicePaymentForm
            ? this.expense.expenseInvoicePaymentForm[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.INVOICE_PAID_DATE.name] = (this.isExpenseTypeInvoice && this.isExpenseInvoiceStatusPaid) || this.isExpenseTypeComplement ? this.expense.invoicePaidDate : '0000-00-00'
        } else {
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
          directParams[ExpensePropertiesReference.INVOICE_PAID_DATE.name] = '0000-00-00'
        }
        if (this.isExpenseTypeComplement) {
          directParams[ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.relationship_id_name] = this.expense.complementExpenseInvoice && this.isExpenseTypeComplement
            ? this.expense.complementExpenseInvoice[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
        } else {
          directParams[ExpensePropertiesReference.COMPLEMENT_EXPENSE_INVOICE.relationship_id_name] = (this.isInitialObjectDefined ? 'null' : null)
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
      },
      'expense.expenseCategory': function (expenseCategory) {
        this.setInitialExpenseSubcategory(expenseCategory)
      },
      'expense.expenseInvoiceType': function (expenseInvoiceType) {
        if (!this.isExpenseInvoiceTypeWithIeps) {
          this.expense.ieps = 0
        }
        if (!this.isExpenseInvoiceTypeRetained) {
          this.expense.invoiceIsrRetained = 0
          this.expense.invoiceTaxRetained = 0
        }
      }
    }
  }

</script>
