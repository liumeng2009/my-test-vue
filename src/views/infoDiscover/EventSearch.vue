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
              <a-form-item label="研判类型">
                <a-radio-group :options="typeOption" :default-value="'all'" @change="typeChange" />
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="6">
              <a-form-item label="发帖时间">
                <a-range-picker @change="handleRangePickerChange" />
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
          <div class="item-wrapper" v-for="(item, index) in searchResult" :key="index">
            <ReportFermentItem :dataSource="item" v-if="item.reportType === 'ferment'" />
            <ReportActionItem :dataSource="item" :showLeftAvatar="false" v-if="item.reportType === 'action'" />
          </div>
        </div>
        <div class="pagination-wrapper" v-if="searchResult.length > 0">
          <a-pagination v-model="currentPage" :total="50" show-less-items />
        </div>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { ReportFermentItem, ReportActionItem } from '@/components'

const search = [
  {
    title: '平度老兵',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议',
    reportType: 'ferment'
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    title: '平度老兵action',
    source: 'Twitter',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议',
    reportType: 'action'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议',
    reportType: 'ferment'
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    title: '平度老兵action',
    source: 'Twitter',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议',
    reportType: 'action'
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    title: '平度老兵',
    source: 'Twitter',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议',
    reportType: 'action'
  }
]

export default {
    name: 'EventSearch',
    components: {
      ReportFermentItem,
      ReportActionItem
    },
    data () {
      return {
        queryParam: {},
        currentPage: 0,
        typeOption: [
          { label: '全部', value: 'all' },
          { label: '发酵', value: 'ferment' },
          { label: '行动', value: 'action' }
        ],
        searchResult: []
      }
    },
    methods: {
      typeChange (e) {
        console.log(e)
      },
      search () {
        this.searchResult = search
      },
      handleRangePickerChange (e) {
        console.log(e)
      }
    }
}
</script>

<style lang="less" scoped>
  .list-container{

    .item-wrapper{
      padding: 16px;
      border-bottom:#ccc 1px dashed;

      &:last-child{
        border-bottom:none;
      }
    }
  }
</style>
