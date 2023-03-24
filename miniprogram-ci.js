import dayjs from 'dayjs';
import ci from 'miniprogram-ci';
import { version, appId, env } from './config/index.js';
import path from 'path';

(async () => {
  const project = new ci.Project({
    appid: appId, // 小程序AppID
    type: 'miniProgram',
    // projectPath: './', // 打包文件路径
    projectPath: path.resolve('./'), // 打包文件路径
    privateKeyPath: `private.${appId}.key`, // 秘钥路径，根据appId放置多个
    ignores: ['node_modules/**/*'],
  });

  // 在有需要的时候构建npm
  const warning = await ci.packNpm(project, {
    ignores: [],
    reporter: (infos) => {
      console.log('========================👇 构建回调信息 👇========================\n\n', infos, '\n\n');
    },
  });

  const uploadResult = await ci.upload({
    // 项目对象
    project,
    // 版本号
    version,
    // 自定义备注
    desc: `体验版本更新于${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
    // #编译设置
    setting: {
      es6: true,
      es7: true,
      minify: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
    },
    // 进度更新监听函数
    onProgressUpdate: console.log,
  });

  const previewResult = await ci.preview({
    project,
    desc: `预览版本更新于${dayjs().format('YYYY-MM-DD HH:mm:ss')}`, // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true,
      es7: true,
      minify: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
    },
    // qrcodeFormat: 'image',
    // qrcodeOutputDest: '/path/to/qrcode/file/destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  });
  console.log('========================👇 ci.packNpm 👇========================\n\n', warning, '\n\n');
  console.log('========================👇 ci.upload 👇========================\n\n', uploadResult, '\n\n');
  console.log('========================👇 ci.preview 👇========================\n\n', previewResult, '\n\n');
  console.log('========================👇 Env 👇========================\n\n', env, '\n\n');
  console.log('========================👇 AppId 👇========================\n\n', appId, '\n\n');
  console.log('========================👇 Version 👇========================\n\n', version, '\n\n');
})();
