<template>
	<view class="content">
		<view class="point_name">
			<text class="title">维修信息</text>
			<view class="box">
				<view class="top flex justify-between align-center">
					<text class="name">维修标题</text>
					<input type="text" v-model="repairTitle" placeholder="(必填)">
				</view>
				<view class="bottom flex-direction justify-between">
					<view class="word flex justify-between align-center">
						<text>设备名称</text><input  type="text" v-model="deviceName" placeholder="(必填)">
					</view>
					<view class="word flex justify-between align-center">
						<text>详细地址</text><input type="text" v-model="addressDetail" placeholder="(必填)">
					</view>
					<view class="word flex justify-between align-center" >
						<text>故障描述</text><input type="text" v-model="faultDescription" placeholder="(必填)">
					</view>
				</view>
			</view>
		</view>
		<view class="fix-info">
			<text class="title">现场信息</text>
			<view class="list">
				<view class="fireFight-dev flex justify-between align-center">
					<view class="desc">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">故障图片</text>
					</view>
					<view class="name flex  align-center">
						<view class="action">
							{{imgList.length}}/6
						</view>
					</view>
				</view>
				<view class="cu-form-group" style="padding-top: 20rpx;">
					<view class="grid col-3 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<6">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="extra-dev flex justify-between align-center">
					<view class="desc flex  align-center">
						<text class="box-icon cuIcon-round text-blue"></text>
						<text class="box-title">备注信息</text>
					</view>
					<view class="name">
					</view>
				</view>
				<view class="remarks">
					<input type="text" v-model="memo" placeholder="请输入备注信息">
				</view>
			</view>
		</view>




		<view class="bottom-btn">
			<view class="btn" @tap="handleCommit()">
				确认报修
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$api.config.baseUrl,
				repairTitle:null,
				deviceName:null,
				addressDetail:null,
				faultDescription:null,
				imgList:[],
				imagesUrl:[],
				memo: null,
			};
		},
		onLoad() {
			

		},
		onReady() {

		},
		onShow() {

		},
		methods: {
			handleCommit() {
				if(!this.repairTitle){
					uni.showToast({
						icon: "none",
						title: "请填写维修标题"
					})
				} else if(!this.deviceName){
					uni.showToast({
						icon: "none",
						title: "请填写设备名称"
					})
				} else if(!this.addressDetail){
					uni.showToast({
						icon: "none",
						title: "请填写详细地址"
					})
				}else if(!this.faultDescription){
					uni.showToast({
						icon: "none",
						title: "请填写故障描述"
					})
				}else if (this.imgList.length < 1) {
					uni.showToast({
						icon: "none",
						title: "请上传故障图片"
					})
				} else {
					this.CommitRepair();
				}

			},
			ChooseImage() {
				uni.chooseImage({
					count: 6, //图片数量
					sizeType: ['compressed'], //压缩
					sourceType: ['album'], //拍照
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						res.tempFilePaths.forEach((item)=>{
						       this.uploadFileSingle(item);
						})

						
					}
				});
			},
			//上传图片
			uploadFileSingle: function(filePath) {
				console.log('开始上传图片')
				uni.uploadFile({
					url: this.baseUrl + '/firecontrol/api/manage/file/upload', //仅为示例，非真实的接口地址
					filePath: filePath,
					name: 'file',
					formData: {
						accessToken: uni.getStorageSync('accessToken')
					},
					success: result => {
						if (result.data) {
							console.log('图片地址：' + result.data);
							let resUrl = result.data.split()
							if (this.imagesUrl.length != 0) {
								this.imagesUrl = this.imagesUrl.concat(resUrl)
							} else {
								this.imagesUrl = resUrl
							}
							console.log('imagesUrl：' +this.imagesUrl)
						}
						uni.hideLoading();
					},
					fail: result => {
						uni.hideLoading();
						console.log(JSON.stringify(result));
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.imagesUrl.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			CommitRepair: function() {
				uni.showLoading();
				let param = {
					repairTitle:this.repairTitle,
					deviceName:this.deviceName,
					addressDetail:this.addressDetail,
					faultDescription:this.faultDescription,
					images: this.imagesUrl,
				};
				
				if (this.memo) {
					param.memo = this.memo
				}
				this.$api
					.post('/firecontrol/api/wx/normalRepair/normalRepairCommit', param, null)
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "新建报修成功"
						})
						setTimeout(function() {
							uni.navigateBack();
						}, 1000);

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
	.content {
		padding-bottom: 176rpx;

		.point_name {
			margin-top: 56rpx;

			.box {
				margin-top: 24rpx;

				.top {
					width: 100%;
					height: 80rpx;
					padding: 0 28rpx;
					background: linear-gradient(180deg, #DEE5FF 0%, rgba(226, 233, 255, 0.2) 100%);
					border-radius: 8rpx 8rpx 0px 0px;
					border-bottom: 1rpx solid #E5E5E5;

					input {
						width: 490rpx;
						text-align: right;
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
						line-height: 80rpx;
					}
				}

				.bottom {
					width: 100%;
					padding: 24rpx 28rpx;
					background: #FFFFFF;
					border-radius: 0 0 8rpx 8rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #858B9C;
					line-height: 40rpx;
					.word{
						margin-top: 10rpx;
					}

					input {
						width: 490rpx;
						text-align: right;
						color: #333333;
					}
				}
			}
		}

		.fix-info {
			width: 686rpx;
			margin-top: 56rpx;
			border-radius: 8rpx;
			padding-bottom: 20rpx;

			.list {
				margin-top: 24rpx;

				.fireFight-dev,
				.extra-dev {
					width: 100%;
					height: 110rpx;
					padding: 32rpx 28rpx;
					background: #FFFFFF;
					border-bottom: 1rpx solid #E5E5E5;
					line-height: 46rpx;

					.box-title {
						margin-left: 12rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #354052;
					}

					.desc {
						.box-icon {
							font-size: 20rpx;
						}
					}

					.name {
						.box-icon {
							font-size: 38rpx;
						}
					}
				}

				.remarks {
					width: 100%;
					padding: 30rpx 30rpx;
					background: #FFFFFF;

					input {
						text-align: left;
					}

				}
			}
		}

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;

		}

		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 174rpx;
			z-index: 999;
			padding: 20rpx 30rpx;
			background: #fff;
			box-shadow: 0 -5rpx 9rpx 0 rgba(239, 243, 255, 1);

			.btn {
				width: 100%;
				height: 100rpx;
				text-align: center;
				background: #4B87FC;
				border-radius: 8rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
			}
		}

	}
</style>
