<template>
	<view>
		<view>
		</view>
		<view class="content">
			<image class="avatar" :src="avatarUrl"></image>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" v-if="!haveAva">
				① 请授权使用微信头像
			</button> 
			<button class="getbtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-else>② 请授权微信登录</button>

		</view>
	</view>
</template>

<script>
	const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

	export default {
		data() {
			return {
				haveAva:false,
				avatarUrl: defaultAvatarUrl,
			}
		},
		onLoad() {
				if(uni.getStorageSync('avatarUrl')){
					this.haveAva = true;
					this.avatarUrl = uni.getStorageSync('avatarUrl')
				}
		},
		onReady() {
			this.getLogin()
		},
		methods: {
			  onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl;
				uni.setStorageSync('avatarUrl', e.detail.avatarUrl)
				this.haveAva = true;
				uni.showToast({
					title: '头像授权成功',
					icon: 'none'
				})
			  },
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
		overflow: hidden;
	}

	.avatar-wrapper,.getbtn {
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
