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
                        class="mb-2"
                        :label="'Categoria'"
                        :initialObject="expenseItem.id ? getInitialExpenseItem(expenseItem).expenseCategory : {}"
                        :displayProperty="'name'"
                        :endpointName="expenseCategoryEndpointName"
                        v-model="expenseItem.expenseCategory"
                        @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'expense_category_id') }"
                        :name="'ExpenseCategory' + index"
                        :error="errors.has('ExpenseCategory' + index) ? errors.first('ExpenseCategory' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
                <mau-form-input-number
                        class="mb-2"
                        v-if="isExpenseItemQuantityRequired(expenseItem)"
                        :name="'ItemExpenseQuantity' + index"
                        :label="'Cantidad'"
                        v-model="expenseItem.quantity"
                        :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).quantity : ''"
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
                <mau-form-input-select-dynamic
                        class="mb-2"
                        :label="'Sucursal'"
                        :initialObject="expenseItem.id ? getInitialExpenseItem(expenseItem).expenseBranch : {}"
                        :displayProperty="'name'"
                        :endpointName="expenseBranchEndpointName"
                        v-model="expenseItem.expenseBranch"
                        @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'expense_branch_id') }"
                        :name="'ExpenseBranch' + index"
                        :error="errors.has('ExpenseBranch' + index) ? errors.first('ExpenseBranch' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
                <mau-form-input-select-dynamic
                        :key="'ItemExpenseSubcategory' + index + (expenseItem.expenseCategory && expenseItem.expenseCategory.id ? expenseItem.expenseCategory.id : 0)"
                        class="mb-2"
                        :label="'Subcategoria'"
                        :initialObject="expenseItem.id ? getInitialExpenseItem(expenseItem).expenseSubcategory : {}"
                        :apiOperationOptions="expenseItem.expense_category_id ? {filterExacts: {expense_category_id: expenseItem.expense_category_id}} : {}"
                        :displayProperty="'name'"
                        :endpointName="expenseSubcategoryEndpointName"
                        v-model="expenseItem.expenseSubcategory"
                        @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'expense_subcategory_id') }"
                        :name="'ExpenseSubcategory' + index"
                        :error="errors.has('ExpenseSubcategory' + index) ? errors.first('ExpenseSubcategory' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    export default {
      inject: ['$validator'],
      data () {
        return {
          expenseItems: [],
          machines: [],
          expenseBranches: [],
          expenseCategories: [],
          expenseSubcategories: [],
          initialExpenseItems: [],
          machineEndpointName: EntityTypes.MACHINE.apiName,
          expenseCategoryEndpointName: EntityTypes.EXPENSE_CATEGORY.apiName,
          expenseSubcategoryEndpointName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
          expenseBranchEndpointName: EntityTypes.EXPENSE_BRANCH.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        Promise.all([
          GenericApiOperations.list(EntityTypes.MACHINE.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE_BRANCH.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE_SUBCATEGORY.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE_CATEGORY.apiName, {paginate: false})
        ])
          .then(result => {
            this.machines = result[0]
            this.expenseBranches = result[1]
            this.expenseSubcategories = result[2]
            this.expenseCategories = result[3]
            for (let i = 0; i < this.initialValues.length; i++) {
              let initialExpenseItem = cloneDeep(this.initialValues[i])
              initialExpenseItem.machine = this.machines.find(machineObj => machineObj.id === initialExpenseItem.machine_id)
              initialExpenseItem.expenseBranch = this.expenseBranches.find(expenseBranchObj => expenseBranchObj.id === initialExpenseItem.expense_branch_id)
              initialExpenseItem.expenseSubcategory = this.expenseSubcategories.find(expenseSubcategoryObj => expenseSubcategoryObj.id === initialExpenseItem.expense_subcategory_id)
              initialExpenseItem.expenseCategory = this.expenseCategories.find(expenseCategoryObj => expenseCategoryObj.id === initialExpenseItem.expense_category_id)
              this.initialExpenseItems.push(initialExpenseItem)
            }
            this.expenseItems = this.initialExpenseItems
            this.refreshInput()
          })
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
          this.$emit('total', total)
          this.$emit('input', this.expenseItems)
        },
        isExpenseItemQuantityRequired: function (expenseItem) {
          return expenseItem.expenseSubcategory && (expenseItem.expenseSubcategory.id === 12 || expenseItem.expenseSubcategory.id === 13 || expenseItem.expenseSubcategory.id === 29)
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
        }
      }
    }
</script>

<style>
</style>
