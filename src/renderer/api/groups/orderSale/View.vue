<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
    <a
            v-if="entity && isOrderRequestCompleted"
            :active-class="'active'"
            class="btn btn-primary ml-2"
            :href="receiptPdfUrl"
    >
      <span :class="'fa fa-file-pdf-o'"> </span>
      Imprimir remision
    </a>
  </div>
</template>

<script>
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ViewOrderSale',
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    data () {
      return {
        receiptPdfUrl: ApiUrls.createPdfDownloadUrl(this.$route.params[GlobalEntityIdentifier]),
        properties: [
          {
            title: OrderSalePropertiesReference.ORDER_CODE.title,
            name: OrderSalePropertiesReference.ORDER_CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderSalePropertiesReference.DATE.title,
            name: OrderSalePropertiesReference.DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderSalePropertiesReference.RECEIPT_TYPE.title,
            name: OrderSalePropertiesReference.RECEIPT_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: 'Productos',
            name: OrderSalePropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getProducts
          },
          {
            title: OrderSalePropertiesReference.CLIENT.title,
            name: OrderSalePropertiesReference.CLIENT.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: OrderSalePropertiesReference.COMPANY.title,
            name: OrderSalePropertiesReference.COMPANY.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: OrderSalePropertiesReference.ORDER_SALE_STATUS.title,
            name: OrderSalePropertiesReference.ORDER_SALE_STATUS.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: OrderSalePropertiesReference.ORDER_REQUEST.title,
            name: OrderSalePropertiesReference.ORDER_REQUEST.name,
            display: DisplayFunctions.getPropertyFromObject,
            arguments: ['order_code']
          },
          {
            title: OrderSalePropertiesReference.TOTAL_COST.title,
            name: OrderSalePropertiesReference.TOTAL_COST.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.title,
            name: OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.name,
            display: DisplayFunctions.getNameFromObject
          }
        ],
        entityType: EntityTypes.ORDER_SALE_RECEIPT,
        entity: null
      }
    },
    computed: {
      isOrderRequestCompleted: function () {
        return this.entity && this.entity.order_request.order_request_status_id === 3
      }
    },
    props: {
      id: null
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
        let orderSaleCollectionStatusId = entityObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name]
        if (orderSaleCollectionStatusId === 2) {
          this.properties.push({
            title: OrderSalePropertiesReference.AMOUNT_COLLECTED.title,
            name: OrderSalePropertiesReference.AMOUNT_COLLECTED.name,
            display: DisplayFunctions.getValue
          })
        }
      }
    }
  }
</script>
