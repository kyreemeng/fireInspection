<template>
	<view class="fixensure-content">
		<view class="choose flex justify-between align-center ">
				<picker class="picker  " @change="TypeChange" :value="typeIndex" :range="typeList">
					<text>
						{{typeIndex>-1?typeList[typeIndex]:'消息类型'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker"  mode="date" :value="noticeTime"  :end="currentDate" @change="DateChange">
					<text >
						{{noticeTime?noticeTime:'通知日期'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" >
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upcallback" @init="initMescroll" :fixed="true"
			 :top="mescrollTop+'px'" >
			<view class="item" v-for="(item,index) in messageList" :key="index">
				<view class="title flex align-center">
					<text class="icon cuIcon-title"></text>
					<text class="value">巡检任务下达通知</text>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">任务名称</text>
						<text class="value">P-001 主入口东边走廊1号巡检点</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">待检查设备</text>
						<text class="value">20</text>
					</view>
					<view class="word4 flex justify-between align-center">
						<text class="desc">通知时间</text>
						<text class="value">2022-05-20 11:22:33</text>
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
			typeIndex: -1,
			typeList: ['其他', '任务工单'],
			messageType:null,
			downOption: {
				auto: false
			},
			upOption: {
				auto: false
			},
			mescroll: null,
			mescrollTop:0,
			mescrollBottom:0,
			currentDate:null,
			noticeTime:null,
			messageList:[]
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
	
	},
	onShow() {
		
	},
	methods: {
		TypeChange(e) {
			this.typeIndex = e.detail.value
			this.messageType = this.typeList[this.typeIndex]
			console.log('messageType:'+this.messageType)
			this.mescroll.resetUpScroll();
		},
		DateChange(e) {
			this.noticeTime = e.detail.value
			this.mescroll.resetUpScroll();
			console.log(this.noticeTime)
		},
		handleDetail(){
		uni.navigateTo({
			url:'fixDetail'
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
		if(this.messageType){
			param.messageType = this.messageType
			
		}
		if(this.noticeTime){
			param.noticeTime = this.noticeTime
			
		}
			this.$api
				.post('/firecontrol/api/wx/message/getMessagePage', param, null)
				.then(res => {
					uni.hideLoading();
						if (mescroll.num == 1) {
							this.messageList = res.content;
						} else {
							this.messageList = this.messageList.concat(res.content);
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
				background: #FFFFFF;
				border-radius: 8rpx;
				.title{
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					border-bottom: 1rpx solid  #E5E5E5;
					.icon{
						ont-size: 12rpx;
						color: #F32C2F;
					}
					.value{
						margin-left: 12rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
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
				}
			}
		}
		
	
		
	}

</style>
