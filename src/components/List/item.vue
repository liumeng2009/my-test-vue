<template>
  <div class="wb-item-wrapper" @click="toDetail($event)">
    <div class="item-avatar">
      <img :src="data.avatar" alt="data.username" />
    </div>
    <div class="item-content">
      <div class="top">
        <div class="name">{{ data.nickname }}({{ data.username }})</div>
        <div class="source">
          <a-icon :style="{color: primaryColor}" type="twitter" v-if="data.source.toLowerCase() === 'twitter'"></a-icon>
          <a-icon :style="{color: primaryColor}" type="facebook" v-if="data.source.toLowerCase() === 'facebook'"></a-icon>
          <a-icon :style="{color: primaryColor}" type="wechat" v-if="data.source.toLowerCase() === 'telegram'"></a-icon>
          <span>{{ data.source }}</span>
        </div>
      </div>
      <div class="createdAt">
        {{ data.createdAt }}
      </div>
      <div class="content">
        {{ data.content }}
      </div>
      <div class="bottom">
        <a-button type="primary" size="small" @click="toDetail($event)">详情</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 线索查询列表的item
export default {
  name: 'WbItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    primaryColor () {
      return this.$store.getters.color
    }
  },
  methods: {
    toDetail (e) {
      e.stopPropagation()
      this.$router.push({ path: '/info/clueSearchDetail', query: { id: this.$props.data.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.wb-item-wrapper {
  width: 100%;
  padding: 16px 0px;
  min-height: 100px;
  box-sizing: content-box;
  border-bottom: #ccc 1px dashed;
  display: flex;
  align-items: center;

  &:nth-of-type(1){
    padding-top: 0px;
  }

  &:last-child{
    border-bottom:none;
  }

  .item-avatar {
    width: 10%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }

  .item-content {
    width: 90%;

    .top {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 16px;
        font-weight: bolder;
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
  }

  .createdAt {
      font-size: 12px;
      color: #ccc;
  }

  .content {
      line-height: 25px;
      margin-bottom: 4px;
  }
}

</style>
