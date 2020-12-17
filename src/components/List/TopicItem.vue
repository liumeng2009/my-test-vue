<template>
  <div class="item">
    {{ dataSource.title }}
  </div>
</template>

<script>
export default {
  name: 'TopicItem',
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>
