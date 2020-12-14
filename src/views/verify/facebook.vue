<template>
  <div>
    facebook
    <input type="text" />
    <button @click="toDetail">查询</button>
  </div>
</template>

<script>
export default {
  name: 'Twitter',
  methods: {
    toDetail() {
      this.$router.push({ name: 'TwitterDetail' })
    }
  }
}
</script>

<style>
</style>
