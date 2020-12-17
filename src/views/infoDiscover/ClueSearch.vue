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
                <a-checkbox-group :options="socialOption" :value="queryParam.socials" @change="socialChange" />
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <a-form-item label="发帖时间">
                <a-range-picker v-model="queryParam.dateRange" />
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="search">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card>
        <a-list :loading="searchLoading" :data-source="searchResult" :pagination="true">
          <a-list-item slot="renderItem" :key="index" slot-scope="item, index">
            <WbItem :data="item" />
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { WbItem } from '@/components'
const wbList = [
  {
    id: '0',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'cyrano7700',
    source: 'Twitter',
    important: '0',
    createdAt: '2020-4-20 13:54:41',
    content: '查询内容'
  },
  {
    id: '1',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '邹承峰',
    username: 'cyrano7700',
    source: 'Telegram',
    important: '1',
    createdAt: '2020-4-20 13:54:41',
    content: '查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容查询内容'
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
    content: '查询内容'
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
    content: '查询内容'
  }
]
export default {
    name: 'ClueSearch',
    components: {
      WbItem
    },
    data () {
      return {
        socialOption: [
          { label: 'Twitter', value: 'twitter' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'Telegram', value: 'telegram' }
        ],
        queryParam: {
          pageIndex: 0,
          pageSize: 10,
          searchKey: '',
          socials: ['twitter'],
          dateRange: []
        },
        searchResult: [],
        searchLoading: false
      }
    },
    methods: {
      socialChange (e) {
        this.queryParam.socials = e
      },
      search () {
        console.log(this.queryParam)
        this.searchLoading = true
        setTimeout(() => {
          this.searchResult = wbList
          this.searchLoading = false
        }, 1000)
      },
      reset () {
        this.queryParam = {
          pageIndex: 0,
          searchKey: '',
          socials: ['twitter'],
          dateRange: []
        }
      }
    }
}
</script>
