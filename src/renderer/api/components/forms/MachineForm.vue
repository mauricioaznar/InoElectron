<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[MachinePropertiesReference.NAME.name]"
                        v-model="machine.name"
                        :label="MachinePropertiesReference.NAME.title"
                        :name="MachinePropertiesReference.NAME.name"
                        :error="errors.has(MachinePropertiesReference.NAME.name) ? errors.first(MachinePropertiesReference.NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-select-dynamic
                        :endpointName="machineTypeEndpointName"
                        :initialObject="initialValues[MachinePropertiesReference.MACHINE_TYPE.name]"
                        :label="MachinePropertiesReference.MACHINE_TYPE.title"
                        :displayProperty="'name'"
                        v-model="machine.machineType"
                        :name="MachinePropertiesReference.MACHINE_TYPE.name"
                        :error="errors.first(MachinePropertiesReference.MACHINE_TYPE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
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
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
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
        machineTypeEndpointName: EntityTypes.MACHINE_TYPE.apiName,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
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
      userHasWritePrivileges: function () {
        return true
      }
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
          [MachinePropertiesReference.MACHINE_TYPE.relationship_id_name]: this.machine.machineType ? this.machine.machineType[GlobalEntityIdentifier] : null
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
