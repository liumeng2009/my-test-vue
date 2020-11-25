<template>
    <div>
        <h1>导入echart模块</h1>
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
export default {
    name: 'Echart',
    mounted () {
        this.draw()
    },
    methods: {
        draw () {
            const myEchart = echarts.init(document.getElementById('myChart'))

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
        }
    }
}
</script>

<style>

</style>
