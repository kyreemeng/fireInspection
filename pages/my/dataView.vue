<template>
	<view class="content">
		<view class="top  flex justify-between align-center">
			<view class="check">
				<view class="title">
					<text class="box-icon cuIcon-round text-blue"></text>
					<text class="name">当前巡检任务</text>
				</view>
				<view class="process">
					<cmd-circle cid="circle1" type="circle" font-color="#FF8935" stroke-color="#FF8935" :percent="checkPercent" gap-position="left" ></cmd-circle>
				</view>
				<view class="top-info">
					<view class="value flex justify-between align-center">
						<text>总数量</text>
						<text class="num">{{currentCheckTaskTotal}}</text>
					</view>
					<view class="value  flex justify-between align-center">
						<text>已完成</text>
						<text class="num">{{currentCheckTaskOverNum}}</text>
					</view>
					<view class="value  flex justify-between align-center">
						<text>巡检员</text>
						<text class="num">{{currentCheckUserTotal}}</text>
					</view>
				</view>
			</view>
			<view class="protect">
				<view class="title">
					<text class="box-icon cuIcon-round text-blue"></text>
					<text class="name">当前维保任务</text>
				</view>
				<view class="process">
					<cmd-circle cid="circle2" type="circle" font-color="#15C46B" stroke-color="#15C46B" :percent="protectPercent" gap-position="left"></cmd-circle>
				</view>
				<view class="top-info">
					<view class="value flex justify-between align-center">
						<text>总数量</text>
						<text class="num">{{currentMaintenanceTaskTotal}}</text>
					</view>
					<view class="value  flex justify-between align-center">
						<text>已完成</text>
						<text class="num">{{currentMaintenanceTaskOverNum}}</text>
					</view>
					<view class="value  flex justify-between align-center">
						<text>维保员</text>
						<text class="num">{{currentMaintenanceUserTotal}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<text class="box-icon cuIcon-round text-blue"></text>
				<text class="name">历史数据总览</text>
			</view>
			<view class="detail">
				<view class="top flex justify-between align-center">
					<view class="notice flex justify-between align-center">
						<image src="../../static/image/my/icon_notice.png" mode="aspectFit"></image>
						<text class="num">{{warningTotal}}</text>
					</view>
					<view class="deal flex justify-between align-center">
						<image src="../../static/image/my/icon_deal.png" mode="aspectFit"></image>
						<text class="num">{{Math.round(warningHandleTotal / warningTotal * 10000) / 100}}%</text>
					</view>
				</view>
				<view class="info flex justify-between align-center">
					<view class="desc">
						<text>报警总数</text>
						<text class="num text-blue">{{warningTotal}}</text>
					</view>
					<view class="desc">
						<text>处置总数</text>
						<text class="num text-blue">{{warningHandleTotal}}</text>
					</view>
					<view class="desc">
						<text>真实警情</text>
						<text class="num text-blue">{{warningRealTotal}}</text>
					</view>
				</view>
				<view class="area">
					<view class="word flex justify-between align-center">
						<text>楼宇数量</text>
						<text class="num">{{buildingTotal}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>消防主机</text>
						<text class="num">{{fireDeviceTotal}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>报警设备</text>
						<text class="num">{{policeDeviceTotal}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>监控设备</text>
						<text class="num">{{monitorDeviceTotal}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	export default {
	    components: {
			cmdCircle
		},
		data() {
			return {
				buildingTotal:0,
				currentCheckTaskOverNum:0,
				currentCheckTaskTotal:0,
				currentCheckUserTotal:0,
				currentMaintenanceTaskOverNum:0,
				currentMaintenanceTaskTotal:0,
				currentMaintenanceUserTotal:0,
				fireDeviceTotal:0,
				monitorDeviceTotal:0,
				policeDeviceTotal:0,
				warningHandleTotal:0,
				warningRealTotal:0,
				warningTotal:0,
				checkPercent:0,
				protectPercent:0,
			};
		},
		onLoad() {
			this.getTaskSpeed();
		},
		onReady() {
			
		},
		onShow() {
			
		},
		methods:{
			getTaskSpeed: function() {
				uni.showLoading();
				let param = {};
				this.$api
					.get('/firecontrol/api/wx/user/getDataOverview', param, null)
					.then(res => {
						uni.hideLoading();
						this.buildingTotal = res.buildingTotal  //楼宇数量
						
						this.currentCheckTaskOverNum = res.currentCheckTaskOverNum  //当前巡检任务已完成数量
						this.currentCheckTaskTotal = res.currentCheckTaskTotal  //当前巡检任务总数
						this.currentCheckUserTotal = res.currentCheckUserTotal //当前巡检人员数量
						this.currentMaintenanceTaskOverNum = res.currentMaintenanceTaskOverNum//当前维保任务已完成数量
						this.currentMaintenanceTaskTotal = res.currentMaintenanceTaskTotal//当前维保任务总数
						this.currentMaintenanceUserTotal = res.currentMaintenanceUserTotal//当前维保人员数量
						
						this.fireDeviceTotal = res.fireDeviceTotal//消防主机
						this.monitorDeviceTotal = res.monitorDeviceTotal  //监控设备
						this.policeDeviceTotal = res.policeDeviceTotal  //报警设备
						this.warningHandleTotal = res.warningHandleTotal //处置总数
						this.warningRealTotal = res.warningRealTotal //真实警情总数
						this.warningTotal = res.warningTotal //报警总数
						
						if(this.currentCheckTaskTotal>0){
							this.checkPercent = Math.round(this.currentCheckTaskOverNum / this.currentCheckTaskTotal * 10000) / 100

						}
						
						if(this.currentMaintenanceTaskTotal>0){
							this.protectPercent = Math.round(this.currentMaintenanceTaskOverNum/ this.currentMaintenanceTaskTotal * 10000) / 100
							
						}else{
							console.log("protectPercent:"+this.protectPercent)
						} 
						
						
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
	.content{
		width: 100%;
		margin-top: 32rpx;
		padding-bottom: 40rpx;
		.top{
			.check,.protect{
				width: 325rpx;
				padding-bottom: 26rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				.title{
					width: 325rpx;
					height: 114rpx;
					border-bottom: 1rpx solid #E2E4EA;
					padding-left: 28rpx;
					.box-icon{
						font-size: 26rpx;
						line-height: 114rpx;
					}
					.name{
						margin-left: 12rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #333333;
						line-height: 114rpx;
					}
				}
				.process{
					margin-top: 30rpx;
					text-align: center;
				}
				.top-info{
					margin-top: 30rpx;
					padding: 0 30rpx;
					.value{
						margin-top: 6rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #858B9C;
						.num{
							font-size: 32rpx;
							font-weight: 600;
							color: #333333;
						}
					}
				}
			}
		}
		.bottom{
			margin-top: 30rpx;
			width: 100%;
			height: 734rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			.title{
				width: 100%;
				height: 114rpx;
				border-bottom: 1rpx solid #E2E4EA;
				padding-left: 28rpx;
				.box-icon{
					font-size: 26rpx;
					line-height: 114rpx;
				}
				.name{
					margin-left: 12rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
					line-height: 114rpx;
				}
			}
			.detail{
					padding: 0 24rpx;
				.top{
					padding: 30rpx 0;
					.notice,.deal{
						width: 300rpx;
						height: 200rpx;
						padding-left: 30rpx;
						padding-right: 30rpx;
						background: linear-gradient(270deg, #F8FAFF 0%, #EFF0FF 100%);
						border-radius: 8rpx;
						image{
							width: 120rpx;
							height: 120rpx;
						}
						.num{
							font-size: 44rpx;
							font-family: DINAlternate-Bold, DINAlternate;
							font-weight: bold;
							color: #333333;
						}
					}
				}
				.info{
					.desc{
						width: 197rpx;
						height: 48rpx;
						border: 2rpx solid #C0C0C0;
						font-size: 20rpx;
						font-weight: 400;
						color: #333333;
						line-height: 48rpx;
						text-align: center;
						.num{
							margin-left: 12rpx;
						}
					}
					
				}
				.area{
					width: 100%;
					margin-top: 30rpx;
					padding: 16rpx 0 30rpx 0;
					border-top: 1rpx solid #E2E4EA;
					.word{
						margin-top: 16rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #858B9C;
						.num{
							color: #333333;
						}
					}
					
				}
			}
		}
	}

</style>
