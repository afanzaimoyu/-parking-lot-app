import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
	const data = {
		username,
		password,
		code,
		uuid
	}
	return request({
		'url': '/api/wechat/login',
		headers: {
			isToken: false
		},
		'method': 'post',
		'data': data
	})
}

// 注册方法
export function register(data) {
	return request({
		url: '/api/wechat/register',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		'url': '/api/wechat/getInfo',
		headers: {
			isToken: true
		},
		'method': 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/api/wechat/logout',
		'method': 'post'
	})
}

// 获取验证码
export function getCodeImg() {
	return request({
		'url': '/api/wechat/captchaImage',
		headers: {
			isToken: false
		},
		method: 'get',
		timeout: 20000
	})
}