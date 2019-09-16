<template>
    <div>
        <div>
            <label>
                Elementos del gasto
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addExpenseItem"></a>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="p-2">#</th>
                    <th class="p-2">Descripcion / A</th>
                    <th class="p-2">Subtotal / B</th>
                    <th class="p-2">Tax / A</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(expenseItem, index) in expenseItems">
                    <tr>
                        <td class="p-2" rowspan="2">{{index + 1}}</td>
                        <td class="w-auto">
                            <mau-form-input-text
                                    :name="'Description' + index"
                                    v-model="expenseItem.description"
                                    :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).description : ''"
                                    :error="errors.has('Description' + index) ? errors.first('Description' + index) : ''"
                                    :v-validate="'required'"
                                    @change="refreshInput"
                            >

                            </mau-form-input-text>
                        </td>
                        <td class="w-auto">
                            <mau-form-input-number
                                    :name="'Subtotal' + index"
                                    v-model="expenseItem.subtotal"
                                    :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).subtotal : ''"
                                    :error="errors.has('Subtotal' + index) ? errors.first('Subtotal' + index) : ''"
                                    :type="'float'"
                                    @change="refreshInput"
                                    v-validate="'required'"
                            >

                            </mau-form-input-number>
                        </td>
                        <td>
                            <mau-form-input-number
                                    :name="'Tax' + index"
                                    v-model="expenseItem.tax"
                                    :initialValue="expenseItem.id ? getInitialExpenseItem(expenseItem).tax : ''"
                                    :error="errors.has('Tax' + index) ? errors.first('Tax' + index) : ''"
                                    :type="'float'"
                                    @change="refreshInput"
                                    v-validate="'required'"
                            >

                            </mau-form-input-number>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <mau-form-input-select-dynamic
                                    :initialObject="expenseItem.id ? getInitialExpenseItem(expenseItem).machine : {}"
                                    :displayProperty="'name'"
                                    :endpointName="machineEndpointName"
                                    v-model="expenseItem.machine"
                                    @input="function x(result) { updateExpenseItemProperty(result, expenseItem, 'machine_id') }"
                                    :name="'Machine' + index"
                                    :error="errors.has('Machine' + index) ? errors.first('Machine' + index) : ''"
                                    v-validate="'object_required'"
                            >
                            </mau-form-input-select-dynamic>
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
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
          machineEndpointName: EntityTypes.MACHINE.apiName
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
        }
      },
      methods: {
        updateExpenseItemProperty: function (selectedObject, expenseItem, propertyName) {
          let initialExpenseItem = this.getInitialExpenseItem(expenseItem)
          expenseItem[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialExpenseItem && initialExpenseItem[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          console.log(this.expenseItems)
          this.$emit('input', this.expenseItems)
        },
        addExpenseItem: function () {
          this.expenseItems.push({description: ''})
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
