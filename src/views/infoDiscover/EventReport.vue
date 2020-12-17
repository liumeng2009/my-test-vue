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
                <a-list :loading="reportFermentLoading" :data-source="reportFerment" :pagination="true">
                  <a-list-item slot="renderItem" :key="index" slot-scope="item, index">
                    <ReportFermentItem :dataSource="item" />
                  </a-list-item>
                </a-list>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="'xingdong'" style="min-height: 600px">
              <template v-slot:tab>
                事件行动
                <span class="tab-bar-num">8</span>
              </template>
              <div class="list-container">
                <a-list :loading="reportActionLoading" :data-source="reportAction" :pagination="true">
                  <a-list-item slot="renderItem" :key="index" slot-scope="item, index">
                    <ReportActionItem :dataSource="item" />
                  </a-list-item>
                </a-list>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="事件统计" :bodyStyle="{padding: 0}" style="margin-bottom: 16px">
          <a-spin :spinning="reportLoading">
            <PieCircle :dataSource="reportData" :height="200" :width="300" />
          </a-spin>
        </a-card>
        <div class="card-container" style="margin-bottom: 16px">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="activeRightKey"
            @change="handleRightTabChange($event)"
          >
            <a-tab-pane :key="'month'" :tab="'上报事件趋势'">
              <a-spin :spinning="reportNumLoading">
                <LineChart :dataSource="reportNumData" :height="200" />
              </a-spin>
            </a-tab-pane>
            <a-tab-pane :key="'social'" :tab="'各平台分布统计'">
              <a-spin :spinning="reportSocialLoading">
                <Pie :dataSource="reportSocialData" :height="200" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { PieCircle, LineChart, Pie, ReportFermentItem, ReportActionItem } from '@/components'

const reportFermentRequest = [
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  },
  {
    title: '平度老兵',
    content: '大家一定要小心',
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  }
]
const reportActionRequest = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    title: '平度老兵',
    source: 'Twitter',
    content: '大家一定要小心',
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
    type: '境内群体事件 社会福利漏洞',
    createdAt: '2020-10-11',
    location: '平度',
    tags: '平度老兵、上街抗议'
  }
]
const reportRequest = [
  { name: '行动', value: 15 },
  { name: '发酵', value: 23 }
]

const reportNumRequest = [
  { name: '6月', xingdong: 23, fajiao: 12, all: 35 },
  { name: '7月', xingdong: 13, fajiao: 52, all: 65 },
  { name: '8月', xingdong: 63, fajiao: 22, all: 85 }
]

const reportSocialRequest = [
  { name: 'Twitter', value: 15 },
  { name: 'Facebook', value: 23 },
  { name: 'Youtube', value: 15 },
  { name: 'Other', value: 23 }
]
export default {
    name: 'EventReport',
    components: {
      PieCircle,
      LineChart,
      Pie,
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
        reportData: [],
        reportLoading: false,
        // tab卡片 线图和饼图
        reportNumData: [],
        reportSocialData: [],

        // 左边大列表
        reportFerment: [],
        reportFermentLoading: false,
        currentPageFerment: 0,

        reportAction: [],
        reportActionLoading: false,
        currentPageAction: 0
      }
    },
    created () {
      this.getReport()
      this.getReportNum()
      this.getReportSocial()
      this.getReportFerment()
      this.getReportAction()
    },
    methods: {
      getReportFerment () {
        this.reportFermentLoading = true
        setTimeout(() => {
          this.reportFerment = reportFermentRequest
          this.reportFermentLoading = false
        }, 1000)
      },
      getReportAction () {
        this.reportActionLoading = true
        setTimeout(() => {
          this.reportAction = reportActionRequest
          this.reportActionLoading = false
        }, 1000)
      },
      getReport () {
        this.reportLoading = true
        setTimeout(() => {
          this.reportData = reportRequest
          this.reportLoading = false
        }, 1000)
      },
      getReportNum () {
        this.reportNumLoading = true
        setTimeout(() => {
          this.reportNumData = reportNumRequest
          this.reportNumLoading = false
        }, 1000)
      },
      getReportSocial () {
        this.reportSocialLoading = true
        setTimeout(() => {
          this.reportSocialData = reportSocialRequest
          this.reportSocialLoading = false
        }, 1000)
      },
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
.tab-bar-num{
  position: absolute;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: red;
  color: #fff;
  top: 0px;
  right: 8px;
  line-height: 18px;
  text-align: center;
}
</style>
