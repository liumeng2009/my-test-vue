<template>
  <div class="container">
    <div class="left">
      <div class="wrapper">
        <a-card title="平台抓取数据量" :bordered="false">
          <a slot="extra">单位:万</a>
          <a-row>
            <a-col :span="6"><a-statistic title="Twitter" class="center" :value="7190"></a-statistic></a-col>
            <a-col :span="6"><a-statistic title="Facebook" class="center" :value="7190"></a-statistic></a-col>
            <a-col :span="6"><a-statistic title="Youtube" class="center" :value="7190"></a-statistic></a-col>
            <a-col :span="6"><a-statistic title="Website" class="center" :value="7190"></a-statistic></a-col>
          </a-row>
        </a-card>
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
        <a-card title="线索发现分布" :bodyStyle="{padding: 0}" :bordered="false">
          <Chart-Container :totalData="totalData" :showTotalBackground="false" :chartHeight="300">
            <Pie :dataSource="pieData" />
          </Chart-Container>
        </a-card>
      </div>
    </div>
    <div class="center">
      <div class="wrapper">
        <a-card title="预警地区分布" :bodyStyle="{ padding: 0 }" :bordered="false">
          <div id="map"></div>
        </a-card>
      </div>
      <div class="wrapper">
        <a-card title="线索发现分布" :bodyStyle="{padding: 0}" :bordered="false">
          <Chart-Container :totalData="totalData" :showTotalBackground="false" :chartHeight="237">
            <Bar :dataSource="pieData" />
          </Chart-Container>
        </a-card>
      </div>
    </div>
    <div class="right">
      <div class="wrapper">
        <div class="card-container">
          <a-tabs type="card" :tab-list="tabList" :default-active-key="activeKey" @change="handleTabChange($event)">
            <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
              <a-row>
                <a-col :span="6"><a-statistic title="一年" class="center" :value="12"></a-statistic></a-col>
                <a-col :span="6"><a-statistic title="三个月" class="center" :value="8"></a-statistic></a-col>
                <a-col :span="6"><a-statistic title="本月" class="center" :value="7"></a-statistic></a-col>
                <a-col :span="6"><a-statistic title="当日" class="center" :value="8"></a-statistic></a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrapper">
        <a-card :bordered="false" title="预警量统计" style="height: 235px" :bodyStyle="{padding: 0}">
          <div class="extra-links" slot="extra">
            <a>年</a>
            <a>季</a>
            <a>月</a>
            <a>周</a>
          </div>
          <LineChart :dataSource="lineData" :height="196" />
        </a-card>
      </div>
      <div class="wrapper">
        <a-row :gutter="16">
          <a-col span="12">
            <a-card title="月度预警变化" :bodyStyle="{padding: 0}" :bordered="false">
              <Chart-Container :totalData="totalData" :showTotalBackground="false" :size="'small'" :chartHeight="100">
                <Bar :dataSource="dataSimpleLine" :trend="true" :trendType="'rise'" />
              </Chart-Container>
            </a-card>
          </a-col>
          <a-col span="12">
            <a-card title="当日预警变化" :bodyStyle="{padding: 0}" :bordered="false">
              <Chart-Container :totalData="totalData" :showTotalBackground="false" :size="'small'" :chartHeight="100" >
                <Bar :dataSource="dataSimpleLineFall" :trend="true" :trendType="'fall'"/>
              </Chart-Container>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs type="card" :tab-list="tabHotList" :default-active-key="activeHotKey" @change="handleHotTabChange($event)">
            <a-tab-pane v-for="item in tabHotList" :key="item.key" :tab="item.tab">
              <HotBar :dataSource="dataHot" :height="203" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MaqueList, MiniSmoothArea, MiniBar, ChartContainer, Pie, Bar, LineChart, HotBar } from '@/components'

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
    MiniSmoothArea,
    MiniBar,
    ChartContainer,
    Pie,
    Bar,
    LineChart,
    HotBar
  },
  data() {
    return {
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
  mounted () {},
  methods: {
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
.extra-links a {
  margin-right: 8px;
}

</style>
