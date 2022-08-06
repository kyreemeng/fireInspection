<template>
	<view>
	<view>
		<cu-custom bgColor="bg-gradual-blue" >
			<block slot="content">登录</block>
		</cu-custom>
	</view>
	<view class="content">
		<view>
			登录页面
			<button class="getbtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">允许获取</button>
		</view>
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
			getLogin(){
				uni.login({
					provider: 'weixin',
					success: (res) => {
						let param = {
							code: res.code,
						}
						console.log('code:',res.code)
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
					wxCode:this.wxCode
				}
				this.$api
					.post('/firecontrol/api/wx/user/phoneLogin', param, null)
					.then(res => {
						uni.hideLoading();
							this.accessToken = res.accessToken
							uni.setStorageSync('accessToken', this.accessToken)
							console.log('存储accessToken：'+this.accessToken )
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
		background: url(https://kyree.me/img/bg_login.png) no-repeat center center;
		background-size: cover;
		background-attachment: fixed;
	
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
