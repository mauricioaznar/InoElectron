<template>
  <div class="container">
      <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
      <mau-entity-petitioner
              :id="id"
              :entityType="entityType"
              @entityResult="entityResultHandler"
      >
      </mau-entity-petitioner>
      <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import PersonaView from 'renderer/api/components/template/PersonaView.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  export default {
    name: 'ViewClient',
    data () {
      return {
        entity: null,
        entityType: EntityType.CLIENT,
        properties: [
          {
            title: ClientPropertiesReference.NAME.title,
            name: ClientPropertiesReference.NAME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.ABBREVIATION.title,
            name: ClientPropertiesReference.ABBREVIATION.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.ADDRESS1.title,
            name: ClientPropertiesReference.ADDRESS1.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.HOUSE_PHONE.title,
            name: ClientPropertiesReference.HOUSE_PHONE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.COUNTRY.title,
            name: ClientPropertiesReference.COUNTRY.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.CITY.title,
            name: ClientPropertiesReference.CITY.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.ZIP_CODE.title,
            name: ClientPropertiesReference.ZIP_CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ClientPropertiesReference.CONTACTS.title,
            name: ClientPropertiesReference.CONTACTS.name,
            display: DisplayFunctions.getPersonaArray
          }
        ]
      }
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
      MauPropertyViewer,
      PersonaView
    },
    props: {
      id: null
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>

<style lang="scss">

</style>
