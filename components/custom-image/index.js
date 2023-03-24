// components/custom-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'aspectFill',
    },
    webp: {
      type: Boolean,
      value: true,
    },
    width: {
      optionalTypes: [String, Number],
      value: '100%',
    },
    height: {
      optionalTypes: [String, Number],
      value: '100%',
    },
    radius: {
      optionalTypes: [String, Number],
      value: 0,
    },
    round: Boolean,
    lazyLoad: Boolean,
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    showError: {
      type: Boolean,
      value: true,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
    customStyle: {
      type: String,
      value: '',
    },
  },

  observers: {
    src() {
      this.setData({
        error: false,
        loading: true,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    error: false,
    loading: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(e) {
      this.setData({
        loading: false,
      });
      this.triggerEvent('load', e);
    },
    onError(e) {
      this.setData({
        loading: false,
        error: true,
      });
      this.triggerEvent('error', e);
      console.error('========================👇 custom-image加载错误 👇========================\n\n', e, '\n\n');
    },
    onClick(e) {
      this.triggerEvent('click', e);
    },
  },
});
