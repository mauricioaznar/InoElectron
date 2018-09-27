import ConvertDateTimeTo from 'renderer/services/common/ConvertDateTimeTo'
import moment from 'moment'
import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
moment.locale('es')

export default {
  getThreeStateBoolean: function (booleanValue) {
    if (booleanValue === 1) {
      return '<span class="fa fa-check"></span>'
    } else if (booleanValue === 0) {
      return '<span class="fa fa-times"></span>'
    } else {
      return ''
    }
  },
  getTwoStateBoolean: function (booleanValue) {
    if (booleanValue === 1 || booleanValue === true) {
      return '<span class="fa fa-check"></span>'
    } else if (booleanValue === 0 || booleanValue === false) {
      return '<span class="ld-na"></span>'
    }
  },
  getNameFromObject: function (object) {
    return object ? object.name : ''
  },
  getPropertyFromObject: function (object, propertyName = 'name') {
    return object ? object[propertyName] : ''
  },
  getArrayLength: function (array) {
    return array ? array.length : ''
  },
  getValue: function (value) {
    return value
  },
  getPersona: function (value) {
    return value ? value.full_name : ''
  },
  getPersonaArray: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li>' + array[i].full_name + '</li>'
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
    return momentDate.isValid() ? moment(date).format('dddd, MMMM D, YYYY') : '-'
  },
  getDateTime: function (date) {
    let momentDate = moment(date)
    return momentDate.isValid() ? moment(date).format('dddd, MMMM D, YYYY. HH:mm') : '-'
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
  getProducts: function (array, productTypeId) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr><th>Codigo</th><th>Kilos</th>'
    productTypeId = parseInt(productTypeId)
    if (!productTypeId || productTypeId === 1) {
      htmlString += '<th>Bultos</th>'
    }
    if (!productTypeId || productTypeId === 2) {
      htmlString += '<th>Rollos</th>'
    }
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      if (productTypeId && array[i].product_type_id.toString() !== productTypeId.toString()) {
        continue
      }
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].code + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].pivot.kilos + ' kg</td>'
      if (!productTypeId || productTypeId === 1) {
        if (array[i].pivot.groups !== null) {
          htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + (array[i].pivot.groups > 1 ? ' bultos' : ' bulto') + '</td>'
        } else {
          htmlString += '<td></td>'
        }
      }
      if (!productTypeId || productTypeId === 2) {
        if (array[i].pivot.groups !== null) {
          htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + (array[i].pivot.groups > 1 ? ' rollos' : ' rollo') + '</td>'
        } else {
          htmlString += '<td></td>'
        }
      }
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getOrderSaleProducts: function (array) {
    let htmlString = '<table class="w-100">'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].code + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].pivot.kilos + ' kg</td>'
      if (array[i].pivot.groups !== null) {
        htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + (array[i].pivot.groups > 1 ? ' bultos' : ' bulto') + '</td>'
      } else {
        htmlString += '<td></td>'
      }
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getOrderSales: function (array) {
    let htmlString = '<table class="w-100">'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].order_code + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].total_cost + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getOrderSaleTotalCost: function (array) {
    let total = 0
    for (let i = 0; i < array.length; i++) {
      let kilosCost = 0
      kilosCost += (array[i].pivot.kilos || 0) * (array[i].pivot.kilo_price || 0)
      total += kilosCost || 0
    }
    return '$' + total.toFixed(2)
  },
  getMachineNames: function (array) {
    let groupedMachines = []
    for (let i = 0; i < array.length; i++) {
      let machine = array[i]
      let isMachineAlready = groupedMachines.find(machineObj => {
        return machineObj[GlobalEntityIdentifier] === machine[GlobalEntityIdentifier]
      })
      if (!isMachineAlready) {
        groupedMachines.push(machine)
      }
    }
    let htmlString = ''
    if (groupedMachines.length === 1) {
      htmlString += groupedMachines[0].name
    } else {
      htmlString += '<ul>'
      for (let i = 0; i < groupedMachines.length; i++) {
        htmlString += '<li class="mau-text-left">' + groupedMachines[i].name + '</li>'
      }
      htmlString += '</ul>'
    }
    return groupedMachines.length === 0 ? '-' : htmlString
  }
}
