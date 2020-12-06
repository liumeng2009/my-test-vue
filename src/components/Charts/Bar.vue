<template>
  <div class="bar-container" ref="barChart">

  </div>
</template>

<script>
import echarts from 'echarts'
import logoPng from '@/assets/logo.png'

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
          barCategoryGap: '50%',
          markPoint: {
          // sybol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            data: [
              {
                  xAxis: 0, // 数组位置
                  yAxis: 20, // 图片放置 的高度
                  silent: true,
                  symbolSize: [150, 60],
                  symbol: 'image://' + logoPng,
                  symbolOffset: ['50%', 0]
              }
            ]
          }
      }
  ]
}
export default {
    name: 'Bar',
    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        dataSource: {
            type: Array,
            default: () => []
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
