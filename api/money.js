/* 
查询车牌费用，使用优惠券、支付 
 */

import request from '@/utils/request'

/*
 * 查询牌照费用
 * @param: [car_plate_num] [string] [牌照]
 * @param: [member_coupon_id] [string] [优惠券ID]
 * @param: [is_use_integral] [number] [是否使用积分，1使用积分]
 */
export function HowMoney(card_num,rad,mode) {
	const data = {
		card_num,
		rad,
		mode
	}
	return request({
		'url': '/api/wechat/pay/howmoney',
		headers: {
			isToken: false
		},
		'method': 'post',
		'data': data
	})
}
/*
获取所有的优惠券
return {id：int，title：str}
*/
export function get_Available(){
	return request({
		'url':'/api/wechat/pay/get_Available',
		'method': 'get',
	})
}