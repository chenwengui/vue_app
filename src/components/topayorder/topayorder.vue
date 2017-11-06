<template>
	<div class="wg_topayorder">
		<div class="topayorder_header">
			<div class="title"><router-link to="/home/goods"><i class="icon-arrow_lift"></i></router-link><span class="text">订单配送至</span></div>
			<div class="loc">{{user.loc}}<i class="icon-keyboard_arrow_right"></i></div>
			<div class="usermes"><span class="name">{{user.name.substr(0,1)}}({{user.sex | sexText}})</span><span class="phone">{{user.phone}}</span></div>
		</div>
		<div class="topayorder_conter">
			<splitgap gapHeight="8"></splitgap>
			<div class="deliver_time">尽快送达 【 预计{{deliverMinutes | timeF}} 】<i class="icon-keyboard_arrow_right"></i></div>
			<splitgap gapHeight="8"></splitgap>
			<div class="order_box">
				<h2 class="title"><span class="text">糖与故事</span><span class="line"></span></h2>
				<ul class="order_foods" v-if="cartFoods&&cartFoods.length">
					<li class="food_item" v-for="food in cartFoods">
						<span class="name">{{food.name}}</span>
						<span class="count">x{{food.count}}</span>
						<span class="price">￥{{food.price}}</span>
					</li>
					<li class="deliver food_item" v-if="deliverMoney">
						<span class="desc">配送费</span>
						<span class="price">￥{{deliverMoney}}</span>
					</li>
					<li class="decrease">
						<span class="desc">在线支付立减优惠</span>
						<span class="save">{{onlineSave | saveText("未满"+decreaseAll[0].all+"元")}}</span>
					</li>
				</ul>
				<div class="envelope">
					<span class="name">红包</span><span class="desc" :class="{'none':!envelopeMoney}">{{envelopeMoney | saveText('无可用红包')}}<i class="icon-keyboard_arrow_right"></i></span>
				</div>
				<div class="vouchers">
					<span class="name">商家代金券</span><span class="desc" :class="{'none':!vouchersMoney}">{{vouchersMoney | saveText('无可用代金券')}}<i class="icon-keyboard_arrow_right"></i></span>
				</div>
				<div class="total_price">
					<span class="desc">优惠说明</span><span class="price">小计<strong>￥{{payMoney}}</strong></span>
				</div>
			</div>
		</div>
		<div class="topayorder_footer">
			<div class="content">
				<div class="content_left">
					<div class="price">{{payMoney}}</div>
					<div class="desc">已优惠￥{{allSave}}元</div>
				</div>
				<div class="content_right">
					<div class="pay">在线支付</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import storageObj from '../../utils/storage.js';
	import splitgap from '../splitgap/splitgap.vue';
	export default{
		data(){
			return {
				user:{
					loc:"加载用户地理位置中...",
					name:"陈文贵",
					sex:"男",
					phone:"18814098979"
				},
				deliverMinutes:48,
				deliverMoney:3,
				cartFoods:[],
				envelopeMoney:4,
				vouchersMoney:0,
				decreaseAll:[{all:28,save:15},{all:40,save:25}],
				onlineSave:0,
				totalPrice:0
			}
		},
		filters:{
			sexText(val){
				if(val === '男' || val === 'man'){
					return '先生';
				}else{
					return '女士';
				}
			},
			timeF(val){
				let date = new Date(Date.now()+val*60*1000);
				return date.getHours()+':'+date.getMinutes();
			},
			saveText(val,str){
				if(val == 0){
					return str;
				}else{
					return '-￥'+val;
				}
			}
		},
		components:{
			splitgap
		},
		mounted(){
			var self = this;
			if(storageObj.getSstorage("cartfoods") != null){
				self.cartFoods = storageObj.getSstorage("cartfoods");
				if(self.deliverMoney){self.totalPrice = self.deliverMoney;}
				self.cartFoods.forEach(function(food){
					self.totalPrice += food.price * food.count;
					for(let i = self.decreaseAll.length-1;i>=0;i--){
						if(self.totalPrice >= self.decreaseAll[i].all){
							self.onlineSave = self.decreaseAll[i].save;
							break;
						}
					}
				});
			}
		},
		computed:{
			allSave(){		
				return this.onlineSave+this.envelopeMoney+this.vouchersMoney;
			},
			payMoney(){
				return this.totalPrice - this.allSave;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wg_topayorder{
		.topayorder_header{position:fixed;top:0;left:0;width:100%;height:100px;box-sizing:border-box;padding:10px 0;background-color: rgba(0,0,0,.7);text-align: center;color:#fff;
			.title{position:relative;font-weight: 700;padding:4px;
					i{position:absolute;top:5px;left:10px;font-size:18px;color:#fff;}
			}
			.loc{position:relative;margin:14px 0;padding:0 22px;
				i{position:absolute;top:0;right:18px;font-size:18px;}
			}
			.usermes{font-size:14px;
				.name{margin-right:6px;}
			}
		}
		.topayorder_conter{position: absolute;top:100px;bottom:48px;left:0;right:0;
			.deliver_time{position:relative;padding:10px;font-weight:bold;color:#252525;padding-left:12px;
				i{position:absolute;top:10px;right:10px;font-size: 18px;color:#B8B8B8;}
			}
			.order_box{padding:12px 18px 0 18px;
				.title{font-weight:bold;color:#252525;text-align: center;position:relative;
					.text{padding:0 14px;background-color: #fff;}
					.line{position: absolute;z-index:-1;top:50%;left:0;width:100%;height: 2px;background-color: rgba(7,17,27,.1);}
				}
				.order_foods{padding:6px 4px 0 4px;	
					.food_item{position:relative;height:40px;line-height: 40px;font-size:12px;color:#333333;border-bottom:1px dotted #F3F5F7;
						.name{font-size: 14px;padding-left:4px;}
						.count,.price{position: absolute;top:0;height:100%;right:40px;}
						.price{right:4px;}
					}
					.decrease{height:50px;line-height: 50px;position:relative;border-bottom:1px solid rgba(7,17,27,.1);
					
						.desc{color:#272727;padding-left:30px;background: url('decrease_3@2x.png') no-repeat left center;}
						.save{position: absolute;top:0;right:4px;height:100%;color:#F75940;}
					}
				}
				.envelope,.vouchers{height:50px;line-height: 50px;border-bottom:1px solid rgba(7,17,27,.1);position:relative;
					.name{font-weight: 700;color:#333333;}
					.desc{position: absolute;top:0;right:0;height:100%;font-size: 14px;color:#F75940;
						&.none{color:#C0C0C0;}
						i{font-size: 20px;margin-left:4px;position: relative;top:4px;color:#C0C0C0;}
					}
				}
				.vouchers{color:#DF6556;}
				.total_price{height:50px;line-height: 50px;font-size: 14px;position: relative;
					.desc{color:#959595;}
					.price{position:absolute;top:0;right:0;height:100%;color:#3A3A3A;
						strong{font-size: 18px;font-weight: bold;margin-left:3px;vertical-align: top;}
					}
				}
			}
		}
		.topayorder_footer{position:fixed;left:0;bottom:0;z-index: 99;width:100%;height:48px;
			.content{display: flex;background-color: rgba(0,0,0,.7);height:48px;}
			.content_left{flex:1;font-size:0;
				.price{display: inline-block;vertical-align: top;margin-top:12px;line-height: 24px;padding:0 12px;box-sizing: border-box;border-right:1px solid rgba(255,255,255,.1);font-size: 16px;font-weight: 700;color:#fff;
					&::before{content:'￥';}
					&.buy{color:#fff;}
				}
				.desc{display: inline-block;vertical-align: top;margin:12px 0 0 12px;line-height: 24px;color:rgba(255,255,255,.6);font-size:10px;}
			}
			.content_right{flex:0 0 105px;width:105px;
				.pay{height:48px;line-height: 48px;text-align: center;font-size:15px;font-weight:700;background-color: #00D762;color:#fff;letter-spacing: 1px;}
			}
		}
	}
</style>