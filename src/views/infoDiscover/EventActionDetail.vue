<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card>
          <a-tabs :default-active-key="activeLeftKey" @change="handleLeftTabChange">
            <a-tab-pane :key="'fajiao'" style="min-height: 600px">
              <template v-slot:tab>
                事件发酵
                <span class="tab-bar-num">6</span>
              </template>
              <div class="list-container">
                <ReportFermentItem v-for="(item, index) in reportListData" :key="index" :dataSource="item" />
              </div>
              <div class="pagination-wrapper" v-if="reportListData.length > 0">
                <a-pagination v-model="currentPageFajiao" :total="50" show-less-items />
              </div>
            </a-tab-pane>
            <a-tab-pane :key="'xingdong'" style="min-height: 600px">
              <template v-slot:tab>
                事件行动
                <span class="tab-bar-num">8</span>
              </template>
              <div class="list-container">
                <ReportActionItem v-for="(item, index) in reportListData2" :key="index" :dataSource="item" />
              </div>
              <div class="pagination-wrapper" v-if="reportListData.length > 0">
                <a-pagination v-model="currentPageFajiao" :total="50" show-less-items />
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="事件统计" :bodyStyle="{padding: 0}" style="margin-bottom: 16px">
          <PieCircle :dataSource="pieCircleData" :height="200" :width="300" />
        </a-card>
        <div class="card-container" style="margin-bottom: 16px">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="activeRightKey"
            @change="handleRightTabChange($event)"
          >
            <a-tab-pane :key="'month'" :tab="'上报事件趋势'">
              <LineChart :dataSource="lineData" :height="200" />
            </a-tab-pane>
            <a-tab-pane :key="'social'" :tab="'各平台分布统计'">
              <Pie :dataSource="pieData" :height="200" :width="300" />
            </a-tab-pane>
          </a-tabs>
        </div>
        <a-card title="核查进程">
          <ThirdList :dataSource="listData" />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { PieCircle, LineChart, Pie, ThirdList, ReportFermentItem, ReportActionItem } from '@/components'

const reportList = [
  {
    title: '平度老兵',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    progress: 82,
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  }
]
const reportList2 = [
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
    tags: '平度老兵、上街抗议'
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
    tags: '平度老兵、上街抗议'
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
    tags: '平度老兵、上街抗议'
  }
]
const pieCircle = [// eslint-disable-line
  { name: 'xingdong', value: 15 },
  { name: 'fajiao', value: 23 }
]

const line = [// eslint-disable-line
  { name: '6月', xingdong: 23, fajiao: 12, all: 35 },
  { name: '7月', xingdong: 13, fajiao: 52, all: 65 },
  { name: '8月', xingdong: 63, fajiao: 22, all: 85 }
]

const pie = [// eslint-disable-line
  { name: 'Twitter', value: 15 },
  { name: 'Facebook', value: 23 },
  { name: 'Youtube', value: 15 },
  { name: 'Other', value: 23 }
]

const list = [
  { title: '维权游行', progress: 82 },
  { title: '维权游行', progress: 12 },
  { title: '维权游行', progress: 100 },
  { title: '维权游行', progress: 56 }
]

export default {
    name: 'EventActionDetail',
    components: {
      PieCircle,
      LineChart,
      Pie,
      ThirdList,
      ReportFermentItem,
      ReportActionItem
    },
    data () {
      return {
        // 左列表tab
        tabLeftList: [
          {
            key: 'fajiao',
            tab: '事件发酵'
          },
          {
            key: 'action',
            tab: '重大行动'
          }
        ],
        activeLeftKey: 'fajiao',

        // 右2 tab
        tabRightList: [
          {
            key: 'month',
            tab: '上报事件趋势'
          },
          {
            key: 'social',
            tab: '各平台分布统计'
          }
        ],
        activeRightKey: 'month',

        // 右上 饼图数据
        pieCircleData: [],
        // tab卡片 线图和饼图
        lineData: [],
        pieData: [],
        // 右下角列表
        listData: [],
        // 左边大列表
        reportListData: [],
        reportListData2: [],
        currentPageFajiao: 0,
        currentPageXingdong: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this.pieCircleData = pieCircle
        this.lineData = line
        this.pieData = pie
        this.listData = list
        this.reportListData = reportList
        this.reportListData2 = reportList2
      }, 500)
    },
    methods: {
      handleLeftTabChange(e) {
        this.activeLeftKey = e
      },
      handleRightTabChange(e) {
        this.activeRightKey = e
      }
    }
}
</script>

<style lang="less" scoped>

</style>
