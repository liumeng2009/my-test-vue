<template>
  <a-row :gutter="16">
    <a-col span="18">
      <a-card title="线索发现">
        <WbList :data="wbList" />
        <div class="pagination-wrapper">
          <a-pagination v-model="currentPage" :total="50" show-less-items />
        </div>
      </a-card>
    </a-col>
    <a-col span="6" class="right-column">
      <a-card title="线索统计">
        <Center-card>
          <span style="line-height: 50px">今日新增:<span>27986</span></span>
        </Center-card>
      </a-card>
      <a-card title="各平台分布" :bodyStyle="{ padding: 0 }">
        <v-chart
          :force-fit="true"
          ref="myChart"
          :height="300"
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
      <a-card title="今日热词">
        <v-chart :autoFit="true" :width="300" :height="200" :data="hotData" :scale="scale">
          <v-coord type="rect" direction="TL"></v-coord>
          <v-point position="x*y" color="category" shape="cloud" tooltip="value*category" />
        </v-chart>
      </a-card>
      <a-card title="热词排行">
        <HotList :data="hotListData" :transData="'hello'" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { registerShape } from 'viser-vue'
import { WbList, CenterCard, HotList } from '@/components'

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
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic',
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
    value: 1383220000,
    category: 'asia'
  },
  {
    x: 'India',
    value: 1316000000,
    category: 'asia'
  },
  {
    x: 'United States',
    value: 324982000,
    category: 'america'
  },
  {
    x: 'Indonesia',
    value: 263510000,
    category: 'asia'
  },
  {
    x: 'Brazil',
    value: 207505000,
    category: 'america'
  },
  {
    x: 'Pakistan',
    value: 196459000,
    category: 'asia'
  },
  {
    x: 'Nigeria',
    value: 191836000,
    category: 'africa'
  },
  {
    x: 'Bangladesh',
    value: 162459000,
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
    size: [640, 400],
    font: 'Verdana',
    padding: 0,
    timeInterval: 5000, // max execute time
    rotate () {
        let random = ~~(Math.random() * 4) % 4
        if (random === 2) {
            random = 0
        }
        return random * 90// 0, 90, 270
    },
    fontSize(d) {
        if (d.value) {
        return ((d.value - min) / (max - min)) * (80 - 24) + 24
        }
        return 0
    }
})
const hotData = dv2.rows

const hotListdata = [
  /*
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.' */
  { name: 'lm', age: 33 }
]

export default {
  name: 'ClueDiscover',
  components: {
    WbList,
    CenterCard,
    HotList
  },
  data() {
    return {
      wbList,
      currentPage: 0,
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
      hotListdata
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
.pagination-wrapper {
  display: flex;
  flex-flow: row-reverse;
}
</style>
