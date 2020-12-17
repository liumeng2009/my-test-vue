<template>
  <div class="video-wrapper">
    <img :src="dataSource.thumbnail" :alt="dataSource.title" />
    <span class="title">{{ dataSource.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'WBVideo',
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.video-wrapper {
  width: 100%;
  padding: 8px;
  // padding-left: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: auto;
    max-height: 300px;
  }

  .title {
    margin-top: 8px;
    font-weight: bolder;
  }
}
</style>
