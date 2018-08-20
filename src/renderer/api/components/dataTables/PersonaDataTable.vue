<template>
    <div>
        <mau-data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :actions="actions"
                        @actionClicked="actionClicked"
        >
        </mau-data-table>
    </div>
</template>

<script>
  import PersonaPropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'MauPersonaDataTable',
    data () {
      return {
        tableFields: []
      }
    },
    created () {
      this.tableFields = [
        {
          name: PersonaPropertiesReference.EMAIL.name,
          title: PersonaPropertiesReference.EMAIL.title,
          sortField: PersonaPropertiesReference.EMAIL.name,
          filter: true
        },
        {
          name: PersonaPropertiesReference.FIRST_NAME.name,
          title: PersonaPropertiesReference.FIRST_NAME.title,
          sortField: PersonaPropertiesReference.FIRST_NAME.name,
          filter: true
        },
        {
          name: PersonaPropertiesReference.LAST_NAME.name,
          title: PersonaPropertiesReference.LAST_NAME.title,
          sortField: PersonaPropertiesReference.LAST_NAME.name,
          filter: true
        },
        {
          name: PersonaPropertiesReference.CELLPHONE.name,
          title: PersonaPropertiesReference.CELLPHONE.title,
          sortField: PersonaPropertiesReference.CELLPHONE.name,
          filter: true
        }
      ]
      if (this.clientMode) {
        this.tableFields.push({
          name: ClientPropertiesReference.COMPANY.name,
          title: ClientPropertiesReference.COMPANY.title,
          callback: DisplayFunctions.getNameFromObject
        })
      }
    },
    components: {
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      clientMode: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      actions: Array,
      actionClicked: Function
    }
  }
</script>
