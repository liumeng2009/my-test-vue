<template>
  <div class="main-container">
    <div class="verify-total">
      <span style="font-size: 20px"><a-icon type="clock" />上次更新时间：<span class="blue">{{ total.update }}</span></span>
      <span style="font-size: 20px">更新数量：<span class="red">{{ total.twitterNum + total.facebookNum + total.telegramNum | NumberFormat }}</span></span>
      <span style="font-size: 16px">(Twitter:<span class="red">{{ total.twitterNum | NumberFormat }}</span></span>
      <span style="font-size: 16px">Facebook:<span class="red">{{ total.facebookNum | NumberFormat }}</span></span>
      <span style="font-size: 16px">Telegram:<span class="red">{{ total.telegramNum | NumberFormat }}</span>)</span>
    </div>
    <div class="fun-selector">
      <div class="fun-wrapper">
        <div class="fun-card" @click="toSearchPage('twitter')">
          <a-card hoverable>
            <div style="display:flex;">
              <Twitter />
              <div style="height: 100px;display:flex;flex-direction:column;justify-content:space-around">
                <span style="padding-bottom: 30px; font-size: 22px;">Twitter</span>
                <span style="font-size:16px;">
                  总量：{{ total.twitterTotalNum | NumberFormat }}
                </span>
                <span style="font-size:16px;">
                  重点账号：{{ total.twitterAccountNum | NumberFormat }}
                </span>
              </div>
            </div>
          </a-card>
        </div>
      </div>
      <div class="fun-wrapper">
        <div class="fun-card" @click="toSearchPage('facebook')">
          <a-card hoverable>
            <div style="display:flex;">
              <Facebook />
              <div style="height: 100px;display:flex;flex-direction:column;justify-content:space-around">
                <span style="padding-bottom: 30px; font-size: 22px;">Facebook</span>
                <span style="font-size:16px;">总量：{{ total.facebookTotalNum | NumberFormat }}</span>
                <span style="font-size:16px;">
                  国内：{{ total.facebookInnerNum | NumberFormat }}
                </span>
              </div>
            </div>
          </a-card>
        </div>
      </div>
      <div class="fun-wrapper">
        <div class="fun-card" @click="toSearchPage('telegram')">
          <a-card hoverable>
            <div style="display:flex;">
              <Telegram />
              <div style="height: 100px;display:flex;flex-direction:column;justify-content:space-around">
                <span style="padding-bottom: 30px; font-size: 22px;">Telegram</span>
                <span style="font-size:16px;">总量：{{ total.telegramTotalNum | NumberFormat }}</span>
                <span style="font-size:16px;">
                  国内：{{ total.telegramInnerNum | NumberFormat }}
                </span>
              </div>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Twitter, Facebook, Telegram } from '@/core/icons'

const detailRequest = {
  update: '2020-12-17 16:21:33',
  twitterNum: 98782,
  facebookNum: 23112,
  telegramNum: 9762,
  twitterTotalNum: 53232123,
  facebookTotalNum: 723213981,
  telegramTotalNum: 80232781,
  twitterAccountNum: 107016,
  facebookInnerNum: 6091209,
  telegramInnerNum: 5593218
}
export default {
  name: 'FunSelector',
  components: {
    Twitter,
    Facebook,
    Telegram
  },
  methods: {
    getData () {
      this.total = detailRequest
    },
    toSearchPage(socialName) {
      this.$router.push({ path: '/verify/' + socialName })
    }
  },
  data () {
    return {
      total: {}
    }
  },
  created () {
    this.getData(0)
  },
  computed: {
    primaryColor () {
      return this.$store.getters.color
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  position: relative;

  .verify-total {
    width: 100%;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: 0px 8px;
    }
  }

  .fun-selector {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 150px;
    width: 1200px;
    display: flex;
    justify-content: space-between;

    .fun-wrapper {
      width: 33.33%;
      height: 100%;
      padding: 0px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .fun-card {
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;

        svg {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }

        .anticon {
          font-size: 48px;
          margin-bottom: 8px;
          margin-top: 20px;
        }

        span {
          font-size: 20px;
        }
      }

      .fun:hover {
        animation: slowHover 0.5s linear;
        box-shadow: 4px 4px 5px #ddd;
      }
    }
  }
}

.red{
  color: red
}
.blue{
  color: blue
}

@keyframes slowHover {
  from {
    box-shadow: 3px 3px 3px #eee;
  }
  to {
    box-shadow: 3px 3px 5px #ddd;
  }
}
@keyframes slowHoverReverse {
  from {
    box-shadow: 3px 3px 5px #ddd;
  }
  to {
    box-shadow: 3px 3px 3px #eee;
  }
}
</style>
