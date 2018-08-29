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
                    <tr v-for="(item, index) in checks">
                        <td>
                            <b-form-checkbox
                                    :disabled="!userHasWritePrivileges"
                                    :key="'productionEventCheckTable_checkbox' + index"
                                    v-model="item._done"
                                    @input="itemChanged(item)">
                            </b-form-checkbox>
                        </td>
                        <td>
                            <mau-form-input-text
                                    :name="'productionEventCheckTable_name' + index"
                                    :key="'productionEventCheckTable_name' + index"
                                    :error="errors.first('productionEventCheckTable_name' + index)"
                                    v-model="item._name"
                                    :initialValue="getItemInitialName(item)"
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
    import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      data () {
        return {
          checks: []
        }
      },
      inject: ['$validator'],
      props: {
        initialChecks: {
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
        if (this.initialChecks.length > 0) {
          let initialChecksMod = []
          for (let i = 0; i < this.initialChecks.length; i++) {
            let initialCheckObj = cloneDeep(this.initialChecks[i])
            initialCheckObj._name = initialCheckObj.name
            initialCheckObj._done = initialCheckObj.completed === 1
            initialChecksMod.push(initialCheckObj)
          }
          this.checks = initialChecksMod
        }
      },
      components: {
        MauFormInputText
      },
      methods: {
        addItem: function () {
          this.checks.push({_initialName: ''})
          this.checksUpdate()
        },
        removeItem: function (item) {
          this.checks = this.checks.filter(checkObj => {
            return checkObj !== item
          })
          this.checksUpdate()
        },
        getItemInitialName: function (item) {
          let initialItemFound
          if (item[GlobalEntityIdentifier] > 0) {
            initialItemFound = this.checks.find(checkObj => {
              return checkObj[GlobalEntityIdentifier] === item[GlobalEntityIdentifier]
            })
          }
          return initialItemFound ? initialItemFound.name : ''
        },
        itemChanged: function (item) {
          item.name = item._name
          item.completed = item._done ? 1 : 0
          this.checksUpdate()
        },
        checksUpdate: function () {
          this.$emit('input', this.checks)
        }
      }
    }
</script>