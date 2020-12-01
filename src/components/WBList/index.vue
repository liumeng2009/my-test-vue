<template>
  <div>
    <div class="wb-list-container">
      <WbItem v-for="(item, index) in data" :key="index" :data="item" />
    </div>
    <div class="pagination-wrapper">
      <a-pagination v-model="currentPage" :total="50" show-less-items />
    </div>
  </div>
</template>

<script>
import WbItem from './item'
export default {
  name: 'WBList',
  components: {
    WbItem
  },
  data () {
    return {
      currentPage: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less">
.pagination-wrapper {
  display: flex;
  flex-flow: row-reverse;
}
</style>
