<template>
  <page-header-wrapper :title="false">
    <div :style="{width: userBarFixedWidth + 'px', height: userBarFixedHeight + 'px'}" class="left-side" ref="wbUserList">
      <div :style="{width: (userBarFixedWidth + 17) + 'px', height: userBarFixedHeight + 'px'}" class="scroll-wrapper">
        <a-collapse ref="collapse" class="wb-user-list" accordion default-active-key="0" @change="collapseChanged">
          <a-collapse-panel v-for="(item, index) in userList" :key="index" :header="item.name" :showArrow="false">
            <a-list :data-source="item.member">
              <a-list-item slot="renderItem" slot-scope="user" @click="showData($event)">
                <a-list-item-meta>
                  <span slot="title" href="">{{ user.name }}</span>
                  <a-avatar slot="avatar" :src="user.avatar"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
    <a-row :gutter="16">
      <a-col :xs="{span: 12, offset: 12}" :sm="{span: 12, offset: 12}" :md="{span: 18, offset: 6}" :lg="{span: 18, offset: 6}" :xl="{span: 20, offset: 4}">
        <a-spin :spinning="wbLoading">
          <div class="wb-container" ref="wbContainer">
            <a-empty v-if="!wbLoading && (wbList.length === 0 || wbList[0] && wbList[0].length === 0)">
              <span slot="description">暂无数据</span>
            </a-empty>
            <div v-for="(item, index) in wbList" :key="index" class="wb-column-container" :style="{width: (100 / columnLength) + '%'}">
              <div class="wb" v-for="(itm, idx) in item" :key="idx">
                <WBTemplate :dataSource="itm" />
              </div>
            </div>
          </div>
          <a-alert style="margin: 8px;" v-if="wbBottom && wbLoadingBottom" message="加载中" type="info" show-icon/>
        </a-spin>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { WBTemplate } from '@/components'
import { getWindowHeight, getWindowWidth, getScrollTop, scrollToBottom } from '@/utils/util'
const userList = [
  //eslint-disable-line
  {
    name: 'NAXX一团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX二团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX三团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX四团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
    {
    name: 'NAXX五团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX六团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
    {
    name: 'NAXX七团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX八团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
    {
    name: 'NAXX九团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX十团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
    {
    name: 'NAXX十一团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX十二团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
    {
    name: 'NAXX十三团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  },
  {
    name: 'NAXX十四团',
    member: [
      { name: '沈依依', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依2', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依3', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
      { name: '沈依依4', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
    ]
  }
]

const wbList = [
  {
    nickname: '1转发别人',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    commentWith: {
      nickname: '叶公子',
      username: 'HumanYerong',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      createdAt: '2020-12-11 13:41:22',
      content: '内容',
      support: 841,
      comment: 859,
      share: 24
    }
  },
  {
    nickname: '2自己发视频',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    video: {
      thumbnail: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      title: '这是一个视频'
    }
  },
  {
    nickname: '3转发别人的视频',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    commentWith: {
      nickname: '叶公子',
      username: 'HumanYerong',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      createdAt: '2020-12-11 13:41:22',
      content: '内容',
      support: 841,
      comment: 859,
      share: 24,
      video: {
        thumbnail: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
        title: '这是一个视频'
      }
    }
  },
  {
    nickname: '4自己发图片列表',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    images: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607829202088&di=ada5e27f58ff3c26e4a2907bd96b1a5e&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F25%2F121338kzm4o422922qqz22.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg'
    ]
  },
  {
    nickname: '5转发别人的图片列表',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    commentWith: {
      nickname: '叶公子',
      username: 'HumanYerong',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      createdAt: '2020-12-11 13:41:22',
      content: '内容',
      support: 841,
      comment: 859,
      share: 24,
      images: [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg'
      ]
    }
  },
  {
    nickname: '6自己发图片列表',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
    images: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607829202088&di=ada5e27f58ff3c26e4a2907bd96b1a5e&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F25%2F121338kzm4o422922qqz22.jpg'
    ]
  },
  {
    nickname: '7自己发图片列表',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24,
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
  },
  {
    nickname: '8叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '9叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '10叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  }
]

export default {
  name: 'ImpAccountInfo',
  components: {
    WBTemplate
  },
  data () {
    return {
      userList: userList,
      columnLength: 3,
      userBarFixedWidth: 0,
      userBarFixedHeight: 0,
      userBarFixedHeightRem: 0,
      wbList: [],
      wbLoading: false,
      wbBottom: false,
      wbLoadingBottom: false,
      oldCollapseKey: 0,
      newCollapseKey: 0
    }
  },
  mounted () {
    this.calSideBarWidth()
    this.calSideBarHeight()
    this.calColumnWidth(() => {
      for (let i = 0; i < this.columnLength; i++) {
        this.wbList.push([])
      }
    })
    this.addScrollEvent()
  },
  methods: {
    showData (e) {
      if (this.wbLoading) {
        return
      }
      // 获取数据
      this.wbLoading = true
      setTimeout(() => {
        // 加载完成后
        // 到最顶部
        document.scrollingElement.scrollTop = 0
        // 去掉之前的seleted
        this.clearSelected()
        // 设置seleted
        this.addSeleted(e)
        this.oldCollapseKey = this.newCollapseKey
        // 清空原数据
        this.wbList.map(item => {
          item.length = 0
        })
        // 新数据置入column中
        wbList.map((item, index) => {
          const mod = index % this.columnLength
          this.wbList[mod].push(item)
        })
        this.wbLoading = false
      }, 500)
    },
    loadMoreData () {
      this.wbLoadingBottom = true
      setTimeout(() => {
        this.wbLoadingBottom = false
        wbList.map((item, index) => {
          const mod = index % this.columnLength
          this.wbList[mod].push(item)
        })
      }, 500)
    },
    collapseChanged (key) {
      this.newCollapseKey = key
    },
    addSeleted (e) {
      let tar = e.target
      while (Array.from(tar.classList).indexOf('ant-list-item') < 0) {
        tar = tar.parentNode
      }
      const items = tar.parentNode
      Array.from(items.childNodes).map(dom => {
        dom.className = 'ant-list-item'
      })
      tar.classList.add('selected')
    },
    clearSelected () {
      // 将原来面板内的seleted class都去掉
      const tar = this.$refs.collapse
      const items = tar.$el.childNodes[this.oldCollapseKey].querySelectorAll('.ant-list-item')
      Array.from(items).map(itm => {
        itm.className = 'ant-list-item'
      })
    },
    calColumnWidth (cb) {
      this.$nextTick(() => {
        // 用宽度，衡量应该几列。简单适配下屏幕宽度，不考虑屏幕宽度变化时的处理
        const _contentWidth = this.$refs.wbContainer.clientWidth
        if (_contentWidth >= 1200) {
          this.columnLength = 3
        } else if (_contentWidth >= 768 && _contentWidth < 1200) {
          this.columnLength = 2
        } else {
          this.columnLength = 1
        }
        cb()
      })
    },
    calSideBarWidth () {
      const screenWidth = getWindowWidth()
      if (screenWidth >= 1200) {
        // 20 : 4
        this.userBarFixedWidth = (screenWidth - 48) * (4 / 24)
      } else if (screenWidth >= 768 && screenWidth < 1200) {
        // 18 : 6
        this.userBarFixedWidth = (screenWidth - 48) * (6 / 24)
      } else {
        // 12 : 12
        this.userBarFixedWidth = (screenWidth - 48) * (12 / 24)
      }
    },
    calSideBarHeight () {
      const screenHeight = getWindowHeight()
      this.userBarFixedHeight = screenHeight - 60 - 50 - 48
      this.userBarFixedHeightRem = screenHeight - 60 - 50 - 48
    },
    addScrollEvent () {
      document.addEventListener('scroll', () => {
        const scrollTop = getScrollTop()
        const wbUserList = this.$refs.wbUserList
        const wbUserListTop = 137
        if (wbUserList) {
          if (scrollTop <= 50) {
            wbUserList.style.top = (parseInt(wbUserListTop) - scrollTop) + 'px'
            this.userBarFixedHeight = this.userBarFixedHeightRem + scrollTop
          } else {
            wbUserList.style.top = (parseInt(wbUserListTop) - 49) + 'px'
            this.userBarFixedHeight = this.userBarFixedHeightRem + 49
          }
        }

        // 底部加载
        scrollToBottom(() => {
          if (!this.wbLoadingBottom) {
            this.wbBottom = true
            this.loadMoreData()
          }
        })
      }, false)

      window.addEventListener('resize', () => {
        this.calSideBarWidth()
        this.calSideBarHeight()
      }, false)
    }
  }
}
</script>

<style lang="less" scoped>
.left-side{
  position:fixed;
  top: 137px;
  left: 16px;
  overflow: hidden;
  z-index:2;

  .scroll-wrapper{
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .ant-list-item{
    cursor: pointer;
  }
  .ant-list-item:hover{
    background: #eee;
  }
  .ant-list-item.selected{
    background: #eee;
  }
}
.wb-container {
  position: relative;
  width: 100%;
  display: flex;
  min-height: 300px;

  .ant-empty {
    position:absolute;
    top: 40%;
    left: 40%;
  }

  .loading-area{
    width: 100%
  }

  .wb-column-container {
    display: flex;
    flex-direction: column;

    .wb {
      width: 100%;
      padding: 0px 4px;
      margin-bottom: 8px;

      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
}
</style>
