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
        <div class="d-flex justify-content-end mb-4">
            <button class="btn btn-primary" @click="searchEmployeeAttendances">Buscar</button>
        </div>
        <div>
            <table v-if="tableDateTimesHeaders.length">
                <tr>
                    <th class="p-2">Hora</th>
                    <th v-for="dateTransformed in tableDateTimesHeaders" class="p-4">
                        {{dateTransformed}}
                    </th>
                </tr>
                <tr v-for="(rowItem, rowIndex) in tableDateTimesColumns[0]">
                    <td class="box mau-text-center" v-if="((rowIndex + 4) % 4) === 0" rowspan="4">{{(rowIndex / 4).toFixed(0)}}</td>
                    <td v-for="(column, columnIndex) in tableDateTimesColumns" :class="'box ' + column[rowIndex]"></td>
                </tr>
                <tr>
                    <td class="box mau-text-center">Totales</td>
                    <td class="box p-2 mau-text-center" v-for="coloredBlockCount in tableDateTimesColumnsColoredBlocks">{{Math.trunc(coloredBlockCount / 4)}} <sup>{{coloredBlockCount % 4}}</sup>&frasl;<sub>4</sub></td>
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
      name: 'BlockListEmployeeAttendance',
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
          let dateSelectedMinusOneDay = moment(this.dateSelected, 'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {entrance_date_time: dateSelectedMinusOneDay}).then(response => {
            this.setTable(response)
          })
        },
        setTable: function (employeeAttendances) {
          this.tableDateTimesHeaders = []
          this.tableDateTimesColumns = []
          this.tableDateTimesColumnsColoredBlocks = []
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
          for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 4; j++) {
              tableDateTimeColumn.push('')
            }
          }
          for (let i = 0; i < 24; i++) {
            let hour = i < 10 ? '0' + i : i
            for (let j = 0; j < 4; j++) {
              let minute = (j === 0) ? '00' : j * 15
              let index = (i * 4) + j
              let startDateTime = moment(currentDate.format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':' + '00', 'YYYY-MM-DD HH:mm:ss')
              let foundEmployeeAttendanceObj = employeeAttendances.find(employeeAttendanceObj => {
                return startDateTime.isBetween(moment(employeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD HH:mm:ss'), moment(employeeAttendanceObj.exit_date_time, 'YYYY-MM-DD HH:mm:ss'), null, '[)')
              })
              if (foundEmployeeAttendanceObj) {
                let foundEmployeeAttendanceObjEntranceDateTime = moment(foundEmployeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD HH:mm:ss')
                let foundEmployeeAttendanceObjExitDateTime = moment(foundEmployeeAttendanceObj.exit_date_time, 'YYYY-MM-DD HH:mm:ss')
                if (startDateTime.isBetween(foundEmployeeAttendanceObjEntranceDateTime.format('YYYY-MM-DD HH:mm:ss'), foundEmployeeAttendanceObjEntranceDateTime.add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'), null, '[)')) {
                  tableDateTimeColumn[index] = 'E'
                } else if (startDateTime.isBetween(foundEmployeeAttendanceObjExitDateTime.subtract(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'), foundEmployeeAttendanceObjExitDateTime.format('YYYY-MM-DD HH:mm:ss'), null, '[]')) {
                  tableDateTimeColumn[index] = 'S'
                } else {
                  tableDateTimeColumn[index] = 'W'
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