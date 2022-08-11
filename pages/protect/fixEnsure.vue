<template>
	<view class="fixensure-content">
		<view class="choose flex justify-between align-center ">
				<picker class="picker  " @change="DeviceChange" :value="deviceIndex" :range-key="'deviceType'" :range="deviceTypeList">
					<text>
						{{deviceIndex>-1?deviceTypeList[deviceIndex].deviceType:'设备类型'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker"  mode="date" :value="reportDate"  :end="currentDate" @change="DateChange">
					<text >
						{{reportDate?reportDate:'报修日期'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" >
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" >
			<view class="item" v-for="(item,index) in repairList" :key="index">
				<view class="title flex justify-between align-center">
					<text>{{item.deviceName}}</text>
					<view class="btn" @tap="handleDetail(item.repairFlowId)">查看</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.campus}}{{item.building}}{{item.floor}}{{item.roomName}}</text>
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
			deviceIndex: -1,
			deviceTypeList: [],
			deviceType:null,
			downOption: {
				auto: false
			},
			upOption: {
				auto: false
			},
			mescroll: null,
			mescrollTop:0,
			mescrollBottom:0,
			repairList:[],
			deviceTypeList:[],
			currentDate:null,
			reportDate:'',
		};
	},
	onLoad() {
		let date = new Date();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let date2 = new Date(date);
		date2.setDate(day - 6);
		let month2 = date2.getMonth() + 1;
		let day2 = date2.getDate();
		this.currentDate = date.getFullYear() + "-" + (month > 9 ? month : ('0' + month)) + "-" + (day > 9 ? day : ('0' +
			day));
		
		this.mescrollTop = uni.upx2px(90);
	},
	onReady() {
		this.getDeviceTypeList()
	},
	onShow() {
		
	},
	methods: {
		DeviceChange(e) {
			this.deviceIndex = e.detail.value
			this.deviceType = this.deviceTypeList[this.deviceIndex].deviceType
			this.mescroll.resetUpScroll();
			console.log(this.deviceTypeList[this.deviceIndex].deviceType)
		},
		DateChange(e) {
			this.reportDate = e.detail.value
			this.mescroll.resetUpScroll();
			console.log(this.reportDate)
		},
		handleDetail(repairFlowId){
		uni.navigateTo({
			url:'fixDetail?repairFlowId='+repairFlowId	
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
		};
		if(this.deviceType){
			param.deviceType = this.deviceType
			
		}
		if(this.reportDate){
			param.reportDate = this.reportDate
			
		}
			this.$api
				.post('/firecontrol/api/wx/maintenance/getPendingConfirmRepairPage', param, null)
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
				.get('/firecontrol/api/manage/deviceType/getDeviceTypeList', param, null)
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
	.fixensure-content{
		.choose{
			width: 100%;
			height: 88rpx;
			background: #FFFFFF;
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
				width: 100%;
				padding: 0 32rpx;
				border-radius: 8rpx;
				.title{
					width: 100%;
					height: 80rpx;
					background: #FFFFFF;
					padding: 0 28rpx;
					border-bottom: 1rpx solid  #E5E5E5;
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
