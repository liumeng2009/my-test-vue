<template>
  <div class="line-container" ref="lineChart" :style="oStyle">

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
        const myChart = echarts.init(this.$refs.lineChart)
        setTimeout(() => {
          const _data = this.$props.dataSource
          if (_data instanceof Array && _data.length > 0) {
            let seriesCount = 0
            for (const p in _data[0]) { // eslint-disable-line no-unused-vars
                seriesCount++
            }
            seriesCount--
            console.log(seriesCount)

            const categoryData = []
            const seriesData = []

            _data.forEach(item => {
                categoryData.push(item.name)
            })

            for (let i = 0; i < seriesCount; i++) {
                const seriesPer = []
                _data.forEach(item => {
                    const propNameArray = Object.keys(item)
                    console.log(propNameArray[i + 1])
                    seriesPer.push(item[propNameArray[i + 1]])
                })
                seriesData.push(seriesPer)
            }

            for (let i = 0; i < seriesCount; i++) {
                const _series = {
                    type: 'line',
                    label: {
                        show: true,
                        formatter: '{c}'
                    },
                    data: seriesData[i]
                }
                option.series.push(_series)
            }
            option.xAxis[0].data = categoryData
            console.log(option)
            myChart.setOption(option, true)
          }
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
    .line-container{
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
