import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import Masks from 'renderer/api/functions/Masks'

let OrderProductSalePropertiesReference = {
  KILOS: {
    title: 'Cantidad en kilos',
    name: 'kilos',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUPS: {
    title: 'Cantidad en bultos',
    name: 'groups',
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
    title: 'Precio unitario solicitado',
    name: 'kilo_price',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}

export default OrderProductSalePropertiesReference
