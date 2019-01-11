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
                <tr v-for="(rowItem, rowIndex) in tableDateTimesColumns[0]">
                    <td class="box mau-text-center" v-if="((rowIndex + 2) % 2) === 0" rowspan="2">{{(rowIndex / 2).toFixed(0)}}</td>
                    <td v-for="(column, columnIndex) in tableDateTimesColumns" :class="'box ' + column[rowIndex]">
                        <div v-if="column[rowIndex].includes('short-delay')" class="short-delay-circle"></div>
                        <div v-if="column[rowIndex].includes('long-delay')" class="long-delay-circle"></div>
                    </td>
                </tr>
                <tr>
                    <td class="box mau-text-center">Totales</td>
                    <td class="box p-2 mau-text-center" v-for="coloredBlockCount in tableDateTimesColumnsColoredBlocks">{{Math.trunc(coloredBlockCount / 2)}} <sup>{{coloredBlockCount % 2}}</sup>&frasl;<sub>2</sub></td>
                </tr>
                <tr class="row-space"></tr>
                <tr>
                    <td v-for="(column, columnIndex) in tableDateTimesColumns">
                    </td>
                    <td class="box total mau-text-center">{{Math.trunc(totalDateTimesColumnsColoredBlocks / 2)}} <sup>{{totalDateTimesColumnsColoredBlocks % 2}}</sup>&frasl;<sub>2</sub></td>
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
          let dateTimeSelectedMinusOneDay = moment(this.dateTimeSelected, 'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
          ApiOperations.getWithFilterExactWithoutPaginationWithStartDate(EntityTypes.EMPLOYEE_ATTENDANCE, {employee_id: employeeId}, {entrance_date_time: dateTimeSelectedMinusOneDay}).then(response => {
            this.setTable(response)
          })
        },
        setTable: function (employeeAttendances) {
          this.tableDateTimesHeaders = []
          this.tableDateTimesColumns = []
          this.tableDateTimesColumnsColoredBlocks = []
          let iterableDate = moment(this.dateTimeSelected, 'YYYY-MM-DD').subtract(1, 'days')
          for (let i = 0; i < 10; i++) {
            this.tableDateTimesHeaders.push(moment(iterableDate).format('ddd D MMM '))
            let tableDateTimeColumn = this.setTableDateTimeColumn(employeeAttendances, iterableDate)
            this.tableDateTimesColumns.push(tableDateTimeColumn)
            this.tableDateTimesColumnsColoredBlocks.push(this.countColumnColoredBlocks(tableDateTimeColumn))
            iterableDate = moment(iterableDate, 'YYYY-MM-DD').add(1, 'days')
          }
        },
        setTableDateTimeColumn: function (employeeAttendances, currentDate) {
          let tableDateTimeColumn = []
          for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 2; j++) {
              tableDateTimeColumn.push('')
            }
          }
          for (let i = 0; i < 24; i++) {
            let hour = i < 10 ? '0' + i : i
            for (let j = 0; j < 2; j++) {
              let minute = (j === 0) ? '00' : j * 30
              let rowIndex = (i * 2) + j
              let iterableDateTime = moment(currentDate.format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':' + '00', 'YYYY-MM-DD HH:mm:ss')
              let foundEmployeeAttendanceObj = employeeAttendances.find(employeeAttendanceObj => {
                return iterableDateTime.isBetween(moment(employeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD HH:mm:ss'), moment(employeeAttendanceObj.exit_date_time, 'YYYY-MM-DD HH:mm:ss'), null, '[)')
              })
              if (foundEmployeeAttendanceObj) {
                let foundEmployeeAttendanceObjEntranceDateTime = moment(foundEmployeeAttendanceObj.entrance_date_time, 'YYYY-MM-DD HH:mm:ss')
                let foundEmployeeAttendanceObjExitDateTime = moment(foundEmployeeAttendanceObj.exit_date_time, 'YYYY-MM-DD HH:mm:ss')
                if (iterableDateTime.isBetween(foundEmployeeAttendanceObjEntranceDateTime.format('YYYY-MM-DD HH:mm:ss'),
                  foundEmployeeAttendanceObjEntranceDateTime.add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'), null, '[)')) {
                  tableDateTimeColumn[rowIndex] = 'entrance'
                  if (iterableDateTime.add(15, 'minutes').isBetween(foundEmployeeAttendanceObjEntranceDateTime.format('YYYY-MM-DD HH:mm:ss'),
                    foundEmployeeAttendanceObjEntranceDateTime.add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'), null, '[)')) {
                    tableDateTimeColumn[rowIndex] += ' long-delay'
                  } else if (iterableDateTime.add(6, 'minutes').isBetween(foundEmployeeAttendanceObjEntranceDateTime.format('YYYY-MM-DD HH:mm:ss'),
                    foundEmployeeAttendanceObjEntranceDateTime.add(24, 'minutes').format('YYYY-MM-DD HH:mm:ss'), null, '[)')) {
                    tableDateTimeColumn[rowIndex] += ' short-delay'
                  }
                } else if (iterableDateTime.isBetween(foundEmployeeAttendanceObjExitDateTime.subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                  foundEmployeeAttendanceObjExitDateTime.format('YYYY-MM-DD HH:mm:ss'), null, '[]')) {
                  tableDateTimeColumn[rowIndex] = 'exit'
                } else {
                  tableDateTimeColumn[rowIndex] = 'worked'
                }
                if (!iterableDateTime.isBetween(this.dateTimeSelected, moment(this.dateTimeSelected, 'YYYY-MM-DD HH:mm:ss').add(7, 'days').format('YYYY-MM-DD HH:mm:ss'), null, '[)')) {
                  tableDateTimeColumn[rowIndex] += ' opaque'
                }
              }
            }
          }
          return tableDateTimeColumn
        },
        countColumnColoredBlocks: function (tableDateTimeColumn) {
          let coloredBlocks = 0
          tableDateTimeColumn.forEach(tableDateTimeColumnBlock => {
            if (tableDateTimeColumnBlock !== '' && !tableDateTimeColumnBlock.includes('opaque')) {
              coloredBlocks++
            }
          })
          return coloredBlocks
        }
      },
      computed: {
        totalDateTimesColumnsColoredBlocks: function () {
          return this.tableDateTimesColumnsColoredBlocks.reduce(function (a, b) {
            return a + b
          }, 0)
        }
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