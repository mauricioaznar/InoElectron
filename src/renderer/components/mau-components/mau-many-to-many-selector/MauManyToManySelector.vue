<template>
    <div>
        <mau-form-input-multi-select
                :availableObjects="availableObjects"
                :initialObjects="initialObjects"
                :name="name"
                :label="label"
                :displayProperty="displayProperty"
                v-validate="'array_required'"
                :error="errors.first(name)"
                v-model="selectedObjects"
        >
        </mau-form-input-multi-select>
        <div class="w-100">
            <slot :selectedObjects="selectedObjects">

            </slot>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
//  import cloneDeep from 'renderer/services/common/cloneDeep'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import MauFormInputMultiSelect from 'renderer/api/components/inputs/MauFormInputMultiSelect.vue'
  export default {
    name: 'MauManyToManySelector',
    inject: ['$validator'],
    data () {
      return {
        selectedObjects: [],
        structuredObjects: []
      }
    },
    created () {
    },
    computed: {
      hasDefaultScopedSlot () {
        return !!this.$scopedSlots.default
      },
      ...mapState({
      })
    },
    components: {
      MauFormInputSelect,
      MauFormInputMultiSelect
    },
    props: {
      label: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      initialObjects: {
        type: Array,
        default: function () {
          return []
        }
      },
      displayProperty: {
        type: String,
        default: function () {
          return 'name'
        }
      },
      availableObjects: {
        type: Array,
        required: true
      }
    },
    watch: {
      selectedObjects: function () {
        this.$emit('input', this.selectedObjects)
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>