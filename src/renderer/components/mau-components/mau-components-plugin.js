import MauTabs from 'renderer/components/mau-components/mau-tabs/MauTabs.vue'
import MauWidget from 'renderer/components/mau-components/mau-widget/MauWidget.vue'
import MauTable from 'renderer/components/mau-components/mau-table/MauTable.vue'
import MauResponsiveButton from 'renderer/components/mau-components/mau-responsive-button/MauResponsiveButton.vue'
import MauCrudView from 'renderer/api/components/crud/MauCrudView.vue'
import MauCrudCreate from 'renderer/api/components/crud/MauCrudCreate.vue'
import MauCrudList from 'renderer/api/components/crud/MauCrudList.vue'
import MauCrudEdit from 'renderer/api/components/crud/MauCrudEdit.vue'
import MauCrudDel from 'renderer/api/components/crud/MauCrudDel.vue'
import MauEditor from 'renderer/components/mau-components/mau-editor/MauEditor.vue'
import MauSchedule from 'renderer/components/mau-components/mau-schedule/MauSchedule.vue'
import MauCard from 'renderer/components/mau-components/mau-card/MauCard.vue'
import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
import MaskedInput from 'vue-text-mask'
const MauComponentsPlugin = {
  install (Vue, options) {
    Vue.component(MauTabs.name, MauTabs)
    Vue.component(MauWidget.name, MauWidget)
    Vue.component(MauTable.name, MauTable)
    Vue.component(MauResponsiveButton.name, MauResponsiveButton)
    Vue.component(MauCrudView.name, MauCrudView)
    Vue.component(MauCrudCreate.name, MauCrudCreate)
    Vue.component(MauCrudList.name, MauCrudList)
    Vue.component(MauCrudEdit.name, MauCrudEdit)
    Vue.component(MauCrudDel.name, MauCrudDel)
    Vue.component(MauEditor.name, MauEditor)
    Vue.component(MauCard.name, MauCard)
    Vue.component(MauSchedule.name, MauSchedule)
    Vue.component(MauSpinner.name, MauSpinner)
    Vue.component('MaskedInput', MaskedInput)
  }
}

export default MauComponentsPlugin
