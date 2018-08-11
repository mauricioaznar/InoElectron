import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import Masks from 'renderer/api/functions/Masks'

let propertiesReference = {
  CODE: {
    title: 'Codigo',
    name: 'code',
    display: DisplayFunctions.getValue,
    required: true,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DESCRIPTION: {
    title: 'Descripción',
    name: 'description',
    display: DisplayFunctions.getValue,
    required: true,
    defaultValue: MauInputDefaultValues.TEXT
  },
  CURRENT_KILO_PRICE: {
    title: 'Precio por kilo',
    name: 'current_kilo_price',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  CURRENT_GROUP_WEIGHT: {
    title: 'Peso en kilos por bulto',
    name: 'current_group_weight',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  WIDTH: {
    title: 'Ancho',
    name: 'width',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  LENGTH: {
    title: 'Largo',
    name: 'length',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  MATERIAL: {
    title: 'Material',
    name: 'material',
    relationship_id_name: 'material_id',
    display: DisplayFunctions.getNameFromObject,
    required: true,
    defaultValue: MauInputDefaultValues.SELECT
  },
  PACKING: {
    title: 'Tipo de empaque',
    name: 'packing',
    relationship_id_name: 'packing_id',
    display: DisplayFunctions.getNameFromObject,
    required: true,
    defaultValue: MauInputDefaultValues.SELECT
  },
  GROUP_WEIGHT_STRICT: {
    title: 'Requiere bultos exactos',
    name: 'group_weight_strict',
    defaultValue: MauInputDefaultValues.BOOLEAN
  }
}

export default Object.freeze(propertiesReference)
