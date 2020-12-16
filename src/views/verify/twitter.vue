<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-input-search placeholder="请输入关键字" size="large" enter-button @search="onSearch" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'TwitterSearch',
  methods: {
    onSearch() {
      this.$router.push({ path: '/verify/detail', query: { social: 'twitter' } })
    }
  }
}
</script>

<style>
</style>
