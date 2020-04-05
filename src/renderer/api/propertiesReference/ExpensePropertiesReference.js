import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
export default {
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue
  },
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    display: DisplayFunctions.getValue
  },
  COMMENTS: {
    title: 'Comentarios',
    name: 'comments',
    display: DisplayFunctions.getValue
  },
  DATE_PAID: {
    title: 'Fecha de pago',
    name: 'date_paid',
    display: DisplayFunctions.getDate
  },
  DATE_EMITTED: {
    title: 'Fecha de emision',
    name: 'date_emitted',
    display: DisplayFunctions.getDate
  },
  INTERNAL_CODE: {
    title: 'Codigo interno',
    name: 'internal_code',
    display: DisplayFunctions.getValue
  },
  TOTAL: {
    title: 'Total',
    name: 'total',
    display: DisplayFunctions.getValue
  },
  SUBTOTAL: {
    title: 'Subtotal',
    name: 'subtotal',
    display: DisplayFunctions.getValue
  },
  TAX: {
    title: 'IVA',
    name: 'tax',
    display: DisplayFunctions.getValue
  },
  IEPS: {
    title: 'IEPS',
    name: 'ieps',
    display: DisplayFunctions.getValue
  },
  BRANCH: {
    title: 'Sucursal',
    name: 'branch',
    relationship_id_name: 'branch_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_TYPE: {
    title: 'Tipo de gasto',
    name: 'expense_type',
    relationship_id_name: 'expense_type_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_CATEGORY: {
    title: 'Categoria',
    name: 'expense_category',
    relationship_id_name: 'expense_category_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_SUBCATEGORY: {
    title: 'Subcategoria',
    name: 'expense_subcategory',
    relationship_id_name: 'expense_subcategory_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_MONEY_SOURCE: {
    title: 'Origen del dinero',
    name: 'expense_money_source',
    relationship_id_name: 'expense_money_source_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_ITEMS: {
    title: 'ELementos del gasto',
    name: 'expense_items',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_PAYMENTS: {
    title: 'Pagos del gasto',
    name: 'expense_payments',
    display: DisplayFunctions.getNameFromObject
  },
  SUPPLIER: {
    title: 'Proveedor',
    name: 'supplier',
    relationship_id_name: 'supplier_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_STATUS: {
    title: 'Estado del gasto',
    name: 'expense_status',
    relationship_id_name: 'expense_status_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_INVOICE_TYPE: {
    title: 'Tipo de factura',
    name: 'expense_invoice_type',
    relationship_id_name: 'expense_invoice_type_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_INVOICE_STATUS: {
    title: 'Estado de la factura',
    name: 'expense_invoice_status',
    relationship_id_name: 'expense_invoice_status_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_INVOICE_PAYMENT_FORM: {
    title: 'Forma de pago',
    name: 'expense_invoice_payment_form',
    relationship_id_name: 'expense_invoice_payment_form_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_INVOICE_PAYMENT_METHOD: {
    title: 'Metodo de pago',
    name: 'expense_invoice_payment_method',
    relationship_id_name: 'expense_invoice_payment_method_id',
    display: DisplayFunctions.getNameFromObject
  },
  EXPENSE_INVOICE_CDFI_USE: {
    title: 'Uso del cdfi',
    name: 'expense_invoice_cdfi_use',
    relationship_id_name: 'expense_invoice_cdfi_use_id',
    display: DisplayFunctions.getNameFromObject
  },
  INVOICE_CODE: {
    title: 'Codigo de la factura',
    name: 'invoice_code',
    display: DisplayFunctions.getValue
  },
  INVOICE_PAID_DATE: {
    title: 'Fecha del pago de la factura',
    name: 'invoice_paid_date',
    display: DisplayFunctions.getDate
  },
  INVOICE_PROVISION_DATE: {
    title: 'Fecha de provision de la factura',
    name: 'invoice_provision_date',
    display: DisplayFunctions.getDate
  },
  INVOICE_TAX_RETAINED: {
    title: 'Iva retenido',
    name: 'invoice_tax_retained',
    display: DisplayFunctions.getValue
  },
  INVOICE_ISR_RETAINED: {
    title: 'Isr retenido',
    name: 'invoice_isr_retained',
    display: DisplayFunctions.getValue
  },
  COMPLEMENT_EXPENSE_INVOICE: {
    title: 'Factura complemento',
    name: 'complement_expense_invoice',
    relationship_id_name: 'complement_expense_invoice_id',
    display: DisplayFunctions.getNameFromObject
  }
}
