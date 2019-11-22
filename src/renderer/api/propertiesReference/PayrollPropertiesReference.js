import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
import Masks from 'renderer/api/functions/Masks'
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
  CREDIT_USED: {
    title: 'Credito a usar',
    name: 'credit_used',
    display: DisplayFunctions.getValue,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  INFONAVIT_USED: {
    title: 'Infonavit a usar',
    name: 'infonavit_used',
    display: DisplayFunctions.getValue,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  PAYROLL_PAYMENTS: {
    title: 'Pagos',
    name: 'payroll_payments',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  PAYROLL_TYPE: {
    title: 'Tipo de nomina',
    name: 'payroll_type',
    relationship_id_name: 'payroll_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
