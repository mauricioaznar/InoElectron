import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

let OrderAdjustmentPropertiesReference = {
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  BAGS: {
    title: 'Bolsas',
    name: 'bags',
    relationship_id_name: 'bag_order_production_id',
    display: DisplayFunctions.getBagWithUnits,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  ORDER_TYPE: {
    name: 'order_adjustment_order_type',
    title: 'Tipo de orden',
    relationship_id_name: 'order_adjustment_order_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default OrderAdjustmentPropertiesReference
