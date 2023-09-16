<template>
	<view class="content">
		<view class="set">
			<text class="title">维保管理</text>
			<view class="box flex justify-between align-center" style="border-radius: 8rpx;">
				<view class="left" @tap="handleProtect()">
					<image src="../../static/image/protect/icon_myprotect.png" mode="aspectFit"></image>
					<view class="name">我的维保任务</view>
				</view>
				<view class="right" >
				</view>
			</view>
		</view>
		<view class="manager">
			<text class="title">维修管理</text>
			<view class="box flex justify-between align-center" style="border-radius: 8rpx 8rpx 0 0;">
				<view class="left" @tap="handleEnsure()">
					<image src="../../static/image/protect/icon_ensure.png" mode="aspectFit"></image>
					<view class="name">待确认报修申请</view>
				</view>
				<view class="right" @tap="handleMyfix()">
					<image src="../../static/image/protect/icon_myfix.png" mode="aspectFit"></image>
					<view class="name">巡检维修任务</view>
				</view>
			</view>
			<view class="box flex justify-between align-center " style="border-radius: 0 0 8rpx 8rpx;margin-top: 0;">
				<view class="left" @tap="handleNormalRepairTasks()">
					<image src="../../static/image/protect/icon_normalRepairDetail.png" mode="aspectFit"></image>
					<view class="name">普通维修任务</view>
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
		methods:{
			handleProtect(){
				uni.navigateTo({
					url:'protectTasks'
				})
			},
			handleEnsure(){
				uni.navigateTo({
					url:'fixEnsure'
				})
			},
			handleMyfix(){
				uni.navigateTo({
					url:'fixList'
				})
			},
			handleNormalRepairTasks(){
				uni.navigateTo({
					url:'normalRepairTasks'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: url(http://221.226.18.75:8012/firecontrol/files/user/20230107/1673101241984/UX1QEzbZEswda58f00f502d8fcea4dd2a2ee5a3fc68d.png) no-repeat center center;
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
