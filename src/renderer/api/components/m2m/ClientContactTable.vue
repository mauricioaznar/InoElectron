<template>
    <div>
        <div>
            <label>
                Contactos
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addItem"></a>
        </div>
        <table class="w-100">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="border p-2 w-100" v-for="(item, index) in items"
                >
                    <td>{{index + 1}}</td>
                    <td>
                        <mau-form-input-text
                                :key="'ItemFirstName' + index + 'a'"
                                :initialValue="hasInitialValues ? getInitialItem(item).first_name :  ''"
                                :label="''"
                                :name="'ITemFirstName' + index"
                                v-model="item.first_name"
                                :error="errors.has('ItemFirstName' + index) ? errors.first('ItemFirstName' + index) : ''"
                                :v-validate="'required'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >

                        </mau-form-input-text>
                    </td>
                    <td>
                        <mau-form-input-text
                                :key="'ItemLastName' + index + 'a'"
                                :initialValue="hasInitialValues ? getInitialItem(item).last_name :  ''"
                                :label="''"
                                :name="'ITemLastName' + index"
                                v-model="item.last_name"
                                :error="errors.has('ItemLastName' + index) ? errors.first('ItemLastName' + index) : ''"
                                :v-validate="'required'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >

                        </mau-form-input-text>
                    </td>
                    <td>
                        <a v-if="index !== 0" class="fa fa-close p-1" href="#" @click.prevent="removeItem(index)"></a>
                        <a v-else class="p-1">-</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      inject: ['$validator'],
      data () {
        return {
          items: []
        }
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        }
      },
      computed: {
        hasInitialValues: function () {
          return this.initialValues.length > 0
        }
      },
      created () {
        this.items = cloneDeep(this.initialValues)
      },
      methods: {
        addItem: function () {
          this.items.push({description: ''})
          this.refreshInput()
        },
        removeItem: function (index) {
          this.items.splice(index, 1)
          this.refreshInput()
        },
        getInitialItem: function (item) {
          if (!item.id) {
            return ''
          }
          let initialItem = this.initialValues.find(initialItemObj => { return initialItemObj.id === item.id })
          if (!initialItem) {
            return ''
          }
          return initialItem
        },
        refreshInput: function () {
          this.$emit('input', this.items)
        }
      }
    }
</script>