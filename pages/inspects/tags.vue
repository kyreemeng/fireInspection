<template>
	<view class="tags-content">
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft"  >
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="choose flex justify-between align-center fixed">
				<picker class="picker" @change="BuildingChange" :value="buildingIndex" :range-key="'buildingName'" :range="buildingList">
					<text>
						{{buildingIndex>-1?buildingList[buildingIndex].buildingName:'楼宇选择'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker" @change="FloorChange" :value="floorIndex" :range-key="'floorName'" :range="floorList">
					<text >
						{{floorIndex>-1?floorList[floorIndex].floorName:'楼层选择'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" >
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" >
			<view class="item" v-for="(item,index) in tagsList " :key="index">
				<view class="title flex justify-between align-center">
					<text>{{item.pointName}}</text>
					<view class="btn"  v-show="TabCur==0" @tap="handleScan(item.pointId)">扫码绑定</view>
					<view class="re-btn"  v-show="TabCur==1"  @tap="handleScan(item.pointId)">重新绑定</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">{{item.campusName}}{{item.buildingName}}{{item.floorName}}</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">设备数量</text>
						<text class="value">{{item.deviceNum}}</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">当前状态</text>
						<text class="value">{{item.pointStatus==1?'可用':'不可用'}}</text>
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
			TabList: ['未绑定','已绑定'],
			TabCur: 0,
			scrollLeft: 0,
			buildingIndex: -1,
			buildingList: [],
			floorIndex: -1,
			floorList: [],
			downOption: {
				auto: false
			},
			upOption: {
				auto: false
			},
			mescroll: null,
			mescrollTop:0,
			mescrollBottom:0,
			bindingStatus:1,
			buildingSn:null,
			floorSn:null,
			tagsList:[]
		};
	},
	onLoad() {
		this.mescrollTop = uni.upx2px(60)+this.CustomBar;
	},
	onReady() {
		this.getBuildingList();
	},
	onShow() {
		
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			console.log(this.TabCur)
			if(this.TabCur==0){
				this.bindingStatus=2
			}else if(this.TabCur==1){
				this.bindingStatus=1
			}else {
				console.log('TabCur:'+this.TabCur)
			}
			// this.bindingStatus = this.TabCur+1
			this.mescroll.resetUpScroll();
		},
		//选择楼宇
		BuildingChange(e) {
			this.buildingIndex = e.detail.value
			this.buildingSn = this.buildingList[this.buildingIndex].buildingId
			this.getFloorList(this.buildingSn);
			this.floorIndex = -1
			this.mescroll.resetUpScroll();
			console.log(this.buildingList[this.buildingIndex].buildingId)
			console.log(this.buildingList[this.buildingIndex].buildingName)
		},
		//选择楼层
		FloorChange(e) {
			if(this.buildingSn){
				this.floorIndex = e.detail.value
				this.floorSn = this.floorList[this.floorIndex].floorSn
				this.mescroll.resetUpScroll();
				console.log(this.floorList[this.floorIndex].floorName)
			}else{
				uni.showToast({
					icon: "none",
					title: "请先选择楼宇"
				})
			}
			
		},
		handleScan(pointId){
			uni.scanCode({
				success:(res)=> {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					this.bindingTag(pointId,res.result)
				}
			});
		},
		bindingTag: function(pointId,tagSn) {
			uni.showLoading();
			let param = {
				pointId:pointId,
				tagSn:tagSn,
			};
			this.$api
				.post('/firecontrol/api/wx/tag/bindingTag', param, null)
				.then(res => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: "绑定成功"
					})
					
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: "接口请求异常"
					})
				});
		
		},
		
		getBuildingList: function() {
			uni.showLoading();
			let param = {};
			this.$api
				.get('/firecontrol/api/wx/tag/getCurrentUserBuildingList', param, null)
				.then(res => {
					uni.hideLoading();
					this.buildingList = res
					
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: "接口请求异常"
					})
				});
		
		},
		getFloorList: function(buildingId) {
			uni.showLoading();
			let param = {
				buildingId:buildingId
			};
			this.$api
				.get('/firecontrol/api/wx/tag/getFloorList', param, null)
				.then(res => {
					uni.hideLoading();
					this.floorList = res
					
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: "接口请求异常"
					})
				});
		
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
			bindingStatus:this.bindingStatus,
		};
		if(this.buildingSn){
			param.buildingSn = this.buildingSn
			
		}
		if(this.floorSn){
			param.floorSn = this.floorSn
			
		}
			this.$api
				.post('/firecontrol/api/wx/tag/getPatrolPage', param, null)
				.then(res => {
					uni.hideLoading();
						if (mescroll.num == 1) {
							this.tagsList = res.content;
						} else {
							this.tagsList = this.tagsList.concat(res.content);
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
					padding: 0 28rpx;
					background: #FFFFFF;
					border-bottom: 1rpx solid  #E5E5E5;
					.btn{
						width: 160rpx;
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
					background: #FFFFFF;
					line-height: 54rpx;
					.value{
						width: 490rpx;
						text-align: right;
						color: #333333;
					}
				}
			}
		}
		
			.re-btn{
				width: 160rpx;
				height: 54rpx;
				border-radius: 8rpx;
				border: 2rpx solid #FF8935;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #FF8935;
				line-height: 54rpx;
			}
		
	}

</style>
