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
            :default-active-key="activeLeftKey"
            @change="handleLeftTabChange($event)"
          >
            <a-tab-pane v-for="item in tabLeftList" :key="item.key" :tab="item.tab">
              <MaqueList :dataSource="maqueListData"></MaqueList>
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
        <a-card title="预警地区分布" :bodyStyle="{ padding: 0 }" :bordered="false">
          <div id="map"></div>
        </a-card>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'预警区域统计'" style="padding: 0px;height: 200px;">
              <a-spin :spinning="warningRegionLoading">
                <Bar :dataSource="warningRegion" :height="200" />
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
            <a-tab-pane :key="'tab'" :tab="'预警统计'" style="padding: 0px;height: 200px;">
              <a-spin :spinning="recentWarningLoading">
                <Bar :dataSource="recentWarning" :height="200" />
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
            <a-tab-pane :key="'tab'" :tab="'全群体热点话题'" style="height: 200px;">
              <div class="extra">
                <a href="#" :class="hotTopicType === 'day' ? 'selected' : ''" @click="getHotTopicData('day')">当日</a>
                <a href="#" :class="hotTopicType === 'week' ? 'selected' : ''" @click="getHotTopicData('week')">本周</a>
                <a href="#" :class="hotTopicType === 'month' ? 'selected' : ''" @click="getHotTopicData('month')">本月</a>
              </div>
              <a-skeleton :loading="hotTopicLoading">
                <a-list bordered :data-source="hotTopic">
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-row>
                      <a-col :span="18">{{ item.title }}</a-col>
                      <a-col :span="6">{{ item.hotValue }}</a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
              </a-skeleton>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MaqueList, ChartContainer, Pie, Bar, LineChart, HotBar } from '@/components'

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
  { title: '热点话题1', hotValue: 999 },
  { title: '很长很长很长很长很长很长很长很长很长很长很长很长的热点话题2', hotValue: 999 },
  { title: '热点话题3', hotValue: 999 },
  { title: '热点话题4', hotValue: 999 },
  { title: '热点话题5', hotValue: 999 },
  { title: '热点话题6', hotValue: 999 },
  { title: '热点话题7', hotValue: 999 },
  { title: '热点话题8', hotValue: 999 },
  { title: '热点话题9', hotValue: 999 },
  { title: '热点话题10', hotValue: 999 }
]

const dataMaque = [
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
    content: '新的事件2',
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

const pie = [// eslint-disable-line no-unused-vars
  { name: '家用电器', value: 32.2 },
  { name: '食用酒水', value: 21 },
  { name: '个护健康', value: 17 },
  { name: '服饰箱包', value: 13 },
  { name: '母婴产品', value: 9 },
  { name: '其他', value: 7.8 }
]

const line = [// eslint-disable-line no-unused-vars
  { name: '家用电器', value: 32.2, value2: 55 },
  { name: '食用酒水', value: 21, value2: 5 },
  { name: '个护健康', value: 17, value2: 15 },
  { name: '服饰箱包', value: 13, value2: 19 },
  { name: '母婴产品', value: 9, value2: 75 },
  { name: '其他', value: 7.8, value2: 10 }
]

const dataSimpleLine = [// eslint-disable-line no-unused-vars
  { name: '前月', value: 8, type: 'rise' },
  { name: '本月', value: 12 }
]
const dataSimpleLineFall = [// eslint-disable-line no-unused-vars
  { name: '前月', value: 12, type: 'fall' },
  { name: '本月', value: 8 }
]

const dataHot = [// eslint-disable-line no-unused-vars
  { name: '巴西', value: 3000 },
  { name: '咸安事件', value: 9700, trend: 2 },
  { name: '爆炸爆炸爆炸爆炸爆炸爆炸爆炸', value: 9000, trend: 1 },
  { name: '美国', value: 7000, trend: 1 },
  { name: '印尼', value: 6500 }
]

export default {
  name: 'Screen',
  components: {
    MaqueList,
    ChartContainer,
    Pie,
    Bar,
    LineChart,
    HotBar
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
      hotTopicType: 'day',

      maqueListData: dataMaque,
      pieData: pie,
      lineData: line,
      tabLeftList: [
        {
          key: 'report',
          tab: '事件上报'
        },
        {
          key: 'discovery',
          tab: '线索发现'
        }
      ],
      activeLeftKey: 'report',
      tabList: [
        {
          key: 'report',
          tab: '事件研判'
        },
        {
          key: 'discovery',
          tab: '线索发现'
        },
        {
          key: 'human',
          tab: '人员落地'
        }
      ],
      activeKey: 'report',
      tabHotList: [
        {
          key: 'dayHot',
          tab: '当日热点排行'
        },
        {
          key: 'weekHot',
          tab: '本周热点排行'
        }
      ],
      activeHotKey: 'dayHot',
      tabLineList: [
        {
          key: 'day',
          tab: '当日热点排行'
        },
        {
          key: 'week',
          tab: '一周热点排行'
        }
      ],
      activeLineKey: 'day',
      totalData: [
        {
          title: '总数',
          value: 320121
        },
        {
          title: '本月总数',
          value: 41834
        }
      ],
      dataSimpleLine,
      dataSimpleLineFall,
      dataHot
    }
  },
  created () {
    this.getGlobalData()
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
    },
    handleLeftTabChange (e) {
      this.activeLeftKey = e
    },
    handleTabChange (e) {
      this.activeKey = e
    },
    handleHotTabChange (e) {
      this.activeHotKey = e
      console.log(e)
    },
    handleLineTabChange (e) {
      this.activeLineKey = e
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
      height: 500px;
    }
  }

  > .right {
    width: 400px;
    height: 100%;
    padding-left: 4px;
  }
}
.extra{
  position: absolute;;
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
