<template>
  <div class="item-wrapper">
    <div class="user">
      <div class="left">
        <img :src="dataSource.avatar" alt="" />
        <span class="name">{{ dataSource.nickname }}({{ dataSource.username }})</span>
        <span class="createdAt">{{ dataSource.createdAt }}</span>
      </div>
      <div class="right">
        <span v-add-icon>{{ dataSource.source }}</span>
      </div>
    </div>
    <div class="content">{{ dataSource.content }}</div>
  </div>
</template>

<script>
import { AddIcon } from '@/core/directives'
// 事件发酵列表项
export default {
  name: 'ItemSec',
  directives: {
    AddIcon
  },
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrapper {
  width: 100%;
  padding: 16px;
  border-bottom: #ccc 1px solid;

  &:last-child {
    border-bottom: none;
  }

  .user {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

      & > img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }

      .name {
        display: inline-block;
        height: 25px;
        font-weight: bolder;
        padding-left: 8px;
      }

      .createdAt {
        font-size: 12px;
        height: 25px;
        color: #ccc;
        padding-left: 8px;
      }
    }

    .right {
        span{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
        }
    }
  }

  .content {
    width: 100%;
    padding-left: 50px;
    box-sizing: border-box;
  }
}
</style>
