import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

let OrderRequestPropertiesReference = {
  ORDER_CODE: {
    title: 'Identificador de la orden',
    name: 'order_code',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DATE: {
    title: 'Fecha de solicitud',
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
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getPersonaInformation,
    defaultValue: MauInputDefaultValues.SELECT
  },
  ORDER_REQUEST_STATUS: {
    name: 'order_request_status',
    title: 'Status',
    relationship_id_name: 'order_request_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  COMPANY: {
    name: 'company',
    title: 'Empresa',
    relationship_id_name: 'company_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  TOTAL_COST: {
    title: 'Costo total',
    name: 'total_cost',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}

export default OrderRequestPropertiesReference
