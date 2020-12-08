<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card title="发酵事件详情">
          <div class="detail-wrapper">
            <div class="top">
              <span v-add-icon>Twitter</span>
              <span><a-icon type="heat-map" />美国</span>
            </div>
            <div class="title">
              <div class="left">
                <span>发酵主题：</span>
                平度老兵，上街抗议，声称维权
              </div>
              <div class="right">
                阶段报告：
                <a>平度劳宾</a>
                <a-icon type="download" />
              </div>
            </div>
            <div class="createdAt">2020-4-10 15:54:41</div>
            <div class="progress">
              <a-progress :percent="55" status="active" />
            </div>
            <div class="user">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
              <span>邹承凤</span>
              <span>(cyrano7700)</span>
            </div>
            <div class="content">
              全民共振
            </div>
            <div class="img-area">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
              <span>图片或者视频标题</span>
            </div>
          </div>
          <div class="btn-area">
            <a-button>返回</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="预警原因" style="margin-bottom: 16px">
          <div style="display: flex; align-items: center; justify-content: center">
            <a-icon type="check" />
            符合
            <span style="font-size: 16px;font-weight:bolder">事件行动</span>
            模型
          </div>
        </a-card>
        <a-card title="重点人物研判" style="margin-bottom: 16px">
          <FourList :dataSource="listManData" />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { FourList } from '@/components'
import { AddIcon } from '@/core/directives'

const listMan = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '山东',
    username: 'admin',
    gongxian: 40,
    progress: 1
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '山东',
    username: 'admin',
    gongxian: 40,
    progress: 1
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '山东',
    username: 'admin',
    gongxian: 40,
    progress: 1
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '山东',
    username: 'admin',
    gongxian: 40,
    progress: 1
  }
]

export default {
  name: 'EventActionDetail',
  directives: {
    AddIcon
  },
  components: {
    FourList
  },
  data() {
    return {
      // 右边俩小列表
      listManData: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.listManData = listMan
    }, 500)
  }
}
</script>

<style lang="less" scoped>
.detail-wrapper{

  .top{
    padding: 0px 0px 8px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom:#ccc 1px dashed;
    margin-bottom: 16px;

    & > span > i {
      margin-right: 4px;
    }

    & > span:nth-of-type(1){
      margin-right: 8px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  .title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0px;

    .left{
      font-weight: bolder;
    }

    .right{
      i {
        margin-left:8px;
      }
    }
  }

  .createdAt{
    font-size: 12px;
  }

  .progress{
    margin: 16px 0px;
  }

  .user{
    display: flex;
    align-items: center;
    font-weight: bolder;
    margin-top: 16px;

    & > img{
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  .content{
    padding: 16px 8px;
  }

  .img-area{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    img {
      min-height: 300px;
      border: #ccc 1px solid;
    }

    & > span{
      display: inline-block;
      padding: 8px;
    }
  }
}

.btn-area{
  margin-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
