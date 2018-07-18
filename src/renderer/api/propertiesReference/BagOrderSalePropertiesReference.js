import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'

let OrderSalePropertiesReference = {
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
    display: DisplayFunctions.getBagWithUnits,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getPersonaInformation,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default OrderSalePropertiesReference
