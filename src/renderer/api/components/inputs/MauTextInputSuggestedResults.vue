<template>
    <div>
        Sugerencias
        <ul>
            <li v-for="result in filteredResults">{{result[searchedProperty]}}</li>
        </ul>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    export default {
      data () {
        return {
          test: 'This is a test for a text',
          filteredResults: []
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
          let filteredResults = []
          GenericApiOperations.list(this.entityEndpointName, {filterLikes: {[this.searchedProperty]: refactoredSearchedValue}})
            .then(results => {
              console.log(results)
              for (let i = 0; i < 10; i++) {
                if (i < results.length) {
                  filteredResults.push(results[i])
                } else {
                  filteredResults.push('')
                }
              }
              this.filteredResults = filteredResults
            })
        }
      }
    }
</script>