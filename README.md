# miniprogram template

## 安装

1. 克隆项目

2. 进入项目目录 

3. 安装依赖 `yarn install`

4. 微信开发者工具 - 工具 - 构建npm

## 配置

1. 设置根域名和 APPID
 > 路径: 
 > config/development [开发环境]
 > config/production [生产环境]

2. 设置自动化小程序代码的上传、预览
- 微信公众平台-开发-开发设置"后下载代码上传密钥,替换根路径下的 `private.[example].key`
- 配置 IP 白名单