<template>
    <div class="container">
        <mau-spinner
                v-if="isLoading"
                :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div class="jumbotron" v-for="branch in branches">

            <div class="row">
                <h1>
                    {{branch.name + ' solo en sucursal'}}
                </h1>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    Equipo
                </div>
                <div class="col-sm-1">
                    Total en compras
                </div>
                <div class="col-sm-1">
                    Total en ajustes +
                </div>
                <div class="col-sm-1">
                    Total en ajustes -
                </div>
                <div class="col-sm-1">
                    Total en retiros
                </div>
                <div class="col-sm-1">
                    Total
                </div>
                <div class="col-sm-1">
                    Total en pedidos
                </div>
                <div class="col-sm-1">
                    Total minimos necesitados
                </div>
                <div class="col-sm-1">
                    Total maximos necesitados
                </div>
            </div>
            <div class="row" v-for="equipment in branch.equipments.filter(equipment => { return equipment.isBranchRequired && !equipment.isMachineRequired })">
                <div class="col-sm-2">
                    {{equipment.description}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPurchases}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPositiveAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInNegativeAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInWithdrawal}}
                </div>
                <div class="col-sm-1"
                     :class="getTotalBackgroundColor(equipment)"
                >
                    {{equipment.total}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInRequests}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMinNeeded}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMaxNeeded}}
                </div>
            </div>

            <div class="row">
                <h1>
                    {{branch.name + ' solo en maquinas'}}
                </h1>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    Equipo
                </div>
                <div class="col-sm-1">
                    Total en compras
                </div>
                <div class="col-sm-1">
                    Total en ajustes +
                </div>
                <div class="col-sm-1">
                    Total en ajustes -
                </div>
                <div class="col-sm-1">
                    Total en retiros
                </div>
                <div class="col-sm-1">
                    Total
                </div>
                <div class="col-sm-1">
                    Total en pedidos
                </div>
                <div class="col-sm-1">
                    Total minimos necesitados
                </div>
                <div class="col-sm-1">
                    Total maximos necesitados
                </div>
            </div>
            <template v-for="equipment in branch.equipments.filter(equipment => { return equipment.isMachineRequired })">
                <div class="row">
                    <div class="col-sm-2">
                        {{equipment.description}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalInPurchases}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalInPositiveAdjustments}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalInNegativeAdjustments}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalInWithdrawal}}
                    </div>
                    <div class="col-sm-1"
                         :class="getTotalBackgroundColor(equipment)"
                    >
                        {{equipment.total}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalInRequests}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalMinNeeded}}
                    </div>
                    <div class="col-sm-1">
                        {{equipment.totalMaxNeeded}}
                    </div>
                </div>
                <div class="row mb-1" v-for="machine in equipment.machines">
                    <div class="col-sm-1">

                    </div>
                    <div class="col-sm-2">
                        {{machine.name}}
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-1">
                        {{machine.minNeeded}}
                    </div>
                    <div class="col-sm-1">
                        {{machine.maxNeeded}}
                    </div>
                </div>
            </template>

            <div class="row">
                <h1>
                    {{branch.name + ' en maquinas y en sucursal'}}
                </h1>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    Equipo
                </div>
                <div class="col-sm-1">
                    Total en compras
                </div>
                <div class="col-sm-1">
                    Total en ajustes +
                </div>
                <div class="col-sm-1">
                    Total en ajustes -
                </div>
                <div class="col-sm-1">
                    Total en retiros
                </div>
                <div class="col-sm-1">
                    Total
                </div>
                <div class="col-sm-1">
                    Total en pedidos
                </div>
                <div class="col-sm-1">
                    Total minimos necesitados
                </div>
                <div class="col-sm-1">
                    Total maximos necesitados
                </div>
            </div>
            <div class="row" v-for="equipment in branch.equipments.filter(equipment => { return equipment.isMachineRequired && equipment.isBranchRequired })">
                <div class="col-sm-2">
                    {{equipment.description}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPurchases}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPositiveAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInNegativeAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInWithdrawal}}
                </div>
                <div class="col-sm-1"
                     :class="getTotalBackgroundColor(equipment)"
                >
                    {{equipment.total}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInRequests}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMinNeeded}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMaxNeeded}}
                </div>
            </div>

            <div class="row">
                <h1>
                    {{branch.name + ' en transaciones pero no requerida'}}
                </h1>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    Equipo
                </div>
                <div class="col-sm-1">
                    Total en compras
                </div>
                <div class="col-sm-1">
                    Total en ajustes +
                </div>
                <div class="col-sm-1">
                    Total en ajustes -
                </div>
                <div class="col-sm-1">
                    Total en retiros
                </div>
                <div class="col-sm-1">
                    Total
                </div>
                <div class="col-sm-1">
                    Total en pedidos
                </div>
                <div class="col-sm-1">
                    Total minimos necesitados
                </div>
                <div class="col-sm-1">
                    Total maximos necesitados
                </div>
            </div>
            <div class="row" v-for="equipment in branch.equipments.filter(equipment => { return !equipment.isBranchRequired && !equipment.isMachineRequired && equipment.inTransactions})">
                <div class="col-sm-2">
                    {{equipment.description}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPurchases}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPositiveAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInNegativeAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInWithdrawal}}
                </div>
                <div class="col-sm-1"
                     :class="getTotalBackgroundColor(equipment)"
                >
                    {{equipment.total}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInRequests}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMinNeeded}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMaxNeeded}}
                </div>
            </div>

            <div class="row">
                <h1>
                    {{branch.name + ' no especificada'}}
                </h1>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    Equipo
                </div>
                <div class="col-sm-1">
                    Total en compras
                </div>
                <div class="col-sm-1">
                    Total en ajustes +
                </div>
                <div class="col-sm-1">
                    Total en ajustes -
                </div>
                <div class="col-sm-1">
                    Total en retiros
                </div>
                <div class="col-sm-1">
                    Total
                </div>
                <div class="col-sm-1">
                    Total en pedidos
                </div>
                <div class="col-sm-1">
                    Total minimos necesitados
                </div>
                <div class="col-sm-1">
                    Total maximos necesitados
                </div>
            </div>
            <div class="row" v-for="equipment in branch.equipments.filter(equipment => { return !equipment.isBranchRequired && !equipment.isMachineRequired && !equipment.inTransactions})">
                <div class="col-sm-2">
                    {{equipment.description}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPurchases}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInPositiveAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInNegativeAdjustments}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInWithdrawal}}
                </div>
                <div class="col-sm-1"
                     :class="getTotalBackgroundColor(equipment)"
                >
                    {{equipment.total}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalInRequests}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMinNeeded}}
                </div>
                <div class="col-sm-1">
                    {{equipment.totalMaxNeeded}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          branches: [],
          equipments: []
        }
      },
      created () {
        this.getEquipmentTransactions()
      },
      methods: {
        getEquipmentTransactions: function () {
          Promise.all([
            GenericApiOperations.list(EntityTypes.EQUIPMENT.apiName,
              {paginate: false}),
            GenericApiOperations.list(EntityTypes.BRANCH.apiName,
              {paginate: false}),
            GenericApiOperations.list(EntityTypes.MACHINE.apiName,
              {paginate: false}),
            GenericApiOperations.list(EntityTypes.EQUIPMENT_TRANSACTION.apiName,
              {paginate: false})
          ]).then(result => {
            let equipments = result[0].map(equipment => {
              return {
                ...equipment,
                isBranchRequired: false,
                isMachineRequired: false,
                inTransactions: false,
                totalMinNeeded: 0,
                totalMaxNeeded: 0,
                totalInRequests: 0,
                totalInPurchases: 0,
                totalInPositiveAdjustments: 0,
                totalInNegativeAdjustments: 0,
                totalInWithdrawal: 0,
                total: 0,
                machines: []
              }
            })
            let branches = result[1].map(branch => {
              let equipmentsCopy = cloneDeep(equipments)
              branch.branches_equipments.forEach(branchEquipment => {
                let equipmentCopyfound = equipmentsCopy.find(equipmentCopy => {
                  return equipmentCopy.id === branchEquipment.equipment_id
                })
                if (equipmentCopyfound) {
                  equipmentCopyfound.isBranchRequired = true
                  equipmentCopyfound.totalMinNeeded = equipmentCopyfound.totalMinNeeded + branchEquipment.min_quantity
                  equipmentCopyfound.totalMaxNeeded = equipmentCopyfound.totalMaxNeeded + branchEquipment.max_quantity
                }
              })
              result[2]
                .filter(machine => { return machine.branch_id === branch.id })
                .map(machine => {
                  return {...machine,
                    equipments: machine.machines_equipments.map(machineEquipment => {
                      let equipmentCopyfound = equipmentsCopy.find(equipmentsCopy => {
                        return equipmentsCopy.id === machineEquipment.equipment_id
                      })
                      if (equipmentCopyfound) {
                        equipmentCopyfound.isMachineRequired = true
                        equipmentCopyfound.totalMinNeeded = equipmentCopyfound.totalMinNeeded + machineEquipment.min_quantity
                        equipmentCopyfound.totalMaxNeeded = equipmentCopyfound.totalMaxNeeded + machineEquipment.max_quantity
                        equipmentCopyfound.machines.push({name: machine.name, minNeeded: machineEquipment.min_quantity, maxNeeded: machineEquipment.max_quantity})
                      }
                      return {...machineEquipment, totalMinNeeded: machineEquipment.min_quantity, totalMaxNeeded: machineEquipment.max_quantity}
                    })}
                })
              return {...branch, equipments: equipmentsCopy}
            })
            let equipmentTransactions = result[3]
            equipmentTransactions.forEach(equipmentTransaction => {
              let foundBranch = branches.find(branch => { return branch.id === equipmentTransaction.branch_id })
              if (foundBranch) {
                equipmentTransaction.equipment_transaction_items.forEach(equipmentTransactionItem => {
                  let quantity = equipmentTransactionItem.quantity
                  let equipmentId = equipmentTransactionItem.equipment_id
                  let foundEquipment = foundBranch.equipments.find(equipment => { return equipment.id === equipmentId })
                  if (foundEquipment) {
                    foundEquipment.inTransactions = true
                    if (equipmentTransaction.equipment_transaction_type_id === 1) {
                      foundEquipment.totalInRequests = foundEquipment.totalInRequests + quantity
                    } else if (equipmentTransaction.equipment_transaction_type_id === 2) {
                      foundEquipment.totalInPurchases = foundEquipment.totalInPurchases + quantity
                      foundEquipment.total = foundEquipment.total + quantity
                    } else if (equipmentTransaction.equipment_transaction_type_id === 3) {
                      foundEquipment.totalInPositiveAdjustments = foundEquipment.totalInPositiveAdjustments + quantity
                      foundEquipment.total = foundEquipment.total + quantity
                    } else if (equipmentTransaction.equipment_transaction_type_id === 4) {
                      foundEquipment.totalInNegativeAdjustments = foundEquipment.totalInNegativeAdjustments + quantity
                      foundEquipment.total = foundEquipment.total - quantity
                    } else if (equipmentTransaction.equipment_transaction_type_id === 5) {
                      foundEquipment.totalInWithdrawal = foundEquipment.totalInWithdrawal + quantity
                      foundEquipment.total = foundEquipment.total - quantity
                    }
                  }
                })
              }
            })
            this.branches = branches
            this.equipments = equipments
          }).finally(() => {
            this.isLoading = false
          })
        },
        getTotalBackgroundColor: function (equipment) {
          let required = equipment.totalMinNeeded > 0 && equipment.totalMaxNeeded > 0
          return {
            'danger': required && equipment.total < equipment.totalMinNeeded,
            'warning': required && equipment.total >= equipment.totalMinNeeded && equipment.total < equipment.totalMaxNeeded,
            'success': required && equipment.total >= equipment.totalMaxNeeded
          }
        },
        currencyFormat: function (num) {
          return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      watch: {
        startDate: function () {
          this.filterExpenses()
        },
        endDate: function () {
          this.filterExpenses()
        }
      }
    }
</script>

