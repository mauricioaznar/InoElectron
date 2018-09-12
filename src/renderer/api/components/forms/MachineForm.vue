<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[MachinePropertiesReference.NAME.name]"
                        v-model="machine.name"
                        :label="MachinePropertiesReference.NAME.title"
                        :name="MachinePropertiesReference.NAME.name"
                        :error="errors.first(MachinePropertiesReference.NAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select
                        :initialObject="initialValues[MachinePropertiesReference.MACHINE_TYPE.name]"
                        :label="MachinePropertiesReference.MACHINE_TYPE.title"
                        :displayProperty="'name'"
                        :entityType="machineTypeEntityType"
                        v-model="machine.machineType"
                        :name="MachinePropertiesReference.MACHINE_TYPE.name"
                        :error="errors.first(MachinePropertiesReference.MACHINE_TYPE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MachinePropertiesReference from 'renderer/api/propertiesReference/MachinePropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import {mapState} from 'vuex'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'MachineForm',
    data () {
      return {
        MachinePropertiesReference: MachinePropertiesReference,
        machine: {
          name: '',
          machineType: {}
        },
        initialValues: {},
        machineTypeEntityType: EntityTypes.MACHINE_TYPE,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputText,
      MauFormInputSelect
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.setInitialValues()
    },
    computed: {
      ...mapState({
      })
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[MachinePropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, MachinePropertiesReference.NAME.name)
        this.initialValues[MachinePropertiesReference.MACHINE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, MachinePropertiesReference.MACHINE_TYPE.name)
      },
      save: function () {
        let directParams = {
          [MachinePropertiesReference.NAME.name]: this.machine.name,
          [MachinePropertiesReference.MACHINE_TYPE.relationship_id_name]: this.machine.machineType ? this.machine.machineType[GlobalEntityIdentifier] : 'null'
        }
        let indirectParams = {
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      }
    }
  }

</script>