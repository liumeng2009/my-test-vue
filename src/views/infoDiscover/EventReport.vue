<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card>
          <a-tabs :default-active-key="activeLeftKey" @change="handleLeftTabChange">
            <a-tab-pane v-for="item in tabLeftList" :key="item.key" :tab="item.tab">
              <h1>{{item.tab}}</h1>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
export default {
    name: 'EventReport',
    data () {
      return {
        tabLeftList: [
          {
            key: 'fajiao',
            tab: '事件发酵'
          },
          {
            key: 'action',
            tab: '重大行动'
          }
        ],
        activeLeftKey: 'fajiao'
      }
    },
    methods: {
      handleLeftTabChange(e) {
        this.activeLeftKey = e
      }
    }
}
</script>

<style>

</style>
