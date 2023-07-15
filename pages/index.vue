<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper class="swiper-box" :indicator-dots='banner.indicatorDots' :autoplay='banner.autoplay'
			:circular='banner.circular' :interval='banner.interval' :duration='banner.duration'>
			<swiper-item v-for='(item, index) in banner.list' :key='index'>
				<image :src='item' class='slide-image' />
			</swiper-item>
		</swiper>

		<!-- 键盘组件 收费组件-->
		<!-- Card component -->
		<view class="card">
			<view class="card-content">

				<uni-notice-bar show-icon scrollable class="notice-bar"
					text="缴费说明：自2023年8月1日起，**停车费调整至16元/小时;**会员银卡1250积分/小时，金卡550积分/小时；点击 会员-会员卡即可注册成为会员，新会员免费赠送2500积分哦" />
				<uni-list class="car_list">
					<uni-list-item title="历史车牌" rightText="暂无" />
				</uni-list>
				<!-- 				<text class="card-title">缴费说明：</text>
				<text class="card-description">自2023年8月1日起，**停车费调整至16元/小时；</text>
				<text class="card-description">**会员银卡1250积分/小时，金卡550积分/小时；</text>
				<text class="card-description">点击 会员-会员卡即可注册成为会员，新会员免费赠送2500积分哦</text> -->

				<view class="uni-padding-wrap uni-common-mt" style="width: 100%;margin-bottom: 2rpx;">
					<button type="warn" size="mini" @click="chepai"
						style="width: 100%;font-weight: bold;font-size: 35rpx;">费用查询</button>
				</view>

			</view>
		</view>

		<!-- 四个分支模块 -->
		<view class='flexs flex-wrap'>
			<view class="a_one">
				<view class="flex-row">
					<uni-group mode="card" @tap="getLocation" class="a_group">
						<view class="a">
							<uni-icons type="eye" color="#ff0000"></uni-icons>
							<view class="a_text" style="color:#ff0000 ;font-size: larger;">反向寻车</view>
						</view>
					</uni-group>

					<uni-group mode="card" @tap="goto('/pages/coupon/coupon')" class="a_group">
						<view class="a">
							<uni-icons type="wallet" color="#1a6aff"></uni-icons>
							<view class="a_text" style="color:#1a6aff ;font-size: larger;">优惠券包</view>
						</view>
					</uni-group>
				</view>
			</view>

			<view class="b_two">
				<view class="flex-row">
					<uni-group mode="card" @tap="goto('/pages/integral/integral')" class="a_group">
						<view class="a">
							<uni-icons type="gift" color="#03ffe2"></uni-icons>
							<view class="a_text" style="color: #03ffe2 ;font-size: larger;">我的积分</view>
						</view>
					</uni-group>

					<uni-group mode="card" @tap="goto('/pages/bill/bill')" class="a_group">
						<view class="a">
							<uni-icons type="cart" color="#ff7411"></uni-icons>
							<view class="a_text" style="color: #ff7411 ;font-size: larger;">历史账单</view>
						</view>
					</uni-group>
				</view>
			</view>

			<view class="e_group">
				<uni-group mode="card" @tap='scanCode'>
					<view class="e">
						<uni-icons type="scan" color="#15ff11"></uni-icons>
						<view class='e_text' style="color: #15ff11 ; font-size: larger;">扫码领券</view>
					</view>
				</uni-group>
			</view>
		</view>



	</view>
</template>

<script>
	export default {

		components: {},

		data() {
			return {
				banner: {
					indicatorDots: false,
					autoplay: true,
					circular: true,
					interval: 5000,
					duration: 1000,
					list: ['../static/images/banner/banner01.jpg', '../static/images/banner/banner02.jpg']
				},
				historyData: []
			};
		},
		methods: {
			// 页面跳转
			goto(url) {
				this.$tab.navigateTo(url)
			},

			chepai() {
				this.$tab.navigateTo('/pages/searchCar/searchCar');
			},

			//获取手机经纬度，打开地图 
			getLocation() {
				console.log('点击了地图');
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
				uni.getLocation({
					type: 'gcj02', //坐标系
					success: (res) => {
						var latitude = res.latitude; // 维度
						var longitude = res.longitude; // 经度
						console.log(latitude, longitude);
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							scale: 28 //缩放级别
						});
						console.log("调用地图")

					}
				});
			},
			//打开手机二维码扫码
			scanCode() {
				console.log("打开手机二维码扫码")
				uni.scanCode({
					success: (res) => {
						let param = {
							coupon_str: res.result // 保存二维码的数据
						};
						this.$modal.loading("正在领取中，请耐心等待...");
						coupon.drawCoupon(param) // 自定义领券功能的处理
							.then((res) => {
								this.$modal.closeLoading();
								return this.$modal.msgSuccess('领取成功');

							})
							.catch((err) => {
								this.$modal.closeLoading();
								this.$modal.msgError(err.message);

							});
					}
				});
			},

		},
		onLoad: function() {},

	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.swiper-box {
		height: 380rpx;
		width: 100%;
	}

	.swiper-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide-image {
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		object-fit: cover;
	}


	.card {
		position: relative;
		width: 85%;
		/* max-width: 400rpx; */
		height: 300rpx;
		background-color: #fff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin-top: 20rpx;
		top: -90rpx;
	}

	.card-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
	}
.car_list{
	width: 100%;
	padding: 5rpx;
}
	.notice-bar {
		font-size: 40rpx;
		/* 调整通知栏文字大小 */
		color: #333333;
		/* 设置通知栏文字颜色 */
		background-color: #FDF4F1;
		/* 设置通知栏背景颜色 */
		/* padding: 10rpx; */
		/* 设置通知栏内边距 */
		width: 100%;
		/* margin-bottom: 10rpx; */
	}

	.card-title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.card-description {
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.flex,
	.flex-wrap {
		width: 90%;
		/* 		padding: 0%;
		margin: 0%; */
		display: block;
		box-sizing: content-box;
		margin-top: -80rpx;
	}

	.uni-group {
		padding: 0%;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.a_group {
		width: 50%;
		/* padding: -80rpx; */

	}

	.a_text {
		padding-left: 20rpx;
	}

	.a {
		display: flex;
		box-sizing: border-box;
	}

	.e {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
	}

	.e_group {
		width: 100%;

	}

	.e_text {
		padding-left: 20rpx;

	}
</style>