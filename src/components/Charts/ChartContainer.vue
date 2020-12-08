<template>
  <div class="chart-container" :style="{height: chartHeight + 'px'}">
    <div class="chart-view">
      <slot></slot>
    </div>
    <div class="chart-total" :style="totalStyle">
      <div class="chart-total-item" v-for="(item, index) in totalData" :key="index">
        <span class="chart-total-value" :style="{fontSize: fontValue}">{{ item.value | NumberFormat }}</span>
        <span class="chart-total-title" :style="{fontSize: fontTitle}">{{ item.title }}</span>
      </div>
    </div>
    <div class="chart-total-container" v-if="showTotalBackground"></div>
  </div>
</template>

<script>
export default {
  name: 'ChartContainer',
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
  mounted () {
    const { size } = this.$props
    this.chartWidth = this.$el.clientWidth - (size === 'default' ? 100 : 70)
  },
  computed: {
    totalStyle () {
      const oStyle = {}
      const { size } = this.$props
      if (size === 'small') {
          oStyle.transform = 'scale(.8, .8)'
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
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .chart-view {
    width: 75%;
    height: 100%;
  }

  .chart-total {
    width: 25%;
    height: 100%;
    padding-left: 16px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

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
}
</style>
