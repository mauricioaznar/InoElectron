import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  ENTRANCE_DATE_TIME: {
    title: 'Fecha de entrada',
    name: 'entrance_date_time',
    display: DisplayFunctions.getDateTime,
    defaultValue: MauInputDefaultValues.DATE
  },
  EXIT_DATE_TIME: {
    title: 'Fecha de salida',
    name: 'exit_date_time',
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
  ENTRANCE_IMAGE_NAME: {
    title: 'Imagen de entrada',
    name: 'entrance_image_name',
    display: DisplayFunctions.getEmployeeAttendanceImageForList,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EXIT_IMAGE_NAME: {
    title: 'Imagen de salida',
    name: 'exit_image_name',
    display: DisplayFunctions.getEmployeeAttendanceImageForList,
    defaultValue: MauInputDefaultValues.TEXT
  }
}
