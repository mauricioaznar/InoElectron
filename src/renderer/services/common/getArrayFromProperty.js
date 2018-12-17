export default function (array, propertyName) {
  return array.map(object => {
    return object[propertyName]
  })
}
