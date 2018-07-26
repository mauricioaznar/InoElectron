import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

let OrderSalePropertiesReference = {
  DATE_GIVEN: {
    title: 'Fecha de entrega',
    name: 'date_given',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  RECEIPT_TYPE: {
    title: 'Titulo de comprobante',
    name: 'bag_order_sale_receipt_type',
    relationship_id_name: 'bag_order_sale_receipt_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  BAGS: {
    title: 'Bolsas',
    name: 'bags',
    relationship_id_name: 'bag_order_production_id',
    display: DisplayFunctions.getBagWithUnitsGiven,
    defaultValue: MauInputDefaultValues.MULTISELECT
  }
}

export default OrderSalePropertiesReference
