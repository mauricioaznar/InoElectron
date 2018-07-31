function success (vueInstance, message) {
  let finalMessage = message || 'Operacion exitosa'
  vueInstance.$notify({
    group: 'right-corner',
    type: 'success',
    title: finalMessage,
    text: '<span class="fa fa-check"></span>'
  })
}

function info (vueInstance, message) {
  let finalMessage = message || 'Informacion'
  vueInstance.$notify({
    group: 'right-corner',
    type: 'info',
    title: finalMessage,
    text: '<span class="fa fa-info-circle"></span>'
  })
}

function error (vueInstance, errorServerObject) {
  let body = null
  let errors = null
  if (errorServerObject.hasOwnProperty('body')) {
    body = errorServerObject.body
    if (body.hasOwnProperty('errors')) {
      errors = body.errors
    }
  }
  if (errors !== null) {
    for (let errorKey in errors) {
      if (errors.hasOwnProperty(errorKey)) {
        let errorArray = errors[errorKey]
        for (let errorArrayIndex in errorArray) {
          if (errorArray.hasOwnProperty(errorArrayIndex)) {
            vueInstance.$notify({
              group: 'right-corner',
              type: 'danger',
              title: errorArray[errorArrayIndex],
              text: '<span class="fa fa-exclamation-circle"></span>'
            })
          }
        }
      }
    }
  } else {
    vueInstance.$notify({
      group: 'right-corner',
      type: 'danger',
      title: 'Error desconocido, inténtelo más tarde. Si el problema persiste favor de contactar al soporte técnico',
      text: '<span class="fa fa-exclamation-circle"></span>'
    })
  }
}

export default {success: success, error: error, info: info}
