<template>
	<div class="wg_orders">
		<h1 class="orders_title">{{orders.title}}</h1>
		<div class="orders_cont" v-if="orders.othersBuy">
			<h2 class="title">{{orders.othersBuy.title}}</h2>
			<ul class="orders_list" v-if="orders.othersBuy.orderList&&orders.othersBuy.orderList.length">
				<li class="order_item" v-for="order in orders.othersBuy.orderList">
					<img :src="order.img" />
					<div class="text">
						<h3 class="title">{{order.name}}</h3>
						<div class="type" v-if="order.type" :class="{'decrease':order.type==='decrease'}">{{order.desc}}</div>
					</div>
					<div class="buy_count">买过{{order.num}}次</div>
				</li>
			</ul>
			<div class="do_text">没有更多了</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	const RES_OK = 'OK';
	export default{
		data(){
			return {
				orders:{}
			}
		},
		created(){
			let self = this;
			axios.get('/api/data.json').then(function(response){
				if(response.statusText === RES_OK){
					self.orders = response.data.orders;
					console.log(self.orders);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.wg_orders{
		.orders_title{position:fixed;top:0;left:0;width:100%;font-weight: bold;letter-spacing: 4px;height:40px;line-height: 40px;text-align: center;color:#fff;font-size:20px;background-color: #141D27;}
		.orders_cont{padding:18px 14px;margin-top:40px;
			>h2.title{font-size: 16px;display:inline-block;padding:0 2px;font-weight: bold;padding-bottom:4px;border-bottom:2px solid #3C92D3;}
			.orders_list{padding-top:6px;
				.order_item{display:flex;padding:16px 0;border-bottom:1px solid rgba(7,17,27,.1);position:relative;font-size:0;
					img{flex:0 0 50px;width:50px;height:50px;border-radius:2px;}
					.text{flex:1;display: inline-block;margin-left:6px;
						.title{font-weight: 700;font-size: 14px;line-height: 26px;}
						.type{padding-left:26px;line-height: 22px;color:#828282;font-size:10px;width:260px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
							&.decrease{background-image: url("decrease_1@2x.png");background-repeat: no-repeat;}
						}
					}
					.buy_count{position: absolute;top:20px;right:4px;font-size: 12px;color:#AFAFAF;letter-spacing: 2px;}
				}
			}
		}
		.do_text{text-align: center;line-height: 40px;color:#5F5F5F;font-size: 14px;}
	}
</style>