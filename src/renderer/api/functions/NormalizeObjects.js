import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
function normalizeObject (object, includedProperties) {
  let newObject = {}
  newObject[GlobalEntityIdentifier] = object[GlobalEntityIdentifier]
  for (let i = 0; i < includedProperties.length; i++) {
    let includedProperty = includedProperties[i]
    newObject[includedProperty] = object[includedProperty]
  }
  return newObject
}

function normalizeObjects (objects, includedProperties) {
  let newObjects = []
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i]
    let newObject = normalizeObject(object, includedProperties)
    newObjects.push(newObject)
  }
  return newObjects
}


export default {normalizeObjects, normalizeObject}
