<template>
	<view class="content">
		<view class="set">
			<text class="title">巡检设置</text>
			<view class="box flex justify-between align-center">
				<view class="left" @tap="handleScan()">
					<image src="../../static/image/inspects/icon_scan.png" mode="aspectFit"></image>
					<view class="name">扫码查询</view>
				</view>
				<view class="right" @tap="handleTags()">
					<image src="../../static/image/inspects/icon_blind.png" mode="aspectFit"></image>
					<view class="name">标签绑定</view>
				</view>
			</view>
		</view>
		<view class="manager">
			<text class="title">巡检管理</text>
			<view class="box flex justify-between align-center">
				<view class="left" @tap="handleTasks()">
					<image src="../../static/image/inspects/icon_tasks.png" mode="aspectFit"></image>
					<view class="name">我的巡检任务</view>
				</view>
				<view class="right" @tap="handleFixApply()">
					<image src="../../static/image/inspects/icon_fix.png" mode="aspectFit"></image>
					<view class="name">我的报修申请</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		onReady() {
			
		},
		onShow() {
			
		},
		methods:{
			handleScan(){
				
				
				uni.scanCode({
			onlyFromCamera: true,
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.showToast({
							title: '扫码成功'
						});
						setTimeout(() => {
							uni.navigateTo({
								url:'point?pointId='+res.result	
							})
						}, "500");
					
					}
				});
			
				
			},
			handleTags(){
				uni.navigateTo({
					url:'tags'
				})
			},
			handleTasks(){
				uni.navigateTo({
					url:'tasks'
				})
			},
			handleTasks(){
				uni.navigateTo({
					url:'tasks'
				})
			},
			handleFixApply(){
				uni.navigateTo({
					url:'fixApply'
				})
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background: url(https://kyree.me/img/bg_other.png) no-repeat center center;
		background-size: cover;
		background-attachment: fixed;
	
	}
.content{
	width: 100%;
	padding: 0 32rpx;
	.set{
		margin-top: 54rpx;
	}
	.manager{
		margin-top: 56rpx;
	}
	.title{
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		line-height: 45rpx;
	}
	.box{
		margin-top: 26rpx;
		width: 100%;
		padding: 30rpx 74rpx 20rpx 74rpx;
		background: #fff;
		border-radius: 8rpx;
		.left,.right{
			width: 198rpx;
			text-align: center;
		}
		image{
			width: 88rpx;
			height: 88rpx;
		}
		
		.name{
			margin-top: 18rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
		}
	}
	
}
</style>
