import ConvertDateTimeTo from 'renderer/services/common/ConvertDateTimeTo'
import moment from 'moment'
moment.locale('es')

export default {
  getBooleanIcon: function (booleanValue) {
    if (booleanValue === 1) {
      return '<span class="ld-yes"></span>'
    } else if (booleanValue === 0) {
      return '<span class="ld-no"></span>'
    } else {
      return '<span class="ld-na"></span>'
    }
  },
  getNameFromObject: function (object) {
    return object ? object.name : ''
  },
  getArrayLength: function (array) {
    return array ? array.length : ''
  },
  getValue: function (value) {
    return value
  },
  getPersona: function (value) {
    let temp = value ? value.fullname : ''
    return temp
  },
  getPersonaArray: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li>' + array[i].name + ' ' + (array[i].lastname || '') + '</li>'
    }
    return htmlString + '</ul>'
  },
  getNameArray: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li>' + array[i].name + '</li>'
    }
    return htmlString + '</ul>'
  },
  getDate: function (date) {
    let momentDate = moment(date)
    return momentDate.isValid() ? moment(date).format('dddd DD [de] MMMM [del] YYYY') : '-'
  },
  getTimeFromDateTime: function (date) {
    return ConvertDateTimeTo.time(date)
  },
  getDateFromDateTime: function (date) {
    return ConvertDateTimeTo.date(date)
  },
  getDateYear: function (date) {
    return moment(date).format('Y')
  },
  getPersonaInformation: function (persona) {
    return persona.companyname
  },
  getBagWithUnits: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li class="mau-text-left">' + array[i].name + ' - ' + array[i].pivot.units + '</li>'
    }
    return htmlString + '</ul>'
  },
  getBagOrderSaleTotal: function (array) {
    let total = 0
    for (let i = 0; i < array.length; i++) {
      total += array[i].pivot.total_cost || 0
    }
    return '$' + total.toFixed(2)
  }
}
