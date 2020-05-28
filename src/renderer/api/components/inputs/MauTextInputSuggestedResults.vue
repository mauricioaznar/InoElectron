<template>
    <div class="row">
        <div class="col-sm-6">
            Sugerencias ultima palabra
            <ul>
                <li v-for="result in filteredResultLastWord">{{result[searchedProperty]}}</li>
            </ul>
        </div>
        <div class="col-sm-6">
            Sugerencias toda las palabras
            <ul>
                <li v-for="result in filteredResultComplete">{{result[searchedProperty]}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    export default {
      data () {
        return {
          test: 'This is a test for a text',
          filteredResultLastWord: Array(10).fill(''),
          filteredResultComplete: Array(10).fill('')
        }
      },
      props: {
        entityEndpointName: {
          type: String,
          required: true
        },
        searchedProperty: {
          type: String,
          required: true
        },
        searchedValue: {
          type: String,
          required: true
        }
      },
      watch: {
        searchedValue: function (newSearchedValue) {
          let refactoredSearchedValues = newSearchedValue.split(' ')
          let refactoredSearchedValue = refactoredSearchedValues[refactoredSearchedValues.length - 1]
          let filteredResultLastWord = []
          GenericApiOperations.list(this.entityEndpointName, {filterLikes: {[this.searchedProperty]: refactoredSearchedValue}})
            .then(results => {
              for (let i = 0; i < 10; i++) {
                if (i < results.length) {
                  filteredResultLastWord.push(results[i])
                } else {
                  filteredResultLastWord.push('')
                }
              }
              this.filteredResultLastWord = filteredResultLastWord
            })
          let filteredResultComplete = []
          GenericApiOperations.list(this.entityEndpointName, {filterLikes: {[this.searchedProperty]: newSearchedValue}})
            .then(results => {
              for (let i = 0; i < 10; i++) {
                if (i < results.length) {
                  filteredResultComplete.push(results[i])
                } else {
                  filteredResultComplete.push('')
                }
              }
              this.filteredResultComplete = filteredResultComplete
            })
        }
      }
    }
</script>