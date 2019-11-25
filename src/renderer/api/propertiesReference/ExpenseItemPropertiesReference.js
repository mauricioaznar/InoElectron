import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
export default {
  SUBTOTAL: {
    title: 'Subtotal',
    name: 'subtotal',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TAX: {
    title: 'Impuesto',
    name: 'tax',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    defaultValue: MauInputDefaultValues.TEXT
  },
  MACHINE: {
    title: 'Maquina',
    name: 'machine',
    relationship_id_name: 'machine_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  QUANTITY: {
    title: 'Cantidad',
    name: 'quantity',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  BRANCH: {
    title: 'Sucursal',
    name: 'branch',
    relationship_id_name: 'branch_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
