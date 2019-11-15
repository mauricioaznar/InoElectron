<template>
    <div>
        <mau-spinner v-if="inputAreaDisabled" :sizeType="'dataTable'">
        </mau-spinner>
        <div v-if="!inputAreaDisabled">
            <label>
                Empleados <span :class="!showEmployees ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="toggleShowEmployees"></span>
            </label>
            <mau-form-input-select-dynamic
                    v-show="showEmployees"
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
            <div class="row mb-3">
                <div class="col-sm-3">
                    <div class="col-sm-4 font-weight-bold">
                        Nombre
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="col-sm-4">
                        Sueldo
                    </div>
                </div>
            </div>
            <div v-for="(payrollPayment, index) in payrollPayments"
                 :class="index + 1 !== payrollPayments.length ? 'mb-2' : ''"
                 class="row"
            >
                <div class="col-sm-3">
                    {{payrollPayment.employee.fullname}}
                </div>
                <div class="col-sm-3">
                    <mau-form-input-number
                        :name="'BaseSalary' + payrollPayment.employee_id"
                        :key="'BaseSalary' + payrollPayment.employee_id"
                        :label="''"
                        :initialValue="getInitialPayrollPayment(payrollPayment).base_salary"
                        v-model="payrollPayment.base_salary"
                        :error="errors.has('BaseSalary' + payrollPayment.employee_id) ? errors.first('BaseSalary' + payrollPayment.employee_id) : ''"
                        @input="refreshInput"
                    >
                    </mau-form-input-number>
                </div>
                <div class="col-sm-3">
                    <mau-form-input-number
                        :name="'HoursShouldWork' + payrollPayment.employee_id"
                        :key="'HoursShouldWork' + payrollPayment.employee_id"
                        :label="''"
                        :initialValue="getInitialPayrollPayment(payrollPayment).hours_should_work"
                        v-model="payrollPayment.hours_should_work"
                        :error="errors.has('HoursShouldWork' + payrollPayment.employee_id) ? errors.first('HoursShouldWork' + payrollPayment.employee_id) : ''"
                        @input="refreshInput"
                    >
                    </mau-form-input-number>
                </div>
            </div>
            <div>
                <label>Total</label>
                <p>{{total}}</p>
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
              let payrollPayments = result[0].map(function (employee) {
                return {
                  employee_id: employee.id,
                  employee: employee,
                  hours_should_work: employee.hours_should_work,
                  base_salary: employee.base_salary
                }
              })
              this.payrollPayments = cloneDeep(payrollPayments)
              this.initialPayrollPayments = cloneDeep(payrollPayments)
            })
            .finally(() => {
              this.inputAreaDisabled = false
            })
        } else {
          this.inputAreaDisabled = false
          this.initialPayrollPayments = cloneDeep(this.initialValues)
          this.payrollPayments = cloneDeep(this.initialValues)
          let employeesSelected = this.initialPayrollPayments.map(function (payrollPayment) { return payrollPayment.employee })
          this.initialEmployeesSelected = cloneDeep(employeesSelected)
          this.employeesSelected = cloneDeep(employeesSelected)
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
        updateExpensePaymentProperty: function (selectedObject, payrollPayment, propertyName) {
          let initialPayrollPayment = this.getInitialPayrollPayment(payrollPayment)
          payrollPayment[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialPayrollPayment && initialPayrollPayment[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          this.$emit('input', this.payrollPayments)
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
            console.log(previousPayrollPayment)
            let newPayrollPayment = {
              employee_id: employeesSelected[i].id,
              employee: employeesSelected[i],
              base_salary: employeesSelected[i].base_salary,
              hours_should_work: employeesSelected[i].hours_should_work
            }
            newPayrollPayments.push(previousPayrollPayment || newPayrollPayment)
          }
          this.payrollPayments = cloneDeep(newPayrollPayments)
          this.initialPayrollPayments = cloneDeep(newPayrollPayments)
        }
      }
    }
</script>

<style>
</style>
