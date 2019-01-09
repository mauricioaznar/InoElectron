<template>
    <div class="container">
        <div class="form-group">
            <mau-form-input-date-time
                :label="' de entrada'"
                v-model="dateSelected"
            ></mau-form-input-date-time>
        </div>
        <div class="form-group">
            <mau-form-input-select
                v-model="employeeSelected"
                :label="'Empleado seleccionado'"
                :displayProperty="'full_name'"
                :entity-type="employeeEntityType"
            ></mau-form-input-select>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" @click="searchEmployeeAttendances">Buscar</button>
        </div>
        <div>
            <table>
                <tr>
                    <th class="p-2">Hora</th>
                    <th v-for="dateTransformed in tableDateTimesHeaders" class="p-4">
                        {{dateTransformed}}
                    </th>
                </tr>
                <tr v-for="(rowItem, rowIndex) in tableDateTimesColumns[0]">
                    <td class="box mau-text-center" v-if="((rowIndex + 6) % 6) === 0" rowspan="6">{{(rowIndex / 6).toFixed(0)}}</td>
                    <td v-for="(column, columnIndex) in tableDateTimesColumns" :class="'box ' + column[rowIndex]"></td>
                </tr>
                <tr>
                    <td></td>
                    <td v-for="coloredBlockCount in tableDateTimesColumnsColoredBlocks">{{Math.trunc(coloredBlockCount / 6) + ' ' + coloredBlockCount % 6}}</td>
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
    import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
    import moment from 'moment'
    export default {
      name: 'EmployeeAttendanceBlockList',
      data () {
        return {
          dateSelected: '',
          employeeSelected: {},
          employeeEntityType: EntityTypes.EMPLOYEE,
          tableDateTimesHeaders: [],
          tableDateTimesColumns: [],
          tableDateTimesColumnsColoredBlocks: []
        }
      },
      components: {
        MauFormInputDateTime,
        MauFormInputSelect
      },
      methods: {
        searchEmployeeAttendances: function () {
          let employeeId = this.employeeSelected[GlobalEntityIdentifier]
          let date = moment(this.dateSelected, 'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {date_time: date}).then(response => {
            this.setTable(response)
          })
        },
        setTable: function (employeeAttendances) {
          this.tableDateTimesHeaders = []
          this.tableDateTimesColumns = []
          let iterableDateTime = moment(this.dateSelected, 'YYYY-MM-DD').subtract(1, 'days')
          for (let i = 0; i < 9; i++) {
            this.tableDateTimesHeaders.push(DisplayFunctions.getDate(iterableDateTime))
            let tableDateTimeColumn = this.setTableDateTimeColumn(employeeAttendances, iterableDateTime)
            this.tableDateTimesColumns.push(tableDateTimeColumn)
            this.tableDateTimesColumnsColoredBlocks.push(this.countColumnColoredBlocks(tableDateTimeColumn))
            iterableDateTime = moment(iterableDateTime, 'YYYY-MM-DD').add(1, 'days')
          }
        },
        setTableDateTimeColumn: function (employeeAttendances, currentDate) {
          let tableDateTimeColumn = []
          let employeeIsWorking = false
          for (let i = 0; i < 24; i++) {
            let hour = i < 10 ? '0' + i : i
            for (let j = 0; j < 6; j++) {
              let minute = j + '0'
              let startDateTime = moment(currentDate.format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':' + '00', 'YYYY-MM-DD HH:mm:ss')
              let endDateTime = startDateTime
              let filteredEmployeeAttendances = employeeAttendances.filter(employeeAttendanceObj => {
                return moment(employeeAttendanceObj.date_time, 'YYYY-MM-DD HH:mm:ss').isBetween(startDateTime.format('YYYY-MM-DD HH:mm:ss'), endDateTime.add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'), null, '[)')
              })
              if (filteredEmployeeAttendances[0]) {
                if (filteredEmployeeAttendances[0].employee_attendance_type_id === 1) {
                  employeeIsWorking = true
                  tableDateTimeColumn.push('E')
                } else {
                  employeeIsWorking = false
                  tableDateTimeColumn.push('S')
                }
              } else {
                if (employeeIsWorking) {
                  tableDateTimeColumn.push('W')
                } else {
                  tableDateTimeColumn.push('')
                }
              }
            }
          }
          return tableDateTimeColumn
        },
        countColumnColoredBlocks: function (tableDateTimeColumn) {
          let coloredBlocks = 0
          tableDateTimeColumn.forEach(tableDateTimeColumnBlock => {
            if (tableDateTimeColumnBlock !== '') {
              coloredBlocks++
            }
          })
          return coloredBlocks
        }
      }
    }
</script>

<style>
    .box {
        border: 1px solid black;
        height: 9px;
    }
    .box.S {
        background-color: red;
    }
    .box.E {
        background-color: green;
    }
    .box.W {
        background-color: blue;
    }
</style>