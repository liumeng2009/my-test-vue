<template>
  <div class="report-item-wrapper" @click="goDetail($event)">
    <div class="title">
      {{ dataSource.title }}
      <a-tag color="pink">
        发酵
      </a-tag>
    </div>
    <div class="content">{{ dataSource.content }}</div>
    <div class="toolbar">
      <div class="left">
        <span><a-icon type="profile" />{{ dataSource.type }}</span>
        <span><a-icon type="clock-circle" />{{ dataSource.createdAt }}</span>
        <span><a-icon type="heat-map" />{{ dataSource.location }}</span>
        <span><a-icon type="profile" />{{ dataSource.tags }}</span>
      </div>
      <div class="right">
        <a-button type="primary" @click="goDetail($event)">详情</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 事件上报 发酵的item
export default {
  name: 'ReportFermentItem',
  props: {
    dataSource: {
      type: Object,
      default: null
    }
  },
  methods: {
    goDetail (e) {
      e.stopPropagation()
      this.$router.push({ name: 'EventFermentDetail' })
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

  &:nth-of-type(1) {
    padding-top: 0px;
  }

  &:last-of-type{
    border-bottom:none
  }

  .title{
    font-size:18px;
    font-weight: bolder;
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    & > .r-type{
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-left: 8px;
      border-radius: 100%;
      border-bottom-left-radius: 0%;
      background: blue;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
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
</style>
