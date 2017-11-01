<template>
	<div class="cartcontrol">
		<div class="cart_dec icon-remove_circle_outline" v-show="food.count>=1" @click="decNum"></div>
		<div class="cart_count" v-show="food.count>=1">{{food.count}}</div>
		<div class="cart_add icon-add_circle"  @click="addNum"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{type:Object}
		},
		methods:{
			addNum(){
				if(!this.food.count){
//					this.food.count = 1;新增属性必须用以下这种
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
			},
			decNum(){this.food.count--;}
		}
	}
</script>

<style lang="scss" scopep>
	.cartcontrol{font-size: 0;
		.cart_dec,.cart_add{display: inline-block;padding: 6px;line-height: 24px;font-size: 24px;color:rgb(0,160,220);}
		.cart_count{display: inline-block;vertical-align:top;padding-top:6px;line-height:24px;width:12px;font-size:10px;text-align:center;color:rgb(147,153,159);}
		.cart_add{}
	}
</style>