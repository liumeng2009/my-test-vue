<template>
    <div>
        <h1>导入echart模块</h1>
        <a-button type="primary" @click="changeData">改变数据</a-button>
        <div id="myChart" style="height:400px">

        </div>
    </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

let myEchart
export default {
    name: 'Echart',
    mounted () {
        console.log(123)
        this.draw()
    },
    methods: {
        draw () {
            myEchart = echarts.init(document.getElementById('myChart'))

            myEchart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            })
        },
        changeData () {
            myEchart.setOption({
                series: [
                    {
                        data: [10, 5, 20, 33, 56, 1]
                    }
                ]
            })
        }
    }
}
</script>

<style>

</style>
