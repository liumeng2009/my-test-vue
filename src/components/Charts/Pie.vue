<template>
  <div class="pie-container" ref="pie" :style="oStyle">
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
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            // roseType: 'radius',
            label: {
                formatter: '{b} : {c}'
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
    mixins: [ChartMixin],
    props: {
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
        dataSource (newVal, oldVal) {
            this.draw(newVal)
        }
    },
    methods: {
        draw (data) {
            const _chart = echarts.init(this.$refs.pie)
            if (data instanceof Array && data.length > 0) {
                option.series[0].data = data
                _chart.setOption(option)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .pie-container{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
