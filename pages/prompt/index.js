// pages/prompt/prompt.js
import {
	addPromptList
} from "~/api/prompts";
import {
	Loading
} from "~/components/custom-loading/loading";

Page({
	data: {
		checkedPrompt: "default",
		promptList: [],
	},

	handleClick(e) {
		const {
			checked
		} = e.detail;
		if (!Object.keys(e.detail).length) return;
		if (checked.title === this.checkedPrompt) return;
		wx.setStorageSync("prompt", checked);
		this.setData({
			checkedPrompt: checked.title,
		});
		wx.navigateBack();
	},
	getPromptList() {
		return new Promise(async (resolve) => {
			try {
				const response = await addPromptList();
				resolve(response);
			} catch (error) {
				Loading.clear();
				console.error(
					"========================👇 请求错误 👇========================\n\n",
					error,
					"\n\n"
				);
			}
		});
	},
	async initData() {
		Loading.show();
		const promptList = await this.getPromptList();
		this.setData({
				promptList,
			},
			() => {
				Loading.clear();
			}
		);
	},
	onLoad(options) {
		this.initData();
	},
	onShow() {
		const prompt = wx.getStorageSync("prompt");
		if (!prompt) return;
		this.setData({
			checkedPrompt: prompt.title,
		});
	},
});