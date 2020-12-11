<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="6"
      >
        <a-collapse class="wb-user-list" accordion>
          <a-collapse-panel v-for="(item, index) in userList" :key="index" :header="item.name">
            <a-list :data-source="item.member">
              <a-list-item slot="renderItem" slot-scope="user">
                {{ user.name }}
              </a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
      <a-col :xs="12" :sm="12" :md="16" :lg="16" :xl="18">
        <div class="wb-container">
          <a-row :gutter="8" width="100%">
            <a-col
              v-for="(item, index) in wbList"
              :key="index"
              class="wb-column-container"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="8"
            >
              <div class="wb" v-for="(itm, idx) in item" :key="idx">
                <WBTemplate :dataSource="itm" />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { WBTemplate } from '@/components'
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
  }
]

const wbList = [
  {
    nickname: '转发别人',
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
    nickname: '自己发视频',
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
    nickname: '转发别人的视频',
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
    nickname: '自己发图片列表',
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
  },
  {
    nickname: '转发别人的图片列表',
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
    nickname: '叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '叶公子',
    username: 'HumanYerong',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    createdAt: '2020-12-11 13:41:22',
    content: '内容',
    support: 841,
    comment: 859,
    share: 24
  },
  {
    nickname: '叶公子',
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
      wbList: []
    }
  },
  mounted () {
    for (let i = 0; i < this.columnLength; i++) {
      this.wbList.push([])
    }
    // 获取数据
    setTimeout(() => {
      wbList.map((item, index) => {
        const mod = index % this.columnLength
        this.wbList[mod].push(item)
      })
      console.log(this.wbList)
    }, 500)
  }
}
</script>

<style lang="less" scoped>
.wb-container {
  width: 100%;

  .wb-column-container {
    display: flex;
    flex-direction: column;

    .wb {
      width: 100%;
      margin-bottom: 8px;

      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
}
</style>
