<template>
	<view class="content">
		<view class="info">
			<image @tap="handleMessage()" class="msg" src="../../static/image/my/icon_message.png" mode="aspectFit"></image>
			<view class="detail flex  align-center">
				<image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
				<view class="word">
					<view class="name flex  align-center">
						<text class="value">{{nickname}}</text><text class="line">|</text><view class="tag">{{job}}</view>
					</view>
					<view class="tel">
						{{phone}}
					</view>
				</view>
			</view>
		</view>
		<view class="process">
			<text class="title">任务完成情况</text>
			<view class="box-area">
				<view class="item1 flex justify-between align-center">
					<view class="box ">
						<view class="num text-orange">
							<text>{{currentCheckComplete}}</text><text>/</text><text>{{currentCheckAll}}</text>
						</view>
						<view class="desc">
							本期巡检任务
						</view>
					</view>
					<view class="box ">
						<view class="num text-green">
							<text>0</text><text>/</text><text>0</text>
						</view>
						<view class="desc">
							上期巡检任务
						</view>
					</view>
				</view>
				<view class="item2 flex justify-between align-center">
					<view class="box ">
						<view class="num text-red">
							<text>{{currentMaintenanceComplete}}</text><text>/</text><text>{{currentMaintenanceAll}}</text>
						</view>
						<view class="desc">
							本期维保任务
						</view>
					</view>
					<view class="box ">
						<view class="num text-blue">
							<text>0</text><text>/</text><text>0</text>
						</view>
						<view class="desc">
							上期维保任务
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
				avatarUrl:'',
				job:'职务',
				nickname:'昵称',
				phone:'13000000000',
				sex:'男',
				currentCheckAll:0 ,//本期巡检任务（所有）
				currentCheckComplete:0,//本期巡检任务（已完成）
				currentMaintenanceAll:0,//本期维保任务（所有）
				currentMaintenanceComplete:0,//本期维保任务（已完成）
			};
		},
		onLoad() {
			
		},
		onReady() {
			
		},
		onShow() {
			this.getUserInfo()
			this.getTaskSpeed()
		},
		
		methods: {
			handleMessage(){
				uni.navigateTo({
					url:'message'
				})
			},
			getUserInfo: function() {
				uni.showLoading();
				let param = {};
				this.$api
					.get('/firecontrol/api/wx/user/getUserInfo', param, null)
					.then(res => {
						uni.hideLoading();
						this.avatarUrl = res.avatarUrl
						this.nickname = res.nickname
						this.job = res.job
						this.phone = this.setMobile(res.phone)
						
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});
			
			},
			getTaskSpeed: function() {
				uni.showLoading();
				let param = {};
				this.$api
					.get('/firecontrol/api/wx/user/getTaskSpeed', param, null)
					.then(res => {
						uni.hideLoading();
						this.currentCheckComplete = res.currentCheckComplete  //本期巡检任务（已完成）
						this.currentCheckAll = res.currentCheckAll  //本期巡检任务（所有）
						this.currentMaintenanceComplete = res.currentMaintenanceComplete  //本期维保任务（已完成）
						this.currentMaintenanceAll = res.currentMaintenanceAll //本期维保任务（所有）
						
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "接口请求异常"
						})
					});
			
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: url(https://kyree.me/img/bg_other.png) no-repeat center center;
		background-size: cover;
		background-attachment: fixed;
	
	}
.content{
	.info{
		width: 100%;
		height: 240rpx;
		margin-top: 54rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		padding: 26rpx 26rpx 66rpx 32rpx;
		.msg{
			width: 39rpx;
			height: 44rpx;
			margin-left: 592rpx;
		}
		.avatar{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 1rpx solid #E5E5E5;
		}
		.word{
			margin-left: 20rpx;
			height: 120rpx;
			.name{
				.value{
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
				}
				.line{
					margin-left: 15rpx;
				}
				.tag{
					padding: 2rpx 16rpx;
					text-align: center;
					margin-left: 15rpx;
					background: #DFEDFF;
					border-radius: 18rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #37A1FA;
					line-height: 36rpx;
				}
			}
			.tel{
				font-size: 26rpx;
				font-weight: 500;
				color: #333333;
				line-height: 37rpx;
				margin-top: 16rpx;
			}
		}
	}
	.process{
		width: 100%;
		margin-top: 54rpx;
		.title{
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 45rpx;
		}
		.box-area{
			margin-top: 24rpx;
			width: 100%;
			.item1,.item2{
				.box{
					width: 325rpx;
					height: 287rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					padding: 88rpx 0rpx 20rpx 0rpx;
					text-align: center;
					.num{
						font-size: 44rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						line-height: 51rpx;
					}
					.desc{
						margin-top: 82rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #333333;
						line-height: 45rpx;
					}
				}
			}
			.item2{
				margin-top: 40rpx;
			}
		}
	}
}
</style>
