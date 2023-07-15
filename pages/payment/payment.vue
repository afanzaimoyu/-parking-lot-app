<template>
	<view class="content">
		<uni-section title="当前费用" type="line">
			<template v-slot:right>
				{{currentFee.nowmoney}} 元
			</template>
			<uni-list>
				<uni-list-item title="停车场:" :rightText="currentFee.parkingName" />
				<uni-list-item title="车牌号:" :rightText="currentFee.licensePlate" />
				<uni-list-item title="入场时间:" :rightText="currentFee.entryTime" />
				<uni-list-item title="支付时间:" :rightText="currentFee.paymentTime" />
			</uni-list>
		</uni-section>


		<uni-section title="请选择支付方式" type="line" title-font-size="10" titleColor="#555555">
			<uni-list border-full>
				<checkbox-group @change="selectCoupon">
					<label class="uni-list-cell uni-list-cell-pd">
						<view class="text"><uni-icons type="gift" style="padding: 10rpx;" size="20"></uni-icons>优惠券:
							{{couponBoxOption.text}}
						</view>
						<view class="checkbox-wrapper">
							<checkbox :value="'优惠券'" :checked="couponBoxOption.isChecked" />
						</view>
					</label>

					<label class="uni-list-cell uni-list-cell-pd">
						<view class="text"><uni-icons type="refresh" style="padding: 10rpx;" size="20"></uni-icons>积 分: 暂无可用积分
						</view>
						<view class="checkbox-wrapper">
							<checkbox :value="'积分'" disabled=true />
						</view>
					</label>
				</checkbox-group>

				<view class="text">
					<uni-icons type="wallet" style="padding: 10rpx;" size="20"></uni-icons>需支付
				</view>

			</uni-list>
		</uni-section>


		<button type="warn" style="margin: 10rpx;" @click="handlePay">立即支付</button>

		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<cou :option.sync="couponBoxOption" @selectedCoupon.user="selectedCoupon($event)"></cou>
		</uni-popup>

	</view>
</template>

<script>
	import cou from '@/components/couponBox/couponBox.vue'
	import {
		appInfo
	} from '../../config';
	export default {
		components: {
			cou
		},
		watch: {
			// 监听 ischeckd 取消勾选 文本设置为无
			'couponBoxOption.isChecked'(newVal) {
				if (!newVal) {
					this.couponBoxOption.text = '无';
				}
			}
		},
		data() {
			return {
				currentFee: {
					nowmoney: 0, //需支付费用
					parkingName: "宏大领寓",
					licensePlate: "",
					entryTime: "右侧文字",
					paymentTime: "右侧文字"
				},

				couponBoxOption: {
					isShow: false, // 控制弹出窗口的显示和隐藏
					radioVal: 0, // 选中的优惠券的值
					text: '无',
					isChecked: false, // 是否选中了优惠券
					couponData: [] // 优惠券数据列表
				},

			};
		},
		onLoad(option) {
			console.log('传递的车牌', option)
			this.currentFee.licensePlate = option.car
			this.apiIn(this.currentFee.licensePlate)

		},
		methods: {
			/*
			 * @description 判断是否选择了优惠券  
			 * 
			 */
			selectCoupon(e) {
				console.log(e.detail.value);
				const {
					value: selectedOptions
				} = e.detail;
				this.couponBoxOption.isChecked = selectedOptions.includes('优惠券');
				if (this.couponBoxOption.isChecked) {
					this.$refs.popup.open();
				}
				console.log(this.couponBoxOption)
			},

			handlePay() {
				// 添加支付逻辑
				if (this.showCouponBox && !this.couponBoxOption.isChecked) {
					// 弹出提示选择优惠券
					this.$modal.alert('请选择优惠券')
				} else {
					// 进行支付操作
					// ...
					this.$modal.msgSuccess('支付成功')
				}
			},

			selectedCoupon(event) {
				console.log('传过来的数据：', event)
				// 处理选中的优惠券信息
				const id = event.id
				const text = event.text
				// 更新父组件数据
				this.couponBoxOption.radioVal = id;
				this.couponBoxOption.text = text;
				this.couponBoxOption.isChecked = id !== 0;

				console.log('父组件的数据：', this.couponBoxOption)
				this.apiIn(this.currentFee.licensePlate,this.couponBoxOption.radioVal)
				this.$refs.popup.close();
			},
			/*
			@description 查询初始数据
			@param 车牌 优惠券id
			*/
			async apiIn(car_num, rad = 0) {
				this.$modal.loading("查询中，请耐心等待...");
				// 查询数据 
				console.log(car_num,rad)
				let shu = await console.log('进行查询')
				//
				this.$modal.closeLoading();

			}

		}
	}
</script>

<style>
	.uni-list-cell {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		padding: 10rpx;
	}

	.checkbox-wrapper {
		margin-right: 20rpx;
	}

	.text {
		margin: 10rpx;
		margin-left: 20rpx;
		padding-bottom: 10rpx;
	}
</style>