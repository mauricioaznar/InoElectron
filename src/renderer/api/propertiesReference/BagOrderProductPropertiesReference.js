import Masks from 'renderer/api/functions/Masks'
import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  KILOS: {
    title: 'Cantidad en kilos',
    name: 'kilos',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUPS: {
    title: 'Cantidad en bultos',
    name: 'groups',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUP_WEIGHT: {
    title: 'Peso del bulto en kilos',
    name: 'group_weight',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}
