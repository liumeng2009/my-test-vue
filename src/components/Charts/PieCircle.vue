<template>
  <div class="container">
    <div class="pie" ref="pieChart" :style="oStyle"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { formatNumber } from '@/utils/util'

const option = {
    color: ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF', '#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
    title: [
        {
            top: '30%',
            left: 'center',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: '#666666',
                        padding: [5, 0]
                    },
                    val: {
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'blue'
                    }
                }
            }
        }
    ],
    legend: {
        bottom: 5,
        formatter: (name) => {
            return name === 'xingdong' ? '行动类事件' : '发酵类事件'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return params.data.name === 'xingdong' ? `行动类事件:${params.data.value}` : `发酵类事件:${params.data.value}`
        }
    },
    series: [
        {
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['50%', '45%'],
            label: {
                show: false
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
    name: 'PieCircle',
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
        },
        title: {
            type: String,
            default: '当日事件上报总数'
        }
    },
    watch: {
        dataSource (newVal, oldVal) {
            const myChart = echarts.init(this.$refs.pieChart)
            const total = newVal.reduce((a, b) => {
                console.log(a)
                console.log(b)
                return a.value * 1 + b.value * 1
            })
            option.title[0].text = '{val|' + formatNumber(total) + '}\n{name|' + this.$props.title + '}'
            option.series[0].data = newVal
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
            if (this.$props.width) {
                result.width = this.$props.width + 'px'
            }
            return result
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
