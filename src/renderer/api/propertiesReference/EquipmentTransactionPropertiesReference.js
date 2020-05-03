import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  DATE_EMITTED: {
    title: 'Fecha de emision',
    name: 'date_emitted',
    defaultValue: MauInputDefaultValues.DATE
  },
  EQUIPMENT_TRANSACTION_STATUS: {
    title: 'Estado de la transaccion de refacciones',
    name: 'equipment_transaction_status',
    relationship_id_name: 'equipment_transaction_status_id'
  },
  EQUIPMENT_TRANSACTION_TYPE: {
    title: 'Tipo de transaccion de refacciones',
    name: 'equipment_transaction_type',
    relationship_id_name: 'equipment_transaction_type_id'
  },
  SUPPLIER: {
    title: 'Proveedor',
    name: 'supplier',
    relationship_id_name: 'supplier_id'
  },
  BRANCH: {
    title: 'Sucursal',
    name: 'branch',
    relationship_id_name: 'branch_id'
  },
  EQUIPMENT_TRANSACTION_ITEMS: {
    title: 'Elementos de la transaccion',
    name: 'equipment_transaction_items'
  },
  EQUIPMENT_TRANSACTION_REQUEST: {
    title: 'Transaccion tipo pedido',
    name: 'equipment_transaction_request',
    relationship_id_name: 'equipment_transaction_request_id'
  }
}
