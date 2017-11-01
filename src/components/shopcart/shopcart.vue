<template>
	<div class="shopcart">
		<div class="content">
			<div class="content_left">
				<div class="logowrapper" @click="toggleCartList">
					<div class="logo" :class="{'buy':totalCount>0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="total_count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'buy':totalCount>0}">{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content_right">
				<div class="pay" :class="{'topay':this.totalPrice >= this.minPrice}">{{payDesc}}</div>
			</div>
		</div>
		<div class="shopcart_list" v-show="listShow">
			<div class="list_header">
				<h2 class="title">购物车</h2>
				<span class="empty" @click="emptyCartList">清空</span>
			</div>
			<div class="list_content" ref="cartlist">
				<ul class="cartfoodlist">
					<li class="cartfood" v-for="food in selectFoos">
						<span class="name">{{food.name}}</span>
						<div class="price"><span>￥{{food.price*food.count}}</span></div>
						<div class="cartcontrol_wrapper"><cartcontrol :food="food"></cartcontrol></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import BScroll from 'better-scroll';
	export default{
		props:{
			minPrice:{type:Number,default:0},
			deliveryPrice:{type:Number,default:0},
			selectFoos:{type:Array,default(){return [];}},
		},
		data(){
			return {
				fold:true
			}
		},
		computed:{
			totalPrice(){
				let total = 0;
				this.selectFoos.forEach((food) => {total += food.price*food.count});
				return total;
			},
			totalCount(){
				let total = 0;
				this.selectFoos.forEach((food) => {total += food.count});
				return total;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice < this.minPrice){
					let more = this.minPrice - this.totalPrice;
					return `还差${more}元起送`;
				}else{
					return '去结算';
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(() => {
						if(!this.cartlistScroll){
							this.cartlistScroll = new BScroll(this.$refs.cartlist,{click:true});
						}else{
							this.cartlistScroll.refresh();
						}
					});
				}
				return show;
			}
		},
		components:{
			cartcontrol
		},
		methods:{
			toggleCartList(){
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			emptyCartList(){
				this.selectFoos.forEach((food) => {
					if(food.count){
						food.count = 0;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopcart{position:fixed;left:0;bottom:0;z-index: 99;width:100%;height:48px;
		.content{display: flex;background-color: #141d27;}
		.content_left{flex:1;font-size:0;
			.logowrapper{display: inline-block;position: relative;top:-10px;margin:0 12px;padding:6px;box-sizing:border-box;width:56px;height:56px;border-radius:50%;background-color: #141d27;vertical-align: top;
				.logo{width:100%;height:100%;border-radius: 50%;background-color: #2B343C;text-align: center;
					.icon-shopping_cart{line-height: 44px;font-size:24px;color:#80858A;}
					&.buy{background-color: rgb(0,160,220);
						.icon-shopping_cart{color:#fff;}
					}
				}
				.total_count{position:absolute;top:0;right:0;width:24px;text-align: center;height:16px;line-height: 16px;border-radius: 16px;color:#fff;font-size:9px;font-weight:700;background-color: rgb(240,20,20);box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);}
			}
			.price{display: inline-block;vertical-align: top;margin-top:12px;line-height: 24px;padding-right: 12px;box-sizing: border-box;border-right:1px solid rgba(255,255,255,.1);font-size: 16px;font-weight: 700;color:rgba(255,255,255,.4);
				&::before{content:'￥';}
				&.buy{color:#fff;}
			}
			.desc{display: inline-block;vertical-align: top;margin:12px 0 0 12px;line-height: 24px;color:rgba(255,255,255,.6);font-size:10px;}
		}
		.content_right{flex:0 0 105px;width:105px;
			.pay{height:48px;line-height: 48px;text-align: center;font-size:14px;font-weight:700;background-color: #2b333b;color:rgba(255,255,255,.5);
				&.topay{background-color: #047F3A;color:#fff;}
			}
		}
		.shopcart_list{position:absolute;top:0;left:0;transform: translateY(-100%);width:100%;z-index: -1;
			.list_header{height:40px;line-height:40px;padding:0 18px;background-color:#f3f5f7;border-bottom:1px solid rgba(7,17,27,.1);
				.title{float: left;font-size:14px;color:rgb(7,17,27);}
				.empty{float:right;font-size:12px;color:rgb(0,160,220)}
			}
			.list_content{padding: 0 18px;max-height:217px;overflow: hidden;background-color: #fff;
				.cartfood{position:relative;padding:18px 0;border-bottom:1px solid rgba(7,17,27,.1);
					.name{font-size: 14px;color:rgb(7,17,27);}
					.price{position:absolute;right:90px;bottom:12px;line-height: 24px;font-size: 14px;font-weight:700;color:rgb(240,20,20);}
					.cartcontrol_wrapper{position: absolute;bottom:6px;right:0;}
				}
			}
		}
	}
</style>