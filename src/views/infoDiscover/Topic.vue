<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="listLoading">
      <a-row :gutter="[32, 32]">
        <a-col :span="8" v-for="(item, index) in list" :key="index">
          <a-card class="topic-card" :bodyStyle="{height: 382 + 'px', padding: '16px'}">
            <template slot="title">
              <a-button v-if="item.editable" icon="delete" type="link" @click="deleteTopic"></a-button>
              {{ item.title }}
            </template>
            <template slot="extra">
              <div class="extra">
                <a :class="item.search === 'day' ? 'selected' : ''" @click="search(index, 'day')">当日</a>
                <a :class="item.search === 'week' ? 'selected' : ''" @click="search(index, 'week')">本周</a>
                <a :class="item.search === 'month' ? 'selected' : ''" @click="search(index, 'month')">本月</a>
              </div>
            </template>
            <TopicItem v-for="(itm, idx) in item.wbList" :key="idx" :dataSource="itm" />
          </a-card>
        </a-col>
        <a-col :span="8">
          <div class="add-btn" @click="addTopic">
            <a-icon type="plus"></a-icon>
            新增话题
          </div>
        </a-col>
      </a-row>
    </a-spin>
    <TopicAdd :visible="visible" :submitLoading="addSubmitLoading" ref="topicAdd" @cancel="handleCancel" @create="handleOk" />
  </page-header-wrapper>
</template>

<script>
import { TopicItem, TopicAdd } from '@/components'

const blocks = [
  { title: '涉港', editable: false, search: 'day' },
  { title: '涉美', editable: false, search: 'day' },
  { title: '涉台', editable: false, search: 'day' },
  { title: '藏独', editable: false, search: 'day' },
  { title: '法轮功', editable: false, search: 'day' },
  { title: '一带一路', editable: false, search: 'day' },
  { title: '赛博朋克2077', editable: true, search: 'day' },
  { title: '带鱼屏', editable: true, search: 'day' }
]
const data = [
  { title: '1' },
  { title: '2' },
  { title: '3' },
  { title: '4' },
  { title: '5' },
  { title: '6' },
  { title: '7' },
  { title: '8' },
  { title: '9' },
  { title: '10' }
]

blocks.map(item => {
    item.wbList = data
})
export default {
  name: 'TopicList',
  components: {
      TopicItem,
      TopicAdd
  },
  data() {
      return {
          visible: false,
          addSubmitLoading: false,
          list: [],
          listLoading: false
      }
  },
  created () {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
        this.list = blocks
      }, 2000)
  },
  methods: {
    search (topicIndex, search) {
      this.list[topicIndex].search = search
    },
    addTopic () {
        this.visible = true
    },
    handleOk () {
      const form = this.$refs.topicAdd.form
      form.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('Received values of form: ', values)
        this.addSubmitLoading = true
        setTimeout(() => {
            // 提交完成
            this.addSubmitLoading = false
            form.resetFields()
            this.visible = false
        }, 2000)
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    deleteTopic () {
      this.$confirm({
        title: '您确认要删除这个话题吗？',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-btn{
    width: 100%;
    height: 432px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 100px;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    background: #fff;
    outline: none;
    cursor: pointer;
}

.add-btn:hover{
  box-shadow: 0px 3px 3px 3px #eee;
}

.extra {
  a {
    margin-right: 8px;

    &.selected{
      text-decoration: underline;
    }

    &:last-child{
      margin-right: 0px;
    }
  }
}
</style>
