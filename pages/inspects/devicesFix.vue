<template>
	<view class="content">
		<view class="point_name">
			<text class="title">设备信息</text>
			<view class="box">
				<view class="top">
					<text class="name">灭火器001</text>
				</view>
				<view class="bottom flex-direction justify-between">
					<view class="word flex justify-between align-center">
						<text>所在位置</text><text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>具体位置</text><text class="value">101房间</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>设备编号</text><text class="value">S20220501010001</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-info">
			<text class="title">报修信息</text>
			<view class="list">
				<view class="fireFight-dev flex justify-between align-center">
					<view class="desc">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">拍照取证</text>
					</view>
					<view class="name flex  align-center" >
						<text class="box-icon cuIcon-roundadd text-black text-bold" ></text>
					</view>
				</view>
				<view class="extra-dev flex justify-between align-center"   >
					<view class="desc flex  align-center">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">备注信息</text>
					</view>
					<view class="name">
					</view>
				</view>
				<view class="remarks">
					<input type="text" placeholder="请输入备注信息"  >
				</view>
			</view>
		</view>
	<view class="bottom-btn">
		<view class="btn" @tap="fixSubmit()">
			确认报修
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			fixSubmit() {
				
			},
			
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 176rpx;
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
		.fix-info{
			width: 686rpx;
			margin-top: 56rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			.list{
				margin-top: 24rpx;
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
				.remarks{
					width: 100%;
					padding: 30rpx  30rpx;
					background: #FFFFFF;
					input{
						text-align: left;
					}

				}
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
