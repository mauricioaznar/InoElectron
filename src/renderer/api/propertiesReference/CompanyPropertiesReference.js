import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import Masks from 'renderer/api/functions/Masks'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  NAME: {
    title: 'Nombre de la empresa',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ABBREVIATION: {
    title: 'Abreviacion',
    name: 'abbreviation',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ADDRESS1: {
    title: 'Direccion',
    name: 'address1',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  HOUSE_PHONE: {
    title: 'Telefono de la empresa',
    name: 'house_phone',
    display: DisplayFunctions.getValue,
    mask: Masks.house_phone,
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
  ZIP_CODE: {
    title: 'Codigo Postal',
    name: 'zip_code',
    display: DisplayFunctions.getValue,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  CLIENTS: {
    title: 'Clientes',
    name: 'clients',
    display: DisplayFunctions.getPersonaArray,
    defaultValue: MauInputDefaultValues.MULTISELECT
  }
}
