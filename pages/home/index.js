// pages/home/index.js
import {
	reLaunch,
	setItemSync
} from '~/utils/util';
import {
	Chat
} from '~/utils/router';
Page({
	toChat() {
		setItemSync('senior', true)
		reLaunch({
			url: Chat.path,
		})
	},
});