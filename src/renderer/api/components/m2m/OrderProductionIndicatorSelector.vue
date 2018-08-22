<template>
    <div></div>
</template>

<script>
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      data () {
        return {
          productionIndicators: []
        }
      },
      props: {
        selectedIndicators: {
          type: Array,
          required: true
        },
        initialIndicators: {
          type: Array,
          required: true
        }
      },
      methods: {
        updateValue: function () {
          this.$emit('input', this.productionIndicators)
        },
        getInitialProductionIndicator: function (indicatorId) {
          let initialIndicator = this.initialIndicators.find(indicatorObj => {
            return indicatorObj[GlobalEntityIdentifier] === indicatorId
          })
          return initialIndicator ? initialIndicator.pivot : null
        }
      },
      watch: {
        selectedIndicators: function () {
          let tempProductionIndicators = []
          for (let i = 0; i < this.selectedIndicators.length; i++) {
            let indicator = this.selectedIndicators[i]
            let productionIndicator = this.getInitialProductionIndicator(indicator[GlobalEntityIdentifier])
            if (productionIndicator) {
              productionIndicator = cloneDeep(productionIndicator)
            } else {
              productionIndicator = {}
              productionIndicator['production_indicator_id'] = indicator[GlobalEntityIdentifier]
            }
            tempProductionIndicators.push(productionIndicator)
          }
          this.productionIndicators = tempProductionIndicators
          this.updateValue()
        }
      }
    }

</script>