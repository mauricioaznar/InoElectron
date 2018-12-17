<template>
    <div class="card">
        <div class="card-block">
            <div class="card-title">
                <h6>{{title}}</h6>
            </div>
            <div class="card-text">
                <div v-html="body">
                </div>
                <div v-if="footer" class="w-100 text-right">
                    <small class="text-muted">
                        {{footer}}
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'MauCard',
    data () {
      return {
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      footer: {
        type: String
      }
    }
  }
</script>
