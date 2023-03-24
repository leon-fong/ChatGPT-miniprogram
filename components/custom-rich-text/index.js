// components/custom-rich-text/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 富文本
    content: {
      type: String,
      value: '',
    },
    // markdown格式
    isMarkdown: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    containerStyle: {}, // 设置容器的样式
    tagStyle: {}, // 设置标签的默认样式
    copyLink: true, // 是否允许外部链接被点击时自动复制
    domain: '', // 主域名（用于链接拼接）
    errorImg: '', // 图片出错时的占位图链接
    lazyLoad: true, // 是否开启图片懒加载
    loadingImg: '', // 图片加载过程中的占位图链接
    pauseVideo: true, // 是否在播放一个视频时自动暂停其他视频
    previewImg: true, // 是否允许图片被点击时自动预览
    scrollTable: true, // 是否给每个表格添加一个滚动层使其能单独横向滚动
    selectable: true, // 是否开启文本长按复制
    setTitle: false, // 是否将 title 标签的内容设置到页面标题
    showImgMenu: true, // 是否允许图片被长按时显示菜单
    useAnchor: false, // 是否使用锚点链接
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method initHtmlStyle 初始化html样式
     */
    initHtmlStyle() {
      this.setData({
        containerStyle: `
          padding: 0 40rpx;
          word-break: break-word;
          line-height: 1.75;
          font-size: 28rpx;
          font-weight: 400;
          color: #031c24;
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
					background-color: #FFFFFF;
					`,
        tagStyle: {
          table: `
            display: inline-block !important;
            font-size: 24rpx;
            width: auto;
            max-width: 100%;
            overflow: auto;
            border: 2rpx solid #f6f6f6;
          `,
          thead: `
            background: #f6f6f6;
            color: #000;
            text-align: left;
          `,
          th: `
            padding: 24rpx 14rpx;
            line-height: 48rpx;  
          `,
          td: `
            min-width: 120rpx;
            padding: 24rpx 14rpx;
            line-height: 48rpx;  
          `,
          blockquote: `
            color: #666;
            padding: 2rpx 46rpx;
            margin: 44rpx 0;
            border-left: 8rpx solid #cbcbcb;
            background-color: #f8f8f8;
          `,
          ul: `
            padding-left: 56rpx;
          `,
          ol: `
            padding-left: 56rpx;
          `,
          li: `
            padding-left: 12rpx;
            margin-bottom: 10rpx;
            list-style: inherit;
						color: #031c24;
						line-height: 40rpx;
          `,
          h1: `
            font-size: 48rpxpx;
            margin-bottom: 10rpx;    
            line-height: 1.5;
            margin-top: 70rpx;
            padding-bottom: 10rpx;`,
          h2: `
            padding-bottom: 12px;
            margin-top: 70rpx;
            margin-bottom: 20px;
            border-bottom: 1px solid #ececec; 
            font-size: 20px;    
						line-height: 1.5;
						`,
          h3: `
            font-size: 36rpx;
            line-height: 1.5;
            margin-top: 70rpx;
            margin-bottom: 20rpx;
          `,
          h4: `
            margin-top: 70rpx;
            margin-bottom: 20rpx;
            padding-bottom: 10rpx;
            line-height: 1.5;
            font-size: 40rpx;
          `,
          h5: `
            line-height: 1.5;
            margin-top: 70rpx;
            margin-bottom: 20rpx;
            padding-bottom: 10rpx;
            font-size: 40rpx;
          `,
          h6: `
            margin-top: 10rpx;
            line-height: 1.5;
            margin-bottom: 20rpx;
            padding-bottom: 10rpx;
            font-size: 40rpx;
          `,
          p: `
            line-height: inherit;
            margin-top: 44rpx;
            margin-bottom: 44rpx;
          `,
          code: `
            font-size: 24rpx;
            padding: 30rpx 24rpx;
            margin: 0;
            word-break: normal;
            display: block;
						overflow-x: auto;
          `,
          strong: `
            font-weight: bolder;
          `,
          video: `
            width: 100%;
          `,
          view: `
            line-height: normal;
          `,
          text: `
            line-height: normal;
          `,
        },
      });
    },
  },
  lifetimes: {
    attached() {
      this.initHtmlStyle();
    },
  },
});
