import MauTabs from 'renderer/components/mau-components/mau-tabs/MauTabs.vue'
import MauWidget from 'renderer/components/mau-components/mau-widget/MauWidget.vue'
import MauTable from 'renderer/components/mau-components/mau-table/MauTable.vue'
import MauEntityView from 'renderer/components/mau-components/mau-entity-view/MauEntityView.vue'
import MauResponsiveButton from 'renderer/components/mau-components/mau-responsive-button/MauResponsiveButton.vue'
import MauCrudView from 'renderer/components/mau-components/mau-crud/MauCrudView.vue'
import MauCrudCreate from 'renderer/components/mau-components/mau-crud/MauCrudCreate.vue'
import MauCrudList from 'renderer/components/mau-components/mau-crud/MauCrudList.vue'
import MauCrudEdit from 'renderer/components/mau-components/mau-crud/MauCrudEdit.vue'
import MauCrudDel from 'renderer/components/mau-components/mau-crud/MauCrudDel.vue'
import MauDataTable from 'renderer/components/mau-components/mau-data-table/MauDataTable.vue'
import MauEditor from 'renderer/components/mau-components/mau-editor/MauEditor.vue'
import MauSchedule from 'renderer/components/mau-components/mau-schedule/MauSchedule.vue'
import MauCard from 'renderer/components/mau-components/mau-card/MauCard.vue'
import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
import MauManyToManySelector from 'renderer/components/mau-components/mau-many-to-many-selector/MauManyToManySelector.vue'
import MaskedInput from 'vue-text-mask'
const MauComponentsPlugin = {
  install (Vue, options) {
    Vue.component(MauTabs.name, MauTabs)
    Vue.component(MauWidget.name, MauWidget)
    Vue.component(MauTable.name, MauTable)
    Vue.component(MauEntityView.name, MauEntityView)
    Vue.component(MauResponsiveButton.name, MauResponsiveButton)
    Vue.component(MauCrudView.name, MauCrudView)
    Vue.component(MauCrudCreate.name, MauCrudCreate)
    Vue.component(MauCrudList.name, MauCrudList)
    Vue.component(MauCrudEdit.name, MauCrudEdit)
    Vue.component(MauCrudDel.name, MauCrudDel)
    Vue.component(MauDataTable.name, MauDataTable)
    Vue.component(MauEditor.name, MauEditor)
    Vue.component(MauCard.name, MauCard)
    Vue.component(MauSchedule.name, MauSchedule)
    Vue.component(MauSpinner.name, MauSpinner)
    Vue.component(MauManyToManySelector.name, MauManyToManySelector)
    Vue.component('MaskedInput', MaskedInput)
  }
}

export default MauComponentsPlugin
