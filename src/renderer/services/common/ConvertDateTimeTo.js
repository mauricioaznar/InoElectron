import moment from 'moment'
function convertDateTimeToDate (date) {
  return moment(date).format('YYYY-MM-DD')
}

function convertDateTimeToTime (date) {
  return moment(date).format('HH:mm')
}
export default {date: convertDateTimeToDate, time: convertDateTimeToTime}
