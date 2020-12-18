<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card :loading="detailLoading">
          <div class="detail-wrapper">
            <div class="top">
              <span><a-icon type="heat-map" />{{ detail.region }}</span>
              <span><a-icon type="profile" />{{ detail.type }}</span>
            </div>
            <div class="title">
              <div class="left">
                <span>发酵主题：</span>
                {{ detail.topic }}
              </div>
            </div>
            <div class="createdAt">{{ detail.createdAt }}</div>
            <div class="list-head">贡献度最高的相关线索：<span>{{ list.length }}</span>条</div>
            <div class="list-container">
              <a-list :loading="listLoading" :data-source="list" :pagination="true">
                <a-list-item slot="renderItem" :key="index" slot-scope="item, index">
                  <ItemSec :dataSource="item" />
                </a-list-item>
              </a-list>
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
        <a-card :loading="detailLoading" title="话题当日讨论次数" style="margin-bottom: 16px">
          <div class="center-card">
            <span style="line-height: 30px">话题当日讨论次数:<span style="font-size:16px;color:red">{{ detail.count }}</span></span>
          </div>
        </a-card>
        <a-card title="当日主题占比" :bodyStyle="{padding: 0}">
          <a-spin :spinning="pieLoading">
            <Pie :dataSource="pie" :height="200" />
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { Pie, ItemSec } from '@/components'

const listRequest = [
  {
    id: 0,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'Twitter',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  },
  {
    id: 1,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'Facebook',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  },
  {
    id: 2,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    nickname: '吴文行',
    username: 'wenxingwu',
    source: 'Facebook',
    content: '大家一定要小心',
    createdAt: '2020-10-11'
  }
]
const pieRequest = [
  { name: '老兵上街维权', value: 15 },
  { name: '其他话题', value: 23 }
]
const detailRequest = {
  region: '美国',
  type: '境内群体事件',
  topic: '平度老兵，上街抗议，声称维权',
  createdAt: '2020-4-10 15:54:41',
  count: 27998
}

export default {
  name: 'EventFermentDetail',
  components: {
    Pie,
    ItemSec
  },
  data() {
    return {
      pie: [],
      pieLoading: false,
      // 左边大列表
      list: [],
      listLoading: false,
      // 详情
      detail: {},
      detailLoading: false
    }
  },
  created() {
    this.getDetail()
    this.getList()
    this.getPie()
  },
  methods: {
    getDetail () {
      this.detailLoading = true
      setTimeout(() => {
        this.detail = detailRequest
        this.detailLoading = false
      }, 1000)
    },
    getList () {
      this.listLoading = true
      setTimeout(() => {
        this.list = listRequest
        this.listLoading = false
      }, 1000)
    },
    getPie () {
      this.pieLoading = true
      setTimeout(() => {
        this.pie = pieRequest
        this.pieLoading = false
      }, 1000)
    }
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

  .list-head{
    width: 100%;
    margin-top: 32px;
    box-sizing: border-box;
    padding: 8px;
    background: #eee;
    border-radius: 5px;
  }
}
</style>
