<template>
  <div class="main-container">
    <div class="fun-selector">
      <div class="fun-wrapper">
        <div class="fun" :style="{ borderTopColor: color }" @click="toSearchPage('twitter')">
          <a-icon type="twitter" />
          <span>Twitter</span>
        </div>
      </div>
      <div class="fun-wrapper">
        <div class="fun" :style="{ borderTopColor: color }" @click="toSearchPage('facebook')">
          <a-icon type="facebook" />
          <span>Facebook</span>
        </div>
      </div>
      <div class="fun-wrapper">
        <div class="fun" :style="{ borderTopColor: color }" @click="toSearchPage('telegram')">
          <a-icon type="wechat" />
          <span>Telegram</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultSettings from '@/config/defaultSettings'
export default {
  name: 'FunSelector',
  methods: {
    toSearchPage(socialName) {
      this.$router.push({ path: '/verify/' + socialName })
    }
  },
  data() {
    return {
      color: DefaultSettings.primaryColor
    }
  },
  mounted() {
    const { color } = this.$store.getters
    this.color = color ? color.toString() : DefaultSettings.primaryColor
  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  position: relative;

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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .fun {
        width: 200px;
        height: 200px;
        border: #ccc 1px solid;
        border-radius: 2px;
        border-top: 5px blue solid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 3px 3px 3px #eee;
        animation: slowHoverReverse 0.5s linear;

        .anticon {
          font-size: 48px;
          margin-bottom: 8px;
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
