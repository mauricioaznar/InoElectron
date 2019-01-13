<template>
                    <div class="container">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <mau-form-input-date-time
                                        :label="' de entrada'"
                                        v-model="dateTimeSelected"
                                        :initialValue="initialDateTime"
                                ></mau-form-input-date-time>
                            </div>
                            <div class="form-group col-md-6">
                                <mau-form-input-select
                                        v-model="employeeSelected"
                                        :label="'Empleado seleccionado'"
                                        :displayProperty="'full_name'"
                                        :entity-type="employeeEntityType"
                                ></mau-form-input-select>
                            </div>
                        </div>
                        <div>
                        <table v-if="tableDateTimesHeaders.length">
                            <tr>
                                <th class="p-2">Hora</th>
                                <th v-for="dateTransformed in tableDateTimesHeaders" class="py-2 px-4">
                                    {{dateTransformed}}
                                </th>
                            </tr>
                            <tr v-for="(rowValue, rowIndex) in (0, 24 * hourIntervals)">
                                <td class="box" v-if="((rowIndex + hourIntervals) % 2) === 0" :rowspan="hourIntervals">{{(rowIndex/ 2).toFixed(0)}}</td>
                                <td class="box" v-for="day in (0, amountOfDaysToShow)"></td>
                            </tr>
                        </table>
        </div>
    </div>
</template>

<script>
    import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
    import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
    import EntityTypes from 'renderer/api/EntityTypes'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import moment from 'moment'
    export default {
      name: 'BlockListEmployeeAttendance',
      data () {
        return {
          dateTimeSelected: '',
          initialDateTime: moment().minute(0).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
          employeeSelected: {},
          employeeEntityType: EntityTypes.EMPLOYEE,
          tableDateTimesHeaders: [],
          tableDateTimesData: [],
          amountOfDaysToShow: 10,
          hourIntervals: 2
        }
      },
      components: {
        MauFormInputDateTime,
        MauFormInputSelect
      },
      methods: {
        searchEmployeeAttendances: function () {
          let employeeId = this.employeeSelected[GlobalEntityIdentifier]
          let dateTimeSelectedMinusOneDay = moment(this.dateTimeSelected, 'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {entrance_date_time: dateTimeSelectedMinusOneDay}).then(response => {
            this.setTable(response)
          })
        },
        setTable: function (employeeAttendances) {
          this.tableDateTimesHeaders = []
          this.tableDateTimesData = []
          let iterableDate = moment(this.dateTimeSelected, 'YYYY-MM-DD').subtract(1, 'days')
          for (let day = 0; day < this.amountOfDaysToShow; day++) {
            this.tableDateTimesHeaders.push(moment(iterableDate).format('ddd D MMM '))
            iterableDate = moment(iterableDate, 'YYYY-MM-DD').add(1, 'days')
            this.tableDateTimesData[day] = []
            for (let hourInterval = 0; hourInterval < 24 * this.hourIntervals; hourInterval++) {
              this.tableDateTimesData[day][hourInterval] = ''
            }
          }
        }
      },
      computed: {

      },
      watch: {
        employeeSelected: function (employeeSelectedObj) {
          this.searchEmployeeAttendances()
        },
        dateTimeSelected: function (dateTimeSelected) {
          this.searchEmployeeAttendances()
        }
      }
    }
</script>

<style>
    .box {
        border: 1px solid black;
        height: 6px;
        width: 100px;
    }
    .box.exit {
        background-color: red;
    }
    .box.entrance {
        background-color: green;
    }
    .box.worked {
        background-color: blue;
    }
    .box.opaque {
        opacity: .5;
    }
    .row-space {
        height: 20px;
    }
    .short-delay-circle {
        background: yellow;
        width: 20px;
        height: 4px;
        border: 1px solid black;
    }
    .long-delay-circle {
        background: orangered;
        width: 20px;
        height: 4px;
        border: 1px solid black;
    }
    .box.total {
        border: 3px solid black;
        font-weight: bold;
    }
</style>