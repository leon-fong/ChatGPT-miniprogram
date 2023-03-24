// components/custom-broken-network/index.js
const { systemInfo } = getApp();

Component({
  externalClasses: [
    'external-custom-broken-network',
    'external-custom-broken-network_message',
    'external-custom-broken-network_refresh',
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: String,
      value: '似乎已断开与互联网的连接',
    },
    buttonText: {
      type: String,
      value: '刷新',
    },
    verticalCenter: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo, // 设备信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method handleRefresh 刷新
     */
    handleRefresh() {
      this.triggerEvent('handleRefresh');
    },
  },
});
