<template>
  <page-header-wrapper :title="false">
    <!--
    <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit($event)">
      <a-tab-pane v-for="(item, index) in orgs" :key="index" :tab="item.name">
        <a-row :gutter="[4, 4]">
          <a-col :span="4" v-for="(itm, idx) in item.members" :key="idx">
            <SimpleUserPanel :dataSource="itm" />
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs> -->

    <div class="card-container">
      <a-tabs
        type="editable-card"
        class="tab-panel-wrapper"
        v-model="activeOrgKey"
        @edit="onEdit"
      >
        <a-tab-pane :key="index" :tab="item.name" v-for="(item, index) in orgs">
          <a-row :gutter="[4, 4]">
            <a-col :span="4" v-for="(itm, idx) in item.members" :key="idx">
              <SimpleUserPanel :dataSource="itm" />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </page-header-wrapper>
</template>

<script>
import { SimpleUserPanel } from '@/components'
const orgRequest = [
  {
    name: 'NAXX一团',
    members: [
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' }
    ]
  },
  {
    name: 'NAXX二团',
    members: [
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' }
    ]
  },
  {
    name: 'NAXX三团',
    members: [
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' },
      { username: '柳依依' }
    ]
  }
]

export default {
    name: 'ImpAccount',
    components: {
      SimpleUserPanel
    },
    data () {
      return {
        orgs: [],
        orgsLoading: false,
        activeOrgKey: 0
      }
    },
    created () {
      this.getOrgs()
    },
    methods: {
      getOrgs () {
        this.orgsLoading = true
        setTimeout(() => {
          this.orgs = orgRequest.concat(orgRequest).concat(orgRequest)
          this.orgsLoading = false
        }, 1000)
      },
      onEdit(targetKey, action) {
        console.log(targetKey, action)
        this[action](targetKey)
      },
      add() {
        const panes = this.panes
        const activeKey = `newTab${this.newTabIndex++}`
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
      },
      remove(targetKey) {
        let activeKey = this.activeKey
        let lastIndex
        this.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1
          }
        })
        const panes = this.panes.filter(pane => pane.key !== targetKey)
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key
          } else {
            activeKey = panes[0].key
          }
        }
        this.panes = panes
        this.activeKey = activeKey
      }
    }
}
</script>

<style lang="less" scoped>

</style>
