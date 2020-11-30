<template>
  <div>
    <WbItem v-for="(item, index) in data" :key="index" :data="item" />
  </div>
</template>

<script>
import WbItem from './item'
export default {
  name: 'WBList',
  components: {
    WbItem
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  }
}
</script>

<style>
</style>
