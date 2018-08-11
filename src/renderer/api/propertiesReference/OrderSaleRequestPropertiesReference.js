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
    display: DisplayFunctions.getBagWithUnitsRequested,
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
  ORDER_STATUS: {
    name: 'orderSaleStatus',
    title: 'Estado',
    relationship_id_name: 'order_sale_status_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default OrderSalePropertiesReference
