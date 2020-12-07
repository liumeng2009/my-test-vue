<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="gutter">
      <a-col :span="span_1">
        <a-card title="线索详情">
          <div class="detail-container">
            <div class="header">
              <img :src="detail.avatar">
              <span class="author-name">{{ detail.author }}</span>
              <span v-add-icon>{{ detail.source }}</span>
              <a-button size="small" :style="{ color: btnColor }">{{ detail.type }}</a-button>
            </div>
            <div class="author">
              <img :src="detail.avatar" alt="" />
              <div class="author-name">
                <span>{{ detail.author }}</span>
                <span>{{ detail.createdAt }}</span>
              </div>
            </div>
            <div class="content" :style="{paddingTop: showComment ? '4px' : '50px'}">
              {{ detail.content }}
            </div>
            <div class="video" v-if="!showComment">
              <embed :src="detail.video" />
            </div>

            <div v-if="showComment" class="comment">
              <div class="author">
                <img :src="detail.comment && detail.comment.avatar" alt="" />
                <div class="author-name">
                  <span>{{ detail.comment && detail.comment.author }}</span>
                  <span>{{ detail.comment && detail.comment.createdAt }}</span>
                </div>
              </div>
              <div class="content">
                {{ detail.comment.content }}
              </div>
              <div class="video">
                <embed :src="detail.comment.video" />
              </div>
            </div>
            <div class="btn-wrapper">
              <a-button type="primary" @click="toListPage()">返回</a-button>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="span_2" v-if="showRight">
        <a-card title="账号简介" style="margin-bottom: 16px">
          {{ detail.authorInfo && detail.authorInfo.description }}
        </a-card>
        <a-card title="好友关系" style="margin-bottom: 16px">
          <SecList :listData="detail.frends" />
        </a-card>
        <a-card title="账号简介" style="margin-bottom: 16px">
          <AccountCard :data="detail.account" />
        </a-card>
        <a-card title="发现原因" :bodyStyle="{padding: 16 + 'px'}">
          <FoundReason
            :tactics="'策略一'"
            :keyWords="['共振', '上街', 'liyiping1911']"
            :accountName="'Cyrano7700'"
            :support="841"
            :comment="859"
            :share="51"
            :at="12"
          />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { AddIcon } from '@/core/directives'
import { SecList, AccountCard, FoundReason } from '@/components'

export default {
  name: 'ClueDiscoverDetail',
  components: {
    SecList,
    AccountCard,
    FoundReason
  },
  directives: {
    AddIcon
  },
  data() {
    return {
      btnColor: 'red',
      detail: {},
      span_1: 18,
      span_2: 6,
      gutter: 16
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    showRight () {
      if (this.span_2 === 0) {
        return false
      }
      return true
    },
    showComment () {
      if (this.detail.comment) {
        return true
      }
      return false
    }
  },
  methods: {
    getData () {
      setTimeout(() => {
        this.detail = {
          source: 'Facebook',
          type: '重点账号',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          author: '常向阳',
          createdAt: '2020-4-10 13:54:41',
          content: '通过全民共振平台提供的方法',
          video: 'http://www.baidu.com',
          authorInfo: {
            description: '通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法'
          },
          frends: [
            {
              avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              name: '石配罡',
              contact_count: 20
            },
            {
              avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              name: '石配罡',
              contact_count: 5
            },
            {
              avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              name: '石配罡',
              contact_count: 10
            },
            {
              avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              name: '石配罡',
              contact_count: 5
            }
          ],
          account: {
            nick: '叶公子',
            account_name: '@HumanPrinceYe',
            sign: '一统江湖',
            tags: '三体拯救地球'
          },
          comment: {
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            author: '常向阳',
            createdAt: '2020-4-10 13:54:41',
            content: '通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法通过全民共振平台提供的方法',
            video: 'http://www.baidu.com'
          }
        }
        if (this.detail.type === '特定网站') {
          this.span_1 = 24
          this.span_2 = 0
          this.gutter = 0
          this.btnColor = 'yellow'
        }
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

  .header {
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
    position: absolute;
    width: 100%;
    bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
