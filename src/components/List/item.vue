<template>
  <div class="wb-item-wrapper">
    <div class="item-avatar">
      <img :src="data.avatar" alt="data.username" />
    </div>
    <div class="item-content">
      <div class="top">
        <div class="name">{{ data.nickname }}({{ data.username }})</div>
        <div class="source">
          <span v-add-icon>{{ data.source }}</span>
          <a-button :size="'small'" :style="{color: btnColor}">{{ data.policy }}</a-button>
        </div>
      </div>
      <div class="createdAt">
        {{ data.createdAt }}
      </div>
      <div class="content">
        {{ data.content }}
      </div>
      <div class="bottom">
        <a-button type="primary" size="small" @click="toDetail()">详情</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 线索发现 等复杂列表的item
import { AddIcon } from '@/core/directives'

export default {
  name: 'WbItem',
  directives: {
    AddIcon
  },
  data() {
      return {
          btnColor: null
      }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.btnColor = this.getBtnColor()
  },
  methods: {
    getBtnColor () {
        const { important } = this.$props.data
        switch (important) {
            case '0':
                return 'blue'
            case '1':
                return 'orange'
            case '2':
                return 'red'
            default:
                return ''
        }
    },
    toDetail () {
      console.log('detail', this.$props.data)
      this.$router.push({ path: '/infoDiscover/clueDiscover/detail', query: { id: this.$props.data.id } })
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

  .item-avatar {
    width: 100px;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  .item-content {
    overflow: hidden;

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
        font-size: 12px;
        display: flex;
        align-items: center;

        & > span{
            display: flex;
            flex-direction: row-reverse;
            padding-left: 24px;
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

.wb-item-wrapper:last-child {
    border-bottom: none;
}

</style>
