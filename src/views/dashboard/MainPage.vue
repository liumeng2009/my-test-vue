<template>
  <div class="main-container">
    <div class="fun-selector">
      <div class="fun-wrapper">
        <div class="fun" :style="{borderTopColor: color}" @click="toInfo">
          <a-icon type="fire"></a-icon>
          <span>事件上报</span>
        </div>
      </div>
      <div class="fun-wrapper" @click="toVerify">
        <div class="fun" :style="{borderTopColor: color}">
          <a-icon type="search"></a-icon>
          <span>核查核证</span>
        </div>
      </div>
      <div class="fun-wrapper" @click="toTool">
        <div class="fun" :style="{borderTopColor: color}">
          <a-icon type="tool"></a-icon>
          <span>小工具</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '@ant-design-vue/pro-layout/lib/components/SettingDrawer/LayoutChange.js'
export default {
    name: 'MainPage',
    data () {
      return {
        themeColor: '#000'
      }
    },
    mounted () {
      const color = this.$store.state.app.color
      this.themeColor = color
      const layout = this.$store.state.app.layout
      console.log(layout)
      if (layout === 'sidemenu') {
        this.$store.dispatch('layout', 'topmenu')
        setTimeout(() => {
          console.log('修改layout')
          this.$emit('change', {
            type: 'layout',
            value: 'sidemenu'
          })
        }, 2000)
      }
    },
    computed: {
      ...mapState({
        color: state => state.app.color
      })
    },
    methods: {
      toInfo () {
        this.$router.push({ name: 'info' })
      },
      toVerify () {
        this.$router.push({ name: 'verify' })
      },
      toTool () {
        this.$message.info('敬请期待')
      }
    },
    watch: {
      color (val) {
        this.themeColor = val
      }
    }
}
</script>

<style lang="less" scoped>
  .main-container{
    width: 100%;
    height: 100%;
    position:relative;

    .fun-selector{
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 150px;
      width: 1200px;
      display: flex;
      justify-content: space-between;

      .fun-wrapper{
        width: 33.33%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .fun{
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
          animation: slowHoverReverse .5s linear;

          .anticon{
            font-size: 48px;
            margin-bottom: 8px;
          }

          span{
            font-size: 20px
          }
        }

        .fun:hover{
          animation: slowHover .5s linear;
          box-shadow: 4px 4px 5px #ddd;
        }
      }
    }
  }

  @keyframes slowHover {
    from {box-shadow: 3px 3px 3px #eee;}
    to {box-shadow: 3px 3px 5px #ddd;}
  }
  @keyframes slowHoverReverse {
    from {box-shadow: 3px 3px 5px #ddd;}
    to {box-shadow: 3px 3px 3px #eee;}
  }
</style>
