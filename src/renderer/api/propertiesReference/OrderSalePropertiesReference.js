import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

let OrderSalePropertiesReference = {
  ORDER_CODE: {
    title: 'Identificador de la orden',
    name: 'order_code',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  PRODUCTS: {
    title: 'Productos',
    name: 'products',
    display: DisplayFunctions.getOrderSaleProducts,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  CLIENT_CONTACT: {
    name: 'client_contact',
    title: 'Contacto',
    relationship_id_name: 'client_contact_id',
    display: DisplayFunctions.getPersonaInformation,
    defaultValue: MauInputDefaultValues.SELECT
  },
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getNameFromObject,
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
  ORDER_SALE_STATUS: {
    name: 'order_sale_status',
    title: 'Estado de entrega',
    relationship_id_name: 'order_sale_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  ORDER_SALE_COLLECTION_STATUS: {
    name: 'order_sale_collection_status',
    title: 'Estado de cobranza',
    relationship_id_name: 'order_sale_collection_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  AMOUNT_COLLECTED: {
    title: 'Cantidad cobrada',
    name: 'amount_collected',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.FLOAT
  },
  TOTAL_COST: {
    title: 'Total',
    name: 'total_cost',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  ORDER_REQUEST: {
    title: 'Pedido',
    name: 'order_request',
    relationship_id_name: 'order_request_id',
    defaultValue: MauInputDefaultValues.SELECT
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
