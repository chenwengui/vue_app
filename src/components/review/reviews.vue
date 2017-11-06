<template>
	<div class="wg_reviews">
		<div class="reviews_cont">
			<div class="reviews_head">
				<div class="reviews_head_left">
					<div class="score">{{owner.score}}</div>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{owner.rankRate}}%</div>
				</div>
				<div class="reviews_head_right">
					<div class="score_wrapper">
						<span class="title">服务态度</span>
						<star class="star" :score="owner.serviceScore" :size="36"></star>
						<span class="score">{{owner.serviceScore}}</span>
					</div>
					<div class="score_wrapper">
						<span class="title">商品评分</span>
						<star class="star" :score="owner.foodScore" :size="36"></star>
						<span class="score">{{owner.foodScore}}</span>
					</div>
					<div class="time">
						<span class="title">送达时间</span>
						<span class="text">{{owner.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<splitgap></splitgap>
			<div class="goodrating_wrapper" ref="goodrating">
				<goodrating :ratings="ratings"></goodrating>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "../star/star.vue";
	import splitgap from "../splitgap/splitgap.vue";
	import goodrating from "../goodrating/goodrating.vue";
	import axios from 'axios';
	import BScroll from 'better-scroll';
	const RES_OK = 'OK';
	export default{
		props:{
			owner:{type:Object}
		},
		data(){
			return {
				ratings:[]
			}
		},
		mounted(){
			var self = this;
			if(sessionStorage.getItem("wg_app_ppx__ratings") === null){
				axios.get('/api/data.json').then(function(response){
					if(response.statusText === RES_OK){
						self.ratings = response.data.ratings;
						sessionStorage.setItem("wg_app_ppx__ratings",JSON.stringify(self.ratings));
						console.log("goods",self.ratings);
						self.$nextTick(() => {  
				           self.goodrating = new BScroll(self.$refs.goodrating, {click:true});
				        })
					}
				});
			}else{
				self.ratings = JSON.parse(sessionStorage.getItem("wg_app_ppx__ratings"));
				self.$nextTick(() => {  
		           self.goodrating = new BScroll(self.$refs.goodrating, {click:true});
		        })
			}
//			axios.get('/api/data.json').then(function(response){
//				if(response.statusText === RES_OK){
//					self.ratings = response.data.ratings;
////					console.log(self.ratings);
//					self.$nextTick(() => {
//						self.goodrating = new BScroll(self.$refs.goodrating, {click:true});
//					});
//				}
//			})
		},
		components:{
			star,
			splitgap,
			goodrating
		},
		
	}
</script>

<style lang="scss" scoped>
	.wg_reviews{display:flex;position:absolute;top:168px;bottom:0;left:0;width:100%;overflow: hidden;
		.reviews_cont{width:100%;}
		.reviews_head{display: flex;padding:18px 0;
			.reviews_head_left{flex: 0 0 137px;width:137px;text-align: center;padding:6px 0;border-right:1px solid rgba(7,17,27,.1);
				.score{margin-bottom: 6px;line-height: 28px;font-size: 20px;color:rgb(255,153,0);font-weight: 700;}
				.title{margin-bottom: 8px;font-size: 12px;line-height: 12px;color:rgb(7,17,27);}
				.rank{font-size: 10px;line-height: 10px;color:rgba(7,17,27,.4);}
			}
			.reviews_head_right{flex:1;padding-left:24px;
				.title{font-size: 12px;color:rgb(7,17,27);margin-right:12px;line-height: 18px;}
				.score_wrapper{margin-bottom:6px;line-height: 18px;font-size: 0;
					.star{display: inline-block;margin-right:12px;vertical-align: top;}
					.score{font-size: 12px;color:rgb(255,153,0);}
				}
				.time{font-size: 0;
					.text{font-size: 12px;color:rgb(147,153,159);}
				}
			}
		}
		.goodrating_wrapper{height:100%;overflow: hidden;}
	}
</style>