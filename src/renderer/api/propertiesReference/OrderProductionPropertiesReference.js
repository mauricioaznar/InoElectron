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
  EMPLOYEE: {
    title: 'Empleado en turno',
    name: 'employee',
    relationship_id_name: 'employee_id',
    display: DisplayFunctions.getPersona,
    defaultValue: MauInputDefaultValues.SELECT
  },
  PRODUCTS: {
    title: 'Productos',
    name: 'products',
    display: DisplayFunctions.getProducts,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  PRODUCTION_INDICATORS: {
    title: 'Indicadores',
    name: 'production_indicators',
    display: DisplayFunctions.getNameArray,
    defaultValue: MauInputDefaultValues.MULTISELECT
  },
  MACHINES: {
    title: 'Maquinas',
    name: 'machines',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  },
  WASTE: {
    title: 'Desperdicio',
    name: 'waste',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  ORDER_PRODUCTION_TYPE: {
    title: 'Tipo de orden',
    name: 'order_production_type',
    relationship_id_name: 'order_production_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
