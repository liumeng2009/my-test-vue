<template>
  <page-header-wrapper :title="false">
    <div class="card-container">
      <a-tabs
        type="card"
        class="tab-panel-wrapper"
        :default-active-key="activeSearchType"
        @change="handlSearchTypeChange($event)"
      >
        <a-tab-pane :key="'account'" tab="账号分析查询">
          <a-input-search placeholder="请输入关键字" v-model="searchKey" size="large" enter-button @search="onSearch" />
        </a-tab-pane>
        <a-tab-pane :key="'content'" tab="虚词分析">
          <a-input-search placeholder="请输入关键字" v-model="searchKey" size="large" enter-button @search="onSearch" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'TelegramSearch',
  data () {
    return {
      activeSearchType: 'account',
      searchKey: ''
    }
  },
  methods: {
    onSearch() {
      if (this.searchKey.trim() === '') {
        this.$message.info('请输入关键字')
        return
      }
      this.$router.push({ path: '/verify/detail', query: { social: 'telegram', searchType: this.activeSearchType, searchKey: this.searchKey } })
    },
    handlSearchTypeChange(e) {
      this.activeSearchType = e
    }
  }
}
</script>

<style>
</style>
