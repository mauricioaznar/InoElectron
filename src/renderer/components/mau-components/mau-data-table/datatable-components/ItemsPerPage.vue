<template>
  <div class="form-group dropdown" v-dropdown.closeOnMenuClick>
    <button id="itemsPerPageBtn" class="btn btn-primary btn-micro dropdown-toggle" type="button"
            data-toggle="dropdown">
      {{selected}} <span class="hidden-md-down">por pagina</span>
      <i class="ion-chevron-down arrow-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <div class="dropdown-menu-content">
        <a class="dropdown-item" v-for="option in options" @click="selectedItemsPerPage(option.value)">
          {{option.value}}<span class="hidden-md-down">por pagina</span></a>
      </div>
    </div>
  </div>

</template>

<script>
  import Dropdown from '../../../../directives/Dropdown'

  export default {
    directives: {
      Dropdown
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      defaultPerPage: {
        type: Number
      }
    },
    data () {
      return {
        selected: this.defaultPerPage
      }
    },
    methods: {
      selectedItemsPerPage (optionValue) {
        this.selected = optionValue
        this.$emit('items-per-page', this.selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";
  .btn.dropdown-toggle, .dropdown-menu {
    min-width: 6rem;
    max-width: 6rem;
  }
  .dropdown-item, .dropdown-toggle {
    text-transform: uppercase;
  }
</style>
