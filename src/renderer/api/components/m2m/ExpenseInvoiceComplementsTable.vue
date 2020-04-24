<template>
    <div>
        <div>
            <label>To-do</label>
        </div>
        <div>
            <table class="mau-table table table-striped">
                <thead>
                    <tr>
                        <th>
                            ¿Completado?
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in complements">
                        <td>
                            <mau-form-input-check-box
                                    :disabled="!userHasWritePrivileges"
                                    :key="'productionEventCheckTable_checkbox' + index"
                                    :initialValue="getInitialComplement(item) ? getInitialComplement(item).delivered : 0"
                                    v-model="item.delivered"
                                    @input="itemChanged(item)">
                            </mau-form-input-check-box>
                        </td>
                        <td>
                            <mau-form-input-text
                                    :name="'productionEventCheckTable_name' + index"
                                    :key="'productionEventCheckTable_name' + index"
                                    :error="errors.has('productionEventCheckTable_name' + index) ? errors.first('productionEventCheckTable_name' + index) : ''"
                                    v-model="item.name"
                                    :initialValue="getInitialComplement(item) ? getInitialComplement(item).name : ''"
                                    v-validate="'required'"
                                    @input="itemChanged(item)"
                            >

                            </mau-form-input-text>
                        </td>
                        <td>
                            <a href="#" class="icon-button danger" @click.prevent="removeItem(item)">
                                <span class="fa fa-close"></span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <a href="#" class="icon-button" @click.prevent="addItem">
                                <span class="fa fa-plus"></span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      data () {
        return {
          complements: [],
          initialComplements: []
        }
      },
      inject: ['$validator'],
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        value: {
          type: Array
        },
        userHasWritePrivileges: {
          type: Boolean,
          default: function () {
            return true
          }
        },
        error: {
          type: String,
          default: function () {
            return ''
          }
        }
      },
      created () {
        this.complements = cloneDeep(this.initialValues)
        this.initialComplements = cloneDeep(this.initialValues)
      },
      components: {
      },
      methods: {
        addItem: function () {
          this.complements.push({})
          this.complementsUpdate()
        },
        removeItem: function (item) {
          this.complements = this.complements.filter(checkObj => {
            return checkObj !== item
          })
          this.complementsUpdate()
        },
        getInitialComplement: function (item) {
          let initialItemFound
          if (item[GlobalEntityIdentifier] > 0) {
            initialItemFound = this.complements.find(checkObj => {
              return checkObj[GlobalEntityIdentifier] === item[GlobalEntityIdentifier]
            })
          }
          return initialItemFound
        },
        itemChanged: function (item) {
          this.complementsUpdate()
        },
        complementsUpdate: function () {
          this.$emit('input', this.complements)
        }
      }
    }
</script>
