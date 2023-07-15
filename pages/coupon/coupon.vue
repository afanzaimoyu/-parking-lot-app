<template>
	<view>
		<template>
			<view>

				<uni-list v-if="!isCouponDataAvailable">
					<text>暂无优惠券</text>
				</uni-list>
				<uni-list v-else>
					<uni-list-item clickable v-for="coupon in couponBoxOption.couponData" :key="coupon.id" :title="coupon.title"
						@click="selectCoupon(coupon.id, coupon.title)"></uni-list-item>
				</uni-list>

			</view>
		</template>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// this.init_car()
		},
		computed: {
			// 是否有优惠券
			isCouponDataAvailable() {
				return false;
			}
			// 发送请求 获取优惠券

		},
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>