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
            <v-chart
              :force-fit="true"
              ref="myChart"
              :height="300"
              :padding="[20, 150, 20, 20]"
              :data="pieData"
              :scale="pieScale">
              <!-- <v-tooltip :showTitle="true" dataKey="item*percent" /> -->
              <v-axis />
              <!-- position="right" :offsetX="-140" -->
              <!-- <v-legend dataKey="item"/> -->
              <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
              <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
            </v-chart>
          </Chart-Container>
        </a-card>
      </div>
    </div>
    <div class="center">
      <a-card title="预警地区分布" :bodyStyle="{ padding: 0 }" :bordered="false">
        <div id="map"></div>
      </a-card>
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
        <a-card :bordered="false" title="预警量统计">
          <div class="extra-links" slot="extra">
            <a>年</a>
            <a>季</a>
            <a>月</a>
            <a>周</a>
          </div>
          <v-chart :forceFit="true" :height="150" :padding="linePadding" :data="dataLine" :scale="scaleLine">
            <v-tooltip />
            <v-axis dataKey="temperature" :title="title"></v-axis>
            <v-legend :itemFormatter="itemFormatter" position="top" />
            <v-smooth-line position="month*temperature" color="city" shape="smooth" />
            <v-point position="month*temperature" color="city" shape="circle" />
          </v-chart>
        </a-card>
      </div>
      <div class="wrapper">
        <a-row :gutter="16">
          <a-col span="12">
            <a-card title="月度预警变化" :bodyStyle="{padding: 0}" :bordered="false">
              <Chart-Container :totalData="totalData" :showTotalBackground="false" :size="'small'" :chartHeight="100" :totalPosition="'bottom'">
                <v-chart :forceFit="true" :height="100" :padding="[60, 90, 8, 20]" :data="dataSimpleLine" :scale="scaleSimpleLine">
                  <v-axis dataKey="year" :label="false" />
                  <v-axis dataKey="value" :label="false" :line="{stroke: '#e8e8e8'}" />
                  <v-interval position="year*value" :label="labelInterval" :opcaity="1" :size="10"></v-interval>
                  <v-series
                    :gemo="seriesOpts2.gemo"
                    :position="seriesOpts2.position"
                    :size="seriesOpts2.size"
                    :color="seriesOpts2.color"
                    :shape="seriesOpts2.shape"
                    :label="seriesOpts2.label" />
                </v-chart>
              </Chart-Container>
            </a-card>
          </a-col>
          <a-col span="12">
            <a-card title="当日预警变化" :bodyStyle="{padding: 0}" :bordered="false">
              <Chart-Container :totalData="totalData" :showTotalBackground="false" :size="'small'" :chartHeight="100" :totalPosition="'bottom'">
                <v-chart :forceFit="true" :height="100" :padding="[60, 90, 8, 20]" :data="dataSimpleLine" :scale="scaleSimpleLine">
                  <v-axis dataKey="year" :label="false" />
                  <v-axis dataKey="value" :label="false" :line="{stroke: '#e8e8e8'}" />
                  <v-interval position="year*value" :label="labelInterval" :opcaity="1" :size="10"></v-interval>
                </v-chart>
              </Chart-Container>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="wrapper">
        <div class="card-container">
          <a-tabs type="card" :tab-list="tabHotList" :default-active-key="activeHotKey" @change="handleHotTabChange($event)">
            <a-tab-pane v-for="item in tabHotList" :key="item.key" :tab="item.tab">
              <v-chart :forceFit="true" :height="200" :data="dataHot" :scale="scaleHot" :padding="[20, 70, 20, 100]">
                <v-coord type="rect" direction="LB" />
                <v-tooltip />
                <v-axis dataKey="name" :line="false" />
                <v-axis dataKey="value" :label="false" />
                <v-interval position="name*value" :label="labelHotInterval" :opcaity="1" :size="20"></v-interval>
                <v-series
                  :gemo="seriesOpts.gemo"
                  :position="seriesOpts.position"
                  :size="seriesOpts.size"
                  :color="seriesOpts.color"
                  :shape="seriesOpts.shape"
                  :label="seriesOpts.label" />
              </v-chart>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Statistic, StatisticItem, MaqueList, MiniSmoothArea, MiniBar, ChartContainer } from '@/components'
import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import { registerShape } from 'viser-vue'
import TopFilling from '@/assets/icons/top-filling.png'
// import RiseFilling from '@/assets/icons/rise-filling.png'
import LogoSvg from '@/assets/logo.svg'
import RiseSvg from '@/assets/icons/rise.svg'

registerShape('point', 'image', {
  drawShape: function(cfg, container) {
    cfg.points = this.parsePoints(cfg.points)
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x + 60,
        y: cfg.points[0].y - 6 * cfg.size,
        width: 12 * cfg.size,
        height: 12 * cfg.size,
        img: cfg.shape[1]
      }
    })
  }
})
const seriesOpts = {
  gemo: 'point',
  position: 'name*value',
  size: '1.5',
  shape: ['trend', function(trend) {
    switch (trend) {
      case 0:
        return
      case 1:
        return ['image', LogoSvg]
      case 2:
        return ['image', TopFilling]
      default:
        break
    }
  }],
  label: false
}

registerShape('interval', 'image', {
  drawShape: function(cfg, container) {
    cfg.points = this.parsePoints(cfg.points)
    console.log(cfg)
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x + 40,
        y: cfg.points[0].y - 12 * cfg.size - 50,
        width: 12 * cfg.size,
        height: 12 * cfg.size,
        img: cfg.shape[1]
      }
    })
  }
})
const seriesOpts2 = {
  gemo: 'interval',
  position: 'name*value',
  size: '2',
  color: 'red',
  shape: ['type', function(type) {
    switch (type) {
      case 0:
        return
      case 'up':
        return ['image', RiseSvg]
      case 2:
        return ['image', TopFilling]
      default:
        break
    }
  }],
  label: false
}

const mapBox = new Mapbox({
  style: 'light',
  pitch: 0,
  center: [116.2825, 39.9],
  zoom: 1
})
let scene // eslint-disable-line no-unused-vars

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

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
]

const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }
]

const sourceLineData = [
  // eslint-disable-line no-unused-vars
  { month: '一月', xingdong: 7.0, fajiao: 3.9 },
  { month: '二月', xingdong: 6.9, fajiao: 4.2 },
  { month: '三月', xingdong: 9.5, fajiao: 5.7 },
  { month: '四月', xingdong: 14.5, fajiao: 8.5 },
  { month: '五月', xingdong: 18.4, fajiao: 11.9 },
  { month: '六月', xingdong: 21.5, fajiao: 15.2 },
  { month: '七月', xingdong: 25.2, fajiao: 17.0 },
  { month: '八月', xingdong: 26.5, fajiao: 16.6 },
  { month: '九月', xingdong: 23.3, fajiao: 14.2 },
  { month: '十月', xingdong: 18.3, fajiao: 10.3 },
  { month: '十一月', xingdong: 13.9, fajiao: 6.6 },
  { month: '十二月', xingdong: 9.6, fajiao: 4.8 }
]
const title = {// eslint-disable-line no-unused-vars
  offset: 30,
  position: 'end',
  textStyle: {
    fontSize: 12
  }
}

const linePadding = [30, 20, 40, 50]// eslint-disable-line no-unused-vars

const dvLine = new DataSet.View().source(sourceLineData) // eslint-disable-line no-unused-vars
dvLine.transform({
  type: 'fold',
  fields: ['xingdong', 'fajiao'],
  key: 'city',
  value: 'temperature'
})
const dataLine = dvLine.rows // eslint-disable-line no-unused-vars

const scaleLine = [
  {
    dataKey: 'temperature',
    nice: false,
    alias: '单位:件'
  }
]

const fieldMap = [
  {
    title: '行动',
    value: 'xingdong'
  },
  {
    title: '发酵',
    value: 'fajiao'
  }
]

const dataSimpleLine = [
  { year: '前月', value: 8, type: 'up' },
  { year: '本月', value: 12, type: 'up' }
]
const scaleSimpleLine = [{// eslint-disable-line no-unused-vars
  dataKey: 'year'
}, {
  dataKey: 'value'
}]
const labelInterval = ['value', {// eslint-disable-line no-unused-vars
  useHtml: true,
  htmlTemplate: function htmlTemplate(text, item) {
    var a = item.point
    return `<span>${a.value}</span>`
  }
}]

const dataHot = [// eslint-disable-line no-unused-vars
  { name: '巴西', value: 3000 },
  { name: '咸安事件', value: 9700, trend: 2 },
  { name: '爆炸爆炸爆炸爆炸爆炸爆炸爆炸', value: 9000, trend: 1 },
  { name: '美国', value: 7000, trend: 1 },
  { name: '印尼', value: 6500 }
]

dataHot.sort(function(a, b) {
  return a.value - b.value
})
const scaleHot = [{// eslint-disable-line no-unused-vars
  dataKey: 'name'
}, {
  dataKey: 'value'
}]
const labelHotInterval = ['value', {// eslint-disable-line no-unused-vars
  useHtml: true,
  htmlTemplate: function htmlTemplate(text, item) {
    var a = item.point
    return `<span>${a.value}</span>`
  }
}]

export default {
  name: 'Screen',
  components: {
    Statistic,
    StatisticItem,
    MaqueList,
    MiniSmoothArea,
    MiniBar,
    ChartContainer
  },
  data() {
    return {
      maqueListData: dataMaque,
      pieData,
      pieScale,
      searchUserData,
      searchUserScale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
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
          key: 'dayWeek',
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
      labelConfig: [
        'percent',
        {
          formatter: (val, item) => {
            return item.point.item + ': ' + val
          }
        }
      ],
      dataLine,
      scaleLine,
      title,
      linePadding,
      dataSimpleLine,
      scaleSimpleLine,
      labelInterval,
      dataHot,
      scaleHot,
      labelHotInterval,
      seriesOpts,
      seriesOpts2
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    drawMap () {
      scene = new Scene({
        id: 'map',
        logoVisible: false,
        map: mapBox
      })
    },
    handleLeftTabChange (e) {
      this.activeLeftKey = e
    },
    handleTabChange (e) {
      this.activeKey = e
    },
    handleHotTabChange (e) {
      this.activeHotKey = e
    },
    handleLineTabChange (e) {
      this.activeLineKey = e
    },
    itemFormatter (val) {
      let result
      fieldMap.forEach(item => {
        if (item.value === val) {
          result = item.title
        }
      })
      return result
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
    width: 500px;
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
    width: 600px;
    height: 100%;
    padding-left: 4px;
  }
}
.extra-links a {
  margin-right: 8px;
}

</style>
