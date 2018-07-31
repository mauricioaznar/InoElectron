<template>
    <div>

    </div>
</template>

<script>
  import ApiOperations from 'renderer/api/functions/ApiOperations'
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
      ApiOperations.getById(this.entityType, this.id).then(result => {
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
