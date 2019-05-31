import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EXPENSE_TYPE: {
    title: 'Tipo de gasto',
    name: 'expense_type',
    relationship_id_name: 'expense_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_BRANCH: {
    title: 'Sucursal',
    name: 'expense_branch',
    relationship_id_name: 'expense_branch_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EXPENSE_CATEGORY: {
    title: 'Categoria',
    name: 'expense_category',
    relationship_id_name: 'expense_category_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  SUPPLIER: {
    title: 'Proveedor',
    name: 'supplier',
    relationship_id_name: 'supplier_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
