<template>
  <div>
    <a-list bordered :data-source="dataSource">
      <template v-slot:header>
        <a-row style="width: 100%">
          <a-col span="4">序号</a-col>
          <a-col span="16">
            核查任务
          </a-col>
          <a-col span="4">
            核查进度
          </a-col>
        </a-row>
      </template>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-row style="width: 100%">
          <a-col span="4">{{ index + 1 }}</a-col>
          <a-col span="16" class="hot-list-item">
            {{ item.title | cutLongStr(11) }}
          </a-col>
          <a-col span="4">
            {{ item.progress }}
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
// 核查进程列表
export default {
  name: 'ListThird',
  props: {
    dataSource: {
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
