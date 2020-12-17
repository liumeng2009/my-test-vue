<template>
  <div class="container">
    <div class="left">
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="activeGlobalNumKey"
            @change="handleGlobalNumTabChange($event)"
            :loading="globalNumLoading"
          >
            <a-tab-pane :key="'social'" tab="各聚集平台总量">
              <a-spin :spinning="globalNumLoading">
                <a-row>
                  <a-col :span="12"><a-statistic title="Twitter" class="center" :value="globalNum[0]"></a-statistic></a-col>
                  <a-col :span="12"><a-statistic title="Facebook" class="center" :value="globalNum[1]"></a-statistic></a-col>
                </a-row>
              </a-spin>
            </a-tab-pane>
            <a-tab-pane :key="'account'" tab="重点账号总量">
              <a-spin :spinning="globalNumLoading">
                <a-row>
                  <a-col :span="12"><a-statistic title="Twitter" class="center" :value="globalNum[2]"></a-statistic></a-col>
                  <a-col :span="12"><a-statistic title="Facebook" class="center" :value="globalNum[3]"></a-statistic></a-col>
                </a-row>
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'warn'"
          >
            <a-tab-pane :key="'warn'" :tab="'事件预警展示'" style="height: 500px">
              <a-skeleton :loading="maqueLoading" :active="true" :paragraph="{ rows: 10 }">
                <MaqueList :dataSource="maque"></MaqueList>
              </a-skeleton>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'话题统计'">
              <a-spin :spinning="topicNumLoading">
                <a-row>
                  <a-col :span="8"><a-statistic title="当日" class="center" :value="32"></a-statistic></a-col>
                  <a-col :span="8"><a-statistic title="本周" class="center" :value="345"></a-statistic></a-col>
                  <a-col :span="8"><a-statistic title="本月" class="center" :value="2981"></a-statistic></a-col>
                </a-row>
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'map'"
          >
            <a-tab-pane :key="'map'" :tab="'预警地区分布'" >
              <div id="map"></div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'预警区域统计'" style="padding: 0px;height: 242px;">
              <a-spin :spinning="warningRegionLoading">
                <Bar :dataSource="warningRegion" :height="242" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'监控账号'">
              <a-spin :spinning="accountNumLoading">
                <a-row>
                  <a-col :span="12"><a-statistic title="Twitter" class="center" :value="accountNum[0]"></a-statistic></a-col>
                  <a-col :span="12"><a-statistic title="Facebook" class="center" :value="accountNum[1]"></a-statistic></a-col>
                </a-row>
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'预警统计'" style="padding: 0px;height: 210px;">
              <a-spin :spinning="recentWarningLoading">
                <Bar :dataSource="recentWarning" :height="210" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'全群体热点话题'" style="height: 382px;">
              <div class="extra">
                <a href="#" :class="hotTopicType === 'day' ? 'selected' : ''" @click="getHotTopicData('day')">当日</a>
                <a href="#" :class="hotTopicType === 'week' ? 'selected' : ''" @click="getHotTopicData('week')">本周</a>
                <a href="#" :class="hotTopicType === 'month' ? 'selected' : ''" @click="getHotTopicData('month')">本月</a>
              </div>
              <a-skeleton :loading="hotTopicLoading" :active="true" :paragraph="{ rows: 9 }">
                <div style="width: 100%;">
                  <TopicItemSec v-for="(item, index) in hotTopic" :key="index" :dataSource="item" />
                </div>
              </a-skeleton>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MaqueList, Pie, Bar, LineChart, TopicItemSec } from '@/components'

const globalNumRequest = [98791, 54098, 45, 55]
const topicNumRequest = [32, 345, 2981]
const accountNumRequest = [99, 100]

const warningRegionRequest = [
  { name: '中国', value: 54698 },
  { name: '美国', value: 44698 },
  { name: '日本', value: 54698 },
  { name: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉', value: 44698 },
  { name: '韩国', value: 54698 },
  { name: '越南', value: 44698 }
]

const recentWarningRequest = [
  { name: '九月份', value: 54698 },
  { name: '十月份', value: 44698 },
  { name: '十一月份', value: 94698 }
]

const hotTopicRequest = [
  { title: '热点话题1', value: 999 },
  { title: '很长很长很长很长很长很长很长很长很长很长很长很长的热点话题2', value: 999 },
  { title: '热点话题3', value: 999 },
  { title: '热点话题4', value: 999 },
  { title: '热点话题5', value: 999 },
  { title: '热点话题6', value: 999 },
  { title: '热点话题7', value: 999 },
  { title: '热点话题8', value: 999 },
  { title: '热点话题9', value: 999 },
  { title: '热点话题10', value: 999 }
]

const maqueRequest = [
  {
    id: 0,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件1',
    area: '中国-平度'
  },
  {
    id: 1,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '名字很长很长很长很长很长很长的新的事件2',
    area: '中国-平度'
  },
  {
    id: 2,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件3',
    area: '中国-平度'
  },
  {
    id: 3,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件4',
    area: '中国-平度'
  },
  {
    id: 4,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件5',
    area: '中国-平度'
  },
  {
    id: 5,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件6',
    area: '中国-平度'
  },
  {
    id: 6,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件7',
    area: '中国-平度'
  },
  {
    id: 7,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件8',
    area: '中国-平度'
  },
  {
    id: 8,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件9',
    area: '中国-平度'
  },
  {
    id: 9,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件10',
    area: '中国-平度'
  }
]

export default {
  name: 'Screen',
  components: {
    MaqueList,
    Pie,
    Bar,
    LineChart,
    TopicItemSec
  },
  data() {
    return {
      // 左1
      globalNum: [],
      globalNumLoading: false,
      activeGlobalNumKey: 'social',
      tabGlobalNumList: [
        {
          key: 'social',
          tab: '各聚集平台总量'
        },
        {
          key: 'account',
          tab: '重点账号总量'
        }
      ],

      // 左2
      maque: [],
      maqueLoading: false,

      // 左3
      topicNum: [],
      topicNumLoading: false,

      // 中2
      warningRegion: [],
      warningRegionLoading: false,

      // 右1
      accountNum: [],
      accountNumLoading: false,

      // 右2
      recentWarning: [],
      recentWarningLoading: false,

      // 右3
      hotTopic: [],
      hotTopicLoading: false,
      hotTopicType: 'day'
    }
  },
  created () {
    this.getGlobalData()
    this.getMaqueData()
    this.getTopicNumData()
    this.getAccountNumData()
    this.getRecentWarningData()
    this.getWarningRegionData()
    this.getHotTopicData(this.hotTopicType)
  },
  methods: {
    getGlobalData () {
      this.globalNumLoading = true
      setTimeout(() => {
        Math.random() > 0.85 ? (() => {
          // 成功
          this.globalNum = [...globalNumRequest]
          this.globalNumLoading = false
        })() : (() => {
          // 失败
          this.$message.error('请求失败')
          this.globalNumLoading = false
        })()
      }, 1000)
    },
    getMaqueData () {
      this.maqueLoading = true
      setTimeout(() => {
        this.maque = maqueRequest.concat(maqueRequest)
        this.maqueLoading = false
      }, 1000)
    },
    getTopicNumData () {
      this.topicNumLoading = true
      setTimeout(() => {
        this.topicNum = [...topicNumRequest]
        this.topicNumLoading = false
      }, 1000)
    },
    getAccountNumData () {
      this.accountNumLoading = true
      setTimeout(() => {
        this.accountNum = [...accountNumRequest]
        this.accountNumLoading = false
      }, 1000)
    },
    getRecentWarningData () {
      this.recentWarningLoading = true
      setTimeout(() => {
        this.recentWarning = [...recentWarningRequest]
        this.recentWarningLoading = false
      }, 1000)
    },
    getWarningRegionData () {
      this.warningRegionLoading = true
      setTimeout(() => {
        this.warningRegion = [...warningRegionRequest]
        this.warningRegionLoading = false
      }, 1000)
    },
    getHotTopicData (type) {
      this.hotTopicType = type
      this.hotTopicLoading = true
      setTimeout(() => {
        this.hotTopic = [...hotTopicRequest]
        this.hotTopicLoading = false
      }, 1000)
    },

    handleGlobalNumTabChange (e) {
      this.activeGlobalNumKey = e
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .wrapper {
    margin-bottom: 16px;
  }
  .wrapper:last-child {
    margin-bottom: 0;
  }
  > .left {
    width: 400px;
    height: 100%;
    box-sizing: border-box;
    padding-right: 4px;
  }

  > .center {
    height: 100%;
    width: calc(100% - 800px);
    padding: 0px 16px;

    #map {
      position: relative;
      width: 100%;
      height: 468px;
    }
  }

  > .right {
    width: 400px;
    height: 100%;
    padding-left: 4px;
  }
}
.extra{
  position: absolute;
  float:right;
  right: 8px;
  top: 8px;

  a{
    margin-right: 8px;

    &.selected{
      text-decoration: underline;
    }
  }
}
</style>
