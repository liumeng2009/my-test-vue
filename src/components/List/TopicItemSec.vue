<template>
  <a-row class="item">
    <a-col class="title" :span="18">{{ dataSource.title }}</a-col>
    <a-col class="center" :span="6">{{ dataSource.value }}</a-col>
  </a-row>
</template>

<script>
export default {
  name: 'TopicItemSec',
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

  .title{
    white-space: nowrap;
    overflow: hidden;
  }

  .center {
    text-align: center;
  }
}
</style>
