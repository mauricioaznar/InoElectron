<template>
    <div class="container">
        <div class="form-group">
            <mau-form-input-date
                :label="'Fecha'"
                v-model="dateSelected"
            ></mau-form-input-date>
        </div>
        <div class="form-group">
            <mau-form-input-select
                v-model="employeeSelected"
                :label="'Empleado seleccionado'"
                :display-property="'full_name'"
                :entity-type="employeeEntityType"
            ></mau-form-input-select>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" @click="searchEmployeeAttendances">Buscar</button>
        </div>
        <div>
            <table>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import MauFormInputDate from 'renderer/api/components/inputs/MauFormInputDate.vue'
    import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
    import EntityTypes from 'renderer/api/EntityTypes'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    export default {
      name: 'EmployeeAttendanceBlockList',
      data () {
        return {
          dateSelected: '',
          employeeSelected: {},
          employeeEntityType: EntityTypes.EMPLOYEE
        }
      },
      components: {
        MauFormInputDate,
        MauFormInputSelect
      },
      methods: {
        searchEmployeeAttendances: function () {
          let employeeId = this.employeeSelected[GlobalEntityIdentifier]
          let date = this.dateSelected
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {date_time: date}).then(response => {
            console.log(response)
          })
        }
      }
    }
</script>