<template>
    <div>
      <ul class="image-container">
          <li
              v-for="image in imageList"
              :key="image.id"
              class="image-holder"
              :class="{ triple: displayMode !== 'single', single: displayMode !== 'triple' }"
          >
          <ImageLoader :image="image.images"> </ImageLoader>
        </li>
      </ul>
      <p class="error-msg" v-if="error !== ''"> {{ error }} </p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ImageLoader from './ImageLoader'
import store from '../store'
import * as types from '../store/mutation-actions'

export default {
  name: 'InfiniteListView',
  store,
  computed: {
    ...mapState(['imageList', 'displayMode', 'error'])
  },
  data: function () {
    return {
      offset: 0
    }
  },
  components: {
    ImageLoader
  },
  methods: {
    ...mapActions([
      types.LOAD_IMAGES
    ]),
    scroll: function () {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        this.$store.dispatch(types.LOAD_IMAGES, { isNewSearch: false })
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped lang="scss">
.image-holder {
    display: inline-block;
}

.single {
    width: 100%;
}

.triple {
    width: 33%;
}
</style>
