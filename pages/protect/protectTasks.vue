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
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
			<view class="item" v-for="(item,index) in taskList" :key="index">
				<view class="date">
					{{item.releaseTime}}
				</view>
				<view class="title flex justify-between align-center" @tap="handlePoint()">
					<text>{{item.pointName}}</text>
				</view>
				<view class="info" @tap="handlePoint()">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.buildingName?item.buildingName:''}}{{item.floorName?item.floorName:''}}</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">待检查设备数量</text>
						<text class="value">{{item.pendingCheckDeviceCount}}</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">已检查设备数量</text>
						<text class="value">{{item.completeCheckDeviceCount}}</text>
					</view>
				</view>
			</view>
			</mescroll-uni>
		</view>
		<view class="list tab1" v-show="TabCur==1">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback"  :fixed="true"
			 :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
			<view class="item" v-for="(item,index) in taskList" :key="index">
				<view class="date">
					{{item.releaseTime}}
				</view>
				<view class="title flex justify-between align-center" @tap="handlePoint()">
					<text>{{item.pointName}}</text>
				</view>
				<view class="info" @tap="handlePoint()">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.buildingName?item.buildingName:''}}{{item.floorName?item.floorName:''}}</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">待检查设备数量</text>
						<text class="value">{{item.pendingCheckDeviceCount}}</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">已检查设备数量</text>
						<text class="value">{{item.completeCheckDeviceCount}}</text>
					</view>
				</view>
		<image  src="../../static/image/inspects/icon_finished.png" mode="aspectFit" v-show="item.taskStatus==2"></image>
		<image  src="../../static/image/inspects/icon_unfinished.png" mode="aspectFit" v-show="item.taskStatus==3"></image>
				</view>
 	</mescroll-uni>
		</view>
		<view class="bottom">
			<view class="btn" @tap="handleScan()">
				扫码巡检
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				TabList: ['进行中','已结束'],
				TabCur: 0,
				scrollLeft: 0,
				downOption: {
					auto: false
				},
				upOption: {
					auto: false
				},
				mescroll: null,
				mescrollTop: 0,
				mescrollBottom: 0,
				taskList:[],
				taskStatus:1,  //1:进行中 2：已完成 3：未完成 4:终止
			};
		},
		onLoad() {
			this.mescrollTop = uni.upx2px(90);
			this.mescrollBottom = uni.upx2px(174);
		},
		onReady() {
			
		},
		onShow() {
		this.canReset && this.mescroll.resetUpScroll() // 重置列表数据为第一页
		this.canReset && this.mescroll.scrollTo(0,0) // 把滚动条也重置到顶部
		this.canReset = true // 过滤第一次的onShow事件
		},
		methods:{
			tabSelect(e) {
				console.log(this.TabList[e.currentTarget.dataset.id])
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.taskStatus = this.TabCur+1
				this.mescroll.resetUpScroll();
			},
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
									url:'../inspects/point?targetSn='+res.result	
								})
							}, "500");
						
						}
					});
			},
			handlePoint(){
				uni.navigateTo({
					url:'tasksPoint'
				})
			},
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
				this.mescroll.resetUpScroll();
			},
			upcallback: function(mescroll) {
				uni.showLoading();
				let param = {
					pageNum: mescroll.num,
					pageSize: mescroll.size,
					taskType:'maintenance',
					taskStatus:this.taskStatus
				};
				this.$api
					.post('/firecontrol/api/wx/task/getTaskPage', param, null)
					.then(res => {
						uni.hideLoading();
							if (mescroll.num == 1) {
								this.taskList = res.content;
							} else {
								this.taskList = this.taskList.concat(res.content);
							}
							mescroll.endSuccess(res.content.length, res.content.length >= mescroll.size);
						
					})
					.catch(err => {
						mescroll.endErr();
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});
			
			},
			downCallback: function(mescroll) {
				mescroll.resetUpScroll();
			},
		}
	}
</script>

<style lang="scss">
.tasks-content{
	.list{
		width: 100%;
		.item{
			width: 100%;
			margin-top: 54rpx;
			padding: 0 32rpx;
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
