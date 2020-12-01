<template>
  <div>
    <a-row style="padding: 12px 24px; border:#e8e8e8 1px solid; border-bottom:none">
      <a-col :span="4" class="cus-item-col">头像</a-col>
      <a-col :span="12" class="cus-item-col" style="text-align:center">ID</a-col>
      <a-col :span="8" class="cus-item-col">互动频率</a-col>
    </a-row>
    <a-list bordered :data-source="listData" class="cus-list">
      <a-list-item slot="renderItem" slot-scope="item" class="cus-item">
        <a-row style="width: 100%">
          <a-col span="4" class="cus-item-col">
            <img :src="item.avatar" class="avatar" alt="item.name">
          </a-col>
          <a-col span="12" class="cus-item-col">
            {{ item.name }}
          </a-col>
          <a-col span="8" class="cus-item-col">
            <span v-change-color="10">{{ item.contact_count }}</span>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { ChangeColor } from '@/core/directives'
export default {
  name: 'SecList',
  directives: { ChangeColor },
  props: {
    listData: {
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
