<template>
    <mau-entity-view :entity="persona" :propertiesReference="propertiesReference"></mau-entity-view>
</template>

<script>
    import PropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
    export default {
      name: 'MauPersonaView',
      data () {
        return {
          entity: null,
          propertiesReference: [
            PropertiesReference.COMPANYNAME,
            PropertiesReference.ID,
            PropertiesReference.FIRSTNAME,
            PropertiesReference.LASTNAME,
            PropertiesReference.COUNTRY,
            PropertiesReference.CITY,
            PropertiesReference.ADDRESS1,
            PropertiesReference.EMAIL,
            PropertiesReference.HOUSEPHONE,
            PropertiesReference.CELLPHONE
          ]
        }
      },
      props: {
        persona: {
          type: Object,
          required: true
        }
      }
}
</script>