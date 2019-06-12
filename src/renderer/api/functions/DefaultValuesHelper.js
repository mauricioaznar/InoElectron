function tripleboolean (initialObject, propertyName) {
  if (initialObject === undefined) {
    return -1
  }
  let propertyValue = initialObject[propertyName]
  if (propertyValue === 0) {
    return propertyValue
  } else if (propertyValue === 1) {
    return propertyValue
  } else {
    return -1
  }
}

function simple (initialObject, propertyName) {
  if (initialObject === undefined) {
    return ''
  }
  return initialObject[propertyName]
}

function array (initialObject, propertyName) {
  if (initialObject === undefined) {
    return []
  }
  return initialObject[propertyName]
}

function object (initialObject, propertyName) {
  if (initialObject === undefined || initialObject[propertyName] === null || initialObject[propertyName] === 'null') {
    return {}
  }
  return initialObject[propertyName]
}
export default {tripleboolean, simple, array: array, object}

