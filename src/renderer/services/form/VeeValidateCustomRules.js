import ApiOperations from 'renderer/services/api/ApiOperations'

let objectRequired = {
  validate: value => {
    return !(Object.keys(value).length === 0 && value.constructor === Object)
  }
}

let arrayRequired = {
  validate: value => {
    return !(value.length === 0)
  }
}

let remoteUnique = {
  validate: (value, params) => {
    let initialValue = params[0].initialValue
    return new Promise(resolve => {
      if (initialValue === value) {
        resolve({
          valid: true
        })
      } else {
        let filterExactObject = {[params[0].columnName]: value}
        ApiOperations.getWithFilterExactWithoutPagination(params[0].entityType, filterExactObject).then(result => {
          let isValueUsed = result.length > 0
          resolve({
            valid: !isValueUsed,
            data: value !== 'trigger' ? undefined : { message: 'Not this value' }
          })
        })
      }
    })
  }
}

export default {
  objectRequired: objectRequired,
  arrayRequired: arrayRequired,
  remoteUnique: remoteUnique
}
