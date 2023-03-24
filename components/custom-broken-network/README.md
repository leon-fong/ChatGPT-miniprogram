# 介绍

通常用于断网提醒，当前页面接口请求失败或者超时后，展示当前组件，通过按钮点击触发回调处理业务逻辑，可自行调整 UI 样式。

### Props

| 参数           | 说明                 | 类型    | 默认值                   |
| -------------- | -------------------- | ------- | ------------------------ |
| message        | 内容                 | string  | 似乎已断开与互联网的连接 |
| buttonText     | 按钮文案             | string  | 刷新                     |
| verticalCenter | 基于屏幕垂直居中布局 | boolean | false                    |

### Events

| 事件名称           | 说明           |
| ------------------ | -------------- |
| bind:handleRefresh | 点击按钮时触发 |

### 外部样式类

| 类名                                   | 说明           |
| -------------------------------------- | -------------- |
| external-custom-broken-network         | 根结点样式类   |
| external-custom-broken-network_message | 内容样式类     |
| external-custom-broken-network_refresh | 按钮容器样式类 |
