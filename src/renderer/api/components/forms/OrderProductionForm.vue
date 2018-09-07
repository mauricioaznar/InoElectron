1<template>
  <div>
      <div>
          <mau-form-input-date-time
                  :name="OrderProductionPropertiesReference.START_DATE_TIME.name"
                  :label="'de inicio'"
                  v-model="productionOrder.startDateTime"
                  :initialValue="initialValues[OrderProductionPropertiesReference.START_DATE_TIME.name]"
                  :error="errors.first(OrderProductionPropertiesReference.START_DATE_TIME.name)"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
          <mau-form-input-date-time
                  :name="OrderProductionPropertiesReference.END_DATE_TIME.name"
                  :label="'de fin'"
                  v-model="productionOrder.endDateTime"
                  :initialValue="initialValues[OrderProductionPropertiesReference.END_DATE_TIME.name]"
                  :error="errors.first(OrderProductionPropertiesReference.END_DATE_TIME.name)"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required|date_format:YYYY-MM-DD HH:mm:ss|after:' + productionOrder.startDateTime"
          >
          </mau-form-input-date-time>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select
                      :initialObject="initialValues[OrderProductionPropertiesReference.EMPLOYEE.name]"
                      :label="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :displayProperty="'full_name'"
                      v-model="productionOrder.employee"
                      :name="OrderProductionPropertiesReference.EMPLOYEE.name"
                      :filterExact="{employee_type_id: 1}"
                      :data-vv-as="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :error="errors.first(OrderProductionPropertiesReference.EMPLOYEE.name)"
                      :entityType="employeeEntityType"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group" v-if="extrusionMode">
              <mau-form-input-select
                      :initialObject="initialValues[OrderProductionPropertiesReference.EMPLOYEE.name]"
                      :label="'Extrusor'"
                      :displayProperty="'full_name'"
                      v-model="productionOrder.employee"
                      :name="OrderProductionPropertiesReference.EMPLOYEE.name"
                      :filterExact="{employee_type_id: 2}"
                      :data-vv-as="OrderProductionPropertiesReference.EMPLOYEE.title"
                      :error="errors.first(OrderProductionPropertiesReference.EMPLOYEE.name)"
                      :entityType="employeeEntityType"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select
                      :initialObject="initialValues['_machine']"
                      :label="'Maquina'"
                      :displayProperty="'name'"
                      v-model="productionOrder.machine"
                      :filterExact="{machine_type_id: 1}"
                      :name="'_machine'"
                      :data-vv-as="'Maquina'"
                      :error="errors.first('_machine')"
                      :entityType="machineEntityType"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group" v-if="bagMode">
              <mau-form-input-select
                      :initialObjects="initialValues[OrderProductionPropertiesReference.PRODUCTS.name]"
                      :label="OrderProductionPropertiesReference.PRODUCTS.title"
                      :displayProperty="'code'"
                      v-model="productionOrder.products"
                      :name="OrderProductionPropertiesReference.PRODUCTS.name"
                      :filterExact="{product_type_id: 1}"
                      :data-vv-as="'Productos'"
                      :error="errors.first(OrderProductionPropertiesReference.PRODUCTS.name)"
                      :entityType="productEntityType"
                      :multi="true"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'array_required'"
              >
                  <order-production-product-table
                          :allowNegative="true"
                          :bagMode="true"
                          :machineId="productionOrder.machine ? productionOrder.machine['id'] : 0"
                          :selectedProducts="productionOrder.products"
                          :initialProducts="initialValues[OrderProductionPropertiesReference.PRODUCTS.name]"
                          v-model="productionOrder.productionProducts"
                          :userHasWritePrivileges="userHasWritePrivileges"
                  >
                  </order-production-product-table>
              </mau-form-input-select>
          </div>
          <div class="form-group" v-if="extrusionMode">
              <mau-form-input-select
                      :initialObjects="initialValues['_machines']"
                      :label="'Maquinas'"
                      :displayProperty="'name'"
                      v-model="productionOrder.machines"
                      :name="'_machines'"
                      :filterExact="{machine_type_id: 2}"
                      :data-vv-as="'maquinas'"
                      :error="errors.first('_machines')"
                      :entityType="machineEntityType"
                      :multi="true"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'array_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group" v-if="extrusionMode" v-for="(machineObj, index) in machineObjects">
              <mau-form-input-select
                      :initialObjects="machineObj.initialProducts"
                      :label="machineObj.machineName"
                      :displayProperty="'code'"
                      v-model="machineObj.products"
                      :name="'_machine' + machineObj.id"
                      :data-vv-as="machineObj.id"
                      :error="errors.first('_machine' + machineObj.id)"
                      :filterExact="{product_type_id: 2}"
                      :entityType="productEntityType"
                      :disabled="!userHasWritePrivileges"
                      :multi="true"
                      v-validate="'array_required'"
              >
                  <order-production-product-table
                          :machineId="machineObj['id']"
                          :extrusionMode="true"
                          :selectedProducts="machineObj.products"
                          :initialProducts="machineObj.initialProducts"
                          :userHasWritePrivileges="userHasWritePrivileges"
                          v-model="machineObj.productionProducts"
                  >
                  </order-production-product-table>
              </mau-form-input-select>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderProductionPropertiesReference from 'renderer/api/propertiesReference/OrderProductionPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import MauFormInputBootstrapSelect from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDate from 'renderer/api/components/inputs/MauFormInputDate.vue'
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderProductionProductTable from 'renderer/api/components/m2m/OrderProductionProductTable.vue'
  import OrderProductionIndicatorSelector from 'renderer/api/components/m2m/OrderProductionIndicatorSelector.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderProductionPropertiesReference: OrderProductionPropertiesReference,
        productionOrder: {
          products: [],
          productionProducts: [],
          startDateTime: '',
          endDateTime: '',
          machines: [],
          machine: {},
          employee: {},
          date: ''
        },
        machineObjects: [],
        machineObject: {},
        initialValues: {},
        buttonDisabled: false,
        machineEntityType: EntityTypes.MACHINE,
        employeeEntityType: EntityTypes.EMPLOYEE,
        productEntityType: EntityTypes.PRODUCT,
        productionIndicatorEntityType: EntityTypes.PRODUCTION_INDICATOR
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputBootstrapSelect,
      MauFormInputDate,
      MauFormInputDateTime,
      MauFormInputText,
      OrderProductionProductTable,
      OrderProductionIndicatorSelector
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
      },
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues(this.initialObject)
      }
    },
    computed: {
      ...mapState({
        availableProducts: state => {
          return state.api.entity.products
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderProductionPropertiesReference) {
          if (OrderProductionPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderProductionPropertiesReference[propertyReference].name] = OrderProductionPropertiesReference[propertyReference].defaultValue
          }
        }
        if (this.extrusionMode) {
          this.initialValues['_machines'] = []
        }
        if (this.bagMode) {
          this.initialValues['_machine'] = {}
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name] = this.initialObject[OrderProductionPropertiesReference.PRODUCTS.name]
        this.initialValues[OrderProductionPropertiesReference.START_DATE_TIME.name] = this.initialObject[OrderProductionPropertiesReference.START_DATE_TIME.name]
        this.initialValues[OrderProductionPropertiesReference.END_DATE_TIME.name] = this.initialObject[OrderProductionPropertiesReference.END_DATE_TIME.name]
        this.initialValues[OrderProductionPropertiesReference.EMPLOYEE.name] = this.initialObject[OrderProductionPropertiesReference.EMPLOYEE.name]
        if (this.extrusionMode) {
          let initialMachines = []
          if (this.initialObject[OrderProductionPropertiesReference.MACHINES.name]) {
            this.initialObject[OrderProductionPropertiesReference.MACHINES.name].forEach(machineObj => {
              let initialMachineDuplicated = initialMachines.find(initialMachineObj => machineObj[GlobalEntityIdentifier] === initialMachineObj[GlobalEntityIdentifier])
              if (!initialMachineDuplicated) {
                initialMachines.push(machineObj)
              }
            })
          }
          this.initialValues['_machines'] = initialMachines
        }
        if (this.bagMode) {
          let initialMachine = {}
          if (this.initialObject[OrderProductionPropertiesReference.MACHINES.name]) {
            initialMachine = this.initialObject[OrderProductionPropertiesReference.MACHINES.name][0]
          }
          this.initialValues['_machine'] = initialMachine
        }
      },
      save: function () {
        let directParams = {
          [OrderProductionPropertiesReference.START_DATE_TIME.name]: this.productionOrder.startDateTime,
          [OrderProductionPropertiesReference.END_DATE_TIME.name]: this.productionOrder.endDateTime
        }
        directParams[OrderProductionPropertiesReference.EMPLOYEE.relationship_id_name] = this.productionOrder.employee ? this.productionOrder.employee[GlobalEntityIdentifier] : 'null'
        let relayObjects = []
        if (this.extrusionMode) {
          let productionProducts = []
          for (let i = 0; i < this.machineObjects.length; i++) {
            for (let j = 0; j < this.machineObjects[i].productionProducts.length; j++) {
              productionProducts.push(this.machineObjects[i].productionProducts[j])
            }
          }
          let filteredProductionProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].map(initialProductionObj => initialProductionObj.pivot),
            productionProducts,
            'id'
          )
          console.log(filteredProductionProducts)
          let productionProductRelayObject = ManyToManyHelper.createRelayObject(filteredProductionProducts, EntityTypes.ORDER_PRODUCTION_PRODUCT)
          relayObjects.push(productionProductRelayObject)
          directParams[OrderProductionPropertiesReference.ORDER_PRODUCTION_TYPE.relationship_id_name] = 2
        }
        if (this.bagMode) {
          let filteredProductionProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].map(initialProductionObj => initialProductionObj.pivot),
            this.productionOrder.productionProducts,
            'id'
          )
          let productionProductRelayObject = ManyToManyHelper.createRelayObject(filteredProductionProducts, EntityTypes.ORDER_PRODUCTION_PRODUCT)
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
      'productionOrder.machines': function (machines) {
        let machineObjects = []
        for (let i = 0; i < machines.length; i++) {
          let machineId = machines[i][GlobalEntityIdentifier]
          let machineObjFound = this.machineObjects.find(machineObj => { return machineObj[GlobalEntityIdentifier] === machineId })
          let machineProducts = machineObjFound ? machineObjFound.products : []
          let machineProductionProducts = machineObjFound ? machineObjFound.productionProducts : []
          let machineInitialProductionProducts = this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].filter(product => product.pivot['machine_id'] === machineId).map(product => product.pivot)
          let machineInitialProducts = this.initialValues[OrderProductionPropertiesReference.PRODUCTS.name].filter(product => product.pivot['machine_id'] === machineId).map(product => product)
          machineObjects.push({
            id: machineId,
            machineName: machines[i].name,
            initialProductionProducts: machineInitialProductionProducts,
            initialProducts: machineInitialProducts,
            productionProducts: machineProductionProducts,
            products: machineProducts
          })
        }
        this.machineObjects = machineObjects
      }
    }
  }

</script>
