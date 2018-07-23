<template>
  <div>
    <slot :save="saveEntity"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import Notifications from 'renderer/services/api/Notifications'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/services/form/ManyToManyHelper'
  export default {
    name: 'MauCrudCreate',
    data () {
      return {
      }
    },
    created () {
    },
    props: {
      entityType: {
        type: Object,
        required: true
      },
      callback: {
        required: true,
        type: Function
      },
      relationshipIdName: {
        type: String
      }
    },
    methods: {
      saveEntity: function (entityObject, relayObjects) {
        ApiFunctions.create(this.entityType, entityObject)
          .then(
            result => {
              let hostCreatedIdentifier = result[GlobalEntityIdentifier]
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
              for (let i = 0; i < relayObjects.length; i++) {
                let filteredM2MObjects = ManyToManyHelper.getRelayObjectFilteredM2MObjects(relayObjects[i])
                let entityType = ManyToManyHelper.getRelayObjectEntityType(relayObjects[i])
                for (let j = 0; j < filteredM2MObjects.create.length; j++) {
                  let createRelatedEntityObject = filteredM2MObjects.create[j]
                  createRelatedEntityObject[this.relationshipIdName] = hostCreatedIdentifier
                  ApiFunctions.create(entityType, createRelatedEntityObject)
                }
              }
              this.callback()
            })
          .catch(
            error => {
              FormSubmitEventBus.emitEvent(false)
              Notifications.error(this, error)
            }
          )
      }
    }
  }
</script>

<style lang="scss">

</style>
