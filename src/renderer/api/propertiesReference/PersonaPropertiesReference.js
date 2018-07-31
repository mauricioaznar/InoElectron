import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import Masks from 'renderer/api/functions/Masks'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'client_id',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  COMPANYNAME: {
    title: 'Nombre de la empresa',
    name: 'companyname',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  FIRSTNAME: {
    title: 'Nombre',
    name: 'firstname',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  NICKNAME: {
    title: 'Apodo',
    name: 'nickname',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  LASTNAME: {
    title: 'Apellidos',
    name: 'lastname',
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
  HOUSEPHONE: {
    title: 'Telefono de la empresa',
    name: 'housephone',
    display: DisplayFunctions.getValue,
    mask: Masks.housephone,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  CELLPHONE: {
    title: 'Telefono del contacto',
    name: 'cellphone',
    display: DisplayFunctions.getValue,
    mask: Masks.cellphone,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  COUNTRY: {
    title: 'Pais',
    name: 'country',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  CITY: {
    title: 'Ciudad',
    name: 'city',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ZIPCODE: {
    title: 'Codigo Postal',
    name: 'zip_code',
    display: DisplayFunctions.getValue,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}
