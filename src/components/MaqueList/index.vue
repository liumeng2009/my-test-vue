<template>
  <div class="maque-container">
    <div class="maque-content" v-maque="{ speed: 2, count: dataSource.length }">
      <div class="maque-move-area" :style="{ top: 0, height: 30 * dataSource.length + 'px' }">
        <a-row class="maque-item" v-for="(item, key) in dataSource" :key="key">
          <a-col span="6">{{ item.date }}</a-col>
          <a-col span="6">{{ item.type }}</a-col>
          <a-col span="6">
            <a-tooltip placement="topLeft">
              <template slot="title">
                {{ item.content }}
              </template>
              {{ item.content }}
            </a-tooltip>
          </a-col>
          <a-col span="6">{{ item.area }}</a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Maque } from '@/core/directives'

export default {
  name: 'MaqueList',
  directives: {
    Maque
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.maque-container {
  height: 100%;
  overflow: hidden;

  .maque-content {
    overflow: hidden;
    position: relative;
    height: 100%;

    .maque-move-area {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;

      .maque-item {
        line-height: 30px;

        .ant-col {
          white-space: nowrap;
          overflow: hidden;
          padding-left: 4px;
          text-align: center;
        }
        .ant-col:nth-of-type(4) {
          text-align: right;
        }
      }
    }
  }
}
</style>
