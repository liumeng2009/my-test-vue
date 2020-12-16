<template>
  <div class="account-info">
    <span class="nick">{{ data && data.nick }}</span>
    <span class="account-name">{{ data && data.account_name }}</span>
    <span class="account-sign">{{ data && data.sign }}</span>
    <span class="account-tags">{{ data && data.tags }}</span>
  </div>
</template>

<script>
// 情报查询详情 账号简介
export default {
  name: 'AccountCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.account-info {

    .nick {
        display: inline-block;
        padding: 32px 0px;
        font-weight: bolder;
    }

    .account-name {
        display: inline-block;
        padding: 32px 0px;
        color: blue;
        font-weight: bolder;
    }

    .account-sign {
        display: block;
        font-weight: bolder;
        padding: 4px 0px;
    }

    .account-tags {
        display: block;
        padding: 4px 0px;
    }
}
</style>
