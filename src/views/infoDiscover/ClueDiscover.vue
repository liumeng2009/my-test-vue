<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col span="18">
        <a-card title="线索发现">
          <div class="wb-list-container">
            <WbItem v-for="(item, index) in wbData" :key="index" :data="item" />
          </div>
          <div class="pagination-wrapper" v-if="wbData.length > 0">
            <a-pagination v-model="currentPage" :total="50" show-less-items />
          </div>
        </a-card>
      </a-col>
      <a-col span="6" class="right-column">
        <a-card title="线索统计">
          <div class="center-card">
            <span style="line-height: 30px">今日新增:<span>{{ addedToday }}</span></span>
          </div>
        </a-card>
        <a-card title="各平台分布" :bodyStyle="{ padding: 0 }">
          <Pie :dataSource="pieData" :height="200" />
        </a-card>
        <a-card title="今日热词" :bodyStyle="{padding: 0}">
          <CloudWord :height="200" :dataSource="hotWordData" />
        </a-card>
        <a-card title="热词排行">
          <HotList :listData="hotListData" :transData="'hello'" />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { WbItem, HotList, Pie, CloudWord } from '@/components'

// 左边大列表
const wb = [
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

// 饼图
const pie = [
  { name: '家用电器', value: 32.2 },
  { name: '食用酒水', value: 21 },
  { name: '个护健康', value: 17 },
  { name: '服饰箱包', value: 13 },
  { name: '母婴产品', value: 9 },
  { name: '其他', value: 7.8 }
]

// 热词
const hotWord = [
  {
    name: 'China',
    value: 138
  },
  {
    name: 'India',
    value: 131
  },
  {
    name: 'United States',
    value: 32
  },
  {
    name: 'Indonesia',
    value: 26
  },
  {
    name: 'Brazil',
    value: 20
  },
  {
    name: 'Pakistan',
    value: 19
  },
  {
    name: 'Nigeria',
    value: 19
  },
  {
    name: 'Bangladesh',
    value: 16
  }
]

// 热词排行
const hotList = [
  '关键热词',
  '关键热词很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  '关键热词'
]

export default {
  name: 'ClueDiscover',
  components: {
    WbItem,
    HotList,
    Pie,
    CloudWord
  },
  data () {
    return {
      wbData: [],
      pieData: [],
      hotWordData: [],
      hotListData: [],
      addedToday: 0,
      currentPage: 0
    }
  },
  mounted () {
    // 获取数据
    setTimeout(() => {
      this.wbData = wb
      this.pieData = pie
      this.hotWordData = hotWord
      this.hotListData = hotList
      this.addedToday = 27986
    }, 2000)
  }
}
</script>

<style lang="less" scoped>
.wb-list-container{
  min-height: 600px;
}
.right-column {
  & > .ant-card {
    margin-bottom: 16px;
  }

  & > .ant-card:last-child {
    margin-bottom: 0px;
  }
}

</style>
