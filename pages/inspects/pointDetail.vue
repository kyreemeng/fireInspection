<template>
	<view class="point-list">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="list0" v-show="TabCur==0">
			<view class="item flex justify-between align-center">
				<view class="left"><text>设备名称</text></view>
				<view class="right"><text>灭火器001</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>设备类型</text></view>
				<view class="right"><text>消防设备</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>楼宇名称</text></view>
				<view class="right"><text>教学楼1号</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>具体位置</text></view>
				<view class="right"><text>走廊东门入口</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>品牌</text></view>
				<view class="right"><text>品牌名称</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>规格</text></view>
				<view class="right"><text>规格数据</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>型号</text></view>
				<view class="right"><text>型号数据</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>生产日期</text></view>
				<view class="right"><text>2022-05-10</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>质保日期</text></view>
				<view class="right"><text>2022-10-20</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>当前状态</text></view>
				<view class="right"><text>可用</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>备注信息</text></view>
				<view class="right"><text>备注文字备注文字备注文字备注文字备注文字备注文字备注文字</text></view>
			</view>
		</view>
		<view class="list1"  v-show="TabCur==1">
			<view class="item" v-for="item in 4" :key="item">
				<view class="title">
					<image src="../../static/image/inspects/bg_tab_check.png" mode="aspectFit"></image>
					<view class="name">每日巡检任务001</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">任务发布时间</text>
						<text class="value">2022-05-01 11:30:00</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">巡检人员</text>
						<text class="value">大泥鳅</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">巡检时间</text>
						<text class="value">2022-05-01 15:00:01</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list1"  v-show="TabCur==2">
			<view class="item" v-for="item in 3" :key="item">
				<view class="title">
					<image src="../../static/image/inspects/bg_tab_fix.png" mode="aspectFit"></image>
					<view class="name">设备维修任务001</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">任务发布时间</text>
						<text class="value">2022-05-01 11:30:00</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">维修人员</text>
						<text class="value">大泥鳅</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">维修时间</text>
						<text class="value">2022-05-01 15:00:01</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn">
				报修
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabList: ['设备信息','设备巡检历史','设备维修历史'],
				TabCur: 1,
				scrollLeft: 1
			};
		},
		methods: {
			tabSelect(e) {
				console.log(this.TabList[e.currentTarget.dataset.id])
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">
.point-list{
	.list0{
		margin-top: 120rpx;
		padding-bottom: 176rpx;
		.item{
			width: 100%;
			background: #FFFFFF;
			border-bottom: 1rpx solid #E5E5E5 ;
			.left{
				width: 192rpx;
				height: auto;
				padding: 16rpx 39rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
			.right{
				width: 558rpx;
				border-left: 1rpx solid #E5E5E5;
				text-align: center;
				padding: 16rpx 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.list1{
		width: 100%;
		padding: 0 32rpx 176rpx 32rpx;
		margin-top: 120rpx;
		.item{
			margin-top: 30rpx;
			width: 100%;
			.title{
				width: 100%;
				height: 80rpx;
				position: relative;
				image{
					position: absolute;
					width: 686rpx;
					height: 80rpx;
				}
				.name{
					position: absolute;
					margin-top: 17rpx;
					margin-left: 28rpx;
					width: 638rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
			.info{
				width: 100%;
				padding: 24rpx 28rpx;
				background: #FFFFFF;
				border-radius: 0 0 8rpx 8rpx;
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
