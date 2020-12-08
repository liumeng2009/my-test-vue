<template>
  <div>
    <a-list bordered :data-source="listData">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-row style="width: 100%">
          <a-col span="4">{{ index + 1 }}</a-col>
          <a-col span="19" class="hot-list-item">
            {{ item | cutLongStr(11) }}
            <RiseFilling class="item-icon" fill="red" style="width: 16px; height: 16px" />
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
// 热词排行列表
import { RiseFilling } from '@/core/icons'
export default {
  name: 'HotList',
  components: {
    RiseFilling
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.hot-list-item {
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
}
</style>
