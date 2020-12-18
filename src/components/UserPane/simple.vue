<template>
  <a-card hoverable style="width: 100%">
    <template slot="actions" class="ant-card-actions">
      <a-icon key="setting" type="setting" />
      <a-icon key="delete" type="delete" />
    </template>
    <a-card-meta :title="dataSource.username" :description="'描述这是一个神奇的家伙'">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  name: 'SimpleUserPane',
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>
</style>
