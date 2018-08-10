import ApiOperations from 'renderer/api/functions/ApiOperations'

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
    console.log(initialValue)
    console.log(value)
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

let kiloToGroup = {
  validate: (quantity, params) => {
    let isValid = true
    let groupWeight = params[0].groupWeight
    let isGroupWeightStrict = params[0].isGroupWeightStrict
    if (groupWeight && groupWeight > 0 && isGroupWeightStrict) {
      let quantityAbsolute = Math.abs(quantity)
      let remainder = quantityAbsolute % groupWeight
      if (remainder > 0) {
        isValid = false
      }
    }
    return isValid
  }
}

export default {
  objectRequired: objectRequired,
  arrayRequired: arrayRequired,
  remoteUnique: remoteUnique,
  kiloToGroup: kiloToGroup
}
