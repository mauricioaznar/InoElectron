export default function (dateString) {
  let date = new Date(dateString)
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // it is a date
    if (isNaN(date.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false
    } else {
      // date is valid
      return new Date(date)
    }
  } else {
    // not a date
    return false
  }
}
