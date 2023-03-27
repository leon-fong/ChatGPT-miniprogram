// pages/settings/settings.js
Page({
	handleCellGroupClick(e) {
		const cell = e.target.dataset.cell
		switch (cell) {
			case 'feedback':
				wx.showToast({
					icon: 'none',
					title: '你点击了“我要吐槽”',
				})
				break;
			case 'reward':
				wx.showToast({
					icon: 'none',
					title: '你点击了“打赏咖啡”',
				})
				break;
			case 'github':
				wx.setClipboardData({
					data: 'https://github.com/leon-fong/chatgpt-miniprogram',
					success() {
						wx.showToast({
							title: '已复制',
						})
					}
				})
				break;
		}
	},

})