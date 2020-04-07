<template>
    <div>
        <div>
            <label>
                Elementos del gasto
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addExpenseItem"></a>
        </div>
        <div class="border p-2" v-for="(expenseItem, index) in expenseItems"
             :class="index + 1 !== expenseItems.length ? 'mb-2' : ''"
        >
            <h5 class="bg-light p-2 mb-2 border-bottom">
                Gasto {{index + 1}}
                <span v-if="index !== 0" class="icon-button float-right font-weight-bold" @click="removeExpenseItem(index)">x</span>
            </h5>
            <div>
                <mau-form-input-text
                        class="mb-2"
                        :label="'Descripcion'"
                        :name="'Description' + index"
                        v-model="expenseItem.description"
                        :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).description : ''"
                        :error="errors.has('Description' + index) ? errors.first('Description' + index) : ''"
                        :v-validate="'required'"
                        @input="refreshInput"
                        v-validate="'required'"
                >

                </mau-form-input-text>
                <mau-form-input-number
                        class="mb-2"
                        :name="'Subtotal' + index"
                        :label="'Subtotal'"
                        v-model="expenseItem.subtotal"
                        :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).subtotal : ''"
                        :error="errors.has('Subtotal' + index) ? errors.first('Subtotal' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
                <mau-form-input-number
                        v-if="hasTax"
                        class="mb-2"
                        :name="'Tax' + index"
                        :label="'IVA'"
                        v-model="expenseItem.tax"
                        :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).tax : ''"
                        :error="errors.has('Tax' + index) ? errors.first('Tax' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >

                </mau-form-input-number>
                <mau-form-input-select-dynamic
                        :key="'ItemExpenseSubcategory' + index + 'a' +
                            (isFirstExpenseItem(index) ?
                            (getFirstExpenseItem().expenseSubcategory && getFirstExpenseItem().expenseSubcategory.id ? getFirstExpenseItem().expenseSubcategory.id : '') : '')"
                        class="mb-2"
                        :label="'Subcategoria'"
                        :initialObject="
                            (isFirstExpenseItem(index))
                            ? getFirstExpenseItem().expenseSubcategory :
                             getInitialExpenseItem(expenseItem).expense_subcategory"
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
                <mau-form-input-select-dynamic
                        :key="'Itembranch' + index + 'a' +
                        (isFirstExpenseItem(index) ?
                        (getFirstExpenseItem().branch && getFirstExpenseItem().branch.id ? getFirstExpenseItem().branch.id : 0) : 0)"
                        class="mb-2"
                        :label="'Sucursal'"
                        :initialObject="isFirstExpenseItem(index) ? getFirstExpenseItem().branch : (expenseItem.id ? getInitialExpenseItem(expenseItem).branch : {})"
                        :displayProperty="'name'"
                        :endpointName="branchEndpointName"
                        v-model="expenseItem.branch"
                        @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'branch_id') }"
                        :name="'branch' + index"
                        :error="errors.has('branch' + index) ? errors.first('branch' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
                <mau-form-input-number
                        class="mb-2"
                        v-if="isExpenseItemQuantityRequired(expenseItem)"
                        :name="'ItemExpenseQuantity' + index"
                        :label="'Cantidad'"
                        v-model="expenseItem.quantity"
                        :initialValue="expenseItem.id ? (getInitialExpenseItem(expenseItem).quantity >= 0 && getInitialExpenseItem(expenseItem).quantity !== null? getInitialExpenseItem(expenseItem).quantity : 0) : ''"
                        :error="errors.has('ItemExpenseQuantity' + index) ? errors.first('ItemExpenseQuantity' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
                <mau-form-input-select-dynamic
                        :key="'ItemExpenseMachine' + index"
                        class="mb-2"
                        v-if="expenseItem.expenseCategory && expenseItem.expenseCategory.id === 2"
                        :label="'Maquina'"
                        :initialObject="expenseItem.id ? getInitialExpenseItem(expenseItem).machine : {}"
                        :displayProperty="'name'"
                        :endpointName="machineEndpointName"
                        v-model="expenseItem.machine"
                        @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'machine_id') }"
                        :name="'Machine' + index"
                        :error="errors.has('Machine' + index) ? errors.first('Machine' + index) : ''"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="mt-2">
            <label>Total</label>
            <p>{{total}}</p>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import EntityTypes from 'renderer/api/EntityTypes'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    export default {
      inject: ['$validator'],
      data () {
        return {
          expenseItems: [],
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
        }
      },
      methods: {
        updateExpenseItemProperty: function (selectedObject, expenseItem, propertyName) {
          let initialExpenseItem = this.getInitialExpenseItem(expenseItem)
          expenseItem[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialExpenseItem && initialExpenseItem[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          let total = this.expenseItems.reduce((acc, expenseItem) => {
            return acc + ((expenseItem && expenseItem.subtotal) ? expenseItem.subtotal : 0)
          }, 0)
          this.total = total
          this.$emit('total', total)
          this.$emit('input', this.expenseItems)
        },
        isExpenseItemQuantityRequired: function (expenseItem) {
          return expenseItem.expenseSubcategory && (expenseItem.expenseSubcategory.id === 12 || expenseItem.expenseSubcategory.id === 13 || expenseItem.expenseSubcategory.id === 29 || expenseItem.expenseSubcategory.id === 39 || expenseItem.expenseSubcategory.id === 30)
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
        isFirstExpenseItem: function (index) {
          return index === 0 && this.initialValues.length === 0
        },
        getFirstExpenseItem: function () {
          let {expenseSubcategory, branch} = this.initialFirstExpenseItem
          return {
            branch: (branch && branch.id) ? branch : {},
            expenseSubcategory: (expenseSubcategory && expenseSubcategory.id) ? expenseSubcategory : {}
          }
        }
      }
    }
</script>

<style>
</style>
