<template>
	<view class="content">
		<view class="point_name">
			<view class="box">
				<view class="top flex justify-between align-center">
					<text class="name">{{deviceName}}</text>
					<text class="time text-right">{{reportTime}}</text>
				</view>
				<view class="bottom flex-direction justify-between" >
					<view class="word flex justify-between align-center">
						<text>所在位置</text><text class="value">{{buildingName}}{{floorName}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>设备类型</text><text class="value">{{deviceType}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>异常指标</text><text class="value">{{targetName}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>照片取证</text>
						<view class="value" >
							<image v-for="(item,index) in reportImages" :key="index" :src="baseUrl+item" mode="aspectFit"></image>
						</view>
					</view>
					<view class="word flex justify-between align-center">
						<text>报修备注</text><text class="value">{{reportMemo?reportMemo:'无'}}</text>
					</view>
				</view>
			</view>
			<view class="fix-date">
				<text class="title">维修预计完成时间</text>
				<view class="date-content">
					<picker class="picker"  mode="date" :value="estimateCompleteTime"  :start="currentDate" @change="DateChange">
						<text >
							{{estimateCompleteTime?estimateCompleteTime:'请选择时间'}}
						</text>
					</picker>
				</view>
			</view>
			<view class="fix-remarks">
				<text class="title">维修计划备注</text>
				<view  class="remarks-content">
					<textarea type="text" v-model="repairPlanMemo" placeholder="请输入备注" auto-height></textarea>
				</view>
			</view>
		</view>
		
	<view class="bottom-btn">
		<view class="btn" @tap="fixSubmit()">
			确认并由我报修
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$api.config.baseUrl,
				repairFlowId:null,
				deviceName:null,
				reportTime:null,
				campusName:null,
				buildingName:null,
				floorName:null,
				deviceType:null,
				targetName:null,
				reportImages:[],
				reportMemo:null,
				repairSpeedInfo:{},
				estimateCompleteTime:null,
				currentDate:null,
				repairPlanMemo:null,
			};
		},
		onLoad(options) {
			console.log('接收到repairFlowId：' + options.repairFlowId)
			this.repairFlowId = options.repairFlowId
			this.getReportDetail();
		},
		onReady() {
			let date = new Date();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let date2 = new Date(date);
			date2.setDate(day - 6);
			let month2 = date2.getMonth() + 1;
			let day2 = date2.getDate();
			this.currentDate = date.getFullYear() + "-" + (month > 9 ? month : ('0' + month)) + "-" + (day > 9 ? day : ('0' +
				day));
		},
		onShow() {
			
		},
		methods: {
			fixSubmit() {		
				if(this.estimateCompleteTime){
					this.confirmRepair();
				}else{
					uni.showToast({
						icon: "none",
						title: "请选择维修预计完成时间"
					})
				}
				
			},
		DateChange(e) {
			this.estimateCompleteTime = e.detail.value
			console.log(this.estimateCompleteTime)
		},
			getReportDetail: function() {
				uni.showLoading();
				let param = {
					repairFlowId:this.repairFlowId
				};
				this.$api
					.get('/firecontrol/api/wx/maintenance/getReportDetail', param, null)
					.then(res => {
						uni.hideLoading();
						this.deviceName = res.deviceName
						this.reportTime = res.reportTime
						this.campusName = res.campusName
						this.buildingName = res.buildingName
						this.floorName = res.floorName
						this.deviceType = res.deviceType
						this.targetName = res.targetName
						this.reportImages = res.reportImages
						this.reportMemo = res.reportMemo
						this.repairSpeedInfo = res.repairSpeedInfo
						
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});
			
			},
			confirmRepair: function() {
				uni.showLoading();
				let param = {
					repairFlowId:this.repairFlowId,
					estimateCompleteTime:this.estimateCompleteTime
				};
				if(this.repairPlanMemo){
					param.repairPlanMemo = this.repairPlanMemo
				}
				this.$api
					.post('/firecontrol/api/wx/maintenance/confirmRepair', param, null)
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "确认成功"
						})
						setTimeout(()=> {
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
					.word{
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
			}
		}
		.fix-date{
			width: 100%;
			margin-top: 56rpx;
			.date-content{
				margin-top: 24rpx;
				width: 100%;
				padding: 24rpx 30rpx;
				background: #FFFFFF;
			}
		}
		.fix-remarks{
			width: 100%;
			margin-top: 56rpx;
			.remarks-content{
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

		.bottom-btn{
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
