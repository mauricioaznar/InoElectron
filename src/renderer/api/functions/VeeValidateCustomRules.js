import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
let objectRequired = {
  validate: value => {
    return !(Object.keys(value).length === 0 && value.constructor === Object)
  }
}

let remoteUnique = {
  validate: (value, params, data) => {
    let initialValue = params.initialValue
    let endpointName = params.endpointName
    return new Promise(resolve => {
      if (initialValue === value) {
        resolve({
          valid: true
        })
      } else {
        let filterExactObject = {[params.columnName]: value}
        GenericApiOperations.list(endpointName, {filterExacts: filterExactObject}).then(result => {
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
    let groupWeight = params.groupWeight
    let isGroupWeightStrict = params.isGroupWeightStrict
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


let isNumberEqual = {
  validate: (value, params) => {
    let isValid = true
    let num = params.number
    if (String(num) !== String(value).replace(/,/g, '')) {
      isValid = false
    }
    return isValid
  }
}

let inArray = {
  validate: (value, params) => {
    let isValid = true
    let verifiedArray = params.array
    let valuesArray = value
    for (let i = 0; i < valuesArray.length; i++) {
      let isValueInVerifiedArray = false
      let valueElement = valuesArray[i]
      for (let j = 0; j < verifiedArray.length; j++) {
        let verifiedElement = verifiedArray[j]
        if (valueElement.id === verifiedElement.id) {
          isValueInVerifiedArray = true
          break
        }
      }
      if (!isValueInVerifiedArray) {
        isValid = false
        break
      }
    }
    return isValid
  }
}

export default {
  objectRequired: objectRequired,
  remoteUnique: remoteUnique,
  kiloToGroup: kiloToGroup,
  isNumberEqual: isNumberEqual,
  inArray: inArray
}
