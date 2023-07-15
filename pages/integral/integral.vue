<template>
	<view >
		<uni-list v-if="!goto">
			<uni-list-item title="0" ></uni-list-item>
		</uni-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			goto(){
				
				this.$modal.alert('联系客服，成为会员，获取积分')
				// this.$modal.confirm('联系客服，成为会员，获取积分')
				return false
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
