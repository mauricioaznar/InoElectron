import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

export default {
  START_DATE_TIME: {
    title: 'Fecha y hora de inicio',
    name: 'start_date_time',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  END_DATE_TIME: {
    title: 'Fecha y hora de termino',
    name: 'end_date_time',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  PAYROLL_EMPLOYEES: {
    title: 'Empleados',
    name: 'payroll_employees',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
