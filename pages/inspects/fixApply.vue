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
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
			<view class="item" v-for="(item,index) in repairList" :key="index">
				<view class="title flex justify-between align-center">
					<text>灭火器001</text>
					<view class="review-btn" >{{item.auditStatus==1?'待审核':(item.auditStatus==2?'已审核':'审核不通过')}}</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.building}}{{item.floor}}{{item.roomName}}</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">设备类型</text>
						<text class="value">{{item.deviceType}}</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">异常指标</text>
						<text class="value">{{item.targetName}}</text>
					</view>
					<view class="word4 flex justify-between align-center">
						<text class="desc">报修时间</text>
						<text class="value">{{item.reportTime}}</text>
					</view>
				</view>
			</view>
				</mescroll-uni>
		</view>
		<view class="list" v-show="TabCur==1">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback"  :fixed="true"
			 :top="mescrollTop+'px'" :bottom="mescrollBottom+'px'">
			<view class="item"  v-for="(item,index) in repairList" :key="index">
				<view class="title flex justify-between align-center">
					<text>灭火器002</text>
					<view class="to-review-btn">{{item.auditStatus==1?'待审核':(item.auditStatus==2?'已审核':'审核不通过')}}</view>					
				</view>
			<view class="info">
				<view class="word1 flex justify-between align-center">
					<text class="desc">所在位置</text>
					<text class="value">{{item.building}}{{item.floor}}{{item.roomName}}</text>
				</view>
				<view class="word2 flex justify-between align-center">
					<text class="desc">设备类型</text>
					<text class="value">{{item.deviceType}}</text>
				</view>
				<view class="word3 flex justify-between align-center">
					<text class="desc">异常指标</text>
					<text class="value">{{item.targetName}}</text>
				</view>
				<view class="word4 flex justify-between align-center">
					<text class="desc">报修时间</text>
					<text class="value">{{item.reportTime}}</text>
				</view>
				<view class="word5 flex justify-between align-center">
					<text class="desc">维修状态</text>
					<text class="value">{{item.repairStatus==1?'未开始':(item.repairStatus==2?'进行中':'已完成')}}</text>
				</view>
			</view>
			</view>
			</mescroll-uni>
		</view>
	</view>
	
</template>

<script>
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
	export default {
		components: {
			MescrollUni
		},
	data() {
		return {
			TabList: ['待审核','已审核'],
			TabCur: 0,
			scrollLeft: 0,
			downOption: {
				auto: false
			},
			upOption: {
				auto: false
			},
			mescroll: null,
			mescrollTop: 0,
			mescrollBottom: 0,
			auditStatus:1,
			repairList:[],
		};
	},
	onLoad() {
		this.mescrollTop = uni.upx2px(1)+this.CustomBar
		
	},
	onReady() {
		
	},
	onShow() {
		
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			this.auditStatus = this.TabCur+1
			this.mescroll.resetUpScroll();
		},
		initMescroll: function(mescroll) {
			this.mescroll = mescroll;
			this.mescroll.resetUpScroll();
		},
		upcallback: function(mescroll) {
			uni.showLoading();
			let param = {
				pageNum: mescroll.num,
				pageSize: mescroll.size,
				auditStatus:this.auditStatus
			};
			this.$api
				.post('/firecontrol/api/wx/task/getRepairPage', param, null)
				.then(res => {
					uni.hideLoading();
						if (mescroll.num == 1) {
							this.repairList = res.content;
						} else {
							this.repairList = this.repairList.concat(res.content);
						}
						mescroll.endSuccess(res.content.length, res.content.length >= mescroll.size);
					
				})
				.catch(err => {
					mescroll.endErr();
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: "接口请求异常"
					})
				});
		
		},
		downCallback: function(mescroll) {
			mescroll.resetUpScroll();
		},
	}
	}
</script>

<style lang="scss">
	.tags-content{

		.list{
			width: 100%;
			margin-top: 120rpx;
			.item{
				margin-top: 30rpx;
				padding: 0 32rpx;
				width: 100%;
				background: #FFFFFF;
				border-radius: 8rpx;
				.title{
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					border-bottom: 1rpx solid  #E5E5E5;
					.review-btn{
						padding: 2rpx 12rpx;
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
						width: 490rpx;
						text-align: right;
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
				padding: 2rpx 12rpx;
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
