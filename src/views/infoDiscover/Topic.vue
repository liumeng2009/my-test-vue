<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="listLoading">
      <a-row :gutter="[32, 32]">
        <a-col :span="8" v-for="(item, index) in list" :key="index">
          <a-card :title="item.title" class="topic-card">
            <a-button slot="extra" v-if="item.editable" icon="delete" type="link" @click="deleteTopic"></a-button>
            <TopicItem v-for="(itm, idx) in item.wbList" :key="idx" :dataSource="itm" />
            <a-pagination size="small" style="float:right" :total="50" show-less-items />
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
    { title: '话题1', editable: false },
    { title: '话题2', editable: false },
    { title: '话题3', editable: false },
    { title: '话题4', editable: false },
    { title: '话题5', editable: false },
    { title: '话题6', editable: false },
    { title: '话题7', editable: true },
    { title: '话题8', editable: true }
]
const data = [
    { title: '热点话题' },
    { title: '热点话题' },
    { title: '热点话题' },
    { title: '热点话题' },
    { title: '热点话题' },
    { title: '热点话题' }
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
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 100px;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    background: #fff;
    outline: none;
    cursor: pointer;
}
</style>
