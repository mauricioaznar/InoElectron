1<template>
  <div>
      <div>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <mau-form-input-date-time
                          :name="'startDate'"
                          :label="'Fecha de inicio'"
                          v-model="productionOrder.startDate"
                          :initialValue="initialValues['startDate']"
                          :inputType="'date'"
                          :error="errors.first('startDate')"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
              <div class="form-group col-md-3">
              <mau-form-input-bootstrap-select
                      :label="'Hora de inicio'"
                      :name="'startHour'"
                      :availableOptions="['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']"
                      :error="errors.first('startHour')"
                      v-model="productionOrder.startHour"
                      :initialValue="initialValues['startHour']"
                      v-validate="'required'"
              >
              </mau-form-input-bootstrap-select>
          </div>
              <div class="form-group col-md-3   ">
                  <mau-form-input-bootstrap-select
                          :label="'Minuto de inicio'"
                          :name="'startMinute'"
                          :availableOptions="['00','05','10','15','20','25','30','35','40','45','50','55']"
                          :error="errors.first('startMinute')"
                          v-model="productionOrder.startMinute"
                          :initialValue="initialValues['startMinute']"
                          v-validate="'required'"
                  >
                  </mau-form-input-bootstrap-select>
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <mau-form-input-date-time
                          :name="'endDate'"
                          :label="'Fecha fin'"
                          v-model="productionOrder.endDate"
                          :initialValue="initialValues['endDate']"
                          :inputType="'date'"
                          :error="errors.first('endDate')"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
              <div class="form-group col-md-3">
                  <mau-form-input-bootstrap-select
                          :label="'Hora de final'"
                          :name="'endHour'"
                          :availableOptions="['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']"
                          :error="errors.first('endHour')"
                          v-model="productionOrder.endHour"
                          :initialValue="initialValues['endHour']"
                          v-validate="'required'"
                  >
                  </mau-form-input-bootstrap-select>
              </div>
              <div class="form-group col-md-3">
                  <mau-form-input-bootstrap-select
                          :label="'Minuto de final'"
                          :name="'endMinute'"
                          :availableOptions="['00','05','10','15','20','25','30','35','40','45','50','55']"
                          :error="errors.first('endMinute')"
                          v-model="productionOrder.endMinute"
                          :initialValue="initialValues['endMinute']"
                          v-validate="'required'"
                  >
                  </mau-form-input-bootstrap-select>
              </div>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[BagOrderProductionPropertiesReference.EMPLOYEE.name]"
                      :label="BagOrderProductionPropertiesReference.EMPLOYEE.title"
                      :displayProperty="'full_name'"
                      v-model="productionOrder.employee"
                      :name="BagOrderProductionPropertiesReference.EMPLOYEE.name"
                      :data-vv-as="BagOrderProductionPropertiesReference.EMPLOYEE.title"
                      :error="errors.first(BagOrderProductionPropertiesReference.EMPLOYEE.name)"
                      :entityType="employeeEntityType"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[BagOrderProductionPropertiesReference.CUTTING_MACHINE.name]"
                      :label="BagOrderProductionPropertiesReference.CUTTING_MACHINE.title"
                      :displayProperty="'name'"
                      v-model="productionOrder.cuttingMachine"
                      :name="BagOrderProductionPropertiesReference.CUTTING_MACHINE.name"
                      :data-vv-as="BagOrderProductionPropertiesReference.CUTTING_MACHINE.title"
                      :error="errors.first(BagOrderProductionPropertiesReference.CUTTING_MACHINE.name)"
                      :entityType="cuttingMachineEntityType"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="BagOrderProductionPropertiesReference.BAGS.title"
                            :initialObjects="initialValues[BagOrderProductionPropertiesReference.BAGS.name]"
                            v-model="productionOrder.bags"
                            :selectedPropertyName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="BagOrderProductionPropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-table
                                :selectedBags="params.selectedObjects"
                                :initialBags="initialValues[BagOrderProductionPropertiesReference.BAGS.name]"
                                v-model="productionOrder.productionBags"
                            >
                            </order-table>
                        </template>
                    </mau-many-to-many-selector>
              </div>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import BagOrderProductionPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductionPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import MauFormInputBootstrapSelect from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleTable from 'renderer/api/components/tables/BagOrderSaleTable.vue'
  import OrderTable from 'renderer/api/components/tables/BagOrderTable.vue'
  import MauManyToManySelector from 'renderer/components/mau-components/mau-many-to-many-selector/MauManyToManySelector.vue'
  import {mapState} from 'vuex'
  import moment from 'moment'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        BagOrderProductionPropertiesReference: BagOrderProductionPropertiesReference,
        productionOrder: {
          bags: [],
          productionBags: [],
          startDate: '',
          endDate: '',
          startHour: '',
          startMinute: '',
          endHour: '',
          endMinute: '',
          cuttingMachine: {},
          employee: {},
          date: ''
        },
        initialValues: {},
        buttonDisabled: false,
        cuttingMachineEntityType: EntityTypes.CUTTING_MACHINE,
        employeeEntityType: EntityTypes.EMPLOYEE
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputBootstrapSelect,
      MauFormInputDateTime,
      MauFormInputText,
      MauFormInputNumber,
      MauManyToManySelector,
      OrderSaleTable,
      OrderTable
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      entityType: {
        type: Object,
        required: true
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
        availableBags: state => {
          return state.api.entity.bags
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in BagOrderProductionPropertiesReference) {
          if (BagOrderProductionPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[BagOrderProductionPropertiesReference[propertyReference].name] = BagOrderProductionPropertiesReference[propertyReference].defaultValue
          }
        }
        this.initialValues['startHour'] = ''
        this.initialValues['startMinute'] = ''
        this.initialValues['startDate'] = ''
        this.initialValues['endHour'] = ''
        this.initialValues['endMinute'] = ''
        this.initialValues['endDate'] = ''
      },
      setInitialValues: function () {
        this.initialValues[BagOrderProductionPropertiesReference.BAGS.name] = this.initialObject[BagOrderProductionPropertiesReference.BAGS.name]
        this.initialValues['startDate'] = moment(this.initialObject[BagOrderProductionPropertiesReference.START_DATE_TIME.name]).format('YYYY-MM-DD')
        this.initialValues['startHour'] = moment(this.initialObject[BagOrderProductionPropertiesReference.START_DATE_TIME.name]).format('HH')
        this.initialValues['startMinute'] = moment(this.initialObject[BagOrderProductionPropertiesReference.START_DATE_TIME.name]).format('mm')
        this.initialValues['endDate'] = moment(this.initialObject[BagOrderProductionPropertiesReference.END_DATE_TIME.name]).format('YYYY-MM-DD')
        this.initialValues['endHour'] = moment(this.initialObject[BagOrderProductionPropertiesReference.END_DATE_TIME.name]).format('HH')
        this.initialValues['endMinute'] = moment(this.initialObject[BagOrderProductionPropertiesReference.END_DATE_TIME.name]).format('mm')
        this.initialValues[BagOrderProductionPropertiesReference.EMPLOYEE.name] = this.initialObject[BagOrderProductionPropertiesReference.EMPLOYEE.name]
        this.initialValues[BagOrderProductionPropertiesReference.CUTTING_MACHINE.name] = this.initialObject[BagOrderProductionPropertiesReference.CUTTING_MACHINE.name]
      },
      save: function () {
        let startDateTime = this.productionOrder.startDate + ' ' + this.productionOrder.startHour + ':' + this.productionOrder.startMinute + ':00'
        console.log(startDateTime)
        let directParams = {
          [BagOrderProductionPropertiesReference.START_DATE_TIME.name]: this.productionOrder.startDate + ' ' + this.productionOrder.startHour + ':' + this.productionOrder.startMinute + ':00',
          [BagOrderProductionPropertiesReference.END_DATE_TIME.name]: this.productionOrder.endDate + ' ' + this.productionOrder.endHour + ':' + this.productionOrder.endMinute + ':00'
        }
        directParams[BagOrderProductionPropertiesReference.CUTTING_MACHINE.relationship_id_name] = this.productionOrder.cuttingMachine ? this.productionOrder.cuttingMachine[GlobalEntityIdentifier] : 'null'
        directParams[BagOrderProductionPropertiesReference.EMPLOYEE.relationship_id_name] = this.productionOrder.employee ? this.productionOrder.employee[GlobalEntityIdentifier] : 'null'
        let relayObjects = [
          ManyToManyHelper.createRelayObject(this.productionOrder.productionBags, EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT)
        ]
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
      }
    }
  }

</script>
