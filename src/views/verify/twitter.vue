<template>
  <page-header-wrapper :title="false">
    <a-card style="margin-top: 0px">
      <div style="padding: 16px 0px">
        <a-radio-group :options="searchTypeOption" v-model="searchType"></a-radio-group>
      </div>
      <a-input-search placeholder="请输入ID，用户名或链接" v-model="searchKey" size="large" @search="onSearch" >
        <a-button slot="enterButton" type="primary">
          开始分析
        </a-button>
      </a-input-search>
    </a-card>
    <!--
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
        <a-tab-pane :key="'other'" tab="还有一种详情视图">
          <a-input-search placeholder="请输入关键字" v-model="searchKey" size="large" enter-button @search="onSearch" />
        </a-tab-pane>
      </a-tabs>
    </div> -->
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'TwitterSearch',
  data () {
    return {
      searchTypeOption: [
        { label: '账号分析', value: 'account' },
        { label: '虚实转换', value: 'toReal' }
      ],
      searchType: 'account',
      searchKey: ''
    }
  },
  methods: {
    onSearch() {
      if (this.searchKey.trim() === '') {
        this.$message.info('请输入关键字')
        return
      }
      this.$router.push({ path: '/verify/detail', query: { social: 'twitter', searchType: this.searchType, searchKey: this.searchKey } })
    }
  }
}
</script>

<style>
</style>
