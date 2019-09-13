import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

export default {
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  QUANTITY: {
    title: 'Cantidad',
    name: 'quantity',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  ORDER_RETURN_TYPE: {
    title: 'Tipo de order de retorno',
    name: 'order_return_type',
    relationship_id_name: 'order_return_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
