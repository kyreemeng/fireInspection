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
						{{building>-1?buildingList[building]:'楼宇选择'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker  " @change="LayerChange" :value="layer" :range="LayerList">
					<text >
						{{layer>-1?LayerList[layer]:'楼层选择'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" v-show="TabCur==0">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>主入口东边走廊1号巡检点</text>
					<view class="btn" @tap="handleScan()">扫码绑定</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">设备数量</text>
						<text class="value">20</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">当前状态</text>
						<text class="value">可用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-show="TabCur==1">
			<view class="item">
				<view class="title flex justify-between align-center">
					<text>主入口东边走廊1号巡检点</text>
					<view class="re-btn"  @tap="handleScan()">重新绑定</view>
				</view>
				<view class="info">
					<view class="word1 flex justify-between align-center">
						<text class="desc">所在位置</text>
						<text class="value">教学楼1号楼 / 1F</text>
					</view>
					<view class="word2 flex justify-between align-center">
						<text class="desc">设备数量</text>
						<text class="value">20</text>
					</view>
					<view class="word3 flex justify-between align-center">
						<text class="desc">当前状态</text>
						<text class="value">可用</text>
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
			TabList: ['未绑定','已绑定'],
			TabCur: 0,
			scrollLeft: 0,
			building: -1,
			buildingList: ['1栋', '2栋', '3栋'],
			layer: -1,
			LayerList: ['1层', '2层', '3层'],
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
		handleScan(){
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
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
					line-height: 54rpx;
					.value{
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
