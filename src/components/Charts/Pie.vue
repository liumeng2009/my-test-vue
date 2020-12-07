<template>
  <div class="pie-container" ref="pieChart" :style="oStyle">

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
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            // roseType: 'radius',
            label: {
                formatter: '{b} {c}'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200
            }
        }
    ]
}
export default {
    name: 'Pie',
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
    watch: {
        dataSource (newVal, oldVal) {
            console.log(newVal)
            const myChart = echarts.init(this.$refs.pieChart)
            option.series[0].data = newVal
            console.log(option)
            myChart.setOption(option, true)
        }
    },
    computed: {
        oStyle () {
            const result = {}
            console.log(this.$props.height)
            if (this.$props.height) {
                result.height = this.$props.height + 'px'
            }
            return result
        }
    }
}
</script>

<style lang="less" scoped>
    .pie-container{
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
