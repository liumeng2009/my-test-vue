<template>
  <div class="chart-container" :style="{height: chartHeight + 'px'}">
    <div class="chart-view">
      <slot></slot>
    </div>
    <div class="chart-total" :style="totalStyle">
      <div class="chart-total-item" v-for="(item, index) in totalData" :key="index">
        <span class="chart-total-value" :style="{fontSize: fontValue}">{{ item.value | numToStr }}</span>
        <span class="chart-total-title" :style="{fontSize: fontTitle}">{{ item.title }}</span>
      </div>
    </div>
    <div class="chart-total-container" v-if="showTotalBackground"></div>
  </div>
</template>

<script>
import { numToStr } from '@/filters'
export default {
  name: 'ChartContainer',
  data () {
      return {
        chartWidth: 0
      }
  },
  props: {
    totalData: {
      type: Array,
      default: null
    },
    showTotalBackground: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    chartHeight: {
        type: Number,
        default: 200
    },
    totalPosition: {
        type: String,
        default: 'top'
    }
  },
  directives: {
      numToStr
  },
  computed: {
    totalStyle () {
      const oStyle = {}
      const { size, totalPosition } = this.$props
      oStyle.width = size === 'default' ? '100px' : '70px'
      oStyle.padding = size === 'default' ? '16px' : '8px'
      if (totalPosition === 'top') {
        oStyle.top = size === 'default' ? '25px' : '10px'
      } else {
        oStyle.justifyContent = 'flex-end'
      }
      if (size === 'small') {
          oStyle.transform = 'scale(.9, .9)'
      }
      return oStyle
    },
    fontValue () {
        return this.$props.size === 'default' ? '16px' : '12px'
    },
    fontTitle () {
        return this.$props.size === 'default' ? '12px' : '8px'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.chart-container {
  position: relative;
  width: 100%;

  .chart-view {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .chart-total {
    position: absolute;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    right: 0px;
    top: 0px;
    z-index: 2;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .chart-total-item {
        margin-bottom: 16px;

        .chart-total-value {
            display: block;
            font-size: 16px;
            font-weight: bold;
        }

        .chart-total-title {
            display: block;
            font-size: 12px;
        }
    }
    .chart-total-item:last-child {
        margin-bottom: 0px;
    }
  }

  .chart-total-container {
    position: absolute;
    width: 100px;
    height: 100%;
    right: 0px;
    top: 0px;
    background: @primary-color;
    opacity: 0.6;
    z-index: 1;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
</style>
