import { Home } from '~/utils/router';

/**
 * @method getItemSync 缓存读取
 * @param {*} key
 */
export const getItemSync = (key) => {
  try {
    return wx.getStorageSync(key);
  } catch (err) {
    console.error('wx.getStorageSync(key)', err);
  }
};

/**
 * @method setItemSync 缓存存储
 * @param {*} key
 * @param {*} value
 */
export const setItemSync = (key, value) => {
  try {
    wx.setStorageSync(key, value);
  } catch (err) {
    console.error('wx.setStorageSync(key, value)', err);
  }
};

/**
 * @method deleteItemSync 缓存删除
 * @param {*} key
 */
export const deleteItemSync = (key) => {
  try {
    return wx.removeStorageSync(key);
  } catch (err) {
    console.error('wx.removeStorageSync(key)', err);
  }
};

/**
 * @method navigateTo 封装navigateTo请求
 * @param {*} { url, events }
 */
export const navigateTo = ({ url, events = {} }) => {
  return new Promise((resolve) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateTo({
        url,
        events,
        success: resolve,
        fail: () => {
          redirectTo({ url, events });
        },
      });

      // 无网络
    } else {
			wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
    }
  });
};

/**
 * @method redirectTo 封装redirectTo请求
 * @param {*} { url, events }
 */
export const redirectTo = ({ url, events = {} }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.redirectTo({
        url,
        events,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
    }
  });
};

/**
 * @method navigateBack 封装navigateBack请求
 * @param {*} delta
 */
export const navigateBack = (delta = 1) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateBack({
        delta,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
    }
  });
};

/**
 * @method switchTab 封装switchTab请求
 * @param {*} { url }
 */
export const switchTab = ({ url }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.switchTab({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
    }
  });
};

/**
 * @method reLaunch 封装reLaunch请求
 * @param {*} { url }
 */
export const reLaunch = ({ url }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.reLaunch({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
    }
  });
};

/**
 * @method getCurrentPageInfo 获取当前页面栈中指定路径的页面信息
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageInfo = (path) => {
  // 存在指定路径， 返回指定路径页面详情
  if (path) {
    // 反转数组，返回最后一次出现路由
    return getCurrentPages()
      .reverse()
      .find((item) => {
        return `/${item.route}` === path;
      });

    // 反转数组,返回当前页面详情
  } else {
    return getCurrentPages().reverse()[0];
  }
};

/**
 * @method getCurrentPageIndex 获取当前页面栈中指定路径的下标
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageIndex = (path) => {
  return getCurrentPages()
    .reverse()
    .findIndex((item) => {
      return `/${item.route}` === path;
    });
};

/**
 * @method checkNetwork 检查网络
 */
export const checkNetwork = () => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
		const { isConnected } = globalData;
		if(isConnected){
			resolve()
		}else{
			wx.showToast({
				icon:'none',
				title: '似乎已经断开了与互联网的连接',
			})
			reject('似乎已经断开了与互联网的连接');
		}
  });
};

/**
 * @method getNetworkType 获取网络类型
 */
export const getNetworkType = () => {
  return new Promise((resolve) => {
    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        resolve(networkType);
      },
    });
  });
};

/**
 * @method logout 退出登录
 */
export const logout = () => {
  const { globalData } = getApp();
  globalData.userInfo = null;
  deleteItemSync('userInfo');
  reLaunch({ url: Home.path });
};

/**
 * @method shareImageFormat 图片格式处理
 * @param {*} params
 * @returns
 */
export const shareImageFormat = (params) => {
  const { systemInfo } = getApp();
  const { system } = systemInfo;
  const systemDetail = system.split(' ');
  const type = systemDetail[0];
  const version = systemDetail[1];
  // ios系统14版本以下，小程序分享的图片不支持webp格式，进行转换
  if (type.toLowerCase() === 'ios' && parseInt(version) <= 14) {
    return params.replace('format,webp', 'format,jpg');
  } else {
    return params;
  }
};
