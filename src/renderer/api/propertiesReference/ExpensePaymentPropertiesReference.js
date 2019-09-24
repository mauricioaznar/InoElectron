import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
export default {
  SUBTOTAL: {
    title: 'Subtotal',
    name: 'subtotal',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TAX: {
    title: 'Fecha',
    name: 'date',
    defaultValue: MauInputDefaultValues.DATE
  },
  MACHINE: {
    title: 'Origen del dinero',
    name: 'expense_money_source',
    relationship_id_name: 'expense_money_source_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
