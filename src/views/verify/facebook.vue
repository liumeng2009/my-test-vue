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
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'FacebookSearch',
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
      this.$router.push({ path: '/verify/detail', query: { social: 'facebook', searchType: this.searchType, searchKey: this.searchKey } })
    },
    handlSearchTypeChange(e) {
      this.activeSearchType = e
    }
  }
}
</script>

<style>
</style>
