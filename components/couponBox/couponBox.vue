<template>
	<view>

		<uni-list v-if="!isCouponDataAvailable">
			<text>暂无优惠券</text>
		</uni-list>
		<uni-list v-else>
			<uni-list-item clickable @click="selectCoupon(0, '不选择优惠券')" title="不选择优惠券"></uni-list-item>
			<uni-list-item clickable v-for="coupon in couponBoxOption.couponData" :key="coupon.id" :title="coupon.title"
				@click="selectCoupon(coupon.id, coupon.title)"></uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	export default {
		props: {
			// 定义组件的属性，使用对象形式
			couponBoxOption: {
				type: Object,
				default: () => ({
					isShow: false, // 控制弹出窗口的显示和隐藏
					radioVal: 0, // 选中的优惠券的值
					text: '无',
					isChecked: false, // 是否选中了优惠券
					couponData: [{
						id: 1,
						title: "1"
					}, {
						id: 2,
						title: "2"
					}] // 优惠券数据列表
				})
			}
		},
		// data() {
		// 	return {
		// 		isCouponDataAvailable: false // 添加该属性用于判断是否有优惠券数据可用
		// 	};
		// },
		computed: {
			// 是否有优惠券
			isCouponDataAvailable() {
				console.log('多少优惠券', this.couponBoxOption.couponData.length)
				return this.couponBoxOption.couponData.length > 0;
			}
			// 发送请求 获取优惠券

		},
		methods: {
			// 选中优惠券的回调函数
			selectCoupon(id, title) {
				this.couponBoxOption.radioVal = id; // 更新选中的优惠券的值
				this.couponBoxOption.isShow = false; // 隐藏弹出窗口
				this.couponBoxOption.isChecked = id !== 0; // 更新是否选中了优惠券的状态
				if (id !== 0) {
					// 根据优惠券类型设置文本
					this.couponBoxOption.text = title;
				} else {
					this.couponBoxOption.text = '无'
	
				}
				// 触发父组件的 selectedCoupon 事件，将选中的优惠券信息传递给父组件
				console.log('优惠券的值', id, '文本', this.couponBoxOption.text)
				console.log('子组件的', this.couponBoxOption)
				this.$emit('selectedCoupon', {id, text:this.couponBoxOption.text});
			}
		}
	};
</script>

<style>

</style>