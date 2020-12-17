<template>
  <div class="line-container" ref="line" :style="oStyle">

  </div>
</template>

<script>
import echarts from 'echarts'
import ChartMixin from './mixIn'

const option = {
  color: ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF', '#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
  tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
  },
  legend: {
    top: 0,
    formatter: (name) => {
      let result = ''
      switch (name) {
        case 'xingdong':
          result = '行动'
          break
        case 'fajiao':
          result = '发酵'
          break
        case 'all':
          result = '全部'
          break
        default:
          result = name
      }
      return result
    }
  },
  grid: {
    top: 40,
    bottom: 40,
    left: 20,
    right: 20
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
  series: []
}
export default {
    name: 'LineChart',
    mixins: [ChartMixin],
    props: {
        dataSource: {
            type: Array,
            default: () => []
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
        const _chart = echarts.init(this.$refs.line)
        if (data instanceof Array && data.length > 0) {
          let seriesCount = 0
          for (const p in data[0]) { // eslint-disable-line no-unused-vars
              seriesCount++
          }
          seriesCount--
          console.log(seriesCount)

          const categoryData = []
          const seriesData = []
          const valueData = []

          data.forEach(item => {
              categoryData.push(item.name)
          })

          for (let i = 0; i < seriesCount; i++) {
              const seriesPer = []
              data.forEach((item, index) => {
                const propNameArray = Object.keys(item)
                console.log(propNameArray[i + 1])
                if (index === 0) {
                  valueData.push(propNameArray[i + 1])
                }
                seriesPer.push(item[propNameArray[i + 1]])
              })
              seriesData.push(seriesPer)
          }

          for (let i = 0; i < seriesCount; i++) {
              const _series = {
                  type: 'line',
                  name: valueData[i],
                  label: {
                      show: true,
                      formatter: '{c}'
                  },
                  data: seriesData[i]
              }
              option.series.push(_series)
          }
          option.xAxis[0].data = categoryData
          option.legend.data = valueData
          console.log(option)
          _chart.setOption(option, true)
        }
      }
    }
}
</script>

<style lang="less" scoped>
    .line-container{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
