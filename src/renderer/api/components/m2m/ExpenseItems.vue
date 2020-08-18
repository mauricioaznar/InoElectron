<template>
    <div>
        <div>
            <label>
                Elementos del gasto
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addExpenseItem"></a>
        </div>
        <table class="mau-table table table-striped m-0">
            <thead>
            <tr>
                <th>#</th>
                <th>Descripcion</th>
                <th>Subtotal</th>
                <th>Rubro</th>
                <th>Sucursal</th>
                <th>Cantidad</th>
                <th>Total</th>
            </tr>
            </thead>
            <tr class="border p-2 w-100" v-for="(expenseItem, index) in expenseItems"
                :class="index + 1 !== expenseItems.length ? '' : ''"
            >
                <td>{{index + 1}}</td>
                <td>
                    <mau-form-input-text
                            :key="'ItemDescription' + index + 'a' +
                                (!hasInitialValues && hasLastSupplierExpenseItems? supplier.id : '')"
                            :initialValue="hasInitialValues ? getInitialExpenseItem(expenseItem).description : (hasLastSupplierExpenseItems && isIndexValidInLastSupplierExpenseItems(index) ? getLastSupplierExpenseItem(index).description : '')"
                            :label="''"
                            :name="'Description' + index"
                            v-model="expenseItem.description"
                            :error="errors.has('Description' + index) ? errors.first('Description' + index) : ''"
                            :v-validate="'required'"
                            @input="refreshInput"
                            v-validate="'required'"
                    >

                    </mau-form-input-text>
                </td>
                <td>
                    <mau-form-input-number
                            :key="'ItemSubtotal' + index + 'a' +
                                (!hasInitialValues && hasLastSupplierExpenseItems? supplier.id : '')"
                            :initialValue="hasInitialValues ? getInitialExpenseItem(expenseItem).subtotal : (hasLastSupplierExpenseItems && isIndexValidInLastSupplierExpenseItems(index) ? getLastSupplierExpenseItem(index).subtotal : '')"
                            :name="'Subtotal' + index"
                            :label="''"
                            v-model="expenseItem.subtotal"
                            :error="errors.has('Subtotal' + index) ? errors.first('Subtotal' + index) : ''"
                            :type="'float'"
                            @input="refreshInput"
                            v-validate="{
                              required: true
                            }"
                    >
                    </mau-form-input-number>
                </td>
                <td>
                    <mau-form-input-select-dynamic
                            :key="'ItemSubcategory' + index + 'a' +
                                (!hasInitialValues && hasLastSupplierExpenseItems? supplier.id : '')"
                            :label="''"
                            :initialObject="hasInitialValues ? getInitialExpenseItem(expenseItem).expense_subcategory : (hasLastSupplierExpenseItems && isIndexValidInLastSupplierExpenseItems(index)? getLastSupplierExpenseItem(index).expense_subcategory : {})"
                            :apiOperationOptions="{filterOrderBy: 'expense_category_id|asc'}"
                            :displayProperty="'name'"
                            :endpointName="expenseSubcategoryEndpointName"
                            v-model="expenseItem.expenseSubcategory"
                            @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'expense_subcategory_id') }"
                            :name="'ExpenseSubcategory' + index"
                            :error="errors.has('ExpenseSubcategory' + index) ? errors.first('ExpenseSubcategory' + index) : ''"
                            v-validate="'required'"
                    >
                    </mau-form-input-select-dynamic>
                </td>
                <td>
                    <mau-form-input-select-dynamic
                            :key="'ItemBranch' + index + 'a' +
                                (!hasInitialValues && hasLastSupplierExpenseItems? supplier.id : '')"
                            :label="''"
                            :initialObject="hasInitialValues ? getInitialExpenseItem(expenseItem).branch : (hasLastSupplierExpenseItems && isIndexValidInLastSupplierExpenseItems(index) ? getLastSupplierExpenseItem(index).branch : {})"
                            :displayProperty="'name'"
                            :endpointName="branchEndpointName"
                            v-model="expenseItem.branch"
                            @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'branch_id') }"
                            :name="'branch' + index"
                            :error="errors.has('branch' + index) ? errors.first('branch' + index) : ''"
                            v-validate="'required'"
                    >
                    </mau-form-input-select-dynamic>
                </td>
                <td>
                    <mau-form-input-number
                            :key="'ItemQuantity' + index + 'a' +
                                (!hasInitialValues && hasLastSupplierExpenseItems? supplier.id : '')"
                            v-if="isExpenseItemQuantityRequired(expenseItem)"
                            :name="'ItemExpenseQuantity' + index"
                            :label="''"
                            v-model="expenseItem.quantity"
                            :initialValue="hasInitialValues ?
                            (getInitialExpenseItem(expenseItem).quantity >= 0 && getInitialExpenseItem(expenseItem).quantity !== null ? getInitialExpenseItem(expenseItem).quantity : 0)
                            : hasLastSupplierExpenseItems && isIndexValidInLastSupplierExpenseItems(index) && getLastSupplierExpenseItem(index).quantity > 0 ? getLastSupplierExpenseItem(index).quantity : 0"
                            :error="errors.has('ItemExpenseQuantity' + index) ? errors.first('ItemExpenseQuantity' + index) : ''"
                            :type="'float'"
                            @input="refreshInput"
                            v-validate="'required'"
                    >
                    </mau-form-input-number>
                </td>
                <td>
                    <a v-if="index !== 0" class="fa fa-close p-1" href="#" @click.prevent="removeExpenseItem(index)"></a>
                    <a v-else class="p-1">-</a>
                </td>
            </tr>
             <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right"><b>TOTAL:</b></td>
                    <td>
                        {{total}}
                    </td>
                </tr>
        </table>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import EntityTypes from 'renderer/api/EntityTypes'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    export default {
      inject: ['$validator'],
      data () {
        return {
          expenseItems: [],
          lastSupplierExpenseItems: [],
          machines: [],
          branches: [],
          expenseSubcategories: [],
          initialExpenseItems: [],
          total: 0,
          machineEndpointName: EntityTypes.MACHINE.apiName,
          expenseCategoryEndpointName: EntityTypes.EXPENSE_CATEGORY.apiName,
          expenseSubcategoryEndpointName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
          branchEndpointName: EntityTypes.BRANCH.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.expenseItems = this.initialValues.length === 0 ? [{}] : cloneDeep(this.initialValues)
        this.initialExpenseItems = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      computed: {
        hasInitialValues: function () {
          return this.initialValues.length > 0
        },
        hasLastSupplierExpenseItems: function () {
          return this.lastSupplierExpenseItems.length > 0
        }
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        hasTax: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        initialFirstExpenseItem: {
          type: Object
        },
        supplier: {
          type: Object,
          required: true
        }
      },
      methods: {
        updateExpenseItemProperty: function (selectedObject, expenseItem, propertyName) {
          let initialExpenseItem = this.getInitialExpenseItem(expenseItem)
          expenseItem[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialExpenseItem && initialExpenseItem[propertyName] > 0 ? 'null' : null)
          this.refreshInput()
        },
        refreshInput: function () {
          let total = this.expenseItems.reduce((acc, expenseItem) => {
            return acc + ((expenseItem && expenseItem.subtotal) ? expenseItem.subtotal : 0)
          }, 0)
          this.total = total
          let isProductPurchaseSelected = false
          this.expenseItems.forEach(expenseItem => {
            isProductPurchaseSelected = expenseItem.expense_subcategory_id === 55 || isProductPurchaseSelected
          })
          this.$emit('total', total)
          this.$emit('isProductPurchaseSelected', isProductPurchaseSelected)
          this.$emit('input', this.expenseItems)
        },
        isExpenseItemQuantityRequired: function (expenseItem) {
          return expenseItem.expenseSubcategory &&
            (expenseItem.expenseSubcategory.id === 12 ||
              expenseItem.expenseSubcategory.id === 13 ||
              expenseItem.expenseSubcategory.id === 39 ||
              expenseItem.expenseSubcategory.id === 54)
        },
        addExpenseItem: function () {
          this.expenseItems.push({description: ''})
          this.refreshInput()
        },
        removeExpenseItem: function (index) {
          this.expenseItems.splice(index, 1)
          this.refreshInput()
        },
        getInitialExpenseItem: function (expenseItem) {
          if (!expenseItem.id) {
            return ''
          }
          let initialExpenseItem = this.initialExpenseItems.find(initialExpenseItemObj => { return initialExpenseItemObj.id === expenseItem.id })
          if (!initialExpenseItem) {
            return ''
          }
          return initialExpenseItem
        },
        getLastSupplierExpenseItem: function (index) {
          return this.lastSupplierExpenseItems[index]
        },
        isIndexValidInLastSupplierExpenseItems: function (index) {
          return this.lastSupplierExpenseItems.length > index
        }
      },
      watch: {
        supplier: function (supplier) {
          if (!this.hasInitialValues && supplier && supplier.id) {
            let supplierId = supplier.id
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName, {filterExacts: {supplier_id: supplierId}}).then(result => {
              this.lastSupplierExpenseItems = []
              if (result.length > 0) {
                this.expenseItems = []
                result[0].expense_items.forEach(expenseItem => {
                  this.expenseItems.push({})
                  this.lastSupplierExpenseItems.push(expenseItem)
                })
              }
            })
          }
        }
      }
    }
</script>

<style>
</style>
