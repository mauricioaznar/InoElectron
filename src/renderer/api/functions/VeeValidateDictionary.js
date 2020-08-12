export default {
  en: {
    messages: {
      object_required: field => `this ${field} is mandatory`,
      remote_unique: field => `this ${field} is mandatory`,
      kilo_to_group: field => `this ${field} is mandatory`,
      min_value: field => `this ${field} is mandatory`,
      required: field => `this ${field} is mandatory`,
      is_number_equal: field => `this ${field} is mandatory`
    }
  },
  es: {
    messages: {
      object_required: field => `El campo ${field} es obligatorio`,
      remote_unique: field => `El campo ${field} no es unico`,
      kilo_to_group: field => `El campo ${field} no es valido`,
      min_value: field => `El campo ${field} no es valido`,
      is_number_equal: field => `El campo ${field} no es valido`
    }
  }
}
