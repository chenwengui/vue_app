<template>
	<div class="wg_topay">
		<div class="wg_topay_header"><i class="icon-arrow_lift"></i>在线支付</div>
		<div class="wg_topay_conter">
			<div class="head">
				<div class="pay_time">
					<span class="text">支付剩余时间</span>
					<span class="time">{{}}</span>
				</div>
				<p class="pay_mes">
					<span class="shop_name">{{shopName}}</span>外卖订单
					<span class="price">￥{{orderPrice}}</span>
				</p>
			</div>
			<div class="paytypes">
				<div class="title">选择支付方式</div>
				<ul class="pay_list" v-if="payTypes && payTypes.length">
					<li class="pay_item" v-for="pay in payTypes">
						<div class="type" :style="'background-image:url('+pay.img+')'">{{pay.name}}</div>
						<i class="icon-check_circle"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="wg_topay_footer">确认支付￥{{orderPrice}}</div>
	</div>
</template>

<script>
	import storageObj from '../../utils/storage.js';
	export default{
		data(){
			return {
				payTime:15,
				shopName:"糖与故事",
				orderPrice:32,
				payTypes:[{
					name:"支付宝",
					img:"pay1.png"
				},{
					name:"花呗",
					img:"pay2.png"
				},{
					name:"银行卡支付",
					img:"pay3.png"
				},{
					name:"微信支付",
					img:"pay4.png"
				},{
					name:"QQ钱包",
					img:"pay5.png"
				}]
			}
		},
		methods:{},
		created(){}
	}
</script>

<style lang="scss" scoped>
	.wg_topay{}
</style>