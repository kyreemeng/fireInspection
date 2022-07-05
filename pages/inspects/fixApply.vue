<template>
	<view class="tags-content">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="list" v-show="TabCur==0">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>灭火器001</text>
					<view class="review-btn" >待审核</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">设备类型</text>
						<text class="value">消防设备</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">异常指标</text>
						<text class="value">铅封是否完好</text>
					</view>
					<view class="word4 flex justify-between align-center">
						<text class="desc">报修时间</text>
						<text class="value">2022-05-20 11:22:33</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-show="TabCur==1">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>灭火器002</text>
					<view class="to-review-btn">已审核</view>
				</view>
			<view class="info">
				<view class="word1 flex justify-between align-center">
					<text class="desc">所在位置</text>
					<text class="value">教学楼1号楼 / 1F</text>
				</view>
				<view class="word2 flex justify-between align-center">
					<text class="desc">设备类型</text>
					<text class="value">消防设备</text>
				</view>
				<view class="word3 flex justify-between align-center">
					<text class="desc">异常指标</text>
					<text class="value">铅封是否完好</text>
				</view>
				<view class="word4 flex justify-between align-center">
					<text class="desc">报修时间</text>
					<text class="value">2022-05-20 11:22:33</text>
				</view>
				<view class="word5 flex justify-between align-center">
					<text class="desc">维修状态</text>
					<text class="value">已完成</text>
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
			TabList: ['待审核','已审核'],
			TabCur: 0,
			scrollLeft: 0,
		};
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
	}
	}
</script>

<style lang="scss">
	.tags-content{

		.list{
			width: 100%;
			padding: 0 32rpx;
			margin-top: 120rpx;
			.item{
				margin-top: 30rpx;
				width: 100%;
				background: #FFFFFF;
				border-radius: 8rpx;
				.title{
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					border-bottom: 1rpx solid  #E5E5E5;
					.review-btn{
						width: 100rpx;
						height: 36rpx;
						text-align: center;
						background: #E7FCF7;
						border-radius: 4rpx 16rpx 4rpx 4rpx;
						border: 1rpx solid #71EFD2;
						font-size: 22rpx;
						font-weight: 400;
						color: #44D7B6;
						line-height: 36rpx;
					}
				}
				.info{
					width: 100%;
					padding: 24rpx 28rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 54rpx;
					.value{
						color: #333333;
					}
					.word5{
						.value{
							color: #15C46B;
						}
					}
				}
			}
			
		}
		
			.to-review-btn{
				width: 100rpx;
				height: 36rpx;
				text-align: center;
				background: #EEF3FE;
				border-radius: 4rpx 16rpx 4rpx 4rpx;
				border: 1rpx solid  #9FC0FC;
				font-size: 22rpx;
				font-weight: 400;
				color: #6190E8;
				line-height: 36rpx;
			}
		
	}

</style>
