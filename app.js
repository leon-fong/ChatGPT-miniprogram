// app.js
import { Home } from './utils/router';
import { reLaunch } from './utils/util';

App({
  onLaunch() {
    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    const updateManager = wx.getUpdateManager();
    // 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: () => {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        },
      });
    });
  },

  /**
   * @method onPageNotFound 页面不存在监听函数
   */
  onPageNotFound() {
    reLaunch({
      url: Home.path,
    });
  }
});
