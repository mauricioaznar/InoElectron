import Vue from 'vue'
const EventBus = new Vue()
function emitEvent (payload) {
  EventBus.$emit('FORM_SUBMIT_EVENT', payload)
}
function onEvent (callback) {
  EventBus.$on('FORM_SUBMIT_EVENT', callback)
}
export default {emitEvent, onEvent}
