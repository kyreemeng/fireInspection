<template>
	<view class="content">
		<view class="point_name">
			<text class="title">设备信息</text>
			<view class="box">
				<view class="top">
					<text class="name">{{deviceName}}</text>
				</view>
				<view class="bottom flex-direction justify-between">
					<view class="word flex justify-between align-center">
						<text>所在位置</text><text class="value">{{campusName}}{{buildingName}}{{floorName}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>具体位置</text><text class="value">{{roomName}}{{door==1?'室内':'室外'}}</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>设备编号</text><text class="value">{{deviceSn}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="info">
			<text class="title">指标信息</text>
			<view class="list">
				<view class="item  flex justify-between align-center" v-for="(item,index) in targetInfoList" :key="index" >
					<text>{{item.targetName}}</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal" :class="item.status==1?'choosed':''"  @tap="switchNormal(index)">
							正常
						</view>
						<view class="abnormal" :class="item.status==2?'fix-choosed':''" @tap="switchAbNormal(index)">
							异常
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
		<view class="btn-area flex align-center justify-between">
			<view class="fix-btn" :class="fixActive?'fix-active':''" @tap="handleFix()">
				报修
			</view>
			<view class="normal-btn" :class="normalActive?'normal-active':''" @tap="handleNormal()">
				正常
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceName:'',
				deviceId:null,
				taskId:null,
				campusName:'', //校区
				buildingName:'',//楼宇
				floorName:'',//楼层
				roomName:'',//房间
				door:null,//1 室内，2室外
				deviceSn:null, //设备编码
				targetInfoList:[{}],//指标信息
			};
		},
		onLoad(options) {
			if(options.deviceId){
				console.log('接收到deviceId：' + options.deviceId)
				this.deviceId = options.deviceId
			}
			if(options.taskId){
				console.log('接收到taskId：' + options.taskId)
				this.taskId = options.taskId
				this.getCurrentTaskDeviceDetail();
			}
			
		},
		onReady() {
		
		},
		onShow() {
		
		},
		computed:{
			normalActive(){
				let index = this.targetInfoList.findIndex((value, index, arr) => {
					return value.status == 2
				})
				if(index==-1){
					return true;
				}else{
					return false;
				}
			},
			fixActive(){
				let index = this.targetInfoList.findIndex((value, index, arr) => {
					return value.status == 2
				})
				if(index!=-1){
					return true;
				}else{
					return false;
				}
			}
		},
		methods: {
			switchNormal(index){
				this.targetInfoList[index].status=1;
			},
			switchAbNormal(index){
				this.targetInfoList[index].status=2;
			},
			handleFix(){
				let index = this.targetInfoList.findIndex((value, index, arr) => {
					return value.status == 2
				})
				if(index!=-1){
					let deviceInfo = {
						deviceId:this.deviceId,
						taskId:this.taskId,
						deviceName:this.deviceName,
						buildingName:this.buildingName,
						floor:this.floorName,
						room:this.roomName,
						door:this.door,
						deviceSn:this.deviceSn,
						targetInfoList:this.targetInfoList
					};
						uni.navigateTo({
							url: "./devicesFix?deviceInfo=" + JSON.stringify(deviceInfo)
						})
				}else{
					uni.showToast({
						icon: "none",
						title: "各项指标均正常，请点击正常按钮进行提交"
					})
				}
				
			},
			handleNormal(){
				let index = this.targetInfoList.findIndex((value, index, arr) => {
					return value.status == 2
				})
				if(index==-1){
					this.deviceNormal()
				}else{
					uni.showToast({
						icon: "none",
						title: this.targetInfoList[index].targetName+'异常,'+"请确认该指标状态"
					})
				}
			},
			
			getCurrentTaskDeviceDetail: function() {
				uni.showLoading();
				let param = {
					deviceId: this.deviceId,
					taskId:this.taskId,
				};
				this.$api
					.post('/firecontrol/api/wx/task/getCurrentTaskDeviceDetail', param, null)
					.then(res => {
						uni.hideLoading();
						this.deviceName = res.deviceName
						this.campusName = res.campusName
						this.buildingName = res.buildingName
						this.floorName = res.floorName
						this.roomName = res.roomName
						this.door = res.door
						this.targetInfoList = res.targetInfoList
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
			deviceNormal: function() {
				uni.showLoading();
				let param = {
					deviceId: this.deviceId,
					taskId:this.taskId,
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
	.content {
		padding-bottom: 180rpx;
		.point_name {
			margin-top: 56rpx;

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
						line-height: 80rpx;
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

					.value {
						color: #333333;
					}
				}
			}
		}

		.info {
			margin-top: 56rpx;
		}

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;

		}

		.list {
			margin-top: 26rpx;
			width: 100%;
			border-radius: 8rpx;
			background: #FFFFFF;

			.item {
				width: 100%;
				padding: 34rpx 28rpx;
				border-bottom: 1rpx solid #E5E5E5;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;

				.right-btn {
					width: 250rpx;

					.normal,
					.abnormal {
						text-align: center;
						width: 110rpx;
						height: 54rpx;
						background: #FFFFFF;
						border-radius: 8rpx;
						border: 2rpx solid #6190E8;
						font-size: 28rpx;
						font-weight: 400;
						color: #6190E8;
						line-height: 54rpx;
					}
				
						.choosed{
							color: #FFFFFF;
							background: #4B87FC;
						}
					
				
						.fix-choosed{
							color: #FFFFFF;
							background: #F32C2F;
							border: 2rpx solid #F32C2F;
						}
					
				}

			}
		}

		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 174rpx;
			z-index: 999;
			padding: 20rpx 30rpx;
			background: #fff;
			box-shadow: 0 -5rpx 9rpx 0 rgba(239, 243, 255, 1);
			.fix-btn{
				width: 200rpx;
				height: 100rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 100rpx;
				color: #999999;
				background: #F7F7F7;
				border-radius: 8rpx;
				border: 1rpx solid #979797;
			}
			.fix-active{
				background: #EAF2FE;
				border: 1rpx solid #4B87FC;
				color: #4B87FC;
			}
			.normal-btn{
				width: 460rpx;
				height: 100rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 100rpx;
				color: #999999;
				background: #F7F7F7;
				border-radius: 8rpx;
				border: 1rpx solid #979797;
			}
			.normal-active {
				background: #4B87FC;
				color: #FFFFFF;
				border: 1rpx solid #4B87FC;
			}
			
		}
	}
</style>
