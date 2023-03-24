import { logout } from '~/utils/util';
import { version } from '~/config/index';

/**
 * 按照下述例子继续封装项目中需要的上传功能等等，封装两种 一种用于携带用户信息，一种用于原生
 */

/**
 * @method _request 封装业务请求
 * @param {*} { method, url, data }
 */
const _request = async ({ method, url, data }) => {
  const { globalData } = getApp();
  const { isConnected } = globalData;
  const header = {
    version,
  };
  return new Promise((resolve, reject) => {
    if (isConnected) {
      // 微信原生请求
      wx.request({
        url,
        data,
        method,
        header,
        success: async (value) => {
          const { data, statusCode } = value;
          if (statusCode === 200) {
            const { code, msg } = data;
            switch (code) {
              // 退出登录
              case 2128:
                logout();
                reject(msg);
                break;
              default:
                resolve(data);
                break;
            }
          } else {
            reject(`服务请求错误，状态码：${statusCode}`);
          }
        },
        fail(reason) {
          reject(reason);
        },
      });
    } else {
      reject('无网状态');
    }
  });
};

/**
 * @method _nativeRequest 封装原生请求
 * @param {*} { method, url, data }
 */
const _nativeRequest = async ({ method, url, data }) => {
  const { globalData } = getApp();
  const { isConnected } = globalData;
  return new Promise((resolve, reject) => {
    if (isConnected) {
      // 微信原生请求
      wx.request({
        url,
        data,
        method,
        success: async (value) => {
          const { data, statusCode } = value;
          if (statusCode === 200) {
            resolve(data);
          } else {
            reject(`服务请求错误，状态码：${statusCode}`);
          }
        },
        fail(reason) {
          reject(reason);
        },
      });
    } else {
      reject('无网状态');
    }
  });
};

/**
 * @method post 业务post请求
 * @param {*} { url, data }
 */
export const post = ({ url, data }) => _request({ method: 'POST', url, data });

/**
 * @method nativePost 原生post请求
 * @param {*} { url, data }
 */
export const nativePost = ({ url, data }) => _nativeRequest({ method: 'POST', url, data });

/**
 * @method nativePost 原生get请求
 * @param {*} { url, data }
 */
export const nativeGet = ({ url, data }) => _nativeRequest({ method: 'GET', url, data });
