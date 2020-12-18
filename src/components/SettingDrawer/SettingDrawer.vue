<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
    >
      <div class="setting-drawer-index-content">

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>

          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                侧边栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="sidemenu">
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                顶部栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="topmenu">
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="colorWeak" @change="onColorWeak" />
                <a-list-item-meta>
                  <div slot="title">色弱模式</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
      </div>
      <div class="setting-drawer-index-handle" @click="toggle" slot="handle">
        <a-icon type="setting" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import SettingItem from './SettingItem'
import config from '@/config/defaultSettings'
import { updateTheme, updateColorWeak, colorList } from './settingConfig'
import {
  TOGGLE_COLOR,
  TOGGLE_NAV_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_WEAK,
  TOGGLE_CONTENT_WIDTH
} from '@/store/mutation-types'
import '@ant-design-vue/pro-layout/lib/components/SettingDrawer/LayoutChange.js'

export default {
  components: {
    SettingItem
  },
  mixins: [],
  data () {
    return {
      visible: false,
      colorList,
      navTheme: '',
      primaryColor: '',
      layoutMode: '',
      contentWidth: '',
      colorWeak: ''
    }
  },
  watch: {

  },
  mounted () {
    // localstorage存储的属性，放入data中
    this.primaryColor = this.$store.getters.color
    this.navTheme = this.$store.getters.theme
    this.layoutMode = this.$store.getters.layout
    this.colorWeak = this.$store.getters.weak
    this.contentWidth = this.$store.getters.contentWidth
    // 初始化dark or light
    this.$emit('change', {
      type: 'theme',
      value: this.navTheme
    })
    // 初始化layout，响应事件的方法在pro-layout的lib中，但分离不出具体的方法，只能触发事件了
    this.$emit('change', {
      type: 'layout',
      value: this.layoutMode
    })
    // 初始化布局模式
    this.$emit('change', {
      type: 'contentWidth',
      value: this.contentWidth
    })
    // 主题色
    console.log('更新颜色')
    setTimeout(() => {
      updateTheme(this.primaryColor)
    }, 0)
    // 色弱模式
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    },
    onColorWeak (checked) {
      this.$store.dispatch(TOGGLE_WEAK, checked)
      updateColorWeak(checked)
    },
    handleMenuTheme (theme) {
      this.$store.dispatch(TOGGLE_NAV_THEME, theme)
      this.navTheme = theme
      this.$emit('change', {
        type: 'theme',
        value: theme
      })
    },
    handleLayout (mode) {
      this.$store.dispatch(TOGGLE_LAYOUT, mode)
      this.layoutMode = mode
      this.$emit('change', {
        type: 'layout',
        value: mode
      })
      if (mode === 'topmenu') {
        this.$emit('change', {
          type: 'contentWidth',
          value: 'Fluid'
        })
      }
      if (mode === 'sidemenu') {
        console.log('fixsidebar')
        this.$emit('change', {
          type: 'fixSiderbar',
          value: true
        })
      }
    },
    handleContentWidthChange (type) {
      this.$store.dispatch(TOGGLE_CONTENT_WIDTH, type)
      this.$emit('change', {
        type: 'contentWidth',
        value: type
      })
    },
    changeColor (color) {
      console.log('点击切换颜色')
      if (this.primaryColor !== color) {
        this.primaryColor = color
        this.$store.dispatch(TOGGLE_COLOR, color)
        updateTheme(color)
      }
    }
  }
}
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    bottom: 16px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 316px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
