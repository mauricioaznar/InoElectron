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
  export default {
    name: 'MauPersonaDataTable',
    data () {
      return {
        tableFields: [
          {
            name: PersonaPropertiesReference.COMPANYNAME.name,
            title: PersonaPropertiesReference.COMPANYNAME.title,
            sortField: PersonaPropertiesReference.COMPANYNAME.name,
            filter: true
          },
          {
            name: PersonaPropertiesReference.EMAIL.name,
            title: PersonaPropertiesReference.EMAIL.title,
            sortField: PersonaPropertiesReference.EMAIL.name,
            filter: true
          },
          {
            name: PersonaPropertiesReference.FIRSTNAME.name,
            title: PersonaPropertiesReference.FIRSTNAME.title,
            sortField: PersonaPropertiesReference.FIRSTNAME.name,
            filter: true
          },
          {
            name: PersonaPropertiesReference.LASTNAME.name,
            title: PersonaPropertiesReference.LASTNAME.title,
            sortField: PersonaPropertiesReference.LASTNAME.name,
            filter: true
          },
          {
            name: PersonaPropertiesReference.HOUSEPHONE.name,
            title: PersonaPropertiesReference.HOUSEPHONE.title,
            sortField: PersonaPropertiesReference.HOUSEPHONE.name,
            filter: true
          },
          {
            name: PersonaPropertiesReference.CELLPHONE.name,
            title: PersonaPropertiesReference.CELLPHONE.title,
            sortField: PersonaPropertiesReference.CELLPHONE.name,
            filter: true
          }
        ]
      }
    },
    components: {
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      actions: Array,
      actionClicked: Function
    }
  }
</script>
