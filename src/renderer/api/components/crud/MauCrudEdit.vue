<template>
  <div>
    <slot :saveFunction="saveFunction"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/api/functions/GenericApiOperations'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import Notifications from 'renderer/api/functions/Notifications'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  export default {
    name: 'MauCrudEdit',
    data () {
      return {
      }
    },
    props: {
      id: {
        required: true
      },
      callback: {
        type: Function,
        required: true
      },
      entityType: {
        type: Object,
        required: true
      },
      relationshipIdName: {
        type: String
      }
    },
    methods: {
      saveFunction: function (entityObject, relayObjects) {
        ApiFunctions.edit(this.entityType.apiName, this.id, entityObject)
          .then(
            result => {
              for (let relayObjectIndex = 0; relayObjectIndex < relayObjects.length; relayObjectIndex++) {
                let filteredM2MObjects = ManyToManyHelper.getRelayObjectFilteredM2MObjects(relayObjects[relayObjectIndex])
                let entityType = ManyToManyHelper.getRelayObjectEntityType(relayObjects[relayObjectIndex])
                for (let createFilteredObjectsIndex = 0; createFilteredObjectsIndex < filteredM2MObjects.create.length; createFilteredObjectsIndex++) {
                  let createRelatedEntityObject = filteredM2MObjects.create[createFilteredObjectsIndex]
                  createRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.create(entityType.apiName, createRelatedEntityObject)
                }
                for (let editFilteredObjectsIndex = 0; editFilteredObjectsIndex < filteredM2MObjects.edit.length; editFilteredObjectsIndex++) {
                  let editRelatedEntityObject = filteredM2MObjects.edit[editFilteredObjectsIndex]
                  editRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.edit(entityType.apiName, editRelatedEntityObject[GlobalEntityIdentifier], editRelatedEntityObject)
                }
                for (let delFilteredObjectsIndex = 0; delFilteredObjectsIndex < filteredM2MObjects.del.length; delFilteredObjectsIndex++) {
                  let delRelatedEntityObject = filteredM2MObjects.del[delFilteredObjectsIndex]
                  delRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.del(entityType.apiName, delRelatedEntityObject[GlobalEntityIdentifier], delRelatedEntityObject)
                }
              }
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
              this.callback()
            })
          .catch(
            error => {
              console.log(error)
              FormSubmitEventBus.emitEvent(false)
              Notifications.error(this, error)
            }
          )
      }
    }
  }
</script>
