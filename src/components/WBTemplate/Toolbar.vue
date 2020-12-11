<template>
  <div class="toolbar">
    <div>
      <a-icon type="like" />
      <span>{{ support }}</span>
    </div>
    <div>
      <a-icon type="message" />
      <span>{{ comment }}</span>
    </div>
    <div>
      <a-icon type="share-alt" />
      <span>{{ share }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WBToolbar',
  props: {
    support: {
      type: Number,
      default: 0
    },
    comment: {
      type: Number,
      default: 0
    },
    share: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 42px;
  display: flex;
  border-top: #eee 1px solid;

  & > div {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & > i{
        margin-right: 8px;
    }
  }
}
</style>
