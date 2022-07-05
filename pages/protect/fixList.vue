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
				<picker class="picker  " @change="BuildingChange" :value="building" :range="buildingList">
					<text>
						{{building>-1?buildingList[building]:'设备类型'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker  " @change="LayerChange" :value="layer" :range="LayerList">
					<text >
						{{layer>-1?LayerList[layer]:'报修日期'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" v-show="TabCur==0">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>灭火器001</text>
					<view class="btn" @tap="handleDetail()">查看</view>
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
						<text class="value">维修中</text>
					</view>
					<view class="word6 flex justify-between align-center">
						<text class="desc">完成时间</text>
						<text class="value">--</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-show="TabCur==1">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>灭火器003</text>
					<view class="btn"  @tap="handleDetail()">查看</view>
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
					<view class="word6 flex justify-between align-center">
						<text class="desc">完成时间</text>
						<text class="value">2022-05-20 11:22:33</text>
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
			TabList: ['未完成','已完成'],
			TabCur: 0,
			scrollLeft: 0,
			building: -1,
			buildingList: ['1栋', '2栋', '3栋'],
			layer: -1,
			LayerList: ['2022-07-05', '2022-07-06', '2022-07-08'],
		};
	},
	methods: {
		tabSelect(e) {
			console.log(this.TabList[e.currentTarget.dataset.id])
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		BuildingChange(e) {
			this.building = e.detail.value
			console.log(this.buildingList[this.building])
		},
		LayerChange(e) {
			this.layer = e.detail.value
			console.log(this.LayerList[this.layer])
		},
		handleDetail(){
		
		},
	}
	}
</script>

<style lang="scss">
	.tags-content{
		.choose{
			margin-top: 90rpx;
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
			padding: 0 32rpx;
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
					.value{
						color: #333333;
					}
				}
			}
		}
		
		
		
	}

</style>
