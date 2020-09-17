<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'productList'"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/ProductPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListProduct',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.PRODUCT.apiName, {paginate: true}),
        tableFields: [
          {
            name: PropertiesReference.PRODUCT_TYPE.name,
            title: PropertiesReference.PRODUCT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.PRODUCT_TYPE.name,
            entityFieldName: 'name'
          },
          {
            name: PropertiesReference.CODE.name,
            title: PropertiesReference.CODE.title,
            filterType: 'text',
            dataClass: 'text-center'
          },
          {
            name: PropertiesReference.DESCRIPTION.name,
            title: PropertiesReference.DESCRIPTION.title,
            filterType: 'text',
            dataClass: 'text-center'
          },
          {
            name: PropertiesReference.MATERIAL.name,
            title: PropertiesReference.MATERIAL.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.MATERIAL.name,
            entityFieldName: 'name'
          },
          {
            name: PropertiesReference.PACKING.name,
            title: PropertiesReference.PACKING.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.PACKING.name,
            entityFieldName: 'name'
          },
          {
            name: PropertiesReference.CURRENT_KILO_PRICE.name,
            title: PropertiesReference.CURRENT_KILO_PRICE.title,
            filterType: 'text'
          },
          {
            name: PropertiesReference.WIDTH.name,
            title: PropertiesReference.WIDTH.title,
            filterType: 'text'
          },
          {
            name: PropertiesReference.CALIBRE.name,
            title: PropertiesReference.CALIBRE.title,
            filterType: 'text'
          },
          {
            name: PropertiesReference.LENGTH.name,
            title: PropertiesReference.LENGTH.title,
            filterType: 'text'
          },
          {
            name: PropertiesReference.CURRENT_GROUP_WEIGHT.name,
            title: PropertiesReference.CURRENT_GROUP_WEIGHT.title,
            filterType: 'text'
          }
        ],
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ]
      }
    },
    components: {
      MauDataTable
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewProduct',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
