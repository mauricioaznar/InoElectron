import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

let OrderSalePropertiesReference = {
  ORDER_CODE: {
    title: 'Identificador de la orden',
    name: 'order_code',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DATE_REQUESTED: {
    title: 'Fecha de solicitud',
    name: 'date_requested',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  PRODUCTS: {
    title: 'Productos',
    name: 'products',
    display: DisplayFunctions.getOrderSaleProducts,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getPersonaInformation,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  },
  ORDER_SALE_TYPE: {
    name: 'order_sale_type',
    title: 'Tipo de orden',
    relationship_id_name: 'order_sale_type_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  },
  DATE_GIVEN: {
    title: 'Fecha de entrega',
    name: 'date_given',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  TOTAL_COST_REQUESTED: {
    title: 'Costo total solicitado',
    name: 'total_cost_requested',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TOTAL_COST_GIVEN: {
    title: 'Costo total entregado',
    name: 'total_cost_given',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  RECEIPT_TYPE: {
    title: 'Tipo de comprobante',
    name: 'order_sale_receipt_type',
    relationship_id_name: 'order_sale_receipt_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default OrderSalePropertiesReference
