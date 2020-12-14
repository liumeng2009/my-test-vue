import storage from 'store'
import {
  SIDEBAR_TYPE,
  TOGGLE_MOBILE_TYPE,
  TOGGLE_NAV_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_HIDE_HEADER,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  TOGGLE_MULTI_TAB,
  SHOW_MENU
} from '@/store/mutation-types'

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: '',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: '',
    weak: false,
    multiTab: true,
    _antLocale: {},
    showMenu: true
  },
  mutations: {
    [SIDEBAR_TYPE]: (state, type) => {
      state.sideCollapsed = type
      storage.set(SIDEBAR_TYPE, type)
    },
    [TOGGLE_MOBILE_TYPE]: (state, isMobile) => {
      state.isMobile = isMobile
    },
    [TOGGLE_NAV_THEME]: (state, theme) => {
      state.theme = theme
      storage.set(TOGGLE_NAV_THEME, theme)
    },
    [TOGGLE_LAYOUT]: (state, mode) => {
      state.layout = mode
      storage.set(TOGGLE_LAYOUT, mode)
    },
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode
      storage.set(TOGGLE_FIXED_HEADER, mode)
    },
    [TOGGLE_FIXED_SIDEBAR]: (state, mode) => {
      state.fixedSidebar = mode
      storage.set(TOGGLE_FIXED_SIDEBAR, mode)
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type
      storage.set(TOGGLE_CONTENT_WIDTH, type)
    },
    [TOGGLE_HIDE_HEADER]: (state, type) => {
      state.autoHideHeader = type
      storage.set(TOGGLE_HIDE_HEADER, type)
    },
    [TOGGLE_COLOR]: (state, color) => {
      console.log('mutation 改变颜色' + color)
      state.color = color
      storage.set(TOGGLE_COLOR, color)
    },
    [TOGGLE_WEAK]: (state, mode) => {
      console.log('修改weak' + mode)
      state.weak = mode
      storage.set(TOGGLE_WEAK, mode)
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      storage.set(TOGGLE_MULTI_TAB, bool)
      state.multiTab = bool
    },
    [SHOW_MENU]: (state, bool) => {
      console.log(bool)
      state.showMenu = bool
    }
  },
  actions: {
    [TOGGLE_COLOR]: ({ commit }, color) => {
      commit(TOGGLE_COLOR, color)
    },
    [TOGGLE_NAV_THEME]: ({ commit }, theme) => {
      commit(TOGGLE_NAV_THEME, theme)
    },
    [TOGGLE_LAYOUT]: ({ commit }, layout) => {
      commit(TOGGLE_LAYOUT, layout)
    },
    [TOGGLE_WEAK]: ({ commit }, weak) => {
      commit(TOGGLE_WEAK, weak)
    },
    [TOGGLE_CONTENT_WIDTH]: ({ commit }, contentWidth) => {
      commit(TOGGLE_CONTENT_WIDTH, contentWidth)
    },
    [SHOW_MENU]: ({ commit }, showMenu) => {
      commit(SHOW_MENU, showMenu)
    }
  }
}

export default app
