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
  ESTIMATED_DELIVERY_DATE: {
    title: 'Fecha de entrega estimada',
    name: 'estimated_delivery_date',
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
  CLIENT_CONTACT: {
    name: 'client_contact',
    title: 'Contacto',
    relationship_id_name: 'client_contact_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  },
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  ORDER_REQUEST_STATUS: {
    name: 'order_request_status',
    title: 'Estado del pedido',
    relationship_id_name: 'order_request_status_id',
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
