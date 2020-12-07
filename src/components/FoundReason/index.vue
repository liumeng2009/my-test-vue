<template>
  <div class="freason">
      <div class="wrapper">
        <p>经过平台自动搜索，此线索符合
            <span class="tactics">{{tactics}}</span>中设置的关键词</p>
        <p>包含关键词:
            <a-button v-for="(item, index) in keyWords" :key="index">
                {{item}}
            </a-button>
        </p>
        <p>主要人员:
            <span>{{accountName}}</span>
        </p>
      </div>
      <div class="toolbar">
          <div class="per">
              <a-icon type="wifi" />
              {{support}}
          </div>
          <div class="per">
              <a-icon type="wifi" />
              {{comment}}
          </div>
          <div class="per">
              <a-icon type="wifi" />
              {{share}}
          </div>
          <div class="per">
              <a-icon type="wifi" />
              {{at}}
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'FoundReason',
    props: {
        tactics: {
            type: String,
            default: ''
        },
        keyWords: {
            type: Array,
            default: () => []
        },
        accountName: {
            type: String,
            default: () => []
        },
        support: {
            type: Number,
            default: 0
        },
        comment: {
            type: Number,
            default: 0
        },
        share: {
            type: Number,
            default: 0
        },
        at: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="less" scoped>
    .freason{

        .wrapper{
            background: #eee;
            padding: 8px;
            border-radius: 5px;

            & > p{
                margin-bottom: 20px;

                &:last-of-type{
                    margin-bottom: 0px;
                }

                & > button {
                    margin-right: 8px;

                    &:last-of-type{
                        margin-right: 0px;
                    }
                }
                & > span {
                    color: red;

                    &.tactics{
                        font-size: 18px
                    }
                }
            }
        }

        .toolbar{
            width: 100%;
            height: 50px;
            display: flex;

            .per{
                width: 25%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                & > i{
                    margin-right: 4px;
                }
            }
        }
    }
</style>
