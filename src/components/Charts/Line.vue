<template>
  <div class="container">
    <div class="line" ref="line" :style="oStyle"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

const option = {
  color: ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF', '#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
  tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
  },
  legend: {
    top: 0,
    formatter: (name) => {
      switch (name) {
        case 'xingdong':
          return '行动类事件'
        case 'fajiao':
          return '发酵类事件'
        case 'all':
          return '全部'
        default:
          return ''
      }
    }
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 10,
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
  series: []
}
export default {
    name: 'LineChart',
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
      const data = this.$props.dataSource
      this.draw(data)
    },
    watch: {
      dataSource(newVal, oldVal) {
        this.draw(newVal)
      }
    },
    computed: {
        oStyle () {
            const result = {}
            if (this.$props.height) {
                result.height = this.$props.height + 'px'
                result.width = '100%'
            }
            if (this.$props.width) {
                result.width = this.$props.width + 'px'
                result.height = '100%'
            }
            return result
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
    .container{
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
