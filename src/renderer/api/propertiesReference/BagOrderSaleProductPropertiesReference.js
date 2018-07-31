import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import Masks from 'renderer/api/functions/Masks'

let OrderProductSalePropertiesReference = {
  KILOS_REQUESTED: {
    title: 'Cantidad en kilos',
    name: 'kilos_requested',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  KILOS_GIVEN: {
    title: 'Cantidad en kilos',
    name: 'kilos_given',
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
  GROUP_WEIGHT: {
    title: 'Peso del bulto en kilos',
    name: 'group_weight',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  KILO_PRICE: {
    title: 'Precio unitario',
    name: 'kilo_price',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TAX: {
    title: 'IVA',
    name: 'tax',
    display: DisplayFunctions.getValue,
    defaultVal: MauInputDefaultValues.NUMBER
  }
}

export default OrderProductSalePropertiesReference
