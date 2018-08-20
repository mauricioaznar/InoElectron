import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import MauInputTypes from 'renderer/api/components/inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
import Masks from 'renderer/api/functions/Masks'

export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'user_id',
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  COST: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  NICKNAME: {
    title: 'Apellidos',
    name: 'lastname',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    mask: Masks.email,
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  PHONE: {
    title: 'Telefono',
    name: 'house_phone',
    display: DisplayFunctions.getValue,
    mask: Masks.house_phone,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: ''
  },
  ROLE: {
    title: 'rol',
    name: 'role',
    display: DisplayFunctions.getNameFromObject,
    relationship_id_name: 'role_id',
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  GROUPS: {
    title: 'Grupos',
    name: 'group',
    display: DisplayFunctions.getPersonaArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  }
}
