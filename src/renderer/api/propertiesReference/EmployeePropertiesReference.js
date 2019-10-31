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
  }
}
