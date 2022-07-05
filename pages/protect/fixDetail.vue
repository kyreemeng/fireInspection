<template>
	<view class="content">
		<view class="point_name">
			<view class="box">
				<view class="top">
					<text class="name">灭火器003</text>
				</view>
				<view class="bottom flex-direction justify-between">
					<view class="word flex justify-between align-center">
						<text>所在位置</text><text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>设备类型</text><text class="value">消防设备</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>异常指标</text><text class="value">铅封是否完好</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>照片取证</text><text class="value">照片1</text>
					</view>
					<view class="word flex justify-between align-center">
						<text>报修备注</text><text class="value">备注信息备注信息</text>
					</view>
				</view>
			</view>
			<view class="fix-date">
				<text class="title">维修预计完成时间</text>
				<view class="date-content">
					<input type="text" placeholder="请选择时间">
				</view>
			</view>
			<view class="fix-remarks">
				<text class="title">维修计划备注</text>
				<view  class="remarks-content">
					<input type="text" placeholder="请输入备注">
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
