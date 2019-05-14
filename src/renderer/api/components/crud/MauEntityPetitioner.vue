<template>
    <div>

    </div>
</template>

<script>
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  export default {
    name: 'MauEntityPetitioner',
    data () {
      return {
        entity: '',
        show: true
      }
    },
    props: {
      id: {
        required: true
      },
      entityType: {
        type: Object,
        required: true
      }
    },
    created () {
      GenericApiOperations.getById(this.entityType.apiName, this.id).then(result => {
        this.entity = result
      })
    },
    components: {
    },
    methods: {
    },
    watch: {
      entity: function (entityObj) {
        this.$emit('entityResult', entityObj)
      }
    }
  }
</script>
