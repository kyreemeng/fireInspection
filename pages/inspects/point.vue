<template>
	<view class="content">
		<view class="point_name">
			<text class="title">巡检点</text>
			<view class="box">
				<view class="top">
					<text class="name">{{pointName}}</text>
				</view>
				<view class="bottom flex-direction justify-between">		
						<view class="word flex justify-between align-center">
							<text>所在位置</text><text class="value">{{buildingName}}{{floorName}}</text>
						</view>
						<view class="word flex justify-between align-center">
							<text>设备数量</text><text class="value">{{deviceNum}}</text>
						</view>
						<view class="word flex justify-between align-center">
							<text>当前状态</text><text class="value">{{pointStatus==1?'可用':'不可用'}}</text>
						</view>
				</view>
			</view>
		</view>
		<view class="point-list">
			<text class="title">设备列表</text>
			<view class="box">
				<view class="fireFight-dev flex justify-between align-center">
					<view class="desc">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">消防设备（{{fireDeviceList.length}}）</text>
					</view>
					<view class="name flex  align-center" @tap="handleFireFight()">
						<text class="box-icon cuIcon-triangledownfill text-blue"  v-if="showfireFight"></text>
						<text class="box-icon cuIcon-triangleupfill text-grey" v-else></text>
					</view>
				</view>
				<view class="fireFight-list" v-show="showfireFight">
					<view class="item flex justify-between align-center" v-for="(item,index) in fireDeviceList" :key="index">
						<view class="num flex  align-center">
						<text class="name">{{item.deviceName}}</text>
						<view class="fix-word" v-show="item.deviceCurrentStatus==2">修</view>
						</view>
						<view class="room">
							{{item.deviceLocation}}
						</view>
						<view class="btn" @tap="handleDetail(item.deviceId)">
							查看
						</view>
					</view>
				</view>
				<view class="extra-dev flex justify-between align-center"   >
					<view class="desc flex  align-center">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">其他设备（{{otherDeviceList.length}}）</text>
					</view>
					<view class="name" @tap="handleExtra()">
						<text class="box-icon cuIcon-triangledownfill text-blue" v-if="showExtra"></text>
						<text class="box-icon cuIcon-triangleupfill text-grey" v-else></text>
					</view>
				</view>
				<view class="fireFight-list" v-show="showExtra">
					<view class="item flex justify-between align-center" v-for="(item,index) in otherDeviceList" :key="index">
						<view class="num flex  align-center">
						<text class="name">{{item.deviceName}}</text>
						<view class="fix-word" v-show="item.deviceCurrentStatus==2">修</view>
						</view>
						<view class="room">
							{{item.deviceLocation}}
						</view>
						<view class="btn" @tap="handleDetail(item.deviceId)">
							查看
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showfireFight:true,
				showExtra:true,
				pointName:'巡检点名称',
				campusName:'校区',
				buildingName:'楼宇',
				floorName:'楼层',
				deviceNum:0,
				pointStatus:1,
				fireDeviceList:[], //消防设备列表
				otherDeviceList:[],//其它设备列表
				targetSn:null,
			};
		},
		onLoad(options) {
			console.log('接收到targetSn：' + options.targetSn)
			this.targetSn = options.targetSn
		},
		onReady() {
			
		},
		onShow() {
			this.getPointDetail(this.targetSn)
		},
		methods:{
			handleFireFight(){
				this.showfireFight = !this.showfireFight
			},
			handleExtra(){
				this.showExtra = !this.showExtra
			},
			handleDetail(deviceId){
				uni.navigateTo({
					url:"./pointDetail?deviceId="+deviceId
				})
			},
			getPointDetail: function(targetSn) {
				uni.showLoading();
				let param = {
					targetSn:targetSn
				};
				this.$api
					.post('/firecontrol/api/wx/patrol/getPointDetail', param, null)
					.then(res => {
						uni.hideLoading();
						this.pointName = res.pointName
						this.campusName = res.campusName
						this.buildingName = res.buildingName
						this.floorName = res.floorName
						this.deviceNum = res.deviceNum
						this.pointStatus = res.pointStatus
						this.fireDeviceList = res.fireDeviceList
						if(res.otherDeviceList){
							this.otherDeviceList = res.otherDeviceList
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
		.point_name{
			margin-top: 56rpx;
			.box{
				margin-top: 24rpx;
				.top{
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					background: linear-gradient(180deg, #DEE5FF 0%, rgba(226, 233, 255, 0.2) 100%);
					border-radius: 8rpx 8rpx 0px 0px;
					border-bottom: 1rpx solid  #E5E5E5;
					.name{
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
						line-height: 80rpx;
					}
				}
				.bottom{
					width: 100%;
					padding: 24rpx 28rpx;
					background: #FFFFFF;
					border-radius:0 0 8rpx 8rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 40rpx;
					.value{
						color: #333333;
					}
				}
			}
		}
		.point-list{
			margin-top: 56rpx;
			.box{
				margin-top: 24rpx;
				width: 100%;
				.fireFight-dev,.extra-dev{
					width: 100%;
					height: 110rpx;
					padding: 32rpx 28rpx;
					background: #FFFFFF;
					border-bottom: 1rpx solid  #E5E5E5;
					line-height: 46rpx;
					.box-title{
						margin-left: 12rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
					}
					.desc{
						.box-icon{
							font-size: 20rpx;
						}
					}
					
					.name{
						.box-icon{
							font-size: 38rpx;
						}
					}
				}
				.fireFight-list{
					width: 100%;
					.item{
						width: 100%;
						padding: 34rpx 28rpx;
						background: #FFFFFF;
						border-bottom: 1rpx solid  #E5E5E5;
						.num{
							.name{
								font-size: 28rpx;
								font-weight: 400;
								color: #666666;
								width: 220rpx;
							}
							.fix-word{
								margin-left: 10rpx;
								text-align: center;
								width: 36rpx;
								height: 36rpx;
								background: #FFF1F0;
								border-radius: 4rpx 16rpx 4rpx 4rpx;
								border: 1rpx solid #FFA39E;
								font-size: 22rpx;
								font-weight: 400;
								color: #F32C2F;
								line-height: 36rpx;
							}
						}
						.room{
							font-size: 28rpx;
							font-weight: 400;
							color: #666666;
						}
						.btn{
							width: 110rpx;
							height: 54rpx;
							text-align: center;
							border-radius: 8rpx;
							border: 2rpx solid #6190E8;
							font-size: 28rpx;
							font-weight: 400;
							color: #6190E8;
							line-height: 54rpx;
						}
					}
				}
				.fireFight-dev{
					border-radius: 8rpx 8rpx 0px 0px;
				}
				.extra-dev{
					border-radius:0 0 8rpx 8rpx;
				}
			}
		}
		.title{
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 45rpx;
		}
	}

</style>
