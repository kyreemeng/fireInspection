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
		methods: {

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
