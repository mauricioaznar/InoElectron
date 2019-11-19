<template>
    <div>
        <mau-spinner v-if="inputAreaDisabled" :sizeType="'dataTable'">
        </mau-spinner>
        <div v-if="!inputAreaDisabled">
            <label>
                Empleados <span :class="!showEmployees ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="toggleShowEmployees"></span>
            </label>
            <div style="height: 200px" v-show="showEmployees">
                <mau-form-input-select-dynamic
                        class="mb-2"
                        :label="''"
                        :initialObjects="initialEmployeesSelected"
                        :displayProperty="'fullname'"
                        :endpointName="employeeEndpointName"
                        :multiselect="true"
                        v-model="employeesSelected"
                        :name="'Employees'"
                        :error="errors.has('Employees') ? errors.first('Employees') : ''"
                        @input="changePayrollPaymentsWithNewEmployees"
                >
                </mau-form-input-select-dynamic>
            </div>
            <div class="row mb-3">
                <div class="col-sm-6">
                    General
                </div>
                <div class="col-sm-2">
                    Ganancias
                </div>
                <div class="col-sm-1">
                    Bonos
                </div>
                <div class="col-sm-1">
                    Descuentos
                </div>
                <div class="col-sm-2">
                    Totales
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-2">
                    Nombre
                </div>
                <div class="col-sm-1">
                    Sueldo
                </div>
                <div class="col-sm-1">
                    Horas por trabajar
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Puntualidad</div>
                    <div>Faltas</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Horas normales</div>
                    <div>Horas extra</div>
                    <div>Horas triples</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Coeficiente normal</div>
                    <div>Coeficiente extras</div>
                    <div>Coeficiente triples</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Ganancias normal</div>
                    <div>Ganancias extras</div>
                    <div>Ganancias triples</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Bonos puntualidad</div>
                    <div>Bonos disponibilidad</div>
                    <div>Bonos otros</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Descuentos prestamos</div>
                    <div>Descuentos otros</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Total dinero</div>
                    <div>Total credito</div>
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Total</div>
                </div>
            </div>
            <div v-for="(payrollPayment, index) in payrollPayments"
                 :class="index + 1 !== payrollPayments.length ? 'mb-2' : ''"
                 class="row"
            >
                <div class="col-sm-2 p-0">
                    {{payrollPayment.employee.fullname}}
                </div>
                <div class="col-sm-1 p-0">
                    <mau-form-input-number
                        :name="'BaseSalary' + payrollPayment.employee_id"
                        :key="'BaseSalary' + payrollPayment.employee_id"
                        :label="''"
                        :initialValue="getInitialPayrollPayment(payrollPayment).base_salary"
                        v-model="payrollPayment.base_salary"

                        :error="errors.has('BaseSalary' + payrollPayment.employee_id) ? errors.first('BaseSalary' + payrollPayment.employee_id) : ''"
                        @input="refreshPayrollPayment(payrollPayment)"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0">
                    <mau-form-input-number
                            :name="'HoursShouldWork' + payrollPayment.employee_id"
                            :key="'HoursShouldWork' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).hours_should_work"
                            v-model="payrollPayment.hours_should_work"
                            :error="errors.has('HoursShouldWork' + payrollPayment.employee_id) ? errors.first('HoursShouldWork' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'TimeDelays' + payrollPayment.employee_id"
                            :key="'TimeDelayu' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).time_delays"
                            v-model="payrollPayment.time_delays"
                            :placeholder="''"
                            :error="errors.has('TimeDelays' + payrollPayment.employee_id) ? errors.first('TimeDelays' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'Absences' + payrollPayment.employee_id"
                            :key="'Absences' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).absences"
                            v-model="payrollPayment.absences"
                            :placeholder="''"
                            :error="errors.has('Absences' + payrollPayment.employee_id) ? errors.first('Absences' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'HoursNormalWorked' + payrollPayment.employee_id"
                            :key="'HoursNormalWorked' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).hours_normal_worked"
                            v-model="payrollPayment.hours_normal_worked"
                            :placeholder="''"
                            :error="errors.has('HoursNormalWorked' + payrollPayment.employee_id) ? errors.first('HoursNormalWorked' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'HoursExtraWorked' + payrollPayment.employee_id"
                            :key="'HoursExtraWorked' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).hours_extra_worked"
                            v-model="payrollPayment.hours_extra_worked"
                            :placeholder="''"
                            :error="errors.has('HoursExtraWorked' + payrollPayment.employee_id) ? errors.first('HoursExtraWorked' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'HoursTripleWorked' + payrollPayment.employee_id"
                            :key="'HoursTripleWorked' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).hours_triple_worked"
                            :placeholder="''"
                            v-model="payrollPayment.hours_triple_worked"
                            :error="errors.has('HoursTripleWorked' + payrollPayment.employee_id) ? errors.first('HoursTripleWorked' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.coeficient_normal)}}
                    </div>
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.coeficient_extra)}}
                    </div>
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.coeficient_triple)}}
                    </div>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.earnings_normal)}}
                    </div>
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.earnings_extra)}}
                    </div>
                    <div class="payroll-payment-cell text-right">
                        {{fixNumber(payrollPayment.earnings_triple)}}
                    </div>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'BonusPunctuality' + payrollPayment.employee_id"
                            :key="'BonusPunctuality' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_punctuality"
                            v-model="payrollPayment.bonus_punctuality"
                            :placeholder="''"
                            :error="errors.has('BonusPunctuality' + payrollPayment.employee_id) ? errors.first('BonusPunctuality' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'BonusAvailability' + payrollPayment.employee_id"
                            :key="'BonusAvailability' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_availability"
                            v-model="payrollPayment.bonus_availability"
                            :placeholder="''"
                            :error="errors.has('BonusAvailability' + payrollPayment.employee_id) ? errors.first('BonusAvailability' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'BonusOthers' + payrollPayment.employee_id"
                            :key="'BonusOthers' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_others"
                            v-model="payrollPayment.bonus_others"
                            :placeholder="''"
                            :error="errors.has('BonusOthers' + payrollPayment.employee_id) ? errors.first('BonusOthers' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'DiscountLoans' + payrollPayment.employee_id"
                            :key="'DiscountLoans' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).discount_loans"
                            v-model="payrollPayment.discount_loans"
                            :placeholder="''"
                            :error="errors.has('DiscountLoans' + payrollPayment.employee_id) ? errors.first('DiscountLoans' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'DiscountOthers' + payrollPayment.employee_id"
                            :key="'DiscountOthers' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).discount_others"
                            v-model="payrollPayment.discount_others"
                            :placeholder="''"
                            :error="errors.has('DiscountOthers' + payrollPayment.employee_id) ? errors.first('DiscountOthers' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-column">
                    <div class="payroll-payment-cell text-right">{{fixNumber(payrollPayment.total_cash)}}</div>
                    <div>
                        <mau-form-input-number
                            :name="'TotalCredit' + payrollPayment.employee_id"
                            :key="'TotalCredit' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).total_credit"
                            v-model="payrollPayment.total_credit"
                            :placeholder="''"
                            :error="errors.has('TotalCredit' + payrollPayment.employee_id) ? errors.first('TotalCredit' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="payroll-payment-cell text-right">{{fixNumber(payrollPayment.total)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    export default {
      inject: ['$validator'],
      data () {
        return {
          employeesSelected: [],
          employees: [],
          payrollPayments: [],
          initialPayrollPayments: [],
          initialEmployeesSelected: [],
          employeeEndpointName: EntityTypes.EMPLOYEE.apiName,
          total: 0,
          inputAreaDisabled: true,
          showEmployees: false
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        if (this.initialValues.length === 0) {
          Promise.all([
            GenericApiOperations.list(EntityTypes.EMPLOYEE.apiName, {paginate: false, filterExacts: { employee_status_id: 1 }})
          ])
            .then(result => {
              this.employees = result[0]
              this.initialEmployeesSelected = result[0]
            })
            .finally(() => {
              this.inputAreaDisabled = false
            })
        } else {
          this.inputAreaDisabled = false
          let employeesSelected = this.initialValues.map(function (payrollPayment) { return payrollPayment.employee })
          this.initialEmployeesSelected = cloneDeep(employeesSelected)
          this.employeesSelected = cloneDeep(employeesSelected)
          this.initialPayrollPayments = cloneDeep(this.initialValues)
        }
        this.refreshInput()
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        }
      },
      methods: {
        fixNumber: function (number) {
          return number && number > 0 ? number.toFixed(2) : number === 0 ? 0 : ''
        },
        updateExpensePaymentProperty: function (selectedObject, payrollPayment, propertyName) {
          let initialPayrollPayment = this.getInitialPayrollPayment(payrollPayment)
          payrollPayment[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialPayrollPayment && initialPayrollPayment[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          this.$emit('input', this.payrollPayments)
        },
        refreshPayrollPayment: function (payrollPayment) {
          payrollPayment.coeficient_normal = payrollPayment.base_salary / payrollPayment.hours_should_work
          payrollPayment.earnings_normal = payrollPayment.coeficient_normal * payrollPayment.hours_normal_worked
          payrollPayment.coeficient_extra = payrollPayment.base_salary / (payrollPayment.hours_should_work + (payrollPayment.hours_should_work / 7))
          payrollPayment.earnings_extra = payrollPayment.coeficient_extra * payrollPayment.hours_extra_worked
          payrollPayment.coeficient_triple = payrollPayment.coeficient_extra * 2
          payrollPayment.earnings_triple = payrollPayment.coeficient_triple * payrollPayment.hours_triple_worked
          payrollPayment.total_cash = payrollPayment.earnings_extra +
            payrollPayment.earnings_normal +
            payrollPayment.earnings_triple +
            payrollPayment.bonus_punctuality +
            payrollPayment.bonus_availability -
            payrollPayment.discount_loans -
            payrollPayment.discount_others
          payrollPayment.total = payrollPayment.total_cash - payrollPayment.total_credit
          this.refreshInput()
        },
        getInitialPayrollPayment: function (payrollPayment) {
          if (!payrollPayment.employee_id) {
            return ''
          }
          let initialPayrollPayment = this.initialPayrollPayments.find(initialPayrollPaymentObj => { return initialPayrollPaymentObj.employee_id === payrollPayment.employee_id })
          if (!initialPayrollPayment) {
            return ''
          }
          return initialPayrollPayment
        },
        toggleShowEmployees: function () {
          this.showEmployees = !this.showEmployees
        },
        changePayrollPaymentsWithNewEmployees: function () {
          console.log('PAYROLL PAYMENT CHANGE')
          let employeesSelected = this.employeesSelected
          let newPayrollPayments = []
          for (let i = 0; i < employeesSelected.length; i++) {
            let previousPayrollPayment = this.payrollPayments.find(payrollPayment => { return payrollPayment.employee_id === employeesSelected[i].id })
            previousPayrollPayment = !previousPayrollPayment && this.initialValues.length > 0
              ? this.initialValues.find(payrollPayment => { return payrollPayment.employee_id === employeesSelected[i].id }) : previousPayrollPayment
            let newPayrollPayment = !previousPayrollPayment ? {
              employee_id: employeesSelected[i].id,
              employee: employeesSelected[i],
              base_salary: employeesSelected[i].base_salary,
              hours_should_work: employeesSelected[i].hours_should_work,
              time_delays: 0,
              absences: 0,
              earnings_normal: 0,
              earnings_extra: 0,
              earnings_triple: 0,
              bonus_punctuality: employeesSelected[i].base_salary * 0.1,
              bonus_availability: 0,
              bonus_others: 0,
              discount_loans: 0,
              discount_others: 0,
              hours_normal_worked: employeesSelected[i].hours_should_work,
              hours_extra_worked: 0,
              hours_triple_worked: 0,
              total_cash: 0,
              total_credit: 0
            } : previousPayrollPayment
            newPayrollPayments.push(newPayrollPayment)
          }
          this.payrollPayments = cloneDeep(newPayrollPayments)
          this.initialPayrollPayments = cloneDeep(newPayrollPayments)
        }
      }
    }
</script>

<style lang="scss">
    .payroll-payment-cell {
        height: 38px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0px 12px;
    }
</style>
