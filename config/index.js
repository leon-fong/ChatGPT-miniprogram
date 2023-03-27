import config from './env.js'; // 测试环境
/**
 * 环境
 */
export const env = config.env;
/**
 * 日志状态, 生产环境禁止打印日志
 */
export const log = env === 'production' ? false : true;
/**
 * 版本号
 */
export const version = '1.0.0';
/**
 * AppId
 */
export const appId = config.appId;
/**
 * 根域名
 */
export const baseUrl = config.baseUrl;
/**
 * 分享图片
 */
export const shareImage = config.shareImage;

export default {
  env,
  log,
  version,
  appId,
  baseUrl
};
