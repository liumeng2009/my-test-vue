<template>
  <div class="maque-container">
    <!--
    <a-row class="maque-header">
      <a-col span="4">时间</a-col>
      <a-col span="4">类型</a-col>
      <a-col span="10">主题</a-col>
      <a-col span="6">地点</a-col>
    </a-row> -->
    <div
      class="maque-content"
      :style="{height: maqueContainrHeight + 'px'}"
      v-maque="{ speed: 5, count: dataSource.length, containerHeight: maqueContainrHeight }">
      <div class="maque-move-area" :style="{top:0, height: ( 30 * dataSource.length ) + 'px'}">
        <a-row class="maque-item" v-for="(item, key) in dataSource" :key="key">
          <a-col span="6">{{ item.date }}</a-col>
          <a-col span="6">{{ item.type }}</a-col>
          <a-col span="6">{{ item.content }}</a-col>
          <a-col span="6">{{ item.area }}</a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Maque } from '@/directives'

export default {
  name: 'MaqueList',
  directives: {
    Maque
  },
  data () {
    return {
      maqueContainrHeight: 30 * 8
    }
  },
  props: {
    dataSource: {
      type: Array,
      default: null
    }
  },
  methods: {
    handleTabChange (e) {
      console.log(e)
      this.activeKey = e
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.tab-panel-wrapper {
  width: 100%;

  .maque-container{
    height:100%;
    overflow: hidden;

    .maque-header{
      background: @primary-color;
      height: 30px;
      color: #fff;
      line-height: 30px;
      opacity: .6;
      .ant-col {
        padding-left: 4px;
      }
    }

    .maque-content {
      overflow: hidden;
      position: relative;

      .maque-move-area{
        position:absolute;
        width: 100%;
        top: 0;
        left: 0;

        .maque-item {
          line-height:30px;

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
}
</style>
