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
  FULLNAME: {
    title: 'Nombre completo',
    name: 'fullname',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ADDRESS1: {
    title: 'Direccion',
    name: 'address1',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  CELLPHONE: {
    title: 'Telefono del contacto',
    name: 'cellphone',
    display: DisplayFunctions.getValue,
    mask: Masks.cellphone,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}
