<template>
	<view class="fixensure-content">
		<view class="choose flex justify-between align-center ">
				<picker class="picker  " @change="BuildingChange" :value="building" :range="buildingList">
					<text>
						{{building>-1?buildingList[building]:'消息类型'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
				<picker class="picker  " @change="LayerChange" :value="layer" :range="LayerList">
					<text >
						{{layer>-1?LayerList[layer]:'通知日期'}}
					</text>
					<text class="box-icon cuIcon-triangledownfill text-grey" ></text>
				</picker>
		</view>
		<view class="list" >
			<view class="item" v-for="item in 2" :key="item">
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
		</view>
	
	</view>
	
</template>

<script>
	export default {
	data() {
		return {
			building: -1,
			buildingList: ['1栋', '2栋', '3栋'],
			layer: -1,
			LayerList: ['2022-07-05', '2022-07-06', '2022-07-08'],
		};
	},
	methods: {
		BuildingChange(e) {
			this.building = e.detail.value
			console.log(this.buildingList[this.building])
		},
		LayerChange(e) {
			this.layer = e.detail.value
			console.log(this.LayerList[this.layer])
		},
		handleDetail(){
		uni.navigateTo({
			url:'fixDetail'
		})
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
