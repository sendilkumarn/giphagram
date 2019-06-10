<template>
    <figure v-lazyImageLoader class="image-wrapper">
        <ImageSpinner class="image-spinner" />
        <img
            class="image-item"
            :data-url=getImageLink()
            :alt=getImageTitle() />
    </figure>
</template>

<script>
import ImageSpinner from './ImageSpinner.vue'

export default {
  name: 'ImageLoader',
  props: {
    image: {}
  },
  methods: {
    getImageLink: function () {
      if (this.image) {
        return this.image.fixed_height_small.url
      }
    },
    getImageTitle: function () {
      if (this.image) {
        return this.image.title
      }
    }
  },
  components: {
    ImageSpinner
  }
}
</script>

<style scoped lang="scss">
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;

  &.loaded {
    .image-item {
      visibility: visible;
      opacity: 1;
      border: 0;
    }
    .image-spinner {
      display: none;
      width: 100%;
    }
  }

  .image-item {
    width: 200px;
    height: 20vh;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
