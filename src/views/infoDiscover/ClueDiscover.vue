<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col span="18">
        <a-card title="线索发现">
          <WbList :data="wbList" />
        </a-card>
      </a-col>
      <a-col span="6" class="right-column">
        <a-card title="线索统计">
          <div class="center-card">
            <span style="line-height: 30px">今日新增:<span>27986</span></span>
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
import { WbList, HotList, Pie, CloudWord } from '@/components'

const pie = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
]

const wbList = [
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

// 热词
const scale = [// eslint-disable-line no-unused-vars
  { dataKey: 'x', nice: false },
  { dataKey: 'y', nice: false }
]

const hotWordData = [// eslint-disable-line no-unused-vars
  {
    name: 'China',
    value: 138,
    category: 'asia'
  },
  {
    name: 'India',
    value: 131,
    category: 'asia'
  },
  {
    name: 'United States',
    value: 32,
    category: 'america'
  },
  {
    name: 'Indonesia',
    value: 26,
    category: 'asia'
  },
  {
    name: 'Brazil',
    value: 20,
    category: 'america'
  },
  {
    name: 'Pakistan',
    value: 19,
    category: 'asia'
  },
  {
    name: 'Nigeria',
    value: 19,
    category: 'africa'
  },
  {
    name: 'Bangladesh',
    value: 16,
    category: 'asia'
  }
]

const hotListData = [
  '关键热词',
  '关键热词很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  '关键热词'
]

export default {
  name: 'ClueDiscover',
  components: {
    WbList,
    HotList,
    Pie,
    CloudWord
  },
  data () {
    return {
      pieData: pie,
      wbList,
      scale,
      hotListData,
      rightWidth: 0,
      hotWordData: hotWordData
    }
  }
}
</script>

<style lang="less" scoped>
.right-column {
  & > .ant-card {
    margin-bottom: 16px;
  }

  & > .ant-card:last-child {
    margin-bottom: 0px;
  }
}
.center-card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
