import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import EntityTypes from 'renderer/api/EntityTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  ORDER_CODE: {
    title: 'Identificador de la orden',
    name: 'order_code',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  BAGS: {
    title: 'Bolsas',
    name: 'bags',
    relationship_id_name: 'bag_order_production_id',
    entityName: EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT.name,
    display: DisplayFunctions.getBagWithUnits,
    defaultValue: MauInputDefaultValues.MULTISELECT
  }
}
