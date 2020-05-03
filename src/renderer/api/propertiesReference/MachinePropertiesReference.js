import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  MACHINE_TYPE: {
    title: 'Tipo de maquina',
    name: 'machine_type',
    relationship_id_name: 'machine_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  MACHINES_EQUIPMENTS: {
    title: 'Refacciones/partes/equipos',
    name: 'machines_equipments'
  }
}
