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
                        :key="'Employees' + (branch && branch.id ? branch.id : 0)"
                        class="mb-2"
                        :label="''"
                        :initialObjects="initialEmployeesSelected"
                        :displayProperty="'fullname'"
                        :endpointName="employeeEndpointName"
                        :apiOperationOptions="employeeApiOperations"
                        :multiselect="true"
                        v-model="employeesSelected"
                        :name="'Employees'"
                        :error="errors.has('Employees') ? errors.first('Employees') : ''"
                        @input="changePayrollPaymentsWithNewEmployees"
                >
                </mau-form-input-select-dynamic>
            </div>
            <div class="row mb-3">
                <div class="col-sm-5">
                    General
                </div>
                <div class="col-sm-1">
                    Ganancias
                </div>
                <div class="col-sm-1">
                    Bonos
                </div>
                <div class="col-sm-1">
                    Descuentos
                </div>
                <div class="col-sm-3">
                    Totales
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-2">
                    Nombre
                </div>
                <div class="col-sm-1 d-flex flex-column">
                    <div>Sueldo</div>
                    <div>Horas por trabajar</div>
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
                    <div>Infonavit</div>
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
                <div class="col-sm-2 p-0 d-flex flex-column">
                    <p>{{payrollPayment.employee.fullname}}</p>
                    <div>
                        <label>Se requiere credito</label>
                        <mau-form-input-check-box
                                :initialValue="getInitialPayrollPayment(payrollPayment).credit_required"
                                v-model="payrollPayment.credit_required"
                                @input="refreshPayrollPayment(payrollPayment)"
                        >

                        </mau-form-input-check-box>
                        <label v-if="payrollPayment.credit_required === 1">Infonavit manual</label>
                        <mau-form-input-check-box
                                v-if="payrollPayment.credit_required === 1"
                                :initialValue="getInitialPayrollPayment(payrollPayment).is_infonavit_custom"
                                v-model="payrollPayment.is_infonavit_custom"
                                @input="refreshPayrollPayment(payrollPayment)"
                        >

                        </mau-form-input-check-box>
                    </div>
                    <div>
                        <label v-if="payrollPayment.credit_required === 1">Credito manual</label>
                        <mau-form-input-check-box
                                v-if="payrollPayment.credit_required === 1"
                                :initialValue="getInitialPayrollPayment(payrollPayment).is_credit_custom"
                                v-model="payrollPayment.is_credit_custom"
                                @input="refreshPayrollPayment(payrollPayment)"
                        >

                        </mau-form-input-check-box>
                    </div>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-column">
                    <mau-form-input-number
                        :name="'BaseSalary' + payrollPayment.employee_id"
                        :key="'BaseSalary' + payrollPayment.employee_id"
                        :label="''"
                        :initialValue="getInitialPayrollPayment(payrollPayment).base_salary"
                        v-model="payrollPayment.base_salary"
                        :type="'float'"
                        :error="errors.has('BaseSalary' + payrollPayment.employee_id) ? errors.first('BaseSalary' + payrollPayment.employee_id) : ''"
                        @input="refreshPayrollPayment(payrollPayment)"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'HoursShouldWork' + payrollPayment.employee_id"
                            :key="'HoursShouldWork' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).hours_should_work"
                            v-model="payrollPayment.hours_should_work"
                            :type="'float'"
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
                            :type="'float'"
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
                            :type="'float'"
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
                            :type="'float'"
                            v-model="payrollPayment.hours_triple_worked"
                            :error="errors.has('HoursTripleWorked' + payrollPayment.employee_id) ? errors.first('HoursTripleWorked' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'EarningsNormal' + payrollPayment.employee_id"
                            :key="'EarningsNormal' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).earnings_normal"
                            :placeholder="''"
                            :type="'float'"
                            v-model="payrollPayment.earnings_normal"
                            :error="errors.has('EarningsNormal' + payrollPayment.employee_id) ? errors.first('EarningsNormal' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'EarningsExtra' + payrollPayment.employee_id"
                            :key="'EarningsExtra' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).earnings_extra"
                            :placeholder="''"
                            :type="'float'"
                            v-model="payrollPayment.earnings_extra"
                            :error="errors.has('EarningsExtra' + payrollPayment.employee_id) ? errors.first('EarningsExtra' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'EarningsTriple' + payrollPayment.employee_id"
                            :key="'EarningsTriple' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).earnings_triple"
                            :placeholder="''"
                            :type="'float'"
                            v-model="payrollPayment.earnings_triple"
                            :error="errors.has('EarningsTriple' + payrollPayment.employee_id) ? errors.first('EarningsTriple' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'BonusPunctuality' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_punctuality"
                            v-model="payrollPayment.bonus_punctuality"
                            :placeholder="''"
                            :error="errors.has('BonusPunctuality' + payrollPayment.employee_id) ? errors.first('BonusPunctuality' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                            :type="'float'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'BonusAvailability' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_availability"
                            v-model="payrollPayment.bonus_availability"
                            :placeholder="''"
                            :error="errors.has('BonusAvailability' + payrollPayment.employee_id) ? errors.first('BonusAvailability' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                            :type="'float'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'BonusOthers' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).bonus_others"
                            v-model="payrollPayment.bonus_others"
                            :placeholder="''"
                            :error="errors.has('BonusOthers' + payrollPayment.employee_id) ? errors.first('BonusOthers' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                            :type="'float'"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-sm-column">
                    <mau-form-input-number
                            :name="'DiscountLoans' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).discount_loans"
                            v-model="payrollPayment.discount_loans"
                            :placeholder="''"
                            :error="errors.has('DiscountLoans' + payrollPayment.employee_id) ? errors.first('DiscountLoans' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                            :type="'float'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            :name="'DiscountOthers' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).discount_others"
                            v-model="payrollPayment.discount_others"
                            :placeholder="''"
                            :error="errors.has('DiscountOthers' + payrollPayment.employee_id) ? errors.first('DiscountOthers' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="'required'"
                            :type="'float'"
                    >
                    </mau-form-input-number>
                    <mau-form-input-number
                            v-if="payrollPayment.credit_required === 1"
                            :name="'Infonavit' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).infonavit"
                            v-model="payrollPayment.infonavit"
                            :placeholder="''"
                            :error="errors.has('Infonavit' + payrollPayment.employee_id) ? errors.first('Infonavit' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            :type="'float'"
                            v-validate="{
                                required: true
                            }"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-1 p-0 d-flex flex-column">
                    <div class="payroll-payment-cell text-right">{{fixNumber(payrollPayment.total_cash)}}</div>
                    <div>
                        <mau-form-input-number
                            v-if="payrollPayment.credit_required === 1"
                            :name="'TotalCredit' + payrollPayment.employee_id"
                            :label="''"
                            :initialValue="getInitialPayrollPayment(payrollPayment).total_credit"
                            v-model="payrollPayment.total_credit"
                            :placeholder="''"
                            :error="errors.has('TotalCredit' + payrollPayment.employee_id) ? errors.first('TotalCredit' + payrollPayment.employee_id) : ''"
                            @input="refreshPayrollPayment(payrollPayment)"
                            v-validate="{
                                required: true
                            }"
                            :type="'float'"
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
      computed: {
        isEditMode: function () {
          return this.initialValues.length !== 0
        },
        employeeApiOperations: function () {
          if (this.branch && this.branch.id) {
            return {filterExacts: {branch_id: this.branch.id}}
          }
          return {}
        }
      },
      created () {
        Promise.all([
          GenericApiOperations.list(EntityTypes.EMPLOYEE.apiName, {paginate: false, filterExacts: { employee_status_id: 1 }})
        ])
          .then(result => {
            this.employees = result[0]
            if (this.isEditMode) {
              let employeesSelected = this.initialValues.map(function (payrollPayment) { return payrollPayment.employee })
              this.initialEmployeesSelected = cloneDeep(employeesSelected)
              this.employeesSelected = cloneDeep(employeesSelected)
              this.initialPayrollPayments = cloneDeep(this.initialValues)
            }
          })
          .finally(() => {
            this.inputAreaDisabled = false
          })
        this.refreshInput()
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        creditUsed: {
          type: Number,
          required: true
        },
        infonavitUsed: {
          type: Number,
          required: true
        },
        branch: {
          type: Object,
          default: function () {
            return {}
          }
        }
      },
      methods: {
        fixNumber: function (number) {
          return number && number > 0 ? number.toFixed(2) : number === 0 ? 0 : ''
        },
        updatePayrollPaymentProperty: function (selectedObject, payrollPayment, propertyName) {
          let initialPayrollPayment = this.getInitialPayrollPayment(payrollPayment)
          payrollPayment[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialPayrollPayment && initialPayrollPayment[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          this.$emit('input', this.payrollPayments)
        },
        calculateTotals: function (payrollPayment, creditUsed, infonavitUsed) {
          let totalWithoutCreditApplied = payrollPayment.earnings_extra +
            payrollPayment.earnings_normal +
            payrollPayment.earnings_triple +
            payrollPayment.bonus_punctuality +
            payrollPayment.bonus_others +
            payrollPayment.bonus_availability -
            payrollPayment.discount_loans -
            payrollPayment.discount_others
          let totalInfonavit = payrollPayment.credit_required === 1 ? payrollPayment.infonavit : 0
          let totalCredit = payrollPayment.credit_required === 1 ? payrollPayment.total_credit : 0
          let totalCash = totalWithoutCreditApplied >= (totalCredit) ? totalWithoutCreditApplied - (totalCredit) : totalWithoutCreditApplied
          return {totalCredit, totalCash, totalInfonavit, totalWithoutCreditApplied}
        },
        refreshPayrollPayment: function (payrollPayment) {
          let {totalCredit, totalCash, totalInfonavit, totalWithoutCreditApplied} = this.calculateTotals(payrollPayment, this.creditUsed, this.infonavitUsed)
          this.getInitialPayrollPayment(payrollPayment).total_credit = totalCredit
          this.getInitialPayrollPayment(payrollPayment).infonavit = totalInfonavit
          payrollPayment.total_cash = totalCash
          payrollPayment.total_without_credit_applied = totalWithoutCreditApplied
          payrollPayment.total = totalCredit + totalCash
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
          let employeesSelected = this.employeesSelected
          let selectedPayrollPayments = []
          for (let i = 0; i < employeesSelected.length; i++) {
            let previousPayrollPayment = this.payrollPayments.find(payrollPayment => { return payrollPayment.employee_id === employeesSelected[i].id })
            let initialPayrollPayment = this.initialValues.length > 0
              ? this.initialValues.find(payrollPayment => { return payrollPayment.employee_id === employeesSelected[i].id }) : {}
            if (initialPayrollPayment.employee_id && initialPayrollPayment.employee_id > 0) {
              initialPayrollPayment.is_infonavit_custom = (initialPayrollPayment.infonavit !== this.infonavitUsed ? 1 : 0)
              initialPayrollPayment.is_credit_custom = (initialPayrollPayment.total_credit !== this.creditUsed ? 1 : 0)
              initialPayrollPayment.is_bonus_punctuality_custom = 1
            }
            let newPayrollPayment = {
              employee_id: employeesSelected[i].id,
              employee: employeesSelected[i],
              base_salary: employeesSelected[i].base_salary,
              payroll_payment_type_id: 0,
              hours_should_work: employeesSelected[i].hours_should_work,
              time_delays: 0,
              absences: 0,
              earnings_normal: 0,
              earnings_extra: 0,
              earnings_triple: 0,
              bonus_punctuality: employeesSelected[i].base_salary * 0.15,
              bonus_availability: 0,
              bonus_others: 0,
              discount_loans: 0,
              discount_others: 0,
              hours_normal_worked: employeesSelected[i].hours_should_work,
              hours_extra_worked: 0,
              hours_triple_worked: 0,
              infonavit: employeesSelected[i].infonavit > 0 && employeesSelected[i].credit_required === 1 ? employeesSelected[i].infonavit : (employeesSelected[i].credit_required === 1 ? this.infonavitUsed : 0),
              total_credit: employeesSelected[i].credit > 0 && employeesSelected[i].credit_required === 1 ? employeesSelected[i].credit : (employeesSelected[i].credit_required === 1 ? this.creditUsed : 0),
              total_cash: 0,
              credit_required: employeesSelected[i].credit_required,
              is_infonavit_custom: employeesSelected[i].infonavit > 0 ? 1 : 0,
              is_credit_custom: employeesSelected[i].credit > 0 ? 1 : 0,
              is_bonus_punctuality_custom: 0
            }
            let selectedPayrollPayment = previousPayrollPayment && previousPayrollPayment.employee_id > 0
              ? previousPayrollPayment
              : initialPayrollPayment && initialPayrollPayment.employee_id > 0
                ? initialPayrollPayment
                : newPayrollPayment.employee_id > 0
                  ? newPayrollPayment
                  : {}
            selectedPayrollPayments.push(selectedPayrollPayment)
          }
          this.payrollPayments = cloneDeep(selectedPayrollPayments)
          this.initialPayrollPayments = cloneDeep(selectedPayrollPayments)
        }
      },
      watch: {
        creditUsed: function () {
          this.payrollPayments.forEach((payrollPayment) => {
            this.refreshPayrollPayment(payrollPayment)
          })
        },
        infonavitUsed: function () {
          this.payrollPayments.forEach((payrollPayment) => {
            this.refreshPayrollPayment(payrollPayment)
          })
        },
        branch: function () {
          if (!this.isEditMode) {
            let branchId = this.branch.id
            let employeesSelected = this.employees.filter(employee => {
              return employee.branch_id === branchId
            })
            console.log(employeesSelected)
            this.employeesSelected = employeesSelected
            this.changePayrollPaymentsWithNewEmployees()
          }
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
