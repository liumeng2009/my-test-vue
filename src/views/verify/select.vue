<template>
  <ul>
    <li @click="toTwitter">Twitter 可点击</li>
    <li>Facebook</li>
    <li>Telegram</li>
  </ul>
</template>

<script>
export default {
  name: 'Select',
  methods: {
    toTwitter() {
      this.$router.push({ name: 'Twitter' })
    }
  }
}
</script>

<style lang="less" scoped>
    li{
        display: block;
        border:#ccc 1px solid;
        width: 100px;
        height: 100px;
        margin: 16px;
        cursor: pointer;
    }
</style>
