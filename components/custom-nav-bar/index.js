// components/custom-navbar/custom-navbar.js
import { navigateBack, reLaunch } from '~/utils/util';
import { Home } from '~/utils/router';

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示中间文案
    title: {
      type: String,
      value: '',
    },
    // 是否开启点击滚动到顶部, 仅支持页面滚动
    backTop: {
      type: Boolean,
      value: false,
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      value: true,
    },
    // 固定在顶部时是否开启占位
    placeholder: {
      type: Boolean,
      value: false,
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      value: false,
    },
    // 根节点自定义样式
    customStyle: {
      type: String,
      value: 'background: rgba(255, 255, 255, 0)',
    },
    // 是否显示左侧首页图标
    showHome: {
      type: Boolean,
      value: false,
    },
    //是否显示左侧返回图标
    showBack: {
      type: Boolean,
      value: false,
    },
    //是否显示左侧关闭图标
    showClose: {
      type: Boolean,
      value: false,
    },
    // 是否开启左侧插槽
    showSlot: {
      type: Boolean,
      value: false,
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 100,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleBackTop 回到顶部
     */
    handleBackTop(e) {
      const { backTop } = this.data;
      // 将页面滚动到目标位置
      backTop &&
        wx.pageScrollTo({
          scrollTop: 0,
        });
      this.triggerEvent('handleBackTop', e);
    },

    /**
     * @method handleNavigateBack 返回上一页
     */
    handleNavigateBack(e) {
      navigateBack();
      this.triggerEvent('handleNavigateBack', e);
    },

    /**
     * @method handleReLaunchHome 返回首页, 通常配置为tabbar的第一个页面
     */
    handleReLaunchHome(e) {
      reLaunch({ url: Home.path });
      this.triggerEvent('handleReLaunchHome', e);
    },
  },
  lifetimes: {
    attached() {
      // 过滤路由列表
      const tabbarRoute = [Home.path];
      // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
      const pages = getCurrentPages();
      // 如果当前页面栈只有一层
      if (pages.length === 1) {
        const route = pages[0].route;
        // 不是tabbar页面则显示返回首页
        if (!tabbarRoute.includes('/' + route)) {
          this.setData({
            showHome: true,
            showBack: false,
          });
        }
      }
    },
  },
});
