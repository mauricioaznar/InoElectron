import MauInputDefaultValues from 'renderer/api/components/inputs/MauInputDefaultValues'
export default {
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    defaultValue: MauInputDefaultValues.DATE
  },
  EQUIPMENT_MEASUREMENT_UNIT: {
    title: 'Unidad de medida',
    name: 'equipment_measurement_unit',
    relationship_id_name: 'equipment_measurement_unit_id'
  },
  EQUIPMENT_CATEGORY: {
    title: 'Categoria',
    name: 'equipment_category',
    relationship_id_name: 'equipment_category_id'
  },
  EQUIPMENT_SUBCATEGORY: {
    title: 'Subcategoria',
    name: 'equipment_subcategory',
    relationship_id_name: 'equipment_subcategory_id'
  }
}
