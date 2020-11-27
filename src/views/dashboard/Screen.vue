<template>
  <div class="container">
    <div class="left">
      <div class="wrapper">
        <a-card title="平台抓取数据量" size="small">
          <div slot="extra">单位:万</div>
          <Statistic>
            <StatisticItem name="Twitter" :value="7190 | numToStr" />
            <StatisticItem name="Facebook" :value="6190 | numToStr" />
            <StatisticItem name="Youtube" :value="3001 | numToStr" />
            <StatisticItem name="website" :value="108 | numToStr" />
          </Statistic>
        </a-card>
      </div>
      <div class="wrapper">
        <MaqueList :dataSource="maqueListData"></MaqueList>
      </div>
      <div class="wrapper">
        <a-card title="线索发现分布">
          <v-chart :force-fit="true" ref="myChart" :height="405" :data="pieData" :scale="pieScale">
            <v-tooltip :showTitle="false" dataKey="item*percent" />
            <v-axis />
            <!-- position="right" :offsetX="-140" -->
            <!-- <v-legend dataKey="item"/> -->
            <v-pie position="percent" color="item" :vStyle="pieStyle" />
            <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
          </v-chart>
        </a-card>
      </div>
    </div>
    <div class="center">456</div>
    <div class="right">
      <div class="wrapper">
        <a-card
          size="small"
          :tab-list="tabList"
          :active-tab-key="activeKey"
          @tabChange="handleTabChange($event)"
        >
          <div v-if="activeKey === 'report'" class="maque-container">
            <Statistic>
              <StatisticItem name="一年" :value="12 | numToStr" />
              <StatisticItem name="三个月" :value="8 | numToStr" />
              <StatisticItem name="本月" :value="7 | numToStr" />
              <StatisticItem name="当日" :value="8 | numToStr" />
            </Statistic>
          </div>
        </a-card>
      </div>
      <div class="wrapper">
        <a-card
          size="small"
          title="预警量统计"
        >
          <mini-smooth-area :style="{ height: '45px' }" :dataSource="searchUserData" :scale="searchUserScale" />
        </a-card>
      </div>
      <div class="wrapper">
        <a-row :gutter="4">
          <a-col span="12" >
            <a-card title="月度预警变化" size="small" style="height:150px">
              <mini-bar />
            </a-card>
          </a-col>
          <a-col span="12">
            <a-card title="当日预警变化" size="small" style="height:150px">
              <mini-bar />
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="wrapper">
        <a-card
          size="small"
          :tab-list="tabLineList"
          :active-tab-key="activeLineKey"
          @tabChange="handleLineTabChange($event)"
        >
          <mini-bar />
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Statistic, StatisticItem, MaqueList, MiniSmoothArea, MiniBar } from '@/components'

const data = [
  {
    id: 0,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件111111111',
    area: '中国-平度'
  },
  {
    id: 1,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件22222222222',
    area: '中国-平度'
  },
  {
    id: 2,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件33333333333333',
    area: '中国-平度'
  },
  {
    id: 3,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件444444444',
    area: '中国-平度'
  },
  {
    id: 4,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件5555555',
    area: '中国-平度'
  },
  {
    id: 5,
    date: '2020-11-1 22:00:01',
    type: '行动类',
    content: '新的事件66666666',
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

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

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

export default {
    name: 'Screen',
    components: {
      Statistic,
      StatisticItem,
      MaqueList,
      MiniSmoothArea,
      MiniBar
    },
    data () {
      return {
        maqueListData: data,
        pieData,
        pieScale,
        searchUserData,
        searchUserScale,
        pieStyle: {
          stroke: '#fff',
          lineWidth: 1
        },
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
        activeKey: 'report',
        activeLineKey: 'day'
      }
    },
    methods: {
      handleTabChange (e) {
        this.activeKey = e
      },
      handleLineTabChange (e) {
        this.activeLineKey = e
      }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        min-height: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .wrapper {
          margin-bottom: 16px;
        }
        .left {
            width: 400px;
            height: 100%;
            box-sizing: border-box;
            padding-right: 4px;
            .wrapper:nth-of-type(3){
              margin-bottom: 0px;
            }
        }

        .center{
            height: 100%;
            width: calc(100% - 800px);
            padding: 0px 4px;
            background: #ccc;

            .wrapper:nth-of-type(2){
              margin-bottom: 0px;
            }
        }

        .right {
            width: 400px;
            height: 100%;
            padding-left:4px;
            .wrapper:nth-of-type(4){
              margin-bottom: 0px;
            }
        }
    }
</style>
