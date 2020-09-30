import Vue from 'vue'
import ConvertDateTimeTo from 'renderer/services/common/ConvertDateTimeTo'
import moment from 'moment'
import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'

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
  getValidInvoiceCode: function (invoiceCode) {
    return invoiceCode !== 0 ? invoiceCode : invoiceCode
  },
  getArrayLength: function (array) {
    return array ? array.length : ''
  },
  getValue: function (value) {
    return value
  },
  getPercentage: function (value) {
    return value + '%'
  },
  getPersona: function (value) {
    return value ? value.fullname : ''
  },
  getPersonaArray: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li>' + array[i].fullname + '</li>'
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
  getDescriptionArray: function (array) {
    let htmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<li>' + array[i].description + '</li>'
    }
    return htmlString + '</ul>'
  },
  getFirstNameFromArray: function (array) {
    return array.length === 0 ? '' : array[0].name
  },
  getDate: function (date) {
    let momentDate = moment(date)
    return momentDate.isValid() ? moment(date).locale('es').format('dddd, MMMM D, YYYY') : '-'
  },
  getDateTime: function (date) {
    let momentDate = moment(date)
    return momentDate.isValid() ? moment(date).locale('es').format('dddd, MMMM D, YYYY. HH:mm') : '-'
  },
  getTimeFromDateTime: function (date) {
    return ConvertDateTimeTo.time(date)
  },
  getItemsWithQuantity: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr><th>E</th><th>Cantidad</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].equipment.description + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].quantity + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getItemsWithMaxAndMin: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr><th>E</th><th>Cantidad Min</th><th>Cantidad Max</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].equipment.description + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].min_quantity + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].max_quantity + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getProducts: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr><th>Producto</th><th>Kilos</th><th>Grupos</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      let productTypeId = array[i].product_type_id
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].description + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].pivot.kilos + ' kg</td>'
      if (!productTypeId || productTypeId === 1 || productTypeId === 4) {
        if (array[i].pivot.groups !== null) {
          htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + ((array[i].pivot.groups > 1 || array[i].pivot.groups < -1) ? ' bultos' : ' bulto') + '</td>'
        } else {
          htmlString += '<td></td>'
        }
      }
      if (!productTypeId || productTypeId === 2) {
        if (array[i].pivot.groups !== null) {
          htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + ((array[i].pivot.groups > 1 || array[i].pivot.groups < -1) ? ' rollos' : ' rollo') + '</td>'
        } else {
          htmlString += '<td></td>'
        }
      }
      if (!productTypeId || productTypeId === 3) {
        if (array[i].pivot.groups !== null) {
          htmlString += '<td class="mau-text-right">' + array[i].pivot.groups + ((array[i].pivot.groups > 1 || array[i].pivot.groups < -1) ? ' grupos' : ' grupo') + '</td>'
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
  },
  getOrderSalesProductsRequested: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr>'
    htmlString += '<th>Producto</th>'
    htmlString += '<th>Kilos solicitados</th>'
    htmlString += '<th>Kilos vendidos</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].description + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].order_request_kilos || 0 + '</td>'
      if (array[i].order_sales_kilos) {
        htmlString += '<td class="mau-text-right">' + array[i].order_sales_kilos || 0 + '</td>'
      } else {
        htmlString += '<td class="mau-text-right"></td>'
      }
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getOrderSalesProductsNotRequested: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr>'
    htmlString += '<th>Producto</th>'
    htmlString += '<th>Kilos vendidos</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].description + '</td>'
      htmlString += '<td class="mau-text-right">' + array[i].order_sales_kilos + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getEmployeeAttendanceImageForList: function (imageName) {
    return '<div class="d-flex justify-content-center">' +
             '<img src="' + Vue.http.options.root + '/attendances/' + imageName + '" class="mau-image-small" alt=" no disponible">' +
           '</div>'
  },
  getEmployeeAttendanceImageForView: function (imageName) {
    return '<div class="d-flex justify-content-center">' +
      '<img src="' + Vue.http.options.root + '/attendances/' + imageName + '" class="mau-image-large" alt=" no disponible">' +
      '</div>'
  },
  getExpenseItems: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr>'
    htmlString += '<th>Descripcion</th>'
    htmlString += '<th>Subtotal</th>'
    htmlString += '<th>Subcategoria</th>'
    htmlString += '<th>Sucursal</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].description + '</td>'
      htmlString +=
        '<td class="mau-text-center">' +
          (array[i].subtotal ? array[i].subtotal : 0).toFixed(2) +
        '</td>'
      htmlString += '<td class="mau-text-left">' + (array[i].expense_subcategory && array[i].expense_subcategory.id ? array[i].expense_subcategory.name : '') + '</td>'
      htmlString += '<td class="mau-text-left">' + (array[i].branch && array[i].branch.id ? array[i].branch.name : '') + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  },
  getExpensePayments: function (array) {
    let htmlString = '<table class="w-100">'
    htmlString += '<tr>'
    htmlString += '<th>Fecha del pago</th>'
    htmlString += '<th>Subtotal</th>'
    htmlString += '<th>Origen del dinero</th>'
    htmlString += '</tr>'
    for (let i = 0; i < array.length; i++) {
      htmlString += '<tr>'
      htmlString += '<td class="mau-text-left">' + array[i].date + '</td>'
      htmlString +=
        '<td class="mau-text-center">' +
          ((array[i].subtotal) +
          (array[i].tax ? array[i].tax : 0) +
          (array[i].ieps ? array[i].ieps : 0) -
          (array[i].tax_retained ? array[i].tax_retained : 0) -
          (array[i].isr_retained ? array[i].isr_retained : 0)).toFixed(2) +
        '</td>'
      htmlString += '<td class="mau-text-center">' + (array[i].expense_money_source && array[i].expense_money_source.id ? array[i].expense_money_source.name : '') + '</td>'
      htmlString += '</tr>'
    }
    return htmlString + '</table>'
  }
}
