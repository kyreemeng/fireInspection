<template>
	<view>
		<view>
		</view>
		<view class="content">
			<open-data class="avatar" type="userAvatarUrl"></open-data>
			<button class="getbtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信登录</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		onReady() {
			this.getLogin()
		},
		methods: {
			getLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						let param = {
							code: res.code,
						}
						console.log('code:', res.code)
						this.wxCode = res.code
					},
					fail: (res) => {
						reject();
						uni.hideLoading();
					}
				})

			},
			getPhoneNumber: function(e) {
				console.log(e.detail.errMsg);
				this.modalName = null;
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					console.log('用户同意提供手机号');
					this.encryptedData = e.detail.encryptedData;
					this.iv = e.detail.iv;
					this.getinfo();

				} else {
					uni.showToast({
						title: '您拒绝了授权获取您的手机号码',
						icon: 'none'
					})

				}

			},
			getinfo: function() {
				uni.showLoading();
				let param = {
					encryptedData: this.encryptedData,
					iv: this.iv,
					wxCode: this.wxCode
				}
				this.$api
					.post('/firecontrol/api/wx/user/phoneLogin', param, null)
					.then(res => {
						uni.hideLoading();
						this.accessToken = res.accessToken
						uni.setStorageSync('accessToken', this.accessToken)
						console.log('存储accessToken：' + this.accessToken)
						
						uni.showToast({
							icon: "none",
							title: "登录成功"
						})
						console.log("登录成功")
						setTimeout(()=> {
							uni.reLaunch({
								url: '/pages/my/index'
							})
						}, 500);
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});

			},

		}
	}
</script>

<style>
	page {
		background: url(http://221.226.18.75:8012/firecontrol/files/user/20230107/1673101188551/IzRwtFELX7Tf6d45067c9b2c3c0aabbb49aa3527f419.png) no-repeat center center;
		background-size: cover;
		background-attachment: fixed;

	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		margin-top: 154rpx;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.getbtn {
		margin-top: 50rpx;
		width: 626rpx;
		height: 100rpx;
		background: #4B87FC;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 100rpx;
	}
</style>
