<template>
	<view class="tasks-content">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="list" v-show="TabCur==0">
			<view class="item" v-for="item in 3" :key="item">
				<view class="date">
					2022-05-19
				</view>
				<view class="title flex justify-between align-center" @tap="handlePoint()">
					<text>P-001-001 主入口东边走廊1号巡检点</text>
				</view>
				<view class="info" @tap="handlePoint()">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">待检查设备数量</text>
						<text class="value">20</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">已检查设备数量</text>
						<text class="value">2</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list tab1" v-show="TabCur==1">
			<view class="item" v-for="item in 3" :key="item">
				<view class="date">
					2022-05-19
				</view>
				<view class="title flex justify-between align-center" @tap="handlePoint()">
					<text>P-001-001 主入口东边走廊1号巡检点</text>
				</view>
				<view class="info" @tap="handlePoint()">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">待检查设备数量</text>
						<text class="value">20</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">已检查设备数量</text>
						<text class="value">2</text>
					</view>
				</view>
				<image  src="../../static/image/inspects/icon_finished.png" mode="aspectFit"></image>
<!-- 				<image  src="../../static/image/inspects/icon_unfinished.png" mode="aspectFit"></image>
 -->			</view>
		</view>
		<view class="bottom">
			<view class="btn" @tap="handleScan()">
				扫码巡检
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabList: ['进行中','已结束'],
				TabCur: 0,
				scrollLeft: 0,
			};
		},
		methods:{
			tabSelect(e) {
				console.log(this.TabList[e.currentTarget.dataset.id])
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			handleScan(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			handlePoint(){
				uni.navigateTo({
					url:'tasksPoint'
				})
			}
		}
	}
</script>

<style lang="scss">
.tasks-content{
	.list{
		width: 100%;
		margin-top: 120rpx;
		padding: 0 32rpx 176rpx 32rpx;
		.item{
			width: 100%;
			margin-top: 54rpx;
			border-radius: 8rpx;
			.date{
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
			}
			.title{
				width: 100%;
				height: 80rpx;
				margin-top: 22rpx;
				padding: 0 28rpx;
				background: #FFFFFF;
				border-bottom: 1rpx solid  #E5E5E5;
			}
			.info{
				width: 100%;
				padding: 24rpx 28rpx;
				background: #FFFFFF;
				font-size: 28rpx;
				font-weight: 400;
				color: #858B9C;
				line-height: 54rpx;
				.value{
					color: #333333;
				}
			}
		}
	}
	.tab1{
		.item{
			position: relative;
			image{
				width: 140rpx;
				height: 140rpx;
				position: absolute;
				left: 50%; 
				top: 60%;
				transform: translate(-50%, -50%);
			}
		}	
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 174rpx;
		z-index: 999;
		padding: 20rpx 30rpx;
		background: #fff;
		box-shadow: 0 -5rpx 9rpx 0 rgba(239, 243, 255, 1);
		.btn{
			width: 100%;
			height: 100rpx;
			text-align: center;
			background: #4B87FC;
			border-radius: 8rpx;
			font-size: 36rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 100rpx;
		}
	}
}
</style>
