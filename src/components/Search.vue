<template>
    <form id="gif-search" @submit.prevent="search">
      <input type="text" v-model="searchQuery" data-search id="search-input" aria-label="search input"/>
      <button type="submit" id="search-button" aria-label="search"> Search </button>
      <p class="error-msg" v-if="error !== ''"> {{ error }}</p>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import store from '../store'
import * as types from '../store/mutation-actions'

export default {
  name: 'Search',
  store,
  data: function () {
    return {
      searchQuery: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['query'])
  },
  methods: {
    ...mapActions([
      types.TRIGGER_NEW_SEARCH,
      types.LOAD_IMAGES
    ]),
    search: function () {
      this.error = ''
      if (this.validateQuery()) {
        this.$store.dispatch(types.TRIGGER_NEW_SEARCH, this.searchQuery)
        const payload = {
          isNewSearch: true
        }
        this.$store.dispatch(types.LOAD_IMAGES, payload)
      } else {
        this.error = 'Enter valid query'
      }
    },
    validateQuery: function () {
      if (this.searchQuery && this.searchQuery !== '') {
        this.searchQuery = encodeURIComponent(this.searchQuery)
        return true
      }
      return false
    }
  }
}
</script>
