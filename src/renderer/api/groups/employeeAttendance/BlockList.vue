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
                                        :onChange="getEmployeeAttendances"
                                        :ref="'employee_select'"
                                ></mau-form-input-select>
                            </div>
                        </div>
                        <div>
                        <table v-if="tableDateTimesHeaders.length">
                            <tr>
                                <th class="p-2">Hora</th>
                                <th v-for="dateHeaderObj in tableDateTimesHeaders" class="py-2 px-4">
                                    {{dateHeaderObj.formattedDate}}
                                </th>
                            </tr>
                            <tr v-if="tableDateTimesData.length > 0" v-for="(rowValue, hourIntervalIndex) in (0, 24 * hourIntervals)">
                                <td class="box mau-text-center" v-if="((hourIntervalIndex + hourIntervals) % hourIntervals) === 0" :rowspan="hourIntervals">{{(hourIntervalIndex/ hourIntervals).toFixed(0)}}</td>
                                <td class="box" v-for="(dayValue, dayIndex) in (0, amountOfDaysToShow)">
                                    <div class="d-flex w-100 h-100">
                                        <span class="flex-grow" :class="className" v-if="className !== ''" v-for="className in tableDateTimesData[dayIndex][hourIntervalIndex].split(' ')"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 footer-box">Horas trabajadas</td>
                                <td v-for="dateFooterObj in tableDateTimesFooter" class="py-2 px-4 footer-box">
                                    {{Math.floor(dateFooterObj.intervalsWorked / hourIntervals)}} <sup>{{dateFooterObj.intervalsWorked % hourIntervals }}</sup>&frasl;<sub>{{hourIntervals}}</sub>
                                </td>
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
          tableDateTimesFooter: [],
          amountOfDaysToShow: 10,
          hourIntervals: 2
        }
      },
      components: {
        MauFormInputDateTime,
        MauFormInputSelect
      },
      methods: {
        getEmployeeAttendances: function () {
          let employeeId = this.employeeSelected[GlobalEntityIdentifier]
          let dateTimeSelectedMinusOneDay = moment(this.dateTimeSelected, 'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {entrance_date_time: dateTimeSelectedMinusOneDay}).then(response => {
            this.setTable(response)
          })
        },
        setTable: function (employeeAttendances) {
          this.tableDateTimesHeaders = []
          this.tableDateTimesData = []
          this.tableDateTimesFooter = []
          let iterableDate = moment(this.dateTimeSelected, 'YYYY-MM-DD').subtract(1, 'days')
          for (let day = 0; day < this.amountOfDaysToShow; day++) {
            this.tableDateTimesHeaders.push({date: moment(iterableDate).format('YYYY-MM-DD'), formattedDate: moment(iterableDate).format('ddd D MMM ')})
            this.tableDateTimesFooter.push({intervalsWorked: 0})
            iterableDate = moment(iterableDate, 'YYYY-MM-DD').add(1, 'days')
            this.tableDateTimesData[day] = []
            for (let hourInterval = 0; hourInterval < 24 * this.hourIntervals; hourInterval++) {
              this.tableDateTimesData[day][hourInterval] = ''
            }
          }
          employeeAttendances.forEach((employeeAttendanceObj, eAIndex) => {
            let entranceDateTime = moment(employeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD HH:mm:ss')
            let entranceDate = moment(employeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD')
            let exitDateTime = moment(employeeAttendanceObj.exit_date_time, 'YYYY-MM-DD HH:mm:ss')
            let exitDate = moment(employeeAttendanceObj.exit_date_time, 'YYYY-MM-DD')
            this.tableDateTimesHeaders.forEach((dateHeaderObj, dayIndex) => {
              let iteratedDate = moment(dateHeaderObj.date, 'YYYY-MM-DD')
              if (iteratedDate.isSame(entranceDate) || iteratedDate.isSame(exitDate)) {
                for (let hourInterval = 0; hourInterval < 24 * this.hourIntervals; hourInterval++) {
                  let hour = Math.floor(hourInterval / this.hourIntervals)
                  hour = hour < 10 ? '0' + hour : hour.toString()
                  let minutes = (hourInterval / this.hourIntervals) % this.hourIntervals === 0 ? '00' : '30'
                  let iteratedStartInterval = moment(dateHeaderObj.date + ' ' + hour + ':' + minutes + ':' + '00', 'YYYY-MM-DD HH:mm:ss')
                  let iteratedEndInterval = moment(iteratedStartInterval.format(), 'YYYY-MM-DD HH:mm:ss').add(30, 'minutes')
                  if (entranceDateTime.isBetween(iteratedStartInterval, iteratedEndInterval, null, '[)')) {
                    this.tableDateTimesData[dayIndex][hourInterval] += ' entrance'
                    this.tableDateTimesFooter[dayIndex].intervalsWorked = this.tableDateTimesFooter[dayIndex].intervalsWorked + 1
                  } else if (exitDateTime.isBetween(iteratedStartInterval, iteratedEndInterval, null, '[)')) {
                    this.tableDateTimesData[dayIndex][hourInterval] += ' exit'
                  } else if (iteratedStartInterval.isBetween(entranceDateTime, exitDateTime, null, '[)')) {
                    this.tableDateTimesData[dayIndex][hourInterval] += 'worked'
                    this.tableDateTimesFooter[dayIndex].intervalsWorked = this.tableDateTimesFooter[dayIndex].intervalsWorked + 1
                  }
                }
              }
            })
          })
        },
        getBoxClass: function (dayIndex, hourIntervalIndex) {
          if (this.tableDateTimesData.length > 0 && this.tableDateTimesData[dayIndex].length > 0) {
            return this.tableDateTimesData[dayIndex][hourIntervalIndex]
          }
          return ''
        }
      },
      computed: {

      },
      watch: {
        employeeSelected: function (employeeSelected) {
          this.getEmployeeAttendances()
        },
        dateTimeSelected: function (dateTimeSelected) {
          this.getEmployeeAttendances()
        }
      }
    }
</script>

<style>
    .box {
        border: 1px solid black;
        height: 6px;
        width: 100px;
        padding: 0;
    }
    .box .exit {
        background-color: red;
    }
    .box .entrance {
        background-color: green;
    }
    .box .worked {
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
    .footer-box {
        border-bottom: 3px solid black;
        font-weight: bold;
    }
    .flex-grow {
        flex: 1 0 auto;
    }
</style>
