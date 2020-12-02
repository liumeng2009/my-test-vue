<template>
  <div class="chart-container">
    <div id="chart"></div>
    <div id="chart2"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'

var option = {
  xAxis3D: {
    type: 'category',
    name: '',
    data: ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7'],
    splitLine: {
        show: false
    },
    splitArea: {
        show: false
    },
    axisPointer: {
        show: false
    },
    axisLine: {
        lineStyle: {
            opacity: 0
        }
    },
    axisTick: {
        lineStyle: {
            opacity: 0
        }
    },
    axisLabel: {
        textStyle: {
            color: '#3b99c7'
        }
    }
  },
  legend: {},
  yAxis3D: {
    type: 'category',
    name: '',
    data: [''],
    splitLine: {
        show: false
    },
    axisTick: {
        lineStyle: {
            opacity: 0
        }
    }
  },
  zAxis3D: {
    type: 'value',
    name: '',
    axisLabel: {
        show: true,
        margin: 10,
        textStyle: {
            color: '#0b3672'
        }
    },
    axisLine: {
        lineStyle: {
            opacity: 0
        }
    },
    axisTick: {
        lineStyle: {
            opacity: 0
        }
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: '#0b3672',
            width: 1
        }
    }
  },
  grid3D: {
    show: true,
    boxWidth: 100,
    boxDepth: 0,
    boxHeight: 100,
    light: {
      main: {
        intensity: 1.2
      },
      ambient: {
        intensity: 0.3
      }
    },
    viewControl: {
      projection: 'orthographic',
      alpha: 10,
      beta: 10,
      maxOrthographicSize: 140,
      minOrthographicSize: 140
    },
    axisPointer: {
        show: false
    }
  },
  series: [
    {
      type: 'bar3D',
      barSize: 9,
      data: [
        [0, 0, 0.1],
        [1, 0, 0.1],
        [2, 0, 0.1],
        [3, 0, 0.1],
        [4, 0, 0.1],
        [5, 0, 0.1],
        [6, 0, 0.1]
      ],
      itemStyle: {
        color: '#fff',
        opacity: 0
      },
      stack: 'stack',
      shading: 'lambert',
      emphasis: {
        label: {
          show: false
        }
      }
    },
    {
      type: 'bar3D',
      barSize: 9,
      data: [
        [0, 0, 5],
        [1, 0, 3],
        [2, 0, 4],
        [3, 0, 7],
        [4, 0, 2],
        [5, 0, 5],
        [6, 0, 3]
      ],
      itemStyle: {
        color: '#1b6bff',
        opacity: 1
      },
      stack: 'stack',
      shading: 'lambert',
      emphasis: {
        label: {
          show: false
        }
      }
    },
    {
      type: 'bar3D',
      barSize: 9,
      data: [
        [0, 0, 3],
        [1, 0, 4],
        [2, 0, 4],
        [3, 0, 2],
        [4, 0, 5],
        [5, 0, 3],
        [6, 0, 4]
      ],
      itemStyle: {
        color: '#36adff',
        opacity: 1
      },
      stack: 'stack',
      shading: 'lambert',
      emphasis: {
        label: {
          show: false
        }
      }
    }
  ]
}

export default {
  name: 'ThreeDBar',
  mounted() {
    var myChart = echarts.init(document.getElementById('chart'))
    myChart.setOption(option, true)
  }
}
</script>

<style scoped lang="less">
.chart-container{
    position:absolute;
    top: 0px;
    left: 0;
    z-index: 2;
    width: 430px;
    height: 515px;
    border: #000 1px solid;

    #chart {
        width: 100%;
        height: 100%;
        transform: rotate(-1.5deg)
    }
}
</style>
