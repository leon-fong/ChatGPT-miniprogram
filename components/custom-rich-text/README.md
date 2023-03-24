# 介绍

基于 [mp-html](https://github.com/jin-yufeng/mp-html.git)封装，目前支持识别富文本以及 markdown 格式内容如需其他插件功能，可查看 [mp-html](https://github.com/jin-yufeng/mp-html.git) 文档，通过配置打包后将生成的 mp-weixin 文件夹放置到 components 文件件中覆盖原有的 mp-weixin 文件夹，二次封装后仅暴露出少量属性，如需动态控制功能可自行调整组件属性。

### 容器样式

可通过组件内 containerStyle 属性设置富文本容器样式

### 富文本样式

可通过组件内 tagStyle 属性设置富文本样式

### markdown 样式

暂不支持修改，通过 marked 解析 markdown 文本，部分 css 摘选自 github-markdown-css，依赖 highlight 插件，实现 markdown 中代码块的高亮效果

### Props

| 参数       | 说明          | 类型                           | 默认值 |
| ---------- | ------------- | ------------------------------ | ------ |
| content    | 内容          | 富文本或 markdown 格式的字符串 | -      |
| isMarkdown | markdown 格式 | boolean                        | true   |
