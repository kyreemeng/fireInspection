<template>
	<view class="tags-content">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="choose flex justify-between align-center">
				<picker class="picker  " @change="DeviceChange" :value="deviceIndex"  :range="deviceTypeList">
					<text>
						{{deviceIndex>-1?deviceTypeList[deviceIndex]:'设备类型'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker"  mode="date" :value="reportDate"   @change="DateChange">
					<text >
						{{reportDate?reportDate:'报修日期'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" >
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" >
			<view class="item" v-for="(item,index) in repairList " :key="index">
				<view class="title flex justify-between align-center">
					<text>灭火器001</text>
					<view class="btn" @tap="handleDetail(item.repairFlowId)" v-show="item.repairStatus!=3">查看</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.campus?item.campus:''}}{{item.building?item.building:''}}{{item.floor?item.floor:''}}{{item.roomName?item.roomName:''}}</text>
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
						<text class="value" v-if="item.repairStatus==1">未开始</text>
						<text class="value" style="color:#FF8935;" v-else-if="item.repairStatus==2">进行中</text>
						<text class="value" style="color: #15C46B;" v-else-if="item.repairStatus==3">已完成</text>
						<text class="value" v-else>--</text>
					</view>
					<view class="word6 flex justify-between align-center">
						<text class="desc">完成时间</text>
						<text class="value" v-if="TabCur==0">--</text>
						<text class="value" v-else>{{item.completeTime}}</text>
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
			TabList: ['未完成','已完成'],
			TabCur: 0,
			scrollLeft: 0,
			deviceIndex: -1,
			deviceTypeList:[],
			deviceType:null,
			reportDate:'',
			downOption: {
				auto: false
			},
			upOption: {
				auto: false
			},
			mescroll: null,
			mescrollTop: 0,
			mescrollBottom: 0,
			repairStatus:2, //  2:未完成 3：已完成
			repairList:[],
		};
	},
	onLoad() {
		this.mescrollTop = uni.upx2px(60)+this.CustomBar;
	},
	onReady() {
		this.getDeviceTypeList()
	},
	onShow() {
		this.canReset && this.mescroll.resetUpScroll() // 重置列表数据为第一页
		this.canReset && this.mescroll.scrollTo(0,0) // 把滚动条也重置到顶部
		this.canReset = true // 过滤第一次的onShow事件
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			this.repairStatus = this.TabCur+2
			this.mescroll.resetUpScroll();
		},
		DeviceChange(e) {
			this.deviceIndex = e.detail.value
			this.deviceType = this.deviceTypeList[this.deviceIndex]
			console.log('deviceType：'+this.deviceType)
			this.mescroll.resetUpScroll();
		},
		DateChange(e) {
			this.reportDate = e.detail.value
			this.mescroll.resetUpScroll();
			console.log(this.reportDate)
		},
		handleDetail(repairFlowId){
		uni.navigateTo({
			url:'repairDetail?repairFlowId='+repairFlowId	
		})
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
			repairStatus:this.repairStatus,
		};
		if(this.deviceType){
			param.deviceType = this.deviceType
			
		}
		if(this.reportDate){
			param.reportDate = this.reportDate
			
		}
			this.$api
				.post('/firecontrol/api/wx/maintenance/getRepairPage', param, null)
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
		getDeviceTypeList: function() {
			uni.showLoading();
			let param = {};
			this.$api
				.get('/firecontrol/api/wx/maintenance/getDeviceTypeList', param, null)
				.then(res => {
					uni.hideLoading();
					this.deviceTypeList = res
					
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
	.tags-content{
		.choose{
			width: 100%;
			height: 88rpx;
			background: #FFFFFF;
			position: fixed;
			top: 90rpx;
			.picker{
				width: 375rpx;
				height: 88rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #354052;
				line-height: 88rpx;
				.box-icon{
					font-size: 40rpx;
					margin-left: 6rpx;
				}
			}
		}
		.list{
			width: 100%;
			.item{
				margin-top: 30rpx;
				padding: 0 32rpx;
				width: 100%;
				border-radius: 8rpx;
				.title{
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					border-bottom: 1rpx solid  #E5E5E5;
					background: #FFFFFF;
					.btn{
						width: 110rpx;
						height: 54rpx;
						border-radius: 8rpx;
						border: 2rpx solid #6190E8;
						text-align: center;
						font-size: 28rpx;
						font-weight: 400;
						color: #6190E8;
						line-height: 54rpx;
					}
				}
				.info{
					width: 100%;
					padding: 24rpx 28rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 54rpx;
							background: #FFFFFF;
					.value{
						width: 490rpx;
						text-align: right;
						color: #333333;
					}
				}
			}
		}
		
		
		
	}

</style>
