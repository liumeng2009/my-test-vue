<template>
  <div class="report-item-wrapper" @click="goDetail($event)">
    <div class="avatar" v-if="showLeftAvatar">
      <img :src="dataSource.avatar" alt="">
    </div>
    <div class="detail" :style="{width: showLeftAvatar ? '90%' : '100%'}">
      <div class="title">
        <span>
          {{ dataSource.title }}
          <a-tag color="red">
            行动
          </a-tag>
        </span>
        <div class="source">
          <a-icon :style="{color: primaryColor}" type="twitter" v-if="dataSource.source.toLowerCase() === 'twitter'"></a-icon>
          <a-icon :style="{color: primaryColor}" type="facebook" v-if="dataSource.source.toLowerCase() === 'facebook'"></a-icon>
          <a-icon :style="{color: primaryColor}" type="wechat" v-if="dataSource.source.toLowerCase() === 'telegram'"></a-icon>
          <span>{{ dataSource.source }}</span>
        </div>
      </div>
      <div class="content">{{ dataSource.content }}</div>
      <div class="toolbar">
        <div class="left">
          <span>
            <img :src="dataSource.avatar" alt="">
            <span>{{ dataSource.nickname }}</span>
            <span>({{ dataSource.username }})</span>
          </span>
          <span><a-icon type="clock-circle" />{{ dataSource.createdAt }}</span>
          <span><a-icon type="heat-map" />{{ dataSource.location }}</span>
          <span><a-icon type="profile" />{{ dataSource.tags }}</span>
        </div>
        <div class="right">
          <a-button type="primary" @click="goDetail($event)">详情</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 事件上报的item
import { AddIcon } from '@/core/directives'

export default {
  name: 'ReportActionItem',
  directives: {
    AddIcon
  },
  mounted () {
    console.log(this.$props.dataSource)
  },
  props: {
    dataSource: {
      type: Object,
      default: null
    },
    // 是否展示左边的大头像
    showLeftAvatar: {
      type: Boolean,
      default: true
    },
    // 是否展示上报的类型
    showReportType: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goDetail (e) {
      e.stopPropagation()
      this.$router.push({ name: 'EventActionDetail' })
    }
  },
  computed: {
    primaryColor () {
      return this.$store.getters.color
    }
  }
}
</script>

<style lang="less" scoped>
.report-item-wrapper{
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-bottom: #eee 1px dashed;
  display: flex;
  align-items: center;

  &:nth-of-type(1) {
    padding-top: 0px;
  }

  &:last-of-type{
    border-bottom:none
  }

  .avatar{
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }

  .detail{
    width: 90%;

    .title{
      font-size:18px;
      font-weight: bolder;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      & > span:nth-of-type(1) {
        display: flex;
        align-items: center;
      }

      & > span > .r-type{
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-left: 8px;
        border-radius: 100%;
        border-bottom-left-radius: 0%;
        background: red;
        color: #fff;
        font-size: 10px;
        line-height: 24px;
        text-align: center;
      }

      .source {
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;

        i.anticon{
          font-size: 20px;
        }

        & > span{
          padding-left: 8px;
          margin-right: 8px;
        }
      }
    }

    .content{
      color:#ccc;
      margin-bottom: 8px;
    }

    .toolbar{
      width: 100%;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left{
        width: 80%;
        display: flex;

        & > span{
          display:inline-block;
          margin-right: 16px;
          display: flex;
          align-items: center;

          &:nth-of-type(1) {
            display: flex;
            align-items: center;

            img {
              width:16px;
              height: 16px;
              border-radius: 50%;
            }
          }

          & > i {
            margin-right: 4px;
          }
        }
      }

      .right{
        display: flex;

        & > button:nth-of-type(1){
          margin-right: 8px;
        }
      }
    }
    }
}
</style>
