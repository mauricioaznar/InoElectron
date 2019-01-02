import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

let propertiesReference = {
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
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  MACHINE: {
    title: 'Maquina',
    name: 'machine',
    relationship_id_name: 'machine_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  PRODUCTION_EVENT_TYPE: {
    title: 'Tipo de evento',
    name: 'production_event_type',
    relationship_id_name: 'production_event_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  CHECKS: {
    title: 'Por hacer',
    name: 'checks',
    display: DisplayFunctions.getNameArray,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  REPORT_EMPLOYEE: {
    title: 'Empleado que reporto',
    name: 'report_employee',
    relationship_id_name: 'report_employee_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  },
  MAINTENANCE_EMPLOYEE: {
    title: 'Empleado que reparo',
    name: 'maintenance_employee',
    relationship_id_name: 'maintenance_employee_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default Object.freeze(propertiesReference)
