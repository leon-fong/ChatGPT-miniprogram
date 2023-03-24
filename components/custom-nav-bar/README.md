# 介绍

通常用于自定义导航栏，为页面提供导航功能，常用于页面顶部，可通过插槽来实现每个页面不同的导航栏样式及功能，使用前请先查看当前组件已经提供的功能在加以调整和修改。

### Props

| 参数             | 说明                                   | 类型    | 默认值 |
| ---------------- | -------------------------------------- | ------- | ------ |
| title            | 标题                                   | string  | -      |
| backTop          | 是否开启点击滚动到顶部, 仅支持页面滚动 | boolean | false  |
| fixed            | 是否固定在顶部                         | boolean | true   |
| placeholder      | 固定在顶部时是否开启占位               | boolean | false  |
| border           | 是否显示下边框                         | boolean | false  |
| customStyle      | 根节点自定义样式                       | string  | -      |
| showHome         | 是否显示左侧首页图标                   | boolean | false  |
| showBack         | 是否显示左侧返回图标                   | boolean | false  |
| showClose        | 是否显示左侧关闭图标                   | boolean | false  |
| showSlot         | 是否开启左侧插槽                       | boolean | false  |
| zIndex           | 元素 z-index                           | number  | 100    |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度）     | boolean | true   |

### Slots

| 名称  | 说明           |
| ----- | -------------- |
| title | 自定义标题内容 |

### Events

| 事件名                  | 说明             | 回调参数     |
| ----------------------- | ---------------- | ------------ |
| bind:handleNavigateBack | 点击返回触发     | event: Event |
| bind:handleReLaunchHome | 点击返回首页触发 | event: Event |
| bind:handleBackTop      | 点击导航栏触发   | event: Event |
