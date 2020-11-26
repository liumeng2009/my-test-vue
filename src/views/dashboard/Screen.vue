<template>
  <div class="container">
    <div class="left">
      <Statistic>
        <StatisticItem name="Twitter" :value="7190 | numToStr" />
        <StatisticItem name="Facebook" :value="6190 | numToStr" />
        <StatisticItem name="Youtube" :value="3001 | numToStr" />
        <StatisticItem name="website" :value="108 | numToStr" />
      </Statistic>
    </div>
    <div class="center">456</div>
    <div class="right">789</div>
  </div>
</template>

<script>
import { Statistic, StatisticItem } from '@/components'

export default {
    name: 'Screen',
    components: {
        Statistic,
        StatisticItem
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        min-height: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .left {
            width: 400px;
            height: 100%;
            box-sizing: border-box;
            padding-right: 4px;
        }

        .center{
            height: 100%;
            width: calc(100% - 800px);
            padding: 0px 4px;
            background: #ccc;
        }

        .right {
            width: 400px;
            height: 100%;
            padding-left:4px;
        }
    }
</style>
