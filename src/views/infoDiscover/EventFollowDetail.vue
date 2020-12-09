<template>
  <page-header-wrapper :title="false">
      <a-row></a-row>
  </page-header-wrapper>
</template>

<script>

const list = [
  {
    title: '老兵上街维权',
    id: 'FJ20200410004',
    type: 'ferment',
    createdAt: '2020-10-11'
  },
  {
    title: '老兵上街维权',
    id: 'FJ20200410004',
    type: 'ferment',
    createdAt: '2020-10-11'
  },
  {
    title: '老兵上街维权',
    id: 'FJ20200410004',
    type: 'ferment',
    createdAt: '2020-10-11'
  },
  {
    title: '老兵上街维权',
    id: 'FJ20200410004',
    type: 'ferment',
    createdAt: '2020-10-11'
  }
]

export default {
    name: 'EventFollowDetail',
    data () {
      return {
        queryParam: {},
        searchResult: [],
        currentPage: 0
      }
    },
    methods: {
      search () {
        this.searchResult = search
      }
    }
}
</script>

<style lang="less" scoped>
  .list-container{
    margin-bottom: 16px;
  }
</style>
