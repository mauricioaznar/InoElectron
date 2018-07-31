import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'

export default {
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  CUTTING_MACHINE: {
    title: 'Maquina',
    name: 'cutting_machine',
    relationship_id_name: 'cutting_machine_id',
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
