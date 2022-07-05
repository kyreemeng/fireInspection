<template>
	<view class="fixensure-content">
		<view class="choose flex justify-between align-center ">
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
		<view class="list" >
			<view class="item" v-for="item in 3" :key="item">
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
