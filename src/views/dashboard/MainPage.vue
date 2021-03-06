<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <div @click="toMain" style="cursor:pointer">
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <div class="main-container">
      <div class="fun-selector">
        <div class="fun-wrapper">
          <div class="fun" :style="{borderTopColor: settings.primaryColor}" @click="toInfo">
            <a-icon type="fire"></a-icon>
            <span>情报发现</span>
          </div>
        </div>
        <div class="fun-wrapper">
          <div class="fun" :style="{borderTopColor: settings.primaryColor}" @click="toVerify">
            <a-icon type="search"></a-icon>
            <span>核查核证</span>
          </div>
        </div>
        <div class="fun-wrapper">
          <div class="fun" :style="{borderTopColor: settings.primaryColor}" @click="toTool">
            <a-icon type="tool"></a-icon>
            <span>小工具</span>
          </div>
        </div>
      </div>
    </div>
  </pro-layout>
</template>

<script>

import { SettingDrawer } from '@/components/SettingDrawer'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
    LogoSvg
  },
  data () {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: 'Fluid',
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false
    }
  },
  created () {
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    const { color, theme, layout } = this.$store.getters
    this.settings.primaryColor = color ? color.toString() : this.settings.primaryColor
    this.settings.theme = theme ? theme.toString() : this.settings.theme
    this.settings.layout = layout ? layout.toString() : this.settings.layout
  },
  methods: {
    toMain () {
      this.$router.push({ name: 'mainPage' })
    },
    toInfo () {
      this.$router.push({ name: 'info' })
    },
    toVerify () {
      this.$router.push({ name: 'verify' })
    },
    toTool () {
      this.$message.info({
        content: '功能开发中',
        duration: 3
      })
    },
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
@import "../../layouts/BasicLayout.less";
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
