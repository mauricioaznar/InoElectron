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
  MACHINE: {
    title: 'Maquina',
    name: 'machine',
    relationship_id_name: 'machine_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  EMPLOYEE: {
    title: 'Empleado en turno',
    name: 'employee',
    relationship_id_name: 'employee_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  },
  BAGS: {
    title: 'Bolsas',
    name: 'bags',
    relationship_id_name: 'bag_order_production_id',
    display: DisplayFunctions.getBagWithUnits,
    defaultValue: MauInputDefaultValues.MULTISELECT
  }
}
