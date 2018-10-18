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
  ORDER_SALES: {
    title: 'Ventas',
    name: 'order_sales',
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
    title: 'Total estimado',
    name: 'total_cost',
    display: DisplayFunctions.getValue
  },
  ORDER_SALES_PRODUCTS_NOT_REQUESTED: {
    title: 'Productos vendidos (no incluidos en los pedidos)',
    name: 'order_sales_products_not_requested',
    display: DisplayFunctions.getOrderSalesProductsNotRequested
  },
  ORDER_SALES_PRODUCTS_REQUESTED: {
    title: 'Productos solicitados vs vendidos',
    name: 'order_sales_products_requested',
    display: DisplayFunctions.getOrderSalesProductsRequested
  }
}

export default OrderRequestPropertiesReference
