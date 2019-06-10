<template>
  <div id="app">
    <h1 class="title">✨ Giphagram ✨</h1>
    <Giphagram />
  </div>
</template>

<script>
import Giphagram from './components/Giphagram.vue'

export default {
  name: 'app',
  components: {
    Giphagram
  }
}
</script>

<style lang="scss">
  $base-color: #104FC6;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }

  button {
    height: 50px;
    padding: .65rem .75rem;
    font-size: 1.2rem;
    border-radius: 2rem;
    color: $base-color;
    border: 1px solid $base-color;
    cursor: pointer;
    text-align: center;
    line-height: 1.5;

    &:hover {
      color: white;
      background: $base-color;
    }

    &:focus {
      outline: none
    }
  }

  input {
    border: 0;
    border-bottom: 1px solid $base-color;
    padding: 1rem;
    margin: 1rem;
    width: 50%;
    &:focus {
      outline: none
    }
  }

  .error-msg {
    color: #8b0300;
    font-weight: bolder;
  }
</style>
