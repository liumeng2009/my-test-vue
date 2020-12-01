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
          <v-chart
            :force-fit="true"
            ref="myChart"
            :height="150"
            :padding="[20, 20, 20, 20]"
            :data="pieData"
            :scale="pieScale"
          >
            <!-- <v-tooltip :showTitle="true" dataKey="item*percent" /> -->
            <v-axis />
            <!-- position="right" :offsetX="-140" -->
            <!-- <v-legend dataKey="item"/> -->
            <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
            <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
          </v-chart>
        </a-card>
        <a-card title="今日热词" :bodyStyle="{padding: 0}">
          <v-chart
            :autoFit="true"
            :width="rightWidth"
            :padding="[20, 20, 20, 20]"
            :height="150"
            :data="hotData"
            :scale="scale"
          >
            <v-point position="x*y" color="category" shape="cloud" tooltip="value*category" />
          </v-chart>
        </a-card>
        <a-card title="热词排行">
          <HotList :listData="hotListData" :transData="'hello'" />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { registerShape } from 'viser-vue'
import { WbList, HotList } from '@/components'

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

registerShape('point', 'cloud', {
  draw(cfg, container) {
    return container.addShape('text', {
      attrs: {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size / 2,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        ...cfg.style,
        x: cfg.x,
        y: cfg.y
      }
    })
  }
})

const hotWordData = [// eslint-disable-line no-unused-vars
  {
    x: 'China',
    value: 138,
    category: 'asia'
  },
  {
    x: 'India',
    value: 131,
    category: 'asia'
  },
  {
    x: 'United States',
    value: 32,
    category: 'america'
  },
  {
    x: 'Indonesia',
    value: 26,
    category: 'asia'
  },
  {
    x: 'Brazil',
    value: 20,
    category: 'america'
  },
  {
    x: 'Pakistan',
    value: 19,
    category: 'asia'
  },
  {
    x: 'Nigeria',
    value: 19,
    category: 'africa'
  },
  {
    x: 'Bangladesh',
    value: 16,
    category: 'asia'
  }
]

const dv2 = new DataSet.View().source(hotWordData)
const range = dv2.range('value')
const min = range[0]
const max = range[1]
dv2.transform({
    type: 'tag-cloud',
    fields: ['x', 'value'],
    size: [600, 600],
    font: 'Verdana',
    padding: 5,
    timeInterval: 5000, // max execute time
    color: 'red',
    rotate () {
      let random = ~~(Math.random() * 4) % 4
      if (random === 2) {
          random = 0
      }
      return 0// 0, 90, 270
    },
    fontSize (d) {
      if (d.value) {
        return ((d.value - min) / (max - min)) * (80 - 24) + 24
      }
      return 0
    }
})
const hotData = dv2.rows
console.log(hotData)

const hotListData = [
  '关键热词',
  '关键热词很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  '关键热词'
]

export default {
  name: 'ClueDiscover',
  components: {
    WbList,
    HotList
  },
  data () {
    return {
      wbList,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      pieData,
      pieScale,
      labelConfig: [
        'percent',
        {
          formatter: (val, item) => {
            return item.point.item + ': ' + val
          }
        }
      ],
      hotData,
      scale,
      hotListData,
      rightWidth: 0
    }
  },
  mounted () {
    console.log(document.body.clientWidth)
    console.log(document.documentElement.clientWidth)
    const _width = document.body.clientWidth || document.documentElement.clientWidth
    console.log('rightWidth', _width - 48 - 8)
    this.rightWidth = (_width - 48) / 4 - 8
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
