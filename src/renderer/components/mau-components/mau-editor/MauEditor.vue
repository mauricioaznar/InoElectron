<template>
    <div>
        <vue-editor class="py-2" :id="id" v-model="htmlText" :editorToolbar="customToolbar">
        </vue-editor>
    </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import isDefined from 'renderer/services/common/isDefined'
  export default {
    name: 'MauEditor',
    data () {
      return {
        htmlText: '',
        customToolbar: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' }
          ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }]
        ]
      }
    },
    components: {
      VueEditor
    },
    props: {
      initialValue: {
        type: String
      },
      id: {
        required: true
      }
    },
    created () {
      this.setInitialValue()
    },
    methods: {
      setInitialValue: function () {
        if (isDefined(this.initialValue)) {
          this.htmlText = this.initialValue
        }
      }
    },
    watch: {
      htmlText: function (newHtmlText) {
        if (newHtmlText === '<p><br></p>' || newHtmlText === '<p></p>') {
          this.$emit('input', '')
        } else {
          this.$emit('input', newHtmlText)
        }
      },
      initialValue: function (newInitialValue) {
        this.htmlText = newInitialValue
      }
    }
  }
</script>

<style lang="scss">

</style>
