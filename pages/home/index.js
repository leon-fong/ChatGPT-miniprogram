// pages/chat.js
import {
	baseUrl,
	OPEN_API_KEY
} from '~/config/index';
let requestTask = null
let currentContent = ''
const defaultPrompt = {
	title: 'default',
	name: 'ChatGPT',
	content: '',
	description: '一个 AI 语言模型，可以回答问题的人工智能程序。\n\n 【点击顶部可以切换不同角色哦～】',
	checked: true
}
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		inputValue: '',
		fixedTop: 34,
		contentHeight: 188,
		currentItem: 'bottom',
		messageList: [],
		loading: false,
		thinking: false,
		currentPrompt: defaultPrompt,
	},
	handleSwitchRole() {
		wx.navigateTo({
			url: '/pages/prompt/index',
		})
	},
	handleToSettings() {
		wx.navigateTo({
			url: '/pages/settings/index',
		})
	},
	handleClear() {
		if (this.data.loading || this.data.thinking) return
		this.setData({
			messageList: [],
		})
	},
	handleValueChange(e) {
		this.setData({
			inputValue: e.detail.value
		})
	},
	handleKeyboardHeightChange(e) {
		const isExpand = e.detail.height > 0
		const query = wx.createSelectorQuery()
		query.select('#footer').boundingClientRect((rect) => {
			const fixedTop = e.detail.height > 0 ? e.detail.height : 34
			if (isExpand) {
				this.setData({
					fixedTop,
					currentItem: 'bottom',
					contentHeight: rect.height + fixedTop + 104
				})
			} else {
				this.setData({
					fixedTop,
					contentHeight: rect.height + fixedTop + 104
				})
			}

		}).exec()
	},
	async handleSendClick() {
		const userInput = this.data.inputValue.trim()
		if (userInput.trim() === '') return
		const messageList = this.data.messageList
		const timestamp = Date.now();
		const newMessage = {
			id: timestamp,
			role: 'user',
			content: userInput
		}
		this.setData({
			messageList: messageList.concat(newMessage),
			inputValue: '',
			loading: true,
			thinking: true
		})
		this.requestWithMessage(userInput)
	},
	requestWithMessage(content) {
		let messages = [{
			role: 'user',
			content
		}]
		const currentPrompt = this.data.currentPrompt
		if (currentPrompt.content) {
			messages.unshift({
				role: 'system',
				content: currentPrompt.content
			})
		}
		requestTask = wx.request({
			url: `${baseUrl}/v1/chat/completions`,
			data: {
				model: "gpt-3.5-turbo",
				messages
			},
			method: 'POST',
			responseType: 'text',
			header: {
				'content-type': 'application/json',
				Authorization: `Bearer ${OPEN_API_KEY}`,
			},
			success: async (res) => {
				const result = res.data?.choices[0].message.content || "";
				if (result) {
					const timestamp = Date.now();
					const index = this.data.messageList.length
					const newMessageList = `messageList[${index}]`
					const contentCharArr = result.trim().split("")
					const content_key = `messageList[${index}].content`
					const finished_key = `messageList[${index}].finished`
					this.setData({
						thinking: false,
						[newMessageList]: {
							id: timestamp,
							role: 'assistant',
							finished: false
						}
					})
					currentContent = ''
					this.show_text(0, content_key, finished_key, contentCharArr);
				} else {
					this.setData({
						thinking: false,
						loading: false
					})
					wx.showToast({
						icon: 'none',
						title: '系统繁忙，请重试',
					})
				}
			},
			fail: (err) => {
				if (!baseUrl) {
					console.error('尚未配置有效的 baseUrl', baseUrl)
				}

				wx.showToast({
					icon: 'none',
					title: `服务请求错误`,
				})
				this.setData({
					thinking: false,
					loading: false
				})
			}
		});

	},
	show_text(key = 0, content_key, finished_key, value) {
		if (key >= value.length) {
			this.setData({
				loading: false,
				[finished_key]: true
			})
			wx.vibrateShort()
			return;
		}
		currentContent = currentContent + value[key]
		this.setData({
			[content_key]: currentContent,
		})
		setTimeout(() => {
			this.show_text(key + 1, content_key, finished_key, value);
		}, 50);
	},
	handleCancel() {
		if (!requestTask) return
		requestTask.abort()
		wx.showToast({
			icon: 'none',
			title: '已取消',
		})
	},
	onShow() {
		wx.hideHomeButton()
		const prompt = wx.getStorageSync('prompt')
		if (!Object.keys(prompt).length) return
		this.setData({
			currentPrompt: prompt
		})
		this.handleClear()
	}
})