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
              <a-form-item label="社交平台">
                <a-checkbox-group :options="socialOption" :default-value="['twitter']" @change="socialChange" />
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <a-form-item label="发帖时间">
                <a-range-picker @change="handleRangePickerChange" />
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <span class="table-page-search-submitButtons">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card>
        <div class="wb-list-container">
          <WbItem v-for="(item, index) in searchResult" :key="index" :data="item" />
        </div>
        <div class="pagination-wrapper" v-if="searchResult.length > 0">
          <a-pagination v-model="currentPage" :total="50" show-less-items />
        </div>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { WbItem } from '@/components'
const wbList = [// eslint-disable-line no-unused-vars
  {
    id: '0',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'cyrano7700',
    source: 'Twitter',
    policy: '策略一',
    important: '0',
    createdAt: '2020-4-20 13:54:41',
    content: '全名共振'
  },
  {
    id: '1',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'cyrano7700',
    source: 'Youtube',
    policy: '策略一',
    important: '1',
    createdAt: '2020-4-20 13:54:41',
    content:
      '全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振全名共振'
  },
  {
    id: '2',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'cyrano7700',
    source: 'Facebook',
    policy: '策略一',
    important: '2',
    createdAt: '2020-4-20 13:54:41',
    content: '全名共振'
  },
  {
    id: '3',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'Twitter',
    source: 'Twitter',
    policy: '策略一',
    important: '3',
    createdAt: '2020-4-20 13:54:41',
    content: '全名共振'
  }
]
export default {
    name: 'ClueSearch',
    components: {
      WbItem
    },
    data () {
      return {
        queryParam: {},
        socialOption: [
          { label: 'Twitter', value: 'twitter' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'TouTube', value: 'youtube' },
          { label: '其他网站', value: 'others' }
        ],
        searchResult: [],
        currentPage: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this.searchResult = wbList
      }, 2000)
    },
    methods: {
      socialChange (e) {
        console.log(e)
      },
      handleRangePickerChange (e) {
        console.log(e)
      }
    }
}
</script>
