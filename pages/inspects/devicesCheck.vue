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
		<view class="info">
			<text class="title">指标信息</text>
			<view class="list">
				<view class="item  flex justify-between align-center">
					<text>支架是否牢固、完好</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal">
							正常
						</view>
						<view class="abnormal">
							异常
						</view>
					</view>
				</view>
				<view class="item  flex justify-between align-center">
					<text>是否在正常压力范围内</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal">
							正常
						</view>
						<view class="abnormal">
							异常
						</view>
					</view>
				</view>
				<view class="item  flex justify-between align-center">
					<text>铅封是否完好</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal">
							正常
						</view>
						<view class="abnormal">
							异常
						</view>
					</view>
				</view>
				<view class="item  flex justify-between align-center">
					<text>支架是否清洁、干净</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal">
							正常
						</view>
						<view class="abnormal">
							异常
						</view>
					</view>
				</view>
				<view class="item  flex justify-between align-center">
					<text>是否在有效检测期内</text>
					<view class="right-btn flex justify-between align-center">
						<view class="normal">
							正常
						</view>
						<view class="abnormal">
							异常
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
		<view class="btn-area flex align-center justify-between">
			<view class="fix-btn" @tap="handleFix()">
				报修
			</view>
			<view class="normal-btn" @tap="handleNormal()">
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
				showfireFight: true,
				showExtra: true,
			};
		},
		methods: {
			handleFix(){
				uni.navigateTo({
					url: "./devicesFix"
				})
			},
			handleNormal(){
				
			}
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
				background: #EAF2FE;
				border-radius: 8rpx;
				border: 1rpx solid #4B87FC;
				font-size: 36rpx;
				font-weight: 500;
				color: #4B87FC;
				line-height: 100rpx;
			}
			.normal-btn {
				width: 460rpx;
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
