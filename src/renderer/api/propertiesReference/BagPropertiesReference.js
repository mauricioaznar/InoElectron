import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import Masks from 'renderer/api/functions/Masks'

let propertiesReference = {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    relationship_id_name: 'document_id',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Codigo',
    name: 'name',
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
  BAG_TYPE: {
    title: 'Tipo de producto',
    name: 'bag_type',
    relationship_id_name: 'bag_type_id',
    display: DisplayFunctions.getNameFromObject,
    required: true,
    defaultValue: MauInputDefaultValues.SELECT
  },
  BAG_PACKING: {
    title: 'Tipo de empaque',
    name: 'bag_packing',
    relationship_id_name: 'bag_packing_id',
    display: DisplayFunctions.getNameFromObject,
    required: true,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default Object.freeze(propertiesReference)
