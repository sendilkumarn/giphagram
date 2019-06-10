<template>
    <button @click="this.show" id="toggle-display" aria-label="switch layout"> {{buttonText}} </button>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import store from '../store'
import * as types from '../store/mutation-actions'

export default {
  name: 'LayoutSelector',
  store,
  computed: {
    ...mapState(['displayMode']),
    buttonText () {
      return `Switch to ${this.displayMode !== 'single' ? '1-column' : '3-column'}`
    }
  },
  methods: {
    ...mapActions([
      types.CHANGE_DISPLAY
    ]),
    show () {
      this.$store.dispatch(types.CHANGE_DISPLAY)
    }
  }
}
</script>
