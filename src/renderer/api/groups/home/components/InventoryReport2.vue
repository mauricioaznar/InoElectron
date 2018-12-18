<template>
    <div>
        <mau-spinner :sizeType="'router'" v-if="isLoading"></mau-spinner>
        <!--<h2 v-if="!isLoading">Inventario V2... Perro juega left 4 dead 2 conmigo hoy no seas rata</h2>-->
        <h2 v-if="!isLoading">Inventario V2</h2>
        <b-table :fields="inventoryProductsFields" :items="inventoryProductsItems" hover v-if="!isLoading">
            <template slot="show_details" slot-scope="row">
                <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Ocultar' : 'Mostrar'}} Detalles
                </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
                <table>
                    <tr>
                        <th>Pedido #</th>
                        <th>Cliente</th>
                        <th>Kilos solicitados</th>
                        <th>Kilos vendidos</th>
                        <th>Bultos solicitados</th>
                        <th>Bultos vendidos</th>
                    </tr>
                    <tr v-for="orderItem in row.item['order_items_not_finalized']">
                        <td class="mau-text-center">{{ orderItem['order_request_order_code']}}</td>
                        <td>{{ orderItem['company_name']}}</td>
                        <td class="mau-text-center">{{ orderItem['total_kilos_requested_not_finalized']}}</td>
                        <td class="mau-text-center">{{ orderItem['total_kilos_sold_given']}}</td>
                        <td class="mau-text-center">{{ orderItem['total_groups_requested_not_finalized']}}</td>
                        <td class="mau-text-center">{{ orderItem['total_groups_sold_given']}}</td>
                    </tr>
                </table>
            </template>
        </b-table>
    </div>
</template>

<script>
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import MauBarChart from 'renderer/components/mau-components/mau-chart/MauBarChart'
    import EntityTypes from 'renderer/api/EntityTypes'
    export default {
      data () {
        return {
          isLoading: true,
          timeout: '',
          interval: '',
          inventoryProductsItems: [],
          inventoryProductsFields: {
            description: {
              key: 'description',
              label: 'Nombre',
              tdClass: 'mau-text-left',
              sortable: true
            },
            code: {
              key: 'code',
              label: 'Codigo',
              tdClass: 'mau-text-left',
              sortable: true
            },
            total_kilos_in_inventory: {
              key: 'total_kilos_in_inventory',
              label: 'Kilos actuales',
              tdClass: 'mau-text-center',
              sortable: true
            },
            total_groups_in_inventory: {
              key: 'total_groups_in_inventory',
              label: 'Bultos actuales',
              tdClass: 'mau-text-center',
              sortable: true
            },
            total_kilos_requested_to_be_produced: {
              key: 'total_kilos_requested_to_be_produced',
              label: 'Kilos restantes por producir',
              tdClass: 'mau-text-center',
              sortable: true
            },
            total_groups_requested_to_be_produced: {
              key: 'total_groups_requested_to_be_produced',
              label: 'Bultos restantes por producir',
              tdClass: 'mau-text-center',
              sortable: true
            },
            total_kilos_requested_pending: {
              key: 'total_kilos_requested_pending',
              label: 'Kilos en pedidos pendientes',
              tdClass: 'mau-text-center',
              sortable: true
            },
            total_groups_requested_pending: {
              key: 'total_groups_requested_pending',
              label: 'Bultos en pedidos pendientes',
              tdClass: 'mau-text-center',
              sortable: true
            },
            show_details: {
              key: 'show_details',
              label: 'Detalles'
            }
          },
          chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            tooltips: { displayColors: false },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        }
      },
      components: {
        MauBarChart
      },
      created () {
        this.setInventory()
        // let vm = this
        // this.interval = setInterval(function () {
        // vm.setInventory()
        // }, 30000)
      },
      props: {
      },
      methods: {
        setInventory: function () {
          this.isLoading = true
          Promise.all([
            ApiOperations.getWithFilterExactWithoutPagination(EntityTypes.PRODUCT, {product_type_id: 1}),
            ApiOperations.getStats('bagInventory2')
          ]).then(results => {
            let inventoryProductsItems = []
            let products = results[0]
            let saleProducts = results[1]['saleProducts']
            let requestProducts = results[1]['requestProducts']
            let adjustmentProducts = results[1]['adjustmentProducts']
            let productionProducts = results[1]['productionProducts']
            products.forEach(productObj => {
              productObj['orderItemsNotFinalized'] = []
              saleProducts.filter(saleProductObj => saleProductObj['product_id'] === productObj['id']).forEach(saleProductObj => {
                if (!productObj['totalKilosSold']) {
                  productObj['totalKilosSold'] = 0
                }
                if (!productObj['totalGroupsSold']) {
                  productObj['totalGroupsSold'] = 0
                }
                productObj['totalKilosSold'] += saleProductObj['kilos']
                productObj['totalGroupsSold'] += saleProductObj['groups']
                if (!productObj['totalKilosSoldGiven']) {
                  productObj['totalKilosSoldGiven'] = 0
                }
                if (!productObj['totalGroupsSoldGiven']) {
                  productObj['totalGroupsSoldGiven'] = 0
                }
                if (saleProductObj['order_sale_status_id'] === 2) {
                  productObj['totalKilosSoldGiven'] += saleProductObj['kilos']
                  productObj['totalGroupsSoldGiven'] += saleProductObj['groups']
                }
                if (!productObj['totalKilosRequestedNotFinalizedGiven']) {
                  productObj['totalKilosRequestedNotFinalizedGiven'] = 0
                }
                if (!productObj['totalGroupsRequestedNotFinalizedGiven']) {
                  productObj['totalGroupsRequestedNotFinalizedGiven'] = 0
                }
                if (saleProductObj['order_request_status_id'] === 2 && saleProductObj['order_sale_status_id'] === 2) {
                  let orderItemObjFound = productObj['orderItemsNotFinalized'].find(orderItemObj => { return orderItemObj['order_request_order_code'] === saleProductObj['order_request_order_code'] })
                  if (orderItemObjFound) {
                    if (!orderItemObjFound['total_kilos_sold_given']) {
                      orderItemObjFound['total_kilos_sold_given'] = 0
                      orderItemObjFound['total_groups_sold_given'] = 0
                    }
                    orderItemObjFound['total_kilos_sold_given'] += saleProductObj['kilos']
                    orderItemObjFound['total_groups_sold_given'] += saleProductObj['groups']
                  } else {
                    productObj['orderItemsNotFinalized'].push({
                      'order_request_order_code': saleProductObj['order_request_order_code'],
                      'total_kilos_sold_given': saleProductObj['kilos'],
                      'total_groups_sold_given': saleProductObj['groups'],
                      'company_name': saleProductObj['company_name']
                    })
                  }
                }
              })
              requestProducts.filter(requestProductObj => requestProductObj['product_id'] === productObj['id']).forEach(requestProductObj => {
                if (!productObj['totalKilosRequested']) {
                  productObj['totalKilosRequested'] = 0
                }
                if (!productObj['totalGroupsRequested']) {
                  productObj['totalGroupsRequested'] = 0
                }
                productObj['totalKilosRequested'] += requestProductObj['kilos']
                productObj['totalGroupsRequested'] += requestProductObj['groups']
                if (!productObj['totalKilosRequestedPending']) {
                  productObj['totalKilosRequestedPending'] = 0
                }
                if (!productObj['totalGroupsRequestedPending']) {
                  productObj['totalGroupsRequestedPending'] = 0
                }
                if (requestProductObj['order_request_status_id'] === 1) {
                  productObj['totalKilosRequestedPending'] += requestProductObj['kilos']
                  productObj['totalGroupsRequestedPending'] += requestProductObj['groups']
                }
                if (!productObj['totalKilosRequestedInProduction']) {
                  productObj['totalKilosRequestedInProduction'] = 0
                }
                if (!productObj['totalGroupsRequestedInProduction']) {
                  productObj['totalGroupsRequestedInProduction'] = 0
                }
                if (requestProductObj['order_request_status_id'] === 2) {
                  let orderItemObjFound = productObj['orderItemsNotFinalized'].find(orderItemObj => { return orderItemObj['order_request_order_code'] === requestProductObj['order_request_order_code'] })
                  if (orderItemObjFound) {
                    if (!orderItemObjFound['total_kilos_requested_not_finalized']) {
                      orderItemObjFound['total_kilos_requested_not_finalized'] = 0
                      orderItemObjFound['total_groups_requested_not_finalized'] = 0
                    }
                    orderItemObjFound['total_kilos_requested_not_finalized'] += requestProductObj['kilos']
                    orderItemObjFound['total_groups_requested_not_finalized'] += requestProductObj['groups']
                  } else {
                    productObj['orderItemsNotFinalized'].push({
                      'order_request_order_code': requestProductObj['order_request_order_code'],
                      'total_kilos_requested_not_finalized': requestProductObj['kilos'],
                      'total_groups_requested_not_finalized': requestProductObj['groups'],
                      'company_name': requestProductObj['company_name']
                    })
                  }
                }
              })
              productionProducts.filter(productionProductObj => productionProductObj['product_id'] === productObj['id']).forEach(productionProductObj => {
                if (!productObj['totalKilosProduced']) {
                  productObj['totalKilosProduced'] = 0
                }
                if (!productObj['totalGroupsProduced']) {
                  productObj['totalGroupsProduced'] = 0
                }
                productObj['totalKilosProduced'] += productionProductObj['kilos']
                productObj['totalGroupsProduced'] += productionProductObj['groups']
              })
              adjustmentProducts.filter(adjustmentProductObj => adjustmentProductObj['product_id'] === productObj['id']).forEach(adjustmentProductObj => {
                if (!productObj['totalKilosAdjusted']) {
                  productObj['totalKilosAdjusted'] = 0
                }
                if (!productObj['totalGroupsAdjusted']) {
                  productObj['totalGroupsAdjusted'] = 0
                }
                productObj['totalKilosAdjusted'] += adjustmentProductObj['kilos']
                productObj['totalGroupsAdjusted'] += adjustmentProductObj['groups']
              })
              productObj['totalKilosInInventory'] =
                (productObj['totalKilosProduced'] ? productObj['totalKilosProduced'] : 0) +
                (productObj['totalKilosAdjusted'] ? productObj['totalKilosAdjusted'] : 0) -
                (productObj['totalKilosSoldGiven'] ? productObj['totalKilosSoldGiven'] : 0)
              productObj['totalGroupsInInventory'] =
                (productObj['totalGroupsProduced'] ? productObj['totalGroupsProduced'] : 0) +
                (productObj['totalGroupsAdjusted'] ? productObj['totalGroupsAdjusted'] : 0) -
                (productObj['totalGroupsSoldGiven'] ? productObj['totalGroupsSoldGiven'] : 0)
              productObj['totalKilosRequestedToBeProduced'] = 0
              productObj['totalGroupsRequestedToBeProduced'] = 0
              productObj['orderItemsNotFinalized'].forEach(orderItemNotFinalizedObj => {
                if (orderItemNotFinalizedObj['total_kilos_requested_not_finalized']) {
                  if (orderItemNotFinalizedObj['total_kilos_sold_given']) {
                    if (orderItemNotFinalizedObj['total_kilos_requested_not_finalized'] > orderItemNotFinalizedObj['total_kilos_sold_given']) {
                      productObj['totalKilosRequestedToBeProduced'] += (orderItemNotFinalizedObj['total_kilos_requested_not_finalized'] - orderItemNotFinalizedObj['total_kilos_sold_given'])
                      productObj['totalGroupsRequestedToBeProduced'] += (orderItemNotFinalizedObj['total_groups_requested_not_finalized'] - orderItemNotFinalizedObj['total_groups_sold_given'])
                    }
                  } else {
                    productObj['totalKilosRequestedToBeProduced'] += orderItemNotFinalizedObj['total_kilos_requested_not_finalized']
                    productObj['totalGroupsRequestedToBeProduced'] += orderItemNotFinalizedObj['total_groups_requested_not_finalized']
                  }
                }
              })
              if (productObj.id === 12) {
                console.log(productObj)
              }
              if ((productObj['totalKilosInInventory'] > 0.01 || productObj['totalKilosInInventory'] < -0.01) || productObj['totalKilosRequestedToBeProduced'] > 0.01 || productObj['totalKilosRequestedPending'] > 0.01) {
                inventoryProductsItems.push({
                  'code': productObj.code,
                  'description': productObj.description,
                  'total_kilos_requested': productObj['totalKilosRequested'] ? Math.round(productObj['totalKilosRequested'] * 100) / 100 : 0,
                  'total_groups_requested': productObj['totalGroupsRequested'] ? Math.round(productObj['totalGroupsRequested'] * 100) / 100 : 0,
                  'total_kilos_requested_pending': productObj['totalKilosRequestedPending'] ? Math.round(productObj['totalKilosRequestedPending'] * 100) / 100 : 0,
                  'total_groups_requested_pending': productObj['totalGroupsRequestedPending'] ? Math.round(productObj['totalGroupsRequestedPending'] * 100) / 100 : 0,
                  'total_kilos_sold': productObj['totalKilosSold'] ? Math.round(productObj['totalKilosSold'] * 100) / 100 : 0,
                  'total_groups_sold': productObj['totalGroupsSold'] ? Math.round(productObj['totalGroupsSold'] * 100) / 100 : 0,
                  'total_kilos_produced': productObj['totalKilosProduced'] ? Math.round(productObj['totalKilosProduced'] * 100) / 100 : 0,
                  'total_groups_produced': productObj['totalGroupsProduced'] ? Math.round(productObj['totalGroupsProduced'] * 100) / 100 : 0,
                  'total_kilos_adjusted': productObj['totalKilosAdjusted'] ? Math.round(productObj['totalKilosAdjusted'] * 100) / 100 : 0,
                  'total_groups_adjusted': productObj['totalGroupsAdjusted'] ? Math.round(productObj['totalGroupsAdjusted'] * 100) / 100 : 0,
                  'total_kilos_in_inventory': productObj['totalKilosInInventory'] ? Math.round(productObj['totalKilosInInventory'] * 100) / 100 : 0,
                  'total_groups_in_inventory': productObj['totalGroupsInInventory'] ? Math.round(productObj['totalGroupsInInventory'] * 100) / 100 : 0,
                  'total_kilos_sold_given': productObj['totalKilosSoldGiven'] ? Math.round(productObj['totalKilosSoldGiven'] * 100) / 100 : 0,
                  'total_kilos_requested_in_production': productObj['totalKilosRequestedInProduction'] ? Math.round(productObj['totalKilosRequestedInProduction'] * 100) / 100 : 0,
                  'total_groups_requested_in_production': productObj['totalGroupsRequestedInProduction'] ? Math.round(productObj['totalGroupsRequestedInProduction'] * 100) / 100 : 0,
                  'total_kilos_requested_not_finalized_given': productObj['totalKilosRequestedNotFinalizedGiven'] ? Math.round(productObj['totalKilosRequestedNotFinalizedGiven'] * 100) / 100 : 0,
                  'total_groups_requested_not_finalized_given': productObj['totalGroupsRequestedNotFinalizedGiven'] ? Math.round(productObj['totalGroupsRequestedNotFinalizedGiven'] * 100) / 100 : 0,
                  'total_kilos_requested_to_be_produced': productObj['totalKilosRequestedToBeProduced'] ? Math.round(productObj['totalKilosRequestedToBeProduced'] * 100) / 100 : 0,
                  'total_groups_requested_to_be_produced': productObj['totalGroupsRequestedToBeProduced'] ? Math.round(productObj['totalGroupsRequestedToBeProduced'] * 100) / 100 : 0,
                  'order_items_not_finalized': productObj['orderItemsNotFinalized']
                })
              }
            })
            console.log(inventoryProductsItems.length)
            this.inventoryProductsItems = inventoryProductsItems
            let vm = this
            this.timeout = setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
        }
      },
      beforeDestroy: function () {
        clearTimeout(this.timeout)
      },
      watch: {
        inventoryProductsItems: function (inventoryProducts) {
          console.log(inventoryProducts.length)
        }
      }
    }
</script>