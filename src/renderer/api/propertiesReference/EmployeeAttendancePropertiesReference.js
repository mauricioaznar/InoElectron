import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  DATE_TIME: {
    title: 'Tiempo de entrada/salida',
    name: 'date_time',
    display: DisplayFunctions.getDateTime,
    defaultValue: MauInputDefaultValues.DATE
  },
  EMPLOYEE: {
    title: 'Empleado',
    name: 'employee',
    relationship_id_name: 'employee_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EMPLOYEE_ATTENDANCE_TYPE: {
    title: 'Tipo de asistencia',
    name: 'employee_attendance_type',
    relationship_id_name: 'employee_attendance_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
