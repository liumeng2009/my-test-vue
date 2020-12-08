<template>
  <div>
    <a-row style="padding: 12px 24px; border:#e8e8e8 1px solid; border-bottom:none">
      <a-col :span="4" class="cus-item-col">头像</a-col>
      <a-col :span="12" class="cus-item-col" style="text-align:center">昵称</a-col>
      <a-col :span="4" class="cus-item-col">贡献度</a-col>
      <a-col :span="4" class="cus-item-col">检查进度</a-col>
    </a-row>
    <a-list bordered :data-source="dataSource" class="cus-list">
      <a-list-item slot="renderItem" slot-scope="item" class="cus-item">
        <a-row style="width: 100%">
          <a-col span="4" class="cus-item-col">
            <img :src="item.avatar" class="avatar" alt="item.name">
          </a-col>
          <a-col span="12" class="cus-item-col column">
            <span>{{ item.nickname }}</span>
            <span>({{ item.username }})</span>
          </a-col>
          <a-col span="4" class="cus-item-col">
            <span v-change-color="10">{{ item.gongxian }}</span>
          </a-col>
          <a-col span="4" class="cus-item-col">
            <span v-change-color="10">{{ item.progress }}</span>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
// 好友关系列表
import { ChangeColor } from '@/core/directives'
export default {
  name: 'FourList',
  directives: { ChangeColor },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.cus-list {

    .cus-item:nth-child(2n) {
        background: lighten(@primary-color, 40%);
    }

    .cus-item-col {
        height: 32px;
        display: flex;
        align-items: center;

        &.column {
            flex-direction: column;
        }
    }
    .cus-item-col:nth-of-type(2) {
        justify-content: center;
    }
}
.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
</style>
