<template>
  <div class="user" :style="{height: size === 'small' ? '36px' : '50px'}">
    <img :src="avatar" alt="" :style="{width: size === 'small' ? '36px' : '48px', height: size === 'small' ? '36px' : '48px'}" />
    <div class="username">
      <span>{{ nickname }}({{ username }})</span>
      <span>{{ createdAt }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WBUser',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    createdAt: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;

  & > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .username {
    height: 100%;
    line-height: 25px;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    & span {
        height: 50%;
        overflow: hidden;
    }

    & span:nth-of-type(1) {
      font-size: 14px;
    }

    & span:nth-of-type(2) {
      font-size: 12px;
      color:#ccc;
    }
  }

  .createdAt {
    height: 25px;
    font-size: 12px;
    line-height: 25px;
    color: #ccc;
  }
}
</style>
