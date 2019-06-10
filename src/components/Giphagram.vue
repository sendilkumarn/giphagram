<template>
  <div class="container">
    <Search />
    <LayoutSelector />
    <InfiniteListView />
  </div>
</template>

<script>
import InfiniteListView from './InfiniteListView'
import Search from './Search'
import LayoutSelector from './LayoutSelector'

export default {
  name: 'Giphagram',
  components: {
    InfiniteListView,
    Search,
    LayoutSelector
  }
}
</script>
