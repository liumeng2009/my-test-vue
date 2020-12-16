<template>
  <div class="bar-container" ref="barChart" :style="oStyle">

  </div>
</template>

<script>
import echarts from 'echarts'
import ChartMixin from './mixIn'
import RiseSvg from '@/assets/icons/rise.svg'
import FallSvg from '@/assets/icons/fall.svg'

const colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
const option = {
  tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 20
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        show: true,
        interval: 0,
        formatter: function (value, index) {
          if (value.length > 5) {
            return value.substring(0, 5)
          }
          return value
        }
      },
      axisTick: {
          alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        show: false,
        interval: 0
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
      {
          type: 'bar',
          // roseType: 'radius',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'
          },
          itemStyle: {
            color: (params) => {
              while (params.dataIndex > colorList.length - 1) {
                params.dataIndex = params.dataIndex - colorList.length
              }
              return colorList[params.dataIndex]
            }
          },
          barCategoryGap: '50%'
      }
  ]
}
export default {
    name: 'Bar',
    mixins: [ChartMixin],
    props: {
        dataSource: {
            type: Array,
            default: () => []
        },
        trend: {
          type: Boolean,
          default: false
        },
        trendType: {
          type: String,
          default: 'rise' // fall
        }
    },
    watch: {
      dataSource(newVal, oldVal) {
        console.log(newVal)
        this.draw(newVal)
      }
    },
    methods: {
      draw (data) {
        const myChart = echarts.init(this.$refs.barChart)
        option.series[0].data = data
        const categoryData = []
        data.forEach(item => {
          categoryData.push(item.name)
        })
        option.xAxis[0].data = categoryData

        if (this.$props.trend) {
          const markImg = this.$props.trendType === 'rise' ? RiseSvg : FallSvg
          const markPoint = {
            data: [
              {
                  xAxis: 0, // 数组位置
                  yAxis: 12, // 图片放置 的高度
                  silent: true,
                  symbolSize: [50, 20],
                  symbol: 'image://' + markImg,
                  symbolOffset: ['50%', 0]
              }
            ]
          }
          option.series[0].markPoint = markPoint
        }

        myChart.setOption(option, true)
      }
    }
}
</script>

<style lang="less" scoped>
    .bar-container{
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
