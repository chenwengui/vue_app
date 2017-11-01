<template>
	<div class="wg_goods">
		<div class="menu_wrapper" ref="menu">
			<ul>
				<li v-for="(item,index) in goods" class="menu_item" @click="selectMenu(index)" :class="{current:index==currentIndex}"><span class="text">{{item.name}}</span></li>
			</ul>
		</div>
		<div class="foods_wrapper" ref="foods">
			<ul>
				<li v-for="item in goods" class="food_list ajax_food_list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" @click="toFoodDetail(food)" class="food_item">
							<div class="img">
								<img :src="food.icon" width="57" height="57"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="sellcount">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price" @click.stop>
									<span class="nowprice">￥{{food.price}}</span>
									<span v-if="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span>
									<div class="cartcontrolwrapper"><cartcontrol :food="food"></cartcontrol></div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :selectFoos="selectFoos" :deliveryPrice="owner.deliveryPrice" :minPrice="owner.minPrice"></shopcart>
		<gooddetail :foodDetail="foodDetail" ref="tofoodd"></gooddetail>
	</div>
</template>
<script type="text/javascript">
	import shopcart from '../shopcart/shopcart.vue';
	import gooddetail from '../gooddetail/gooddetail.vue';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import BScroll from 'better-scroll';
	import axios from 'axios';
	const RES_OK = 'OK'; 
	export default{
		props:{
			owner:{type:Object}
		},
		data(){
			return{
				goods:[],
				listHeights:[],
				scrollY:0,
				foodDetail:{}
			};
		},
		computed:{
			currentIndex(){
				for(let i = 0,len = this.listHeights.length;i<len;i++){
					let h1 = this.listHeights[i];
					let h2 = this.listHeights[i+1];
					if(!h2 || (this.scrollY >= h1 && this.scrollY < h2)){this.menuItemToView();return i;}
				}
				return 0;
			},
			selectFoos(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created(){
			var self = this;
			axios.get('/api/data.json').then(function(response){
				if(response.statusText === RES_OK){
					self.goods = response.data.goods;
					console.log(self.goods);
					self.$nextTick(() => {  
			            self._initScroll();
			            self._calcHeight();
			        })
				}
			})
		},
		methods:{
			selectMenu(idx){
				var el = this.$refs.foods.querySelectorAll('.ajax_food_list')[idx];
				this.foodsScroll.scrollToElement(el,400);
			},
			menuItemToView(){
				var el = this.$refs.menu.querySelector('.current');
				this.menuScroll.scrollToElement(el,400);
			},
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menu, {click:true});
				this.foodsScroll = new BScroll(this.$refs.foods, {probeType:3,click:true});
				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calcHeight(){
				var lists = this.$refs.foods.querySelectorAll('.ajax_food_list');
				var height = 0;
				this.listHeights.push(height);
				for(let i = 0,len = lists.length;i<len;i++){
					height += lists[i].clientHeight;
					this.listHeights.push(height);
				}
			},
			toFoodDetail(food){
				console.log(food)
				this.foodDetail = food;
				this.$refs.tofoodd.showFoodD();
			}
		},
		components:{
			shopcart,
			cartcontrol,
			gooddetail
		}
	}
</script>
<style lang="scss">
	.wg_goods{display: flex;position:absolute;top:168px;bottom:46px;width:100%;overflow: hidden;
		.menu_wrapper{flex:0 0 80px;width:80px;background-color: #f3f5f7;
			.menu_item{display: table;width:56px;height:54px;line-height: 14px;padding: 0 12px;
				&.current{position:relative;z-index: 10;margin-top:-1px;background-color: #fff;font-weight: 700;
					.text{border:none;}
				}
				.text{display: table-cell;vertical-align: middle;width:56px;font-size:12px;border-bottom:1px solid rgba(7,17,27,.1);}
			}
		}
		.foods_wrapper{flex:1;
			.food_list{
				.title{border-left:2px solid #d9dde1;padding-left:14px;height:26px;line-height: 26px;font-size:12px;color:rgb(147,153,159);background-color: #f3f5f7;}
				.food_item{display: flex;margin:18px;padding-bottom: 18px;border-bottom:1px solid rgba(7,17,27,.1);
					&:last-of-type{margin-bottom:0;border:none;}
					.img{flex:0 0 57px;margin-right:10px;}
					.content{flex:1;
						.name{margin:2px 0 8px 0;height:14px;line-height:14px;font-size:14px;color:rgb(7,17,27);}
						.desc,.extra{font-size:10px;line-height:10px;color:rgb(143,153,159);}
						.desc{margin-bottom: 8px;line-height:16px;}
						.extra{
							.sellcount{margin-right:12px;}
						}
						.price{font-weight:700;line-height:24px;position:relative;
							.nowprice{margin-right:8px;font-size:14px;color:rgb(240,20,20)}
							.oldprice{text-decoration: line-through;font-size:10px;}
							.cartcontrolwrapper{position:absolute;top:0;right:0;}
						}
					}
				}
			}
		}
	}
</style>