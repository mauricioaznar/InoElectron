<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-date
                        :name="ExpensePropertiesReference.DATE_PAID.name"
                        :label="ExpensePropertiesReference.DATE_PAID.title"
                        v-model="expense.datePaid"
                        :initialValue="initialValues[ExpensePropertiesReference.DATE_PAID.name]"
                        :error="errors.has(ExpensePropertiesReference.DATE_PAID.name) ? errors.first(ExpensePropertiesReference.DATE_PAID.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="supplierEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.SUPPLIER.name]"
                        :label="ExpensePropertiesReference.SUPPLIER.title"
                        :displayProperty="'name'"
                        v-model="expense.supplier"
                        :name="ExpensePropertiesReference.SUPPLIER.name"
                        :error="errors.has(ExpensePropertiesReference.SUPPLIER.name) ? errors.first(ExpensePropertiesReference.SUPPLIER.name) : ''"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="expenseStatusEndpointName"
                        :initialObject="initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name]"
                        :label="ExpensePropertiesReference.EXPENSE_STATUS.title"
                        :displayProperty="'name'"
                        v-model="expense.expenseStatus"
                        :name="ExpensePropertiesReference.EXPENSE_STATUS.name"
                        :error="errors.has(ExpensePropertiesReference.EXPENSE_STATUS.name) ? errors.first(ExpensePropertiesReference.EXPENSE_STATUS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
       <div class="form-group form-row">
           <div class="col-sm-12">
               <expense-items
                       v-model="expense.expenseItems"
                       :initialValues="initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name]"
                       @total="setExpenseItemsTotal"
                       @isProductPurchaseSelected="setIsProductPurchaseSelected"
                       :supplier="expense.supplier && expense.supplier.id ? expense.supplier : {}"
               >
               </expense-items>
           </div>
       </div>
       <div
               class="form-group"
               v-if="isProductPurchaseSelected"
       >
           <div class="products">
                <mau-form-input-select-dynamic
                        :key="'OrderSaleProducts'"
                        :endpointName="productEndpointName"
                        :label="ExpensePropertiesReference.PRODUCTS.title"
                        :initialObjects="initialValues[ExpensePropertiesReference.PRODUCTS.name]"
                        v-model="expense.products"
                        :displayProperty="'description'"
                        :name="ExpensePropertiesReference.PRODUCTS.name"
                        :selectedPropertyName="'product_id'"
                        :data-vv-as="'Productos'"
                        :error="errors.has(ExpensePropertiesReference.PRODUCTS.name) ? errors.first(ExpensePropertiesReference.PRODUCTS.name) : ''"
                        :multiselect="true"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                    <template slot-scope="params">
                        <order-sale-product-table
                                :saleMode="true"
                                :hasTax="false"
                                :selectedProducts="expense.products"
                                v-model="expense.expenseProducts"
                                :initialProducts="initialValues[ExpensePropertiesReference.PRODUCTS.name]"
                                :userHasWritePrivileges="userHasWritePrivileges"
                                @total="handleProductsTotal"
                        >
                        </order-sale-product-table>
                    </template>
                </mau-form-input-select-dynamic>
          </div>
      </div>

      <div class="form-group">
        <span
                v-show="isProductPurchaseSelected && expenseItemsTotal !== productsTotal"
                class="text-danger"
        >
            {{'Total de elementos de gasto no es igual al total de productos'}}
        </span>
      </div>
      <div class="container mb-2 text-right">
          <b-button
                  :disabled="buttonDisabled || !userHasWritePrivileges"
                  @click="save"
                  type="button"
                  variant="primary"
          >Guardar</b-button>
      </div>
    </div>
</template>

<script>
    import ExpensePropertiesReference
      from 'renderer/api/propertiesReference/ExpensePropertiesReference'
    import FormSubmitEventBus
      from 'renderer/api/functions/FormSubmitEventBus'
    import DefaultValuesHelper
      from 'renderer/api/functions/DefaultValuesHelper'
    import GlobalEntityIdentifier
      from 'renderer/api/functions/GlobalEntityIdentifier'
    import MauFormInputSelectDynamic
      from 'renderer/api/components/inputs/MauFormInputSelectDynamic'
    import ManyToManyHelper
      from 'renderer/api/functions/ManyToManyHelper'
    import EntityTypes
      from 'renderer/api/EntityTypes'
    import ExpenseItems
      from 'renderer/api/components/m2m/ExpenseItems'
    import OrderSaleProductTable
      from 'renderer/api/components/m2m/OrderSaleProductTable.vue'

    export default {
      data () {
        return {
          ExpensePropertiesReference: ExpensePropertiesReference,
          expense: {
            datePaid: '',
            supplier: {},
            expenseStatus: {},
            expenseItems: [],
            products: []
          },
          buttonDisabled: false,
          initialValues: {},
          expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
          expenseStatusEndpointName: EntityTypes.EXPENSE_STATUS.apiName,
          supplierEndpointName: EntityTypes.SUPPLIER.apiName,
          productEndpointName: EntityTypes.PRODUCT.apiName,
          totals: 0,
          expenseItemsTotal: 0,
          productsTotal: 0,
          isProductPurchaseSelected: false
        }
      },
      computed: {
        userHasWritePrivileges: function () {
          return true
        },
        isInitialObjectDefined: function () {
          return this.initialObject && this.initialObject.id
        }
      },
      props: {
        initialObject: {
          type: Object
        },
        saveFunction: {
          required: true,
          type: Function
        }
      },
      created () {
        this.setInitialValues()
      },
      components: {
        MauFormInputSelectDynamic,
        OrderSaleProductTable,
        ExpenseItems
      },
      mounted () {
        FormSubmitEventBus.onEvent(function (isSuccess) {
          if (isSuccess === false) {
            this.buttonDisabled = false
          }
        }.bind(this))
      },
      methods: {
        setInitialValues: function () {
          this.initialValues[ExpensePropertiesReference.DATE_PAID.name] = DefaultValuesHelper.simple(this.initialObject, ExpensePropertiesReference.DATE_PAID.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.EXPENSE_STATUS.name)
          this.initialValues[ExpensePropertiesReference.SUPPLIER.name] = DefaultValuesHelper.object(this.initialObject, ExpensePropertiesReference.SUPPLIER.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_ITEMS.name)
          this.initialValues[ExpensePropertiesReference.PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.PRODUCTS.name)
          this.initialValues[ExpensePropertiesReference.EXPENSE_PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, ExpensePropertiesReference.EXPENSE_PRODUCTS.name)
        },
        handleProductsTotal: function (total) {
          this.productsTotal = total
        },
        setIsProductPurchaseSelected: function (value) {
          this.isProductPurchaseSelected = value
        },
        setExpenseItemsTotal: function (total) {
          this.expenseItemsTotal = total
        },
        save: function () {
          let directParams = {
            [ExpensePropertiesReference.EXPENSE_TYPE.relationship_id_name]: 1,
            [ExpensePropertiesReference.DATE_PAID.name]: this.expense.datePaid,
            [ExpensePropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null),
            [ExpensePropertiesReference.EXPENSE_STATUS.relationship_id_name]: this.expense.expenseStatus ? this.expense.expenseStatus[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
          }
          let relayObjects = []
          let expenseItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[ExpensePropertiesReference.EXPENSE_ITEMS.name],
            this.expense.expenseItems,
            'id'
          )
          let expenseItemsRelayObjects = ManyToManyHelper.createRelayObject(expenseItemsM2mFilteredObject, EntityTypes.EXPENSE_ITEM)
          relayObjects.push(expenseItemsRelayObjects)
          let expenseProductsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[ExpensePropertiesReference.EXPENSE_PRODUCTS.name],
            this.isProductPurchaseSelected ? this.expense.expenseProducts : [],
            'id'
          )
          let expenseProductsRelayObjects = ManyToManyHelper.createRelayObject(expenseProductsM2mFilteredObject, EntityTypes.EXPENSE_PRODUCT)
          relayObjects.push(expenseProductsRelayObjects)
          if (this.isProductPurchaseSelected && this.expenseItemsTotal !== this.productsTotal) {
            return
          }
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.buttonDisabled = true
              this.saveFunction(directParams, relayObjects)
            }
          })
        }
      }
    }
</script>
