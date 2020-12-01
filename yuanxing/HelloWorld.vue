<template>
  <div class="hello" id="chart">

  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'

var option = {
    title: {
        text: '3D堆叠柱状图',
        x: 'center'
    },
    tooltip: {},
    xAxis3D: {
        type: 'category',
        name:'',
        data: ['苹果', '橘子', '梨', '葡萄', '香蕉']
    },
    yAxis3D: {
        type: 'category',
        data: ['']
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        boxWidth: 200,
        boxDepth: 20,
        light: {
            main: {
                intensity: 1.2
            },
            ambient: {
                intensity: 0.3
            }
        },
        viewControl: {
          projection: 'perspective',
            alpha: 10, //控制场景平移旋转
            beta: 10,
            center: [100, 0, 0],
            minDistance: 200,
            maxDistance: 200
        }
    },
    series: [{
        type: 'bar3D',
        barSize: 15,
        data: [
            [0, 0, 5],
            [1, 0, 3],
            [2, 0, 4],
            [3, 0, 7],
            [4, 0, 2]
        ],
        itemStyle: {
          color: '#000',
          opacity: .8
        },
        stack: 'stack',
        shading: 'lambert',
        emphasis: {
            label: {
                show: false
            }
        }
    }, {
        type: 'bar3D',
        barSize: 15,
        data: [
            [0, 0, 3],
            [1, 0, 4],
            [2, 0, 4],
            [3, 0, 2],
            [4, 0, 5]
        ],
        itemStyle: {
          color: '#ccc',
          opacity: .8
        },
        stack: 'stack',
        shading: 'lambert',
        emphasis: {
            label: {
                show: false
            }
        }
    }]
};


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption(option, true);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#chart{
  width: 1000px;
  height: 650px;
}

</style>
