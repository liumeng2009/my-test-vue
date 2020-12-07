<template>
  <div class="cloud-container" ref="cloudContainer" :style="oStyle"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts-wordcloud')

const option = {
    tooltip: {},
    series: [{
        type: 'wordCloud',
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'circle',
        textStyle: {
            normal: {
                color: function() {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')'
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        }
    }]
}
export default {
    name: 'CloudWord',
    mounted () {
        const myChart = echarts.init(this.$refs.cloudContainer)
        setTimeout(() => {
          const _data = this.$props.dataSource
          console.log(_data)
          option.series[0].data = _data
          myChart.setOption(option, true)
        }, 2000)
    },
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
    .cloud-container{
        width: 100%;
        height: 100%;
    }
</style>
