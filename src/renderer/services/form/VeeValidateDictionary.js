export default {
  en: {
    messages: {
      object_required: field => `this ${field} is mandatory`,
      array_required: field => `this ${field} is mandatory`,
      remote_unique: field => `this ${field} is mandatory`
    }
  },
  es: {
    messages: {
      object_required: field => `El campo ${field} es obligatorio`,
      array_required: field => `El campo ${field} es obligatorio`,
      remote_unique: field => `El campo ${field} no es unico`
    }
  }
}
