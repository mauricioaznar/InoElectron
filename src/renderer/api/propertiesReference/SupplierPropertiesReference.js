import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DEFAULT_EXPENSE_TYPE: {
    title: 'Tipo de gasto por defecto',
    name: 'default_expense_type',
    relationship_id_name: 'default_expense_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  DEFAULT_EXPENSE_CATEGORY: {
    title: 'Categoria por defecto',
    name: 'default_expense_category',
    relationship_id_name: 'default_expense_category_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  DEFAULT_EXPENSE_SUBCATEGORY: {
    title: 'Subcategoria por defecto',
    name: 'default_expense_subcategory',
    relationship_id_name: 'default_expense_subcategory_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  DEFAULT_EXPENSE_BRANCH: {
    title: 'Sucursal por defecto',
    name: 'default_expense_branch',
    relationship_id_name: 'default_expense_branch_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
