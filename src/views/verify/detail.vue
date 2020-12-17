<template>
  <page-header-wrapper :title="false">
    <a-row v-if="searchType === 'account'" :gutter="[8, 8]">
      <a-col :span="24">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'账号基本信息'">
              <a-descriptions>
                <a-descriptions-item label="">
                  <a-avatar :src="userInfo.avatar"></a-avatar>
                </a-descriptions-item>
                <a-descriptions-item label="用户名">
                  {{ userInfo.username }}
                </a-descriptions-item>
                <a-descriptions-item label="昵称">
                  {{ userInfo.nickname }}
                </a-descriptions-item>
                <a-descriptions-item label="发帖">
                  {{ userInfo.send | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="回复">
                  {{ userInfo.comment | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="关注">
                  {{ userInfo.subscribe | NumberFormat }}
                </a-descriptions-item>
              </a-descriptions>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'发帖频率分析'" style="padding: 0px;height: 200px;">
              <a-spin :spinning="userInfoLoading">
                <Bar :dataSource="userInfo.recent" :height="200" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'作息分析'" style="padding: 0px;height: 200px;">
              <a-spin :spinning="userInfoLoading">
                <Bar :dataSource="userInfo.day" :height="200" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'内容归类'" style="height: 382px;">
              <a-spin :spinning="userInfoLoading">
                <TopicItem v-for="(itm, idx) in userInfo.contents" :key="idx" :dataSource="itm" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="'tab'"
          >
            <a-tab-pane :key="'tab'" :tab="'热词分析'" style="height: 382px;">
              <a-spin :spinning="userInfoLoading">
                <CloudWord :dataSource="userInfo.words" :height="382" />
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="card-container">
          <a-tabs
            type="card"
            class="tab-panel-wrapper"
            :default-active-key="activeUserInfoTabKey"
            @change="handleUserInfoTabChange($event)"
          >
            <a-tab-pane :key="'history'" tab="历史">
              <a-spin :spinning="userInfoLoading">
                {{ userInfo.history }}
              </a-spin>
            </a-tab-pane>
            <a-tab-pane :key="'mobile'" tab="手机号">
              <a-spin :spinning="userInfoLoading">
                {{ userInfo.phone }}
              </a-spin>
            </a-tab-pane>
            <a-tab-pane :key="'email'" tab="邮箱">
              <a-spin :spinning="userInfoLoading">
                {{ userInfo.email }}
              </a-spin>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
    <a-row v-if="searchType === 'content'" :gutter="[16, 16]">
      <a-spin :spinning="usersLoading">
        <a-col :span="4" v-for="(item, index) in users" :key="index">
          <UserPanel :dataSource="item" />
        </a-col>
      </a-spin>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { Bar, TopicItem, CloudWord, UserPanel } from '@/components'

const userInfo = {
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  username: 'yiyiyi',
  nickname: '盖侬',
  send: 783,
  comment: 1287,
  subscribe: 1293,
  recent: [
    { name: '12-1', value: 121 },
    { name: '12-5', value: 222 },
    { name: '12-7', value: 346 },
    { name: '12-9', value: 12 },
    { name: '12-11', value: 1 },
    { name: '12-15', value: 890 },
    { name: '12-18', value: 13 },
    { name: '12-22', value: 12 }
  ],
  day: [
    { name: '00:00', value: 132 },
    { name: '01:00', value: 112 },
    { name: '02:00', value: 12 },
    { name: '03:00', value: 0 },
    { name: '04:00', value: 0 },
    { name: '05:00', value: 0 },
    { name: '06:00', value: 0 },
    { name: '07:00', value: 0 },
    { name: '08:00', value: 0 },
    { name: '09:00', value: 12 },
    { name: '10:00', value: 12 },
    { name: '11:00', value: 5 },
    { name: '12:00', value: 8 },
    { name: '13:00', value: 1 },
    { name: '14:00', value: 32 },
    { name: '15:00', value: 67 },
    { name: '16:00', value: 1 },
    { name: '17:00', value: 2 },
    { name: '18:00', value: 52 },
    { name: '19:00', value: 12 },
    { name: '20:00', value: 0 },
    { name: '21:00', value: 0 },
    { name: '22:00', value: 0 },
    { name: '23:00', value: 0 }
  ],
  contents: [
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' },
    { title: '内容1' }
  ],
  words: [
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 },
    { name: '热词1', value: 5 }
  ],
  history: '历史操作',
  phone: '123',
  email: '456'
}

const users = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    username: '李月华',
    birthday: '1984年7月3日',
    phone: 13790229552,
    idcard: 440481123216482715,
    email: 'yuehua_lau@gmail.com',
    twitter: '@yuehua_lau'
  }
]
export default {
    name: 'VerifyDetail',
    components: {
      Bar,
      TopicItem,
      CloudWord,
      UserPanel
    },
    data () {
      return {
        userInfo: {},
        userInfoLoading: false,
        activeUserInfoTabKey: 'history',

        users: [],
        usersLoading: false
      }
    },
    created () {
      this.getData()
      this.getUsers()
    },
    methods: {
      getData () {
        this.userInfoLoading = true
        setTimeout(() => {
          this.userInfo = userInfo
          this.userInfoLoading = false
        }, 1000)
      },
      getUsers () {
        this.usersLoading = true
        setTimeout(() => {
          this.users = users.concat(users).concat(users).concat(users).concat(users).concat(users).concat(users).concat(users).concat(users)
          this.usersLoading = false
        }, 1000)
      },
      handleUserInfoTabChange (e) {
        this.activeUserInfoTabKey = e
      }
    },
    computed: {
      searchType () {
        return this.$route.query.searchType
      }
    }
}
</script>

<style lang="less" scoped>

</style>
