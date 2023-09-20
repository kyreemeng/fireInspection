<template>
	<view class="fixensure-content">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="choose flex justify-between align-center ">
				<picker class="picker  " @change="DeviceChange" :value="deviceIndex"  :range="deviceTypeList" v-if="TabCur==1">
					<text>
						{{deviceIndex>-1?deviceTypeList[deviceIndex]:'设备类型'}}
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
				<view v-if="TabCur==0">
					<view class="title flex justify-between align-center">
						<text >{{item.repairTitle}}</text>
						<view class="btn" @tap="handleNormal(item)">查看</view>
					</view>
					<view class="info">
						<view class="word1 flex justify-between align-center">
							<text class="desc">设备名称</text>
							<text class="value">{{item.deviceName}}</text>
						</view>
						<view class="word2 flex justify-between align-center">
							<text class="desc">详细地址</text>
							<text class="value">{{item.addressDetail}}</text>
						</view>
						<view class="word3 flex justify-between align-center">
							<text class="desc">故障描述</text>
							<text class="value">{{item.faultDescription}}</text>
						</view>
						<view class="word4 flex justify-between align-center">
							<text class="desc">报修时间</text>
							<text class="value">{{item.reportTime}}</text>
						</view>
					</view>
				</view>
			<view v-else>
				<view class="title flex justify-between align-center">
					<text >{{item.deviceName}}</text>
					<view class="btn" @tap="handleDetail(item.repairFlowId)">查看</view>
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
			TabList: ['普通报修','巡检报修'],
			TabCur: 0,
			scrollLeft: 0,
			deviceIndex: -1,
			deviceTypeList:[],
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
		
		this.mescrollTop = uni.upx2px(8)+this.CustomBar;
	},
	onReady() {
		
	},
	onShow() {
		this.canReset && this.mescroll.resetUpScroll() // 重置列表数据为第一页
		this.canReset && this.mescroll.scrollTo(0,0) // 把滚动条也重置到顶部
		this.canReset = true // 过滤第一次的onShow事件
			this.getDeviceTypeList()
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			console.log(this.TabCur)
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
		handleNormal(item){
		uni.navigateTo({
			url:"normalRepairEnsure?item=" +JSON.stringify(item)
		})
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
		let reapairUrl;
		
		if(this.TabCur==0){  //普通报修
			reapairUrl='/firecontrol/api/wx/normalRepair/queryWaitConfirmNormalRepairPage'
			if(this.reportDate){
				param.reportBeginTime = this.reportDate
				param.reportEndTime = this.reportDate
				
			}
			
		}else {
			reapairUrl='/firecontrol/api/wx/maintenance/getPendingConfirmRepairPage'
			
			if(this.reportDate){
				param.reportDate = this.reportDate
				
			}
			if(this.deviceType){
				param.deviceType = this.deviceType
				
			}
		}
	
		
		
			this.$api
				.post(reapairUrl, param, null)
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
	.fixensure-content{
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
