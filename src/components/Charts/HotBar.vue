<template>
  <div class="bar-container" ref="barChart" :style="oStyle">

  </div>
</template>

<script>
import echarts from 'echarts'
// import logoPng from '@/assets/logo.png'
// import TopFillingSvg from '@/assets/icons/top-filling.svg'
// import RiseFillingSvg from '@/assets/icons/rise-filling.svg'

const option = {
  color: '#73DDFF',
  tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 0
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category'
    }
  ],
  series: [
      {
          type: 'bar',
          // roseType: 'radius',
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          },
          barCategoryGap: '50%'
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
          option.yAxis[0].data = categoryData
          myChart.setOption(option, true)
        }, 2000)
    },
    computed: {
        oStyle () {
            const result = {}
            if (this.$props.height) {
                result.height = this.$props.height + 'px'
            }
            return result
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
