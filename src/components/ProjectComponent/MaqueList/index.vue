<template>
  <a-card
    class="tab-panel-wrapper"
    size="small"
    :tab-list="tabList"
    :active-tab-key="activeKey"
    @tabChange="handleTabChange($event)"
  >
    <div v-if="activeKey === 'report'" class="maque-container">
      <a-row class="maque-header">
        <a-col span="4">时间</a-col>
        <a-col span="4">类型</a-col>
        <a-col span="10">主题</a-col>
        <a-col span="6">地点</a-col>
      </a-row>
      <div
        class="maque-content"
        :style="{height: maqueContainrHeight + 'px'}"
        v-maque="{ speed: 2, count: dataSource.length, containerHeight: maqueContainrHeight }">
        <div class="maque-move-area" :style="{top:0, height: ( 30 * dataSource.length ) + 'px'}">
          <a-row class="maque-item" v-for="(item, key) in dataSource" :key="key">
            <a-col span="4">{{ item.date }}</a-col>
            <a-col span="4">{{ item.type }}</a-col>
            <a-col span="10">{{ item.content }}</a-col>
            <a-col span="6">{{ item.area }}</a-col>
          </a-row>
        </div>
      </div>

    </div>
    <div v-if="activeKey === 'discovery'" class="maque-container">discovery</div>
  </a-card>
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
      tabList: [
        {
          key: 'report',
          tab: '事件上报'
        },
        {
          key: 'discovery',
          tab: '线索发现'
        }
      ],
      activeKey: 'report',
      maqueContainrHeight: 30 * 5
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
        top: 0;
        left: 0;

        .maque-item {
          line-height:30px;

          .ant-col {
            white-space: nowrap;
            overflow: hidden;
            padding-left: 4px;
          }
        }
      }
    }
  }
}
</style>
