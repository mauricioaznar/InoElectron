<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <mau-form-input-select-static
                        :availableObjects="yearOptions"
                        :initialObject="yearOptions[0]"
                        :displayProperty="'text'"
                        :name="'yearSelect'"
                        :trackBy="'value'"
                        v-model="yearSelected"
                >
                </mau-form-input-select-static>
            </div>
            <div class="col-sm-12 col-md-5">
                <mau-form-input-select-static
                        :availableObjects="monthOptions"
                        :initialObject="initialMonthSelected"
                        :displayProperty="'text'"
                        :name="'monthSelect'"
                        :trackBy="'value'"
                        v-model="monthSelected"
                >
                </mau-form-input-select-static>
            </div>
            <div class="col-md-2">
                <button v-if="!isLoading" class="btn btn-excel" @click="createExcelFile">Excel</button>
                <button v-if="!isLoading" class="btn btn-primary" @click="getExpenses">Filtrar</button>
            </div>
        </div>
        <mau-spinner
                v-if="isLoading"
                :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div class="row mt-3">
            <table class="table">
               <thead>
               <tr>
                   <th>Codigo interno</th>
                   <th>Banco</th>
                   <th>Forma de pago</th>
                   <th>Status</th>
                   <th>Fecha de emision</th>
                   <th>Proveedor</th>
                   <th>Total</th>
                   <th>Iva</th>
                   <th>Isr</th>
                   <th>Codigo de la factura</th>
                   <th>ISR retenido</th>
                   <th>IVA retenido</th>
                   <th>Complementos</th>
                   <th>Fecha de pago</th>
               </tr>
               </thead>
                <tbody>
                    <tr v-for="expense in paidInvoiceExpensesInDates">
                        <td class="text-left">
                            {{expense['Codigo interno']}}
                        </td>
                        <td class="text-left">
                            {{expense['Banco']}}
                        </td>
                        <td>
                            {{expense['Forma de pago']}}
                        </td>
                        <td class="text-left">
                            {{expense['Estado de la factura']}}
                        </td>
                        <td>
                            {{expense['Fecha de emision']}}
                        </td>
                        <td class="text-left">
                            {{expense['Proveedor']}}
                        </td>
                        <td>
                            {{expense['Total']}}
                        </td>
                        <td>
                            {{expense['Iva']}}
                        </td>
                        <td>
                            {{expense['Isr']}}
                        </td>
                        <td>
                            {{expense['Codigo de la factura']}}
                        </td>
                        <td>
                            {{expense['ISR retenido']}}
                        </td>
                        <td>
                            {{expense['IVA retenido']}}
                        </td>
                        <td>
                            {{expense['Complementos']}}
                        </td>
                        <td>
                            {{expense['Fecha de pago']}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import {remote} from 'electron'
    import moment from 'moment'
    import xlsx from 'xlsx'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          paidInvoiceExpensesInDates: [],
          pendingInvoiceExpenses: [],
          provisionedInvoiceExpenses: [],
          canceledInvoiceExpenses: [],
          yearSelected: {value: '2020', text: '2020'},
          yearOptions: [
            {value: '2020', text: '2020'},
            {value: '2021', text: '2021'}
          ],
          monthSelected: {},
          initialMonthSelected: {},
          monthOptions: moment.months().map(function (monthName, i) {
            return {value: i + 1, text: monthName}
          })
        }
      },
      created () {
        this.initialMonthSelected = this.monthOptions[moment().month()]
        this.monthSelected = this.monthOptions[moment().month()]
        this.getExpenses()
      },
      methods: {
        createExcelFile: function () {
          let options = {
            title: 'Save file',
            defaultPath: 'my_file',
            buttonLabel: 'Save',
            filters: [
              {name: 'xlsx', extensions: ['xlsx']},
              {name: 'txt', extensions: ['txt']},
              {name: 'All Files', extensions: ['*']}
            ]
          }
          let workbook = xlsx.utils.book_new()
          let paidInvoiceExpensesInDatesWS = xlsx.utils.json_to_sheet(this.paidInvoiceExpensesInDates)
          xlsx.utils.book_append_sheet(workbook, paidInvoiceExpensesInDatesWS, 'Facturas en el mes de ' + this.monthSelected.text)
          let pendingInvoiceExpensesWS = xlsx.utils.json_to_sheet(this.pendingInvoiceExpenses)
          xlsx.utils.book_append_sheet(workbook, pendingInvoiceExpensesWS, 'Facturas pendientes')
          let provisionedInvoiceExpensesWS = xlsx.utils.json_to_sheet(this.provisionedInvoiceExpenses)
          xlsx.utils.book_append_sheet(workbook, provisionedInvoiceExpensesWS, 'Facturas provisionadas')
          let canceledInvoiceExpensesWS = xlsx.utils.json_to_sheet(this.canceledInvoiceExpenses)
          xlsx.utils.book_append_sheet(workbook, canceledInvoiceExpensesWS, 'Facturas canceladas')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        },
        mapExpenseInvoices: function (invoiceExpenses) {
          return invoiceExpenses.map(expense => {
            let total = 0
            expense.expense_items.forEach(expenseItem => {
              total += expenseItem.subtotal
            })
            if (expense.expense_invoice_payment_form.name) {
              console.log(expense)
            }
            return {
              'Proveedor': expense.supplier.name,
              'Fecha de pago': expense.date_paid,
              'Fecha de emision': expense.date_emitted,
              'Banco': expense.expense_money_source ? expense.expense_money_source.name : '',
              'Forma de pago': expense.expense_invoice_payment_form ? expense.expense_invoice_payment_form.name : '',
              'Estado de la factura': expense.expense_invoice_status.name,
              'Total': total,
              'Iva': expense.tax,
              'Isr': (total - expense.tax).toFixed(2),
              'Codigo interno': expense.internal_code,
              'Codigo de la factura': expense.invoice_code,
              'ISR retenido': expense.invoice_isr_retained,
              'IVA retenido': expense.invoice_tax_retained,
              'Complementos': expense.expense_invoice_complements.map(complement => { return (complement.delivered === 1 ? 'E' : 'P') + ' ' + complement.name }).join(', ')
            }
          })
        },
        getExpenses: function () {
          this.isLoading = true
          let year = this.yearSelected.value
          let month = this.monthSelected.value
          let startMomentDate = moment(year + '-' + month + '-01')
          let startDate = startMomentDate.format('YYYY-M-DD')
          let endDate = startMomentDate.add(1, 'M').format('YYYY-MM-DD')
          Promise.all([
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName,
              {paginate: false,
                filterStartDateTime: {date_paid: startDate},
                filterEndDateTime: {date_paid: endDate},
                filterExacts: {expense_type_id: 2}
              }),
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName,
              {paginate: false,
                filterExacts: {
                  expense_type_id: 2,
                  expense_invoice_status_id: 1
                }
              }),
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName,
              {paginate: false,
                filterExacts: {
                  expense_type_id: 2,
                  expense_invoice_status_id: 2
                }
              }),
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName,
              {paginate: false,
                filterExacts: {
                  expense_type_id: 2,
                  expense_invoice_status_id: 4
                }
              })
          ])
            .then(result => {
              let paidInvoiceExpensesInDates = result[0]
              paidInvoiceExpensesInDates.sort(function (a, b) {
                let aMomentDate = moment(a.date_paid, 'YYYY-MM-DD')
                let bMomentDate = moment(b.date_paid, 'YYYY-MM-DD')
                let aExpenseMoneySourceId = a.expense_money_source_id
                let bExpenseMoneySourceId = b.expense_money_source_id
                let aExpensePaymentFormId = a.expense_invoice_payment_form_id
                let bExpensePaymentFormId = b.expense_invoice_payment_form_id
                return aExpenseMoneySourceId > bExpenseMoneySourceId ? 1
                  : aExpenseMoneySourceId < bExpenseMoneySourceId ? -1
                    : aExpensePaymentFormId > bExpensePaymentFormId ? 1
                      : aExpensePaymentFormId < bExpensePaymentFormId ? -1
                        : (aMomentDate.isAfter(bMomentDate) ? 1
                          : aMomentDate.isBefore(bMomentDate) ? -1
                            : a.interal_code > b.internal_code ? 1
                              : a.internal_code < b.internal_code ? -1 : 0)
              })
              this.paidInvoiceExpensesInDates = this.mapExpenseInvoices(paidInvoiceExpensesInDates)
              this.pendingInvoiceExpenses = this.mapExpenseInvoices(result[1])
              this.provisionedInvoiceExpenses = this.mapExpenseInvoices(result[2])
              this.canceledInvoiceExpenses = this.mapExpenseInvoices(result[3])
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      },
      watch: {
      }
    }
</script>
