// components/prompt-item/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		prompt: {
			type: Object,
			default: {}
		},
		checked: {
			type: String,
			default: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTap: function () {
			this.triggerEvent('change', {
				checked: this.data.prompt
			}, {})
		}
	}
})