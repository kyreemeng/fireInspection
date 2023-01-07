<template>
	<view class="point-list">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="list0" v-show="TabCur==0">
			<view class="item flex justify-between align-center">
				<view class="left"><text>设备名称</text></view>
				<view class="right"><text>{{deviceName}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>设备类型</text></view>
				<view class="right"><text>{{deviceType}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>楼宇名称</text></view>
				<view class="right"><text>{{buildingName}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>具体位置</text></view>
				<view class="right"><text>{{floor?floor:''}}{{room?room:''}}{{door==1?'室内':'室外'}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>品牌</text></view>
				<view class="right"><text>{{brand}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>规格</text></view>
				<view class="right"><text>{{specifications}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>型号</text></view>
				<view class="right"><text>{{model}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>生产日期</text></view>
				<view class="right"><text>{{manufactureDate}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>质保日期</text></view>
				<view class="right"><text>{{warrantyPeriod}}</text></view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>当前状态</text></view>
				<view class="right">
					<text v-if="deviceStatus==1">可用</text>
					<text v-else-if="deviceStatus==2">不可用</text>
					<text v-else-if="deviceStatus==3">维修中</text>
					<text v-else>{{deviceStatus}}</text>
				</view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="left"><text>备注信息</text></view>
				<view class="right"><text>{{deviceMemo}}</text></view>
			</view>
		</view>
		<view class="list1" v-show="TabCur==1">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll"
				:fixed="true" :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
				<view class="item" v-for="(item,index) in historyList" :key="index">
					<view class="title">
						<image src="../../static/image/inspects/bg_tab_check.png" mode="aspectFit"></image>
						<view class="name">{{item.taskName}}</view>
					</view>
					<view class="info">
						<view class="word1 flex justify-between align-center">
							<text class="desc">任务发布时间</text>
							<text class="value">{{item.taskReleaseTime}}</text>
						</view>
						<view class="word2 flex justify-between align-center">
							<text class="desc">巡检人员</text>
							<text class="value">{{item.patrolName}}</text>
						</view>
						<view class="word3 flex justify-between align-center">
							<text class="desc">巡检时间</text>
							<text class="value">{{item.patrolTime}}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="list1" v-show="TabCur==2">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll"
				:fixed="true" :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
				<view class="item" v-for="(item,index) in historyList" :key="index">
					<view class="title">
						<image src="../../static/image/inspects/bg_tab_fix.png" mode="aspectFit"></image>
						<view class="name">{{item.taskName}}</view>
					</view>
					<view class="info">
						<view class="word1 flex justify-between align-center">
							<text class="desc">任务发布时间</text>
							<text class="value">{{item.taskReleaseTime}}</text>
						</view>
						<view class="word2 flex justify-between align-center">
							<text class="desc">维修人员</text>
							<text class="value">{{item.maintenanceName}}</text>
						</view>
						<view class="word3 flex justify-between align-center">
							<text class="desc">维修时间</text>
							<text class="value">{{item.maintenanceTime}}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="bottom">
			<view class=" btn-area flex align-center justify-between">
				<view class="btn" @tap="handleFix()">
					报修
				</view>
				<view class="btn" @tap="handleNormal()">
					正常
				</view>
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
				deviceId: 0,
				TabList: ['设备信息', '设备巡检历史', '设备维修历史'],
				TabCur: 0,
				scrollLeft: 1,
				deviceName: '设备名称',
				deviceType: '设备类型',
				buildingName: '楼宇名称',
				room: '房间号',
				door: 1, //1 室内，2室外
				brand: '品牌',
				specifications: '规格',
				model: "型号",
				manufactureDate: '生产日期',
				warrantyPeriod: "质保日期",
				deviceStatus: 1, //1:可用 2：不可用，3维修中
				deviceMemo: '', //备注信息
				deviceSn:123456,//设备编号
				downOption: {
					auto: false
				},
				upOption: {
					auto: false
				},
				mescroll: null,
				mescrollTop: 0,
				mescrollBottom: 0,
				historyList: [],
			};
		},
		onLoad(options) {
			this.mescrollTop = uni.upx2px(90);
			this.mescrollBottom = uni.upx2px(174);
			console.log('接收到deviceId：' + options.deviceId)
			this.deviceId = options.deviceId
			this.getDeviceInfo()
		},
		onReady() {

		},
		onShow() {

		},
		methods: {
			tabSelect(e) {
				console.log(this.TabList[e.currentTarget.dataset.id])
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if (this.TabCur != 0) {
					this.mescroll.resetUpScroll();
				}
			},
			handleFix() { //报修
			let deviceInfo = {
				deviceId:this.deviceId,
				deviceName:this.deviceName,
				buildingName:this.buildingName,
				floor:this.floor,
				room:this.room,
				door:this.door,
				deviceSn:this.deviceSn 
			};
				uni.navigateTo({
					url: "./devicesFix?deviceInfo=" + JSON.stringify(deviceInfo)
				})
			},
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
				if (this.TabCur != 0) {
					this.mescroll.resetUpScroll();
				}
			},
			upcallback: function(mescroll) {
				uni.showLoading();
				let param = {
					pageNum: mescroll.num,
					pageSize: mescroll.size,
					deviceId: this.deviceId,
				};
				let url;
				if (this.TabCur == 1) {
					url = '/firecontrol/api/wx/patrol/getPatrolPage'
				} else if (this.TabCur == 2) {
					url = '/firecontrol/api/wx/patrol/getMaintenance'
				} else {
					console.log('TabCur:' + this.TabCur)
					return;
				}
				this.$api
					.post(url, param, null)
					.then(res => {
						uni.hideLoading();
						if (mescroll.num == 1) {
							this.historyList = res.content;
						} else {
							this.historyList = this.historyList.concat(res.content);
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
			getDeviceInfo: function() {
				uni.showLoading();
				let param = {
					deviceId: this.deviceId
				};
				this.$api
					.get('/firecontrol/api/wx/patrol/getDeviceInfo', param, null)
					.then(res => {
						uni.hideLoading();
						this.deviceName = res.deviceName;
						this.deviceType = res.deviceType;
						this.buildingName = res.buildingName
						this.room = res.room
						this.door = res.door
						this.brand = res.brand
						this.specifications = res.specifications
						this.model = res.model
						this.manufactureDate = res.manufactureDate
						this.warrantyPeriod = res.warrantyPeriod
						this.deviceStatus = res.deviceStatus
						this.deviceMemo = res.deviceMemo
						this.floor = res.floor
						this.deviceSn = res.deviceSn

					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});

			},
			handleNormal: function() {
				uni.showLoading();
				let param = {
					deviceId: this.deviceId,
					// taskId:this.taskId,
				};
				this.$api
					.post('/firecontrol/api/wx/task/deviceNormal', param, null)
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "提交成功"
						})
						setTimeout(function() {
							uni.navigateBack()
						}, 1000);
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

<style lang="scss">
	.point-list {
		.list0 {
			margin-top: 120rpx;
			padding-bottom: 176rpx;

			.item {
				width: 100%;
				background: #FFFFFF;
				border-bottom: 1rpx solid #E5E5E5;

				.left {
					width: 192rpx;
					height: auto;
					padding: 16rpx 39rpx;
					text-align: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
				}

				.right {
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

		.list1 {
			width: 100%;
			margin-top: 120rpx;

			.item {
				margin-top: 30rpx;
				padding: 0 32rpx;
				width: 100%;

				.title {
					width: 100%;
					height: 80rpx;
					position: relative;

					image {
						position: absolute;
						width: 686rpx;
						height: 80rpx;
					}

					.name {
						position: absolute;
						margin-top: 17rpx;
						margin-left: 28rpx;
						width: 638rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #FFFFFF;
					}
				}

				.info {
					width: 100%;
					padding: 24rpx 28rpx;
					background: #FFFFFF;
					border-radius: 0 0 8rpx 8rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 54rpx;

					.value {
						color: #333333;
					}
				}
			}
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 174rpx;
			z-index: 999;
			padding: 20rpx 30rpx;
			background: #fff;
			box-shadow: 0 -5rpx 9rpx 0 rgba(239, 243, 255, 1);
			.btn-area{
				width: 100%;
				.btn {
					width: 45%;
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
	}
</style>
