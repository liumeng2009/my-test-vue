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
              <a-descriptions v-if="searchSocial === 'twitter'">
                <a-avatar :src="userInfo.avatar" slot="title"></a-avatar>
                <a-descriptions-item label="用户名">
                  {{ userInfo.username }}
                </a-descriptions-item>
                <a-descriptions-item label="昵称">
                  {{ userInfo.nickname }}
                </a-descriptions-item>
                <a-descriptions-item label="历史推文">
                  {{ userInfo.send | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="正在关注">
                  {{ userInfo.comment | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="关注着">
                  {{ userInfo.subscribe | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="位置">
                  {{ userInfo.position }}
                </a-descriptions-item>
                <a-descriptions-item label="简介">
                  {{ userInfo.description }}
                </a-descriptions-item>
              </a-descriptions>
              <a-descriptions v-if="searchSocial === 'facebook'">
                <a-avatar :src="userInfo.avatar" slot="title"></a-avatar>
                <a-descriptions-item label="facobook用户名">
                  {{ userInfo.username }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook昵称">
                  {{ userInfo.nickname }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook历史推文">
                  {{ userInfo.send | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook正在关注">
                  {{ userInfo.comment | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook关注着">
                  {{ userInfo.subscribe | NumberFormat }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook位置">
                  {{ userInfo.position }}
                </a-descriptions-item>
                <a-descriptions-item label="facobook简介">
                  {{ userInfo.description }}
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
            <a-tab-pane :key="'history'" tab="历史推文">
              <a-list size="small" :data-source="userInfo.history" :loading="userInfoLoading">
                <a-list-item slot="renderItem" slot-scope="item" @click="goDetail(item.title)">
                  <a href="javascript:;">{{ item.title }}</a>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane :key="'mobile'" tab="涉及手机号">
              <a-list size="small" :data-source="userInfo.phone" :loading="userInfoLoading">
                <a-list-item slot="renderItem" slot-scope="item" @click="goDetail(item.title)">
                  <a href="javascript:;">{{ item.title }}</a>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane :key="'email'" tab="涉及邮箱">
              <a-list size="small" :data-source="userInfo.email" :loading="userInfoLoading">
                <a-list-item slot="renderItem" slot-scope="item" @click="goDetail(item.title)">
                  <a href="javascript:;">{{ item.title }}</a>
                </a-list-item>
              </a-list>
            </a-tab-pane>
          </a-tabs>
        </div>
        <a-modal v-model="detailVisible" :title="detailTitle" :footer="null">
          <div style="width: 100%;max-height: 400px;overflow:auto;">
            <WBTemplate :dataSource="detail" />
          </div>
        </a-modal>
      </a-col>
    </a-row>
    <a-row v-if="searchType === 'toReal'" :gutter="[16, 16]">
      <a-spin :spinning="usersLoading" v-if="isImportAccount">
        <a-col :span="8">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'账号基本信息'">
                <UserPanel :dataSource="users.info" />
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'兴趣爱好'">
                <Pie :dataSource="users.hobbies" :height="379" />
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'污点痕迹'" style="height: 411px">
                <a-list :data-source="users.stains">
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-row style="width: 100%">
                      <a-col :span="16">{{ item.title }}</a-col>
                      <a-col :span="8">{{ item.createdAt }}</a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
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
              <a-tab-pane :key="'tab'" :tab="'其他社交软件'">
                <a-table :columns="socialColumns" :data-source="users.socials">
                  <div slot="name" slot-scope="item" style="display:flex;align-items:center">
                    <Twitter v-if="item === 'Twitter'" style="width:16px;height:16px;" />
                    <Facebook v-if="item === 'Facebook'" style="width:16px;height:16px;" />
                    {{ item }}
                  </div>
                </a-table>
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
              <a-tab-pane :key="'tab'" :tab="'地理位置'">
                <a-table :columns="locationColumns" :data-source="users.locations">

                </a-table>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-spin>
      <a-spin :spinning="userInfo2Loading" v-if="!isImportAccount">
        <a-col :span="24">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'账号基本信息'">
                <a-card :loading="userInfo2Loading" :bodyStyle="{padding: 0}" :bordered="false" v-if="!(searchSocial === 'Telegram')">
                  <a-descriptions v-if="searchSocial === 'twitter'">
                    <a-avatar :src="userInfo.avatar" slot="title"></a-avatar>
                    <a-descriptions-item label="用户名">
                      {{ userInfo.username }}
                    </a-descriptions-item>
                    <a-descriptions-item label="昵称">
                      {{ userInfo.nickname }}
                    </a-descriptions-item>
                    <a-descriptions-item label="历史推文">
                      {{ userInfo.send | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="正在关注">
                      {{ userInfo.comment | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="关注着">
                      {{ userInfo.subscribe | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="位置">
                      {{ userInfo.position }}
                    </a-descriptions-item>
                    <a-descriptions-item label="简介">
                      {{ userInfo.description }}
                    </a-descriptions-item>
                  </a-descriptions>
                  <a-descriptions v-if="searchSocial === 'facebook'">
                    <a-avatar :src="userInfo.avatar" slot="title"></a-avatar>
                    <a-descriptions-item label="facobook用户名">
                      {{ userInfo.username }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook昵称">
                      {{ userInfo.nickname }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook历史推文">
                      {{ userInfo.send | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook正在关注">
                      {{ userInfo.comment | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook关注着">
                      {{ userInfo.subscribe | NumberFormat }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook位置">
                      {{ userInfo.position }}
                    </a-descriptions-item>
                    <a-descriptions-item label="facobook简介">
                      {{ userInfo.description }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
                <a-card :loading="userInfo2Loading" :bodyStyle="{padding: 0}" :bordered="false" v-if="searchSocial === 'Telegram'">
                  <a-descriptions>
                    <a-descriptions-item label="ID">
                      {{ userInfo2.id }}
                    </a-descriptions-item>
                    <a-descriptions-item label="手机号">
                      {{ userInfo2.phone }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
        <a-col :span="24" v-if="!(searchSocial === 'Telegram')">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'账号注册信息'">
                <a-card :loading="userInfo2Loading" :bodyStyle="{padding: 0}" :bordered="false">
                  <a-descriptions>
                    <a-descriptions-item label="手机">
                      {{ userInfo2.phone }}
                    </a-descriptions-item>
                    <a-descriptions-item label="邮箱">
                      {{ userInfo2.email }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="card-container">
            <a-tabs
              type="card"
              class="tab-panel-wrapper"
              :default-active-key="'tab'"
            >
              <a-tab-pane :key="'tab'" :tab="'社工关联'">
                <a-card :loading="userInfo2Loading" :bodyStyle="{ padding: 0 }" :bordered="false">
                  <div style="min-height: 100px">
                    <div v-for="(prop, index) in userInfo2.jsonStr" :key="index" style="margin-right: 8px;display:inline-block">
                      {<span>{{ index }}：</span>
                      <span>{{ prop }}</span>}
                    </div>
                  </div>
                </a-card>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-spin>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { Bar, TopicItem, CloudWord, UserPanel, WBTemplate, Pie } from '@/components'
import { Twitter, Facebook } from '@/core/icons'

const userInfo = {
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  username: 'gainong',
  nickname: '盖侬',
  send: 783,
  comment: 1287,
  subscribe: 1293,
  position: '海拉尔王国 城堡',
  description: '格鲁德族百年唯一的男性，顺理成章的当上了格鲁德族的王，是一个盗贼，得到了海拉尔三仙女三角力量中的力量，假意依附海拉尔国，并伺机窃取了海拉尔大陆，赶走了塞尔达公主成为了海拉尔的王。在会和了三角力量—林克(Link)的勇气、塞尔达(Zelda)智慧与力量后得到了不死之身成为魔王，最终被沉睡七年苏醒的时之勇者林克(Link)封入退魔之剑(Master Sword)中。魔王加农道夫(Ganondorf)被勇者打败并封印后的若干年后，魔王的力量正在逐渐增强，诸位贤者担心魔王日后再次肆虐大陆，决定趁魔王气力没有完全恢复时处决他。由光之贤者锻造出一柄神剑用来对魔王制裁。剑由胸口贯入魔王体内，不想，拥有三角之力的魔王是不死之身，虽不及伤到性命却也其在胸口留下伤疤。惊恐之下的加农多洛夫打伤诸位贤者，抢夺了那把原本用来处决它的兵器。众贤者见大势已去，惟有合余力将魔王暂时封印在影之世界。',
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
  // 以下都是推文链接
  history: [
    { title: '历史推文1' },
    { title: '历史推文2' },
    { title: '历史推文3' },
    { title: '历史推文4' },
    { title: '历史推文5' },
    { title: '历史推文6' },
    { title: '历史推文7' },
    { title: '历史推文8' },
    { title: '历史推文9' },
    { title: '历史推文10' }
  ],
  phone: [
    { title: '手机号相关1' },
    { title: '手机号相关2' },
    { title: '手机号相关3' }
  ],
  email: [
    { title: '邮箱相关1' },
    { title: '邮箱相关2' },
    { title: '邮箱相关3' }
  ]
}

const users = {
    info: {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      username: '李月华',
      birthday: '1984年7月3日',
      phone: 13790229552,
      idcard: 440481123216482715,
      email: 'yuehua_lau@gmail.com',
      twitter: '@yuehua_lau'
    },
    hobbies: [
      { name: '旅游', value: 15 },
      { name: '体育', value: 15 },
      { name: '财经', value: 37 },
      { name: '科技', value: 5 },
      { name: '教育', value: 25 }
    ],
    stains: [
      { title: '参与重大行动：五一假期', createdAt: '2020-8-20' },
      { title: '参与重大行动：五一假期', createdAt: '2020-8-20' },
      { title: '参与重大行动：五一假期', createdAt: '2020-8-20' }
    ],
    socials: [
      { key: 0, name: 'Twitter', username: 'lau', id: '1232321', update: '2019-2-16' },
      { key: 1, name: 'Facebook', username: 'lau', id: '1232321', update: '2019-2-16' },
      { key: 2, name: 'Youtube', username: 'lau', id: '1232321', update: '2019-2-16' }
    ],
    locations: [
      { key: 0, contry: '美国', city: '洛杉矶', date: '2019-2-16' },
      { key: 1, contry: '美国', city: '洛杉矶', date: '2019-2-16' },
      { key: 2, contry: '美国', city: '洛杉矶', date: '2019-2-16' },
      { key: 3, contry: '美国', city: '洛杉矶', date: '2019-2-16' },
      { key: 4, contry: '美国', city: '洛杉矶', date: '2019-2-16' }
    ]
}

const userInfo2 = {
  id: 12323232123,
  username: 'yiyi',
  phone: 13823221765,
  email: 'yiyyi@gmail.com',
  jsonStr: {
    name: '123',
    age: 23,
    lll: '345'
  }
}

// 推文详情
const detailRequest = {
  source: 'Facebook',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  author: '常向阳',
  username: '@xiangyang',
  createdAt: '2020-4-10 13:54:41',
  content: '通过全民共振平台提供的方法',
  video: {
    title: '这是一个视频',
    thumbnail: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg'
  },
  images: [
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607829202088&di=ada5e27f58ff3c26e4a2907bd96b1a5e&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F25%2F121338kzm4o422922qqz22.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg'
  ],

  commentWith: {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '常向阳',
    username: '@xiangyang',
    createdAt: '2020-4-10 13:54:41',
    content: '通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法',
    videoThumb: 'http://www.baidu.com',
    videoTitle: '这是一个视频',
    images: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607829202088&di=ada5e27f58ff3c26e4a2907bd96b1a5e&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F25%2F121338kzm4o422922qqz22.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg'
    ]
  }
}

export default {
    name: 'VerifyDetail',
    components: {
      Bar,
      TopicItem,
      CloudWord,
      UserPanel,
      WBTemplate,
      Pie,
      Twitter,
      Facebook
    },
    data () {
      return {
        userInfo: {},
        userInfoLoading: false,
        activeUserInfoTabKey: 'history',

        detailVisible: false,
        detailTitle: '',
        detail: {},
        detailLoading: false,

        users: [],
        usersLoading: false,

        userInfo2: {},
        userInfo2Loading: false,

        socialColumns: [
          { dataIndex: 'name', title: '平台', key: 'name', scopedSlots: { customRender: 'name' } },
          { dataIndex: 'username', title: '用户名', key: 'username' },
          { dataIndex: 'id', title: 'ID', key: 'id' },
          { dataIndex: 'update', title: '最近更新时间', key: 'update' }
        ],

        locationColumns: [
          { dataIndex: 'contry', title: '国家', key: 'contry' },
          { dataIndex: 'city', title: '城市', key: 'city' },
          { dataIndex: 'date', title: '时间', key: 'date' }
        ]
      }
    },
    created () {
      this.getData()
      this.getUsers()
      this.getData2()
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
          this.users = users
          this.usersLoading = false
        }, 1000)
      },
      getData2 () {
        this.userInfo2Loading = true
        setTimeout(() => {
          this.userInfo2 = userInfo2
          this.userInfo2Loading = false
        }, 1000)
      },
      goDetail (title) {
        this.detailVisible = true
        this.detailTitle = title
        this.detail = {}
        this.detailLoading = true
        setTimeout(() => {
          this.detail = detailRequest
          this.detailLoading = false
        }, 1000)
      },
      handleUserInfoTabChange (e) {
        this.activeUserInfoTabKey = e
      }
    },
    computed: {
      searchType () {
        return this.$route.query.searchType.trim()
      },
      searchSocial () {
        return this.$route.query.social.trim()
      },
      isImportAccount () {
        if (this.$route.query.social.trim() === 'telegram') {
          // 没有重点账号的情况
          this.$message.info('这货不是重点账号')
          return false
        } else {
          if (this.$route.query.searchKey === '123') {
            this.$message.info('这货是重点账号')
          } else {
            this.$message.info('这货不是重点账号')
          }
          return this.$route.query.searchKey === '123'
        }
      }
    }
}
</script>

<style lang="less" scoped>

</style>
