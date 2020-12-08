<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card title="发酵事件详情">
          <div class="detail-wrapper">
            <div class="top">
              <span><a-icon type="heat-map" />美国</span>
              <span><a-icon type="profile" />境内群体事件</span>
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
            <div class="list-head"><span>20</span>条相关言论</div>
            <div class="list-container">
              <ItemSec v-for="(item, index) in listData" :key="index" :dataSource="item" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="预警原因" style="margin-bottom: 16px">
          <div style="display: flex; align-items: center; justify-content: center">
            <a-icon type="check" />
            符合
            <span style="font-size: 16px;font-weight:bolder">事件发酵</span>
            模型
          </div>
        </a-card>
        <a-card title="话题当日讨论次数" style="margin-bottom: 16px">
          <div class="center-card">
            <span style="line-height: 30px">话题当日讨论次数:<span style="font-size:16px;color:red">27896</span></span>
          </div>
        </a-card>
        <a-card title="当日主题占比" :bodyStyle="{padding: 0}" style="margin-bottom: 16px">
          <Pie :dataSource="pieData" :height="200" />
        </a-card>
        <a-card title="重点核查人物" style="margin-bottom: 16px">
          <FourList :dataSource="listManData" />
        </a-card>
        <a-card title="重点核查组织">
          <FourList :dataSource="listManData" />
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { Pie, FourList, ItemSec } from '@/components'

const list = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'Twitter',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'Facebook',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'YouTube',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  }
]
const pie = [
  // eslint-disable-line
  { name: '老兵上街维权', value: 15 },
  { name: '其他话题', value: 23 }
]

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
  name: 'EventFermentDetail',
  components: {
    Pie,
    FourList,
    ItemSec
  },
  data() {
    return {
      pieData: [],
      // 左边大列表
      listData: [],
      // 右边俩小列表
      listManData: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.pieData = pie
      this.listData = list
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

  .list-head{
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    background: #eee;
    border-radius: 5px;
  }
}
</style>
