<template>
  <div class="bar-container" ref="barChart" :style="oStyle">

  </div>
</template>

<script>
import echarts from 'echarts'
import ChartMixin from './mixIn'
import RiseSvg from '@/assets/icons/rise.svg'
import FallSvg from '@/assets/icons/fall.svg'

const option = {
  color: '#73DDFF',
  tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 0
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
          alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        show: false
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
    mounted () {
        const myChart = echarts.init(this.$refs.barChart)
        setTimeout(() => {
          const _data = this.$props.dataSource
          option.series[0].data = _data
          const categoryData = []
          _data.forEach(item => {
            categoryData.push(item.name)
          })
          option.xAxis[0].data = categoryData

          if (this.$props.trend) {
            const markImg = this.$props.trendType === 'rise' ? RiseSvg : FallSvg
            console.log('type', this.$props.trendType)
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
        }, 2000)
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
