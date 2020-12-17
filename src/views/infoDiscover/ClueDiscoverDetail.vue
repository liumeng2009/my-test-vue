<template>
  <page-header-wrapper :title="false">
    <a-card :loading="detailLoading">
      <div class="detail-container">
        <!-- 头部 -->
        <div class="detail-header">
          <img :src="detail.avatar">
          <span class="author-name">{{ detail.author }}</span>
          <a-icon :style="{ color: primaryColor }" type="twitter" v-if="detail.source && detail.source.toLowerCase() === 'twitter'"></a-icon>
          <a-icon :style="{ color: primaryColor }" type="facebook" v-if="detail.source && detail.source.toLowerCase() === 'facebook'"></a-icon>
          <a-icon :style="{ color: primaryColor }" type="wechat" v-if="detail.source && detail.source.toLowerCase() === 'telegram'"></a-icon>
          <span>{{ detail.source }}</span>
        </div>
        <!-- 作者信息 -->
        <WBUser :nickname="detail.author" :username="detail.username" :avatar="detail.avatar" :createdAt="detail.createdAt" />
        <!-- 发文内容 -->
        <div class="content">
          {{ detail.content }}
        </div>
        <!-- 视频内容 -->
        <WBVideo v-if="detail.video" :dataSource="detail.video" />
        <!-- 图片内容 -->
        <div style="width: 100%;display:flex;justify-content:center">
          <WBImageList v-if="detail.images" :dataSource="detail.images" />
        </div>
        <!-- 被评论的文 -->
        <WBComment v-if="detail.comment" :dataSource="detail.comment" :showToolbar="false" />
        <div class="btn-wrapper">
          <a-button type="primary" @click="toListPage()">返回</a-button>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { WBVideo, WBImageList, WBComment, WBUser } from '@/components'

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

  comment: {
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
  name: 'ClueDiscoverDetail',
  components: {
    WBVideo,
    WBImageList,
    WBComment,
    WBUser
  },
  data() {
    return {
      detail: {},
      detailLoading: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    primaryColor () {
      return this.$store.getters.color
    }
  },
  methods: {
    getData () {
      this.detailLoading = true
      setTimeout(() => {
        this.detail = detailRequest
        this.detailLoading = false
      }, 2000)
    },
    toListPage () {
      this.$router.push({ path: '/infoDiscover' })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-container{
  min-height: 600px;
  position: relative;

  .detail-header {
    border-bottom: #ccc 1px dashed;
    padding: 0px 0px 24px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;

    .author-name {
      margin-right: 20px;
    }

    & > img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    & > i.anticon{
      padding: 0px 8px;
    }

    & > span{
      display: flex;
      margin-right: 8px;
      align-items: center;
      flex-direction: row-reverse;
    }
  }

  .author {
    display: flex;

    & > img {
      width: 48px;
      height: 48px;
    }

    .author-name {
      margin-left: 16px;
      padding-top: 4px;

      & span:nth-of-type(1) {
        font-size: 16px;
        font-weight: bolder;
        display: block;
      }

      & span:nth-of-type(2) {
        font-size: 12px;
        padding: 4px 0px;
        display: block;
      }
    }
  }

  .content {
    padding: 50px 20px 0px 20px;
  }

  .video {
    padding: 50px 20px 0px 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      max-height: 300px
    }

    & > span {
      padding: 8px 0px;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .comment {
    background: #e9e9e9;
    margin-top: 16px;
    padding: 16px;

    .author {

      & > img {
        width: 36px;
        height: 36px;
      }

      .author-name {
        padding-top: 0px;

        & span:nth-of-type(1) {
          font-size: 14px;
        }

        & span:nth-of-type(2) {
          padding: 0px;
          font-size: 10px;
        }
      }
    }
  }

  .btn-wrapper {
    width: 100%;
    padding-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
