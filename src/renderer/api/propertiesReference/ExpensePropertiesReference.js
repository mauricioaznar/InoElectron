import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  TOTAL: {
    title: 'Total',
    name: 'total',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  SUBTOTAL: {
    title: 'Subtotal',
    name: 'subtotal',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  TAX: {
    title: 'IVA',
    name: 'tax',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  IEPS: {
    title: 'IEPS',
    name: 'ieps',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EXPENSE_TYPE: {
    title: 'Tipo de gasto',
    name: 'expense_type',
    relationship_id_name: 'expense_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_MONEY_SOURCE: {
    title: 'Origen del dinero',
    name: 'expense_money_source',
    relationship_id_name: 'expense_money_source_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_BRANCH: {
    title: 'Sucursal',
    name: 'expense_branch',
    relationship_id_name: 'expense_branch_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_CATEGORY: {
    title: 'Categoria',
    name: 'expense_category',
    relationship_id_name: 'expense_category_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_SUBCATEGORY: {
    title: 'Subcategoria',
    name: 'expense_subcategory',
    relationship_id_name: 'expense_subcategory_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_ITEMS: {
    title: 'ELementos del gasto',
    name: 'expense_items',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_PAYMENTS: {
    title: 'Pagos del gasto',
    name: 'expense_payments',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  SUPPLIER: {
    title: 'Proveedor',
    name: 'supplier',
    relationship_id_name: 'supplier_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_STATUS: {
    title: 'Estado del gasto',
    name: 'expense_status',
    relationship_id_name: 'expense_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_INVOICE_TYPE: {
    title: 'Tipo de factura',
    name: 'expense_invoice_type',
    relationship_id_name: 'expense_invoice_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_INVOICE_STATUS: {
    title: 'Estado de la factura',
    name: 'expense_invoice_status',
    relationship_id_name: 'expense_invoice_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_INVOICE_PAYMENT_FORM: {
    title: 'Forma de pago',
    name: 'expense_invoice_payment_form',
    relationship_id_name: 'expense_invoice_payment_form_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_INVOICE_PAYMENT_METHOD: {
    title: 'Metodo de pago',
    name: 'expense_invoice_payment_method',
    relationship_id_name: 'expense_invoice_payment_method_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_INVOICE_CDFI_USE: {
    title: 'Uso del cdfi',
    name: 'expense_invoice_cdfi_use',
    relationship_id_name: 'expense_invoice_cdfi_use_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  INVOICE_CODE: {
    title: 'Codigo de la factura',
    name: 'invoice_code',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  INVOICE_PAID_DATE: {
    title: 'Fecha del pago de la factura',
    name: 'invoice_paid_date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  INVOICE_PROVISION_DATE: {
    title: 'Fecha de provision de la factura',
    name: 'invoice_provision_date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  INVOICE_TAX_RETAINED: {
    title: 'Iva retenido',
    name: 'invoice_tax_retained',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.FLOAT
  },
  INVOICE_ISR_RETAINED: {
    title: 'Isr retenido',
    name: 'invoice_isr_retained',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.FLOAT
  },
  COMPLEMENT_EXPENSE_INVOICE: {
    title: 'Factura complemento',
    name: 'complement_expense_invoice',
    relationship_id_name: 'complement_expense_invoice_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
