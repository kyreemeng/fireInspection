<template>
	<view class="content">
		<view class="point_name">
			<view class="box">
				<view class="top flex justify-between align-center">
					<text class="name">{{repairTitle}}</text>
					<text class="time text-right">{{reportTime}}</text>
				</view>
				<view class="bottom flex-direction justify-between">
					<view class="word flex justify-between align-center">
						<text>设备名称</text><text class="value">{{deviceName}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>详细地址</text><text class="value">{{addressDetail}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>故障描述</text><text class="value">{{faultDescription}}</text>
					</view>
					<view class="word flex justify-between align-center" v-show="showDetail">
						<text>故障图片</text>
						<view class="value">
							<image v-for="(item,index) in images" :key="index" :src="baseUrl+item" mode="aspectFit">
							</image>
						</view>
					</view>
					<view class="word flex justify-between align-center" v-show="showDetail">
						<text>报修备注</text><text class="value">{{reportMemo?reportMemo:'无'}}</text>
					</view>
				</view>
				<view class="show-area flex justify-center ">
					<view class="btn flex justify-between align-center" @tap="handleShow()" v-if="!showDetail">
						<text>展开</text><text class="cuIcon-unfold" style="font-size: 26rpx;"> </text></view>
					<view class="btn flex justify-between align-center" @tap="handleShow()" v-else><text>收起</text><text
							class="cuIcon-fold" style="font-size: 26rpx;"> </text></view>
				</view>
			</view>
			<view class="fix-date" v-show="showBtn">
				<text class="title">维修时间</text>
				<view class="date-content">
					<!-- <picker class="picker"  mode="date" :value="repairTime"  :end="currentDate" @change="DateChange">
						<text >
							{{repairTime?repairTime:'请选择时间'}}
						</text>
					</picker> -->
					<uni-datetime-picker type="datetime" v-model="repairTime" :end="currentDate" @change="changeLog" return-type="string"  />
				</view>

			</view>
			<view class="fix-date" v-show="showBtn">
				<text class="title">状态</text>
				<view class="date-content">
					<picker @change="StatusChange" :value="statusIndex" :range="statusList">
						<view class="picker">
							{{statusIndex>-1?statusList[statusIndex]:'请选择状态'}}
						</view>
					</picker>
				</view>
			</view>
			<view class="fix-remarks" v-show="showBtn">
				<text class="title">维修进展备注</text>
				<view class="remarks-content">
					<textarea type="text" v-model="repairProgressMemo" placeholder="请输入备注" auto-height></textarea>
				</view>
			</view>
		</view>

		<view class="bottom-btn" v-show="showBtn">
			<view class="btn" @tap="repairUpdate()">
				更新维修进展
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$api.config.baseUrl,
				showDetail: false,
				id: null,
				repairTitle: null,
				reportTime: null,
				deviceName: null,
				addressDetail: null,
				faultDescription: null,
				images: [],
				reportMemo: null,
				repairSpeedInfo: {},
				statusIndex: -1,
				statusList: ['未开始', '进行中', '已完成'],
				repairStatus: 0, //  1:未开始 2：进行中 3：已完成
				currentDate: null,
				repairProgressMemo: null,
				showBtn: true,
				repairTime: '',
				
			};
		},
		onLoad(options) {
			console.log('接收到id：' + JSON.parse(options.item).id)
			this.id = JSON.parse(options.item).id
			this.repairTitle = JSON.parse(options.item).repairTitle
			this.reportTime = JSON.parse(options.item).reportTime
			this.deviceName = JSON.parse(options.item).deviceName
			this.addressDetail = JSON.parse(options.item).addressDetail
			this.faultDescription = JSON.parse(options.item).faultDescription
			this.images = JSON.parse(options.item).images
			if (JSON.parse(options.item).reportMemo) {
				this.reportMemo = JSON.parse(options.item).reportMemo
			}
			this.repairStatus = JSON.parse(options.item).repairStatus

			this.statusIndex = this.repairStatus - 1

			if (JSON.parse(options.item).repairStatus == 3) {
				this.showBtn = false;
			}
			if (JSON.parse(options.item).repairSpeedInfo.repairUpdateTime) {
				this.repairTime = JSON.parse(options.item).repairSpeedInfo.repairUpdateTime
			}
			if (JSON.parse(options.item).repairSpeedInfo.repairProgressMemo) {
				this.repairProgressMemo = JSON.parse(options.item).repairSpeedInfo.repairProgressMemo
			}
			

		},
		onReady() {
			this.currentDate = Date.now()
			

		},
		onShow() {

		},
		watch: {
			repairTime(newval) {
				console.log('单选:', this.repairTime);
			}
		},
		methods: {
			changeLog(e) {
				console.log('change事件:', e);
				
			},
			repairUpdate() {
				if (!this.repairTime) {
					uni.showToast({
						icon: "none",
						title: "请选择维修时间"
					})
				} else if (this.repairStatus == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择维修状态"
					})
				} else {
					this.updateRepair()
				}

			},
			handleShow() {
				this.showDetail = !this.showDetail
			},
			StatusChange(e) {
				this.statusIndex = e.detail.value
				this.repairStatus = Number(this.statusIndex) + 1
				console.log(this.statusList[this.statusIndex] + '：' + this.repairStatus)
			},

			updateRepair: function() {
				uni.showLoading();
				let param = {
					repairId: this.id,
					repairTime: this.repairTime,
					repairStatus: this.repairStatus
				};
				if (this.repairProgressMemo) {
					param.repairProgressMemo = this.repairProgressMemo
				}
				this.$api
					.post('/firecontrol/api/wx/normalRepair/updateNormalRepairProgress', param, null)
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "更新成功"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							});
						}, 800);

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
	.content {
		.point_name {
			margin-top: 56rpx;
			padding-bottom: 190rpx;

			.box {
				margin-top: 24rpx;

				.top {
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					background: linear-gradient(180deg, #DEE5FF 0%, rgba(226, 233, 255, 0.2) 100%);
					border-radius: 8rpx 8rpx 0px 0px;
					border-bottom: 1rpx solid #E5E5E5;

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
					}
				}

				.bottom {
					width: 100%;
					padding: 24rpx 28rpx;
					background: #FFFFFF;
					border-radius: 0 0 8rpx 8rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 40rpx;

					.word {
						margin-top: 12rpx;

						.value {
							width: 490rpx;
							text-align: right;
							color: #333333;

							image {
								width: 140rpx;
								height: 140rpx;
								margin-left: 16rpx;
								border-radius: 8rpx;
							}
						}
					}


				}

				.show-area {
					width: 100%;
					padding: 24rpx 0;
					background: #FFFFFF;
					height: 80rpx;
					color: #4B87FC;
					border-top: 1rpx solid #E5E5E5;
					border-radius: 0 0 8rpx 8rpx;

					.btn {
						width: 90rpx;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}
		}

		.fix-date {
			width: 100%;
			margin-top: 56rpx;

			.date-content {
				margin-top: 24rpx;
				width: 100%;
				padding: 24rpx 30rpx;
				background: #FFFFFF;
			}
		}

		.fix-remarks {
			width: 100%;
			margin-top: 56rpx;

			.remarks-content {
				margin-top: 24rpx;
				width: 100%;
				padding: 24rpx 30rpx;
				background: #FFFFFF;
			}

		}

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;

		}

		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 174rpx;
			z-index: 98;
			padding: 20rpx 30rpx;
			background: #fff;
			box-shadow: 0 -5rpx 9rpx 0 rgba(239, 243, 255, 1);

			.btn {
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