<template>
  <div v-if="entity">
    <slot :entity="entity" :saveFunction="saveFunction"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import Notifications from 'renderer/services/api/Notifications'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/services/form/ManyToManyHelper'
  export default {
    name: 'MauCrudEdit',
    data () {
      return {
        entity: null
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
    created () {
      this.entity = this.$store.getters.requestedEntity
    },
    components: {

    },
    methods: {
      saveFunction: function (entityObject, relayObjects) {
        ApiFunctions.edit(this.entityType, this.id, entityObject)
          .then(
            result => {
              for (let relayObjectIndex = 0; relayObjectIndex < relayObjects.length; relayObjectIndex++) {
                let filteredM2MObjects = ManyToManyHelper.getRelayObjectFilteredM2MObjects(relayObjects[relayObjectIndex])
                let entityType = ManyToManyHelper.getRelayObjectEntityType(relayObjects[relayObjectIndex])
                for (let createFilteredObjectsIndex = 0; createFilteredObjectsIndex < filteredM2MObjects.create.length; createFilteredObjectsIndex++) {
                  let createRelatedEntityObject = filteredM2MObjects.create[createFilteredObjectsIndex]
                  createRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.create(entityType, createRelatedEntityObject)
                }
                for (let editFilteredObjectsIndex = 0; editFilteredObjectsIndex < filteredM2MObjects.edit.length; editFilteredObjectsIndex++) {
                  let editRelatedEntityObject = filteredM2MObjects.edit[editFilteredObjectsIndex]
                  editRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.edit(entityType, editRelatedEntityObject[GlobalEntityIdentifier], editRelatedEntityObject)
                }
                for (let delFilteredObjectsIndex = 0; delFilteredObjectsIndex < filteredM2MObjects.edit.length; delFilteredObjectsIndex++) {
                  let delRelatedEntityObject = filteredM2MObjects.edit[delFilteredObjectsIndex]
                  delRelatedEntityObject[this.relationshipIdName] = this.id
                  ApiFunctions.edit(entityType, delRelatedEntityObject[GlobalEntityIdentifier], delRelatedEntityObject)
                }
              }
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
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
