<template>
	<div class="wg_discovery">
		<h1 class="discovery_title">{{discovery.title}}</h1>
		<div class="discovery_cont">
			<div class="love cont_box" v-if="discovery.love">
				<h2 class="title"><i class="icon-thumb_up"></i><strong>{{discovery.love.name}}</strong></h2>
				<div class="desc">{{discovery.love.desc}}</div>
				<ul class="love_list  food_list">
					<li class="love_item  food_item" v-for="food in discovery.love.foods">
						<img :src="food.img" />
						<div class="name">{{food.name}}</div>
						<div class="price"><span class="now">￥{{food.price}}</span></div>
					</li>
				</ul>
				<div class="more">查看更多<span>&gt;</span></div>
			</div>
			<splitgap></splitgap>
			<div class="discount cont_box" v-if="discovery.discount">
				<h2 class="title"><i class="icon-favorite"></i><strong>{{discovery.discount.name}}</strong></h2>
				<div class="desc">{{discovery.discount.desc}}</div>
				<ul class="discount_list food_list">
					<li class="discount_item food_item" v-for="food in discovery.discount.foods">
						<img :src="food.img" />
						<div class="name">{{food.name}}</div>
						<div class="price"><span class="now">￥{{food.price}}</span><span class="old">￥{{food.oldprice}}</span></div>
					</li>
				</ul>
				<div class="more">查看更多<span>&gt;</span></div>
			</div>
		</div>
		<wg_footer></wg_footer>
	</div>
</template>

<script>
	import axios from 'axios';
	import storageObj from '../../utils/storage.js';
	import splitgap from '../splitgap/splitgap.vue';
	import wg_footer from '../common/footer/footer.vue';
	const RES_OK = 'OK';
	export default{
		data(){
			return {
				discovery:{}
			}
		},
		created(){
			let self = this;
			if(storageObj.getSstorage("discovery") == null){
				axios.get('/api/data.json').then(function(response){
					if(response.statusText === RES_OK){
						self.discovery = response.data.discovery;
						storageObj.setSstorage("discovery",self.discovery);
//						console.log(self.discovery);
					}
				});
			}else{
				self.discovery = storageObj.getSstorage("discovery");
			}
			
		},
		components:{
			splitgap,
			wg_footer
		}
	}
</script>

<style lang="scss" scoped>
	.wg_discovery{position: absolute;top:0;bottom:50px;left:0;width:100%;
		.discovery_title{position:fixed;z-index:9999;top:0;left:0;width:100%;font-weight: bold;letter-spacing: 4px;height:40px;line-height: 40px;text-align: center;color:#fff;font-size:20px;background-color: #141D27;}
		.discovery_cont{margin-top:40px;
			.cont_box{padding:18px 4px 18px 14px;
				.title{text-align: center;font-size: 16px;margin-bottom: 12px;
					i{color:#D4372E;margin-right:4px;}
					strong{letter-spacing: 2px;font-weight: bold;}
				}
				.desc{font-size: 12px;line-height: 12px;text-align: center;color:#9F9F9F;}
				.food_list{padding-top:18px;font-size:0;
					.food_item{display:inline-block;margin-bottom:8px;width:33%;box-sizing:border-box;padding-right:6px;
						img{width:100%;height:100%;}
						.name{line-height: 24px;font-size:12px;color:#545454;}
						.price{height:20px;line-height: 20px;
							.now{font-size: 18px;color:#F23D5C;}
							.old{margin-left:4px;font-size: 10px;color:#9E9E9E;text-decoration: line-through;}
						}
					}
				}
				.more{text-align: center;font-size: 14px;color:#BBBBBB;padding-top:8px;
					span{margin-left:4px;}
				}
			}
		}
	}
</style>