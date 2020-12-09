<template>
  <page-header-wrapper :title="false">
    <div class="table-page-search-wrapper">
      <a-card style="margin-bottom: 16px">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :span="12" :offset="6">
              <a-form-item label="关键词">
                <a-input v-model="queryParam.keyWord" placeholder="请输入线索关键词"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="search">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card>
        <div class="list-container">
          <a-list :data-source="searchResult" :bordered="true">
            <div slot="header">
              <a-row style="width: 100%;">
                <a-col :span="12">事件主题</a-col>
                <a-col :span="6">上报时间</a-col>
                <a-col :span="6">操作</a-col>
              </a-row>
            </div>
            <a-list-item slot="renderItem" slot-scope="item" class="cus-item">
              <a-row style="width: 100%">
                <a-col span="12" >
                  {{ item.title }}
                </a-col>
                <a-col span="6">
                  {{ item.createdAt }}
                </a-col>
                <a-col span="6">
                  <a-button type="primary">详情</a-button>
                </a-col>
              </a-row>
            </a-list-item>
          </a-list>
        </div>
        <div class="pagination-wrapper" v-if="searchResult.length > 0">
          <a-pagination v-model="currentPage" :total="50" show-less-items />
        </div>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>

const search = [
  {
    title: '平度老兵',
    createdAt: '2020-10-11'
  },
  {
    title: '平度老兵',
    createdAt: '2020-10-11'
  },
  {
    title: '平度老兵',
    createdAt: '2020-10-11'
  },
  {
    title: '平度老兵',
    createdAt: '2020-10-11'
  }
]

export default {
    name: 'EventFollow',
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
