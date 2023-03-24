import development from './development.js'; // 开发环境
import production from './production.js'; // 生产环境

const configInfo = {
	development,
	production
};

const NODE_ENV = 'development';
// const NODE_ENV = 'production';
const config = configInfo['development'];

export default config;