<template>
  <div>
    {{ transData }}
    <a-list bordered :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-row style="width: 100%">
          <a-col span="4">{{ index + 1 }}</a-col>
          <a-col span="19" class="hot-list-item">
            {{ item }}
            <RiseFilling class="item-icon" style="width: 24px; height: 24px" />
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { RiseFilling } from '@/core/icons'
export default {
  name: 'HotList',
  components: {
    RiseFilling
  },
  props: {
    transData: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
      setTimeout(() => {
          console.log(this.$props.data)
      }, 1000)
  }
}
</script>

<style lang="less" scoped>
.hot-list-item {
  white-space: nowrap;
  position: relative;

  .item-icon {
    position: absolute;
    right: 0;
  }
}
</style>
