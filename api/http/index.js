/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
const baseUrl = 'http://221.226.18.75:8012';
// const baseUrl = "https://mock.apifox.cn/m1/1182610-0-default";  //测试环境
// const baseUrl = 'https://sorberlin.com'; //正式环境


export default {
	config: {
		baseUrl: baseUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		walletRequest: false,
		tokenRequest: true,
		thirdRequest: false,
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.data = options.data || {}
		options.method = options.method || this.config.method

		if (uni.getStorageSync('accessToken')) {
			this.config.header['accessToken'] = uni.getStorageSync('accessToken')
		} 

		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				// 统一的响应日志记录
				_reslog(response)
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}

				if (statusCode === 200) { //成功
				resolve(response.data.body);
				
					// if (response.data.code == 200||response.data.succeed) {
					// 	resolve(response.data.body);
					// } else {
					// 	uni.showToast({
					// 		title: response.data.message,
					// 		icon: 'none'
					// 	})
					// }

				} else if (statusCode === 401){   //用户信息失效
				// 重新打开登录页面进行登录
				uni.redirectTo({
					url:'/pages/index/index'
				})
					
				}else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (!_config.thirdRequest) {
				_config.url = _config.baseUrl + _config.url
			}




			// if(uni.getStorageSync('web_token')){
			// 	const web_token = uni.getStorageSync('web_token');
			// 	_config.data.web_token = web_token;
			// }

			//请求拦截器
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			// 统一的请求日志记录
			// _reqlog(_config)



			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}

		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},



}


/**
 * 将月份和日期格式化为两位数
 */
function checkDate(date) {
	if (date.length == 1) {
		date = '0' + date;
	}
	return date;
}

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 请求地址：" + req.url)
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 请求地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch (_statusCode) {
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}
