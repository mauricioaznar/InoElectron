<template>
    <mau-property-viewer :entity="persona" :properties="properties"></mau-property-viewer>
</template>

<script>
    import PropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
    import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
    import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
    export default {
      name: 'MauPersonaView',
      components: {
        MauPropertyViewer
      },
      data () {
        return {
          entity: null,
          properties: [
            {
              name: PropertiesReference.COMPANYNAME.name,
              title: PropertiesReference.COMPANYNAME.title,
              display: DisplayFunctions.getValue
            }
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