import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import Masks from 'renderer/api/functions/Masks'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  FIRST_NAME: {
    title: 'Nombre',
    name: 'first_name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  LAST_NAME: {
    title: 'Apellidos',
    name: 'last_name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  CELLPHONE: {
    title: 'Telefono del contacto',
    name: 'cellphone',
    display: DisplayFunctions.getValue,
    mask: Masks.cellphone,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  EMPLOYEE_TYPE: {
    title: 'Tipo de empleado',
    name: 'employee_type',
    relationship_id_name: 'employee_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EMPLOYEE_STATUS: {
    title: 'Estado del empleado',
    name: 'employee_status',
    relationship_id_name: 'employee_status_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  INFONAVIT: {
    title: 'Infonavit',
    name: 'infonavit',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  CREDIT_REQUIRED: {
    title: 'Require credito',
    name: 'credit_required',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.BOOLEAN
  },
  BASE_SALARY: {
    title: 'Salario base',
    name: 'base_salary',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  HOURS_SHOULD_WORK: {
    title: 'Hora que tiene que trabajar',
    name: 'hours_should_work',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  CREDIT: {
    title: 'Credito',
    name: 'credit',
    display: DisplayFunctions.getValue,
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
