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

function arrayOfObjects (initialObject, propertyName) {
  if (initialObject === undefined) {
    return []
  }
  return initialObject[propertyName]
}
export default {tripleboolean, simple, arrayOfObjects}

