<template>
	<div class="gooddetail" v-show="showFoodDetail" ref="foodcontent">
		<div class="food_content">
			<div class="img_header">
				<img :src="foodDetail.image" />
				<div class="bakc" @click="hideFoodD">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="text_cont">
				<h2 class="title">{{foodDetail.name}}</h2>
				<div class="desc">
					<span class="sellcount">月售{{foodDetail.sellCount}}份</span>
					<span class="rating">好评率{{foodDetail.rating}}%</span>
				</div>
				<div class="price">
					<span class="nowprice">￥{{foodDetail.price}}</span>
					<span v-if="foodDetail.oldPrice" class="oldprice">￥{{foodDetail.oldPrice}}</span>
				</div>
				<div class="cartcontrol_wrapper" v-show="foodDetail.count>=1">
					<cartcontrol :food="foodDetail"></cartcontrol>
				</div>
				<div class="buy" v-show="!foodDetail.count || foodDetail.count===0" @click="addCartFirst(foodDetail)">加入购物车</div>
			</div>
			<splitgap v-if="foodDetail.info"></splitgap>
			<div class="food_info" v-if="foodDetail.info">
				<h3 class="title">商品介绍</h3>
				<p class="info">{{foodDetail.info}}</p>
			</div>
			<splitgap></splitgap>
			<div class="rating_box">
				<h2 class="title">商品评价</h2>
				<goodrating :desc="ratingdesc" :ratings="foodDetail.ratings"></goodrating>
			</div>
		</div>
	</div>
</template>

<script>
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import goodrating from '../goodrating/goodrating.vue';
	import splitgap from '../splitgap/splitgap.vue';
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	export default{
		props:{
			foodDetail:{type:Object}
		},
		data(){
			return{
				showFoodDetail:false,
				ratingdesc:{positive:'推荐',negative:'吐槽',all:'全部'}
			}
		},
		methods:{
			showFoodD(){
				this.showFoodDetail = true;
				this.$nextTick(() => {
					if(!this.foodcontentScroll){
						this.foodcontentScroll = new BScroll(this.$refs.foodcontent,{click:true});
					}else{
						this.foodcontentScroll.refresh();
					}
				});
			},
			hideFoodD(){
				this.showFoodDetail = false;
			},
			addCartFirst(foodDetail){
				if(!this.foodDetail.count){
					Vue.set(this.foodDetail,'count',1);
				}else{
					this.foodDetail.count++;
				}
			}
		},
		components:{
			cartcontrol,
			splitgap,
			goodrating
		}
	}
</script>

<style lang="scss" scoped>
	.gooddetail{position: fixed;z-index:9;top:0;left:0;bottom:48px;width:100%;background-color: #fff;
		.food_content{
			.img_header{position:relative;width:100%;height:0;padding-top:100%;
				img{position:absolute;top:0;left:0;width:100%;height:100%;}
				.bakc{position: absolute;top:10px;left:0;
					i{display: block;padding: 10px;color:#fff;font-size:20px;}
				}
			}
			.text_cont{padding: 18px;position:relative;
				.title{margin-bottom:8px;font-size:14px;line-height:14px;font-weight:700;color:rgb(7,17,27);}
				.desc{font-size:10px;line-height:10px;color:rgb(143,153,159);margin-bottom:10px;}
				.price{font-weight:700;line-height:24px;position:relative;
					.nowprice{margin-right:8px;font-size:14px;color:rgb(240,20,20)}
					.oldprice{text-decoration: line-through;font-size:10px;}
				}
				.cartcontrol_wrapper{position:absolute;right:12px;bottom:12px;}
				.buy{position:absolute;right:18px;bottom:18px;z-index:9;box-sizing: border-box;height:24px;line-height: 24px;padding:0 12px;font-size:10px;color:#fff;background-color: rgb(0,160,220);border-radius:12px;}
			}
			.food_info{padding:18px;
				.title{margin-bottom:6px;line-height:14px;font-size:14px;color:rgb(7,17,27)}
				.info{padding:0 8px;line-height:20px;font-size:12px;color:rgb(77,85,93);}
			}
			.rating_box{
				.title{padding:18px 0 0 18px;font-weight: 700;}
			}
		}
	}
</style>