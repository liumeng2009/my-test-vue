<template>
  <a-modal
    :visible="visible"
    :confirmLoading="submitLoading"
    title="新建群体"
    okText="新增"
    cancelText="取消"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="
      () => {
        $emit('create')
      }
    "
  >
    <a-form layout="vertical" :form="form">
      <a-form-item name="title" label="群体名称">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '请输入一个群体名称' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item name="keywords" label="群体(英文逗号分隔)">
        <a-input
          type="textarea"
          v-decorator="[
            'keywords',
            {
              rules: [{ required: true, message: '请输入关键词' }],
            },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'TopicAdd',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    submitLoading: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_in_modal' })
  }
}
</script>

<style lang="less" scoped>
</style>
