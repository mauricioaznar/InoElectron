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
  import CompanyPropertiesReference from 'renderer/api/propertiesReference/CompanyPropertiesReference'
  export default {
    name: 'ViewCompany',
    data () {
      return {
        entity: null,
        entityType: EntityType.COMPANY,
        properties: [
          {
            title: CompanyPropertiesReference.NAME.title,
            name: CompanyPropertiesReference.NAME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.ABBREVIATION.title,
            name: CompanyPropertiesReference.ABBREVIATION.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.ADDRESS1.title,
            name: CompanyPropertiesReference.ADDRESS1.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.HOUSE_PHONE.title,
            name: CompanyPropertiesReference.HOUSE_PHONE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.COUNTRY.title,
            name: CompanyPropertiesReference.COUNTRY.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.CITY.title,
            name: CompanyPropertiesReference.CITY.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.ZIP_CODE.title,
            name: CompanyPropertiesReference.ZIP_CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: CompanyPropertiesReference.CLIENTS.title,
            name: CompanyPropertiesReference.CLIENTS.name,
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
