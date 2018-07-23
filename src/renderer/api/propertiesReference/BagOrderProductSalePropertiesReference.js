import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import Masks from 'renderer/services/form/Masks'

let OrderProductSalePropertiesReference = {
  UNITS_REQUESTED: {
    title: 'Cantidad en kilos',
    name: 'units_requested',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  UNITS_GIVEN: {
    title: 'Cantidad en kilos',
    name: 'units_given',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUPS_REQUESTED: {
    title: 'Cantidad en bultos',
    name: 'groups_requested',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUPS_GIVEN: {
    title: 'Cantidad en bultos',
    name: 'groups_given',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUP_WEIGHT_REQUESTED: {
    title: 'Peso del bulto en kilos',
    name: 'group_weight_requested',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUP_WEIGHT_GIVEN: {
    title: 'Peso del bulto en kilos',
    name: 'group_weight_given',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  UNIT_PRICE_REQUESTED: {
    title: 'Precio unitario',
    name: 'unit_price_requested',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  UNIT_PRICE_GIVEN: {
    title: 'Precio unitario',
    name: 'unit_price_given',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TOTAL_COST_REQUESTED: {
    title: 'Costo total',
    name: 'total_cost_requested',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TOTAL_COST_GIVEN: {
    title: 'Costo total',
    name: 'total_cost_given',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}

export default OrderProductSalePropertiesReference
