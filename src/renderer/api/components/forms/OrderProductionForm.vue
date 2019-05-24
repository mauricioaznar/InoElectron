1<template>
  <div>
      <div>
          <mau-form-group-date-time
                  :name="OrderProductionPropertiesReference.START_DATE_TIME.name"
                  :label="'de inicio'"
                  v-model="productionOrder.startDateTime"
                  :initialValue="initialValues[OrderProductionPropertiesReference.START_DATE_TIME.name]"
                  :error="errors.has(OrderProductionPropertiesReference.START_DATE_TIME.name) ? errors.first(OrderProductionPropertiesReference.START_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required'"
          >
          </mau-form-group-date-time>
          <mau-form-group-date-time
                  :name="OrderProductionPropertiesReference.END_DATE_TIME.name"
                  :label="'de fin'"
                  v-model="productionOrder.endDateTime"
                  :initialValue="initialValues[OrderProductionPropertiesReference.END_DATE_TIME.name]"
                  :error="errors.has(OrderProductionPropertiesReference.END_DATE_TIME.name) ? errors.first(OrderProductionPropertiesReference.END_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required|date_format:yyyy-MM-dd HH:mm:ss|after:' + productionOrder.startDateTime"
          >
          </mau-form-group-date-time>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select-dynamic
                      :endpointName="employeeEndpointName"
                      :apiOperationOptions="bagsEmployeeTypeApiOperationOptions"
                      :initialObject="initialValues[OrderProductionPropertiesReference.EMPLOYEE.name]"
                      :label="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :displayProperty="'fullname'"
                      v-model="productionOrder.employee"
                      :name="OrderProductionPropertiesReference.EMPLOYEE.name"
                      :data-vv-as="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :error="errors.first(OrderProductionPropertiesReference.EMPLOYEE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="extrusionMode">
              <mau-form-input-select-dynamic
                      :endpointName="employeeEndpointName"
                      :apiOperationOptions="rollsEmployeeTypeApiOperationOptions"
                      :initialObject="initialValues[OrderProductionPropertiesReference.EMPLOYEE.name]"
                      :label="'Extrusor'"
                      :displayProperty="'fullname'"
                      v-model="productionOrder.employee"
                      :name="OrderProductionPropertiesReference.EMPLOYEE.name"
                      :data-vv-as="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :error="errors.first(OrderProductionPropertiesReference.EMPLOYEE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select-dynamic
                      :endpointName="machineEndpointName"
                      :apiOperationOptions="bagsMachineApiOperationOptions"
                      :initialObject="initialValues['_machine']"
                      :label="'Maquina'"
                      :displayProperty="'name'"
                      v-model="productionOrder.machine"
                      :name="'_machine'"
                      :data-vv-as="'Maquina'"
                      :error="errors.first('_machine')"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select-dynamic
                      :endpointName="productEndpointName"
                      :apiOperationOptions="bagsApiOperationOptions"
                      :initialObjects="initialValues['bags']"
                      :label="'Bolsas'"
                      :displayProperty="'description'"
                      v-model="productionOrder.bags"
                      :name="'bags'"
                      :data-vv-as="'Productos'"
                      :error="errors.first('bags')"
                      :multiselect="true"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
                  <order-production-product-table
                          :allowNegative="true"
                          :bagMode="true"
                          :machineId="productionOrder.machine ? productionOrder.machine['id'] : 0"
                          :selectedProducts="productionOrder.bags"
                          :initialProducts="initialValues['bags']"
                          v-model="productionOrder.orderProductionBags"
                          :userHasWritePrivileges="userHasWritePrivileges"
                  >
                  </order-production-product-table>
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select-dynamic
                      :endpointName="productEndpointName"
                      :apiOperationOptions="rollsApiOperationOptions"
                      :initialObjects="initialValues['rolls']"
                      :label="'Rollos'"
                      :displayProperty="'description'"
                      v-model="productionOrder.rolls"
                      :name="'rolls'"
                      :data-vv-as="'Rollos'"
                      :error="errors.first('rolls')"
                      :multiselect="true"
                      :disabled="!userHasWritePrivileges"
              >
                  <order-production-product-table
                          :allowNegative="true"
                          :machineId="productionOrder.machine ? productionOrder.machine['id'] : 0"
                          :selectedProducts="productionOrder.rolls"
                          :initialProducts="initialValues['rolls']"
                          v-model="productionOrder.orderProductionRolls"
                          :userHasWritePrivileges="userHasWritePrivileges"
                  >
                  </order-production-product-table>
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="extrusionMode">
              <mau-form-input-select-dynamic
                      :key="machinesKey"
                      :endpointName="machineEndpointName"
                      :apiOperationOptions="rollsMachineApiOperationOptions"
                      :initialObjects="initialValues['_machines']"
                      :label="'Maquinas'"
                      :displayProperty="'name'"
                      v-model="productionOrder.machines"
                      :name="'_machines'"
                      :data-vv-as="'maquinas'"
                      :error="errors.first('_machines')"
                      :multiselect="true"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group" v-if="extrusionMode" v-for="(machineObj, index) in machineObjects">
              <mau-form-input-select-dynamic
                      v-if="machineObj.selected"
                      :endpointName="productEndpointName"
                      :apiOperationOptions="rollsApiOperationOptions"
                      :initialObjects="machineObj.initialRolls"
                      :label="machineObj.machineName"
                      :displayProperty="'description'"
                      v-model="machineObj.rolls"
                      :name="'_machine' + machineObj.id"
                      :data-vv-as="machineObj.id"
                      :error="errors.first('_machine' + machineObj.id)"
                      :disabled="!userHasWritePrivileges"
                      :multiselect="true"
                      v-validate="'required'"
              >
                  <order-production-product-table
                          :machineId="machineObj['id']"
                          :extrusionMode="true"
                          :selectedProducts="machineObj.rolls"
                          :initialProducts="machineObj.initialRolls"
                          :userHasWritePrivileges="userHasWritePrivileges"
                          v-model="machineObj.productionRolls"
                  >
                  </order-production-product-table>
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-number
                      :label="OrderProductionPropertiesReference.WASTE.title"
                      :name="OrderProductionPropertiesReference.WASTE.name"
                      v-model="productionOrder.waste"
                      :initialValue="initialValues[OrderProductionPropertiesReference.WASTE.name]"
                      :error="errors.has(OrderProductionPropertiesReference.WASTE.name) ? errors.first(OrderProductionPropertiesReference.WASTE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      :type="'float'"
                      v-validate="'required'"
              >
              </mau-form-input-number>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderProductionPropertiesReference from 'renderer/api/propertiesReference/OrderProductionPropertiesReference'
  import OrderProductionProductTable from 'renderer/api/components/m2m/OrderProductionProductTable.vue'
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderProductionPropertiesReference: OrderProductionPropertiesReference,
        productionOrder: {
          bags: [],
          rolls: [],
          orderProductionRolls: [],
          orderProductionBags: [],
          startDateTime: '',
          endDateTime: '',
          machines: [],
          machine: {},
          employee: {},
          waste: '',
          date: ''
        },
        machineObjects: [],
        machineObject: {},
        initialValues: {},
        machinesKey: 0,
        buttonDisabled: false,
        machineEndpointName: EntityTypes.MACHINE.apiName,
        employeeEndpointName: EntityTypes.EMPLOYEE.apiName,
        productEndpointName: EntityTypes.PRODUCT.apiName,
        productionIndicatorEndpointName: EntityTypes.PRODUCTION_INDICATOR.apiName
      }
    },
    components: {
      MauFormInputSelectDynamic,
      OrderProductionProductTable
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      bagMode: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      extrusionMode: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.setInitialValues()
    },
    computed: {
      userHasWritePrivileges: function () {
        return true
      },
      rollsApiOperationOptions: function () {
        return {filterExacts: {product_type_id: 2}}
      },
      bagsApiOperationOptions: function () {
        return {filterExacts: {product_type_id: 1}}
      },
      rollsEmployeeTypeApiOperationOptions: function () {
        return {filterExacts: {employee_type_id: 2}}
      },
      bagsEmployeeTypeApiOperationOptions: function () {
        return {filterExacts: {employee_type_id: 1}}
      },
      rollsMachineApiOperationOptions: function () {
        return {filterExacts: {machine_type_id: 2}}
      },
      bagsMachineApiOperationOptions: function () {
        return {filterExacts: {machine_type_id: 1}}
      }
    },
    methods: {
      setInitialValues: function () {
        let products = DefaultValuesHelper.array(this.initialObject, OrderProductionPropertiesReference.PRODUCTS.name)
        this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name] = products
        this.initialValues['bags'] = products.filter(product => { return product['product_type_id'] === 1 })
        this.initialValues['rolls'] = products.filter(product => { return product['product_type_id'] === 2 })
        this.initialValues[OrderProductionPropertiesReference.START_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, OrderProductionPropertiesReference.START_DATE_TIME.name)
        this.initialValues[OrderProductionPropertiesReference.END_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, OrderProductionPropertiesReference.END_DATE_TIME.name)
        this.initialValues[OrderProductionPropertiesReference.EMPLOYEE.name] = DefaultValuesHelper.object(this.initialObject, OrderProductionPropertiesReference.EMPLOYEE.name)
        this.initialValues[OrderProductionPropertiesReference.WASTE.name] = DefaultValuesHelper.simple(this.initialObject, OrderProductionPropertiesReference.WASTE.name)
        if (this.extrusionMode) {
          if (this.initialObject && this.initialObject[OrderProductionPropertiesReference.MACHINES.name]) {
            let initialMachines = []
            this.initialObject[OrderProductionPropertiesReference.MACHINES.name].forEach(machineObj => {
              let initialMachineDuplicated = initialMachines.find(initialMachineObj => machineObj[GlobalEntityIdentifier] === initialMachineObj[GlobalEntityIdentifier])
              if (!initialMachineDuplicated) {
                initialMachines.push(machineObj)
              }
            })
            this.initialValues['_machines'] = initialMachines
          } else {
            GenericApiOperations.list(EntityTypes.MACHINE.apiName, {filterExacts: {machine_type_id: 2}}).then(result => {
              this.initialValues['_machines'] = result
              this.machinesKey = 1
            })
          }
        }
        if (this.bagMode) {
          let initialMachine = {}
          if (this.initialObject && this.initialObject[OrderProductionPropertiesReference.MACHINES.name]) {
            initialMachine = this.initialObject[OrderProductionPropertiesReference.MACHINES.name][0]
          }
          this.initialValues['_machine'] = initialMachine
        }
      },
      save: function () {
        let directParams = {
          [OrderProductionPropertiesReference.START_DATE_TIME.name]: this.productionOrder.startDateTime,
          [OrderProductionPropertiesReference.END_DATE_TIME.name]: this.productionOrder.endDateTime,
          [OrderProductionPropertiesReference.WASTE.name]: this.productionOrder.waste
        }
        directParams[OrderProductionPropertiesReference.EMPLOYEE.relationship_id_name] = this.productionOrder.employee ? this.productionOrder.employee[GlobalEntityIdentifier] : null
        let relayObjects = []
        if (this.extrusionMode) {
          let productionRolls = []
          for (let i = 0; i < this.machineObjects.length; i++) {
            if (this.machineObjects[i].selected) {
              for (let j = 0; j < this.machineObjects[i].productionRolls.length; j++) {
                productionRolls.push(this.machineObjects[i].productionRolls[j])
              }
            }
          }
          let filteredProductionRolls = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].map(initialProductionObj => initialProductionObj.pivot),
            productionRolls,
            'id'
          )
          let productionProductRelayObject = ManyToManyHelper.createRelayObject(filteredProductionRolls, EntityTypes.ORDER_PRODUCTION_PRODUCT)
          relayObjects.push(productionProductRelayObject)
          directParams[OrderProductionPropertiesReference.ORDER_PRODUCTION_TYPE.relationship_id_name] = 2
        }
        if (this.bagMode) {
          let orderProductionProducts = this.productionOrder.orderProductionBags.concat(this.productionOrder.orderProductionRolls)
          let filteredProductionRolls = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].map(initialProductionObj => initialProductionObj.pivot),
            orderProductionProducts,
            'id'
          )
          let productionProductRelayObject = ManyToManyHelper.createRelayObject(filteredProductionRolls, EntityTypes.ORDER_PRODUCTION_PRODUCT)
          relayObjects.push(productionProductRelayObject)
          directParams[OrderProductionPropertiesReference.ORDER_PRODUCTION_TYPE.relationship_id_name] = 1
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, relayObjects)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      },
      'productionOrder.machines': function (newMachines) {
        this.machineObjects.forEach(machineObj => {
          machineObj.selected = false
        })
        for (let i = 0; i < newMachines.length; i++) {
          let machineId = newMachines[i][GlobalEntityIdentifier]
          let machineObjFound = this.machineObjects.find(machineObj => { return machineObj[GlobalEntityIdentifier] === machineId })
          let machineRolls = machineObjFound ? machineObjFound.rolls : []
          let machineProductionRolls = machineObjFound ? machineObjFound.productionRolls : []
          let machineInitialProductionRolls = this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].filter(product => product.pivot['machine_id'] === machineId).map(product => product.pivot)
          let machineInitialRolls = this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].filter(product => product.pivot['machine_id'] === machineId).map(product => product)
          if (!machineObjFound) {
            this.machineObjects.push({
              selected: true,
              id: machineId,
              machineName: newMachines[i].name,
              initialProductionRolls: machineInitialProductionRolls,
              initialRolls: machineInitialRolls,
              productionRolls: machineProductionRolls,
              rolls: machineRolls
            })
          } else {
            machineObjFound.selected = true
          }
        }
      }
    }
  }

</script>
