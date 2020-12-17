<template>
  <div class="cloud-container" ref="cloudContainer" :style="oStyle"></div>
</template>

<script>
import echarts from 'echarts'
import MixIn from './mixIn'
require('echarts-wordcloud')

const option = {
    tooltip: {},
    series: [{
        type: 'wordCloud',
        // 网格大小，各项之间间距
        gridSize: 30,
        // 形状 circle 圆，cardioid  心， diamond 菱形，
        // triangle-forward 、triangle 三角，star五角星
        shape: 'circle',
        // 字体大小范围
        sizeRange: [20, 50],
        // 文字旋转角度范围
        rotationRange: [0, 90],
        // 旋转步值
        rotationStep: 90,
        // 自定义图形
        // maskImage: maskImage,
        left: 'center',
        top: 'center',
        right: null,
        bottom: null,
        // 画布宽
        width: '90%',
        // 画布高
        height: '80%',
        // 是否渲染超出画布的文字
        drawOutOfBound: false,
        textStyle: {
            normal: {
                color: function() {
                    return 'rgb(' + [
                        Math.round(Math.random() * 200 + 55),
                        Math.round(Math.random() * 200 + 55),
                        Math.round(Math.random() * 200 + 55)
                    ].join(',') + ')'
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#2ac'
            }
        }
    }]
}
export default {
    name: 'CloudWord',
    mixins: [MixIn],
    props: {
        dataSource: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        dataSource(newVal, oldVal) {
            const myChart = echarts.init(this.$refs.cloudContainer)
            option.series[0].data = newVal
            myChart.setOption(option, true)
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
