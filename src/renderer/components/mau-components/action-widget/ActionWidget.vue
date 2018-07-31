<template>
  <div class="action-widget widget">
    <div class="widget-header w-100 d-flex justify-content-end align-content-center align-items-center">
      <div class="widget-buttons">
        <a
                v-for="(action, index) in actions"
                :active-class="'active'"
                class="icon-button ml-2"
                href="#"
                v-on:keyup.enter="actionClickedHandler(action)"
                @click="actionClickedHandler(action)"
                :tabindex="index"
                :key="index">
          <span :class="action.icon"></span>
        </a>
        <a
                v-for="(urlAction, index) in urlActions"
                :active-class="'active'"
                class="icon-button ml-2"
                :href="urlAction.url"
                :key="index + actions.length">
          <span :class="urlAction.icon"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActionWidget',
    data () {
      return {
      }
    },
    props: {
      actions: {
        type: Array,
        required: true,
        validator: function (array) {
          let isValid = true
          for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
            let arrayElement = array[arrayIndex]
            if (!arrayElement.hasOwnProperty('name')) {
              console.error('Array element ' + arrayIndex + ' has to implement')
              isValid = false
            }
            if (!arrayElement.hasOwnProperty('icon')) {
              console.error('Array element ' + arrayIndex + 'has to implement icon')
              isValid = false
            }
          }
          return isValid
        }
      },
      urlActions: {
        type: Array,
        validator: function (array) {
          let isValid = true
          for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
            let arrayElement = array[arrayIndex]
            if (!arrayElement.hasOwnProperty('name')) {
              console.error('Array element ' + arrayIndex + ' has to implement')
              isValid = false
            }
            if (!arrayElement.hasOwnProperty('icon')) {
              console.error('Array element ' + arrayIndex + 'has to implement icon')
              isValid = false
            }
            if (!arrayElement.hasOwnProperty('url')) {
              console.error('Array element ' + arrayIndex + 'has to implement url')
              isValid = false
            }
          }
          return isValid
        }
      }
    },
    methods: {
      actionClickedHandler: function (action) {
        this.$emit('actionClicked', action)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .action-widget {
    background: $widget-bg;
    box-shadow: $widget-box-shadow;
    margin-bottom: $widget-mb;
    padding: 0.5rem 1rem;
  }
</style>
