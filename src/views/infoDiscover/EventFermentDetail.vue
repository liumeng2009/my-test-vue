<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card title="发酵事件详情">
            <div class="detail-wrapper">
                <div class="top">
                    <span><a-icon type="heat-map" />美国</span>
                    <span><a-icon type="profile" />境内群体事件</span>
                </div>
                <div class="title">
                    <div class="left">
                        <span>发酵主题：</span>
                        平度老兵，上街抗议，声称维权
                    </div>
                    <div class="right">
                        阶段报告：
                        <a>平度劳宾</a>
                        <a-icon type="download" />
                    </div>
                </div>
                <div class="createdAt">
                    2020-4-10 15:54:41
                </div>
                <div class="progress">
                    <a-progress :percent="55" status="active" />
                </div>
                <div class="list-head">
                    <span>20</span>条相关言论
                </div>
                <div class="list-container">

                </div>
            </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="预警原因" style="margin-bottom: 16px">
            <div style="display:flex;align-items: center;justify-content: space-between">
                <a-icon type="check" />
                符合
                <span>事件发酵</span>
                模型
            </div>
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
    name: 'EventFermentDetail',
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
