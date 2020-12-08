<template>
  <div class="report-item-wrapper">
    <div class="avatar">
      <img :src="dataSource.avatar" alt="">
    </div>
    <div class="detail">
      <div class="title">
        <span>{{ dataSource.title }}</span>
        <span v-add-icon>{{ dataSource.source }}</span>
      </div>
      <div class="content">{{ dataSource.content }}</div>
      <a-progress :percent="dataSource.progress" status="active" />
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
          <a-button type="warnning">快速核查</a-button>
          <a-button type="primary" @click="goDetail">详情</a-button>
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
    }
  },
  methods: {
    goDetail () {
      this.$router.push({ path: '/infoDiscover/eventReport/detail?type=ferment' })
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

      & > span:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
        font-weight: normal;
        display: flex;
        flex-direction: row-reverse;
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
