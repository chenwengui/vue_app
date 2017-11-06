<template>
	<div class="wg_my">
		<h1 class="my_title"><i class="icon-bell"></i>{{my.title}}<i class="icon-cog"></i></h1>
		<div class="my_cont">
			<div class="user_box" v-if="my.user">
				<div class="head">
					<i class="user_icon"><i class="icon-user"></i></i>
					<div class="name">{{my.user.name}}</div>
					<div class="phone"><i class="icon-mobile2"></i>{{my.user.phone}}</div>
					<i class="arrow icon-keyboard_arrow_right"></i>
				</div>
				<ul class="cont">
					<li class="money">
						<div class="text"><strong>{{my.user.money}}</strong>元</div>
						<div class="title">钱包</div>
					</li>
					<li class="favorable">
						<div class="text"><strong>{{my.user.favorableNum}}</strong>个</div>
						<div class="title">优惠</div>
					</li>
					<li class="golds">
						<div class="text"><strong>{{my.user.golds}}</strong>个</div>
						<div class="title">金币</div>
					</li>
				</ul>
			</div>
			<splitgap></splitgap>
			<div class="superuser">
				<i class="icon-cool"></i>
				<div class="title">成为<strong>超级会员</strong>.每月获<strong>20元</strong>红包</div>
				<div class="desc">下单再返5元无门槛红包</div>
			</div>
			<splitgap></splitgap>
			<ul class="user_mes slip_list">
				<li class="slip_item">
					<i class="icon-location2"></i>
					<div class="main"><span class="text">收货地址</span><i class="icon-keyboard_arrow_right"></i></div>
				</li>
				<li class="slip_item">
					<i class="icon-favorite"></i>
					<div class="main"><span class="text">我的收藏</span><i class="icon-keyboard_arrow_right"></i></div>
				</li>
			</ul>
			<splitgap></splitgap>
			<ul class="activities slip_list" v-if="my.activities">
				<li class="activity_item slip_item" v-for="item in my.activities">
					<i :class="item.iconClass" :style="{color:item.iconColor}"></i>
					<div class="main"><span class="text">{{item.name}}</span><span class="desc">{{item.desc}}</span><i class="icon-keyboard_arrow_right"></i></div>
				</li>
			</ul>
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
				my:{}
			}
		},
		created(){
			let self = this;
			if(storageObj.getSstorage("my") == null){
				axios.get('/api/data.json').then(function(response){
					if(response.statusText === RES_OK){
						self.my = response.data.my;
						storageObj.setSstorage("my",self.my);
//						console.log(self.my);
					}
				});
			}else{
				self.my = storageObj.getSstorage("my");
			}
			
		},
		components:{
			splitgap,
			wg_footer
		}
	}
</script>

<style lang="scss" scoped>
	.wg_my{position: absolute;top:0;bottom:50px;left:0;width:100%;
		.my_title{position:fixed;z-index:9999;top:0;left:0;width:100%;font-weight: bold;letter-spacing: 4px;height:40px;line-height: 40px;text-align: center;color:#fff;font-size:20px;background-color: #141D27;
			i{position: absolute;top:50%;margin-top:-8px;font-size:16px;line-height: 16px;color:#8ED2FC;}
			.icon-bell{left:18px;}
			.icon-cog{right:18px;}
		}
		.my_cont{margin-top:40px;
			.user_box{
				.head{padding: 16px 18px;background-color: rgba(0,0,0,.8);color:#fff;position: relative;height:100px;
					.name{margin:28px 0 10px 120px;font-size:18px;}
					.phone{margin-left:120px;font-size:14px;
						i{font-size:12px;margin-right:4px;}
					}
					.user_icon{position: absolute;top:18px;left:18px;width:100px;height:100px;font-size:100px;background-color: #95D2FF;border-radius: 50%;
						>i{color:#333333;position: relative;top:8px;}
					}
					.arrow{position: absolute;right:18px;top:50%;margin-top:-15px;color:#fff;font-size:30px;}
				}
				.cont{display: flex;
					li{flex:1;border-right:1px solid rgba(7,17,27,.1);text-align: center;padding:16px 0;
						&:last-of-type{border-right:none;}
						.text{font-size:10px;
							strong{font-weight: bold;font-size:24px;margin-right:2px;}
						}
						.title{margin-top:8px;color:#676767;font-size:14px;}
						&.money .text{color:#2786EA;}
						&.favorable .text{color:#FB5C45;}
						&.golds .text{color:#FF9C08;}
					}
				}
			}
			.superuser{padding:10px 20px;position:relative;
				.title{margin:6px 0 8px 60px;font-size:20px;color:#383735;font-weight:700;
					strong{color:#DEB234;font-weight:700;}
				}
				.desc{margin-left:60px;color:#747474;}
				.icon-cool{color:#DEB234;font-size:50px;position: absolute;top:16px;left:20px;}
			}
			.slip_list{
				.slip_item{position: relative;
					&:last-of-type .main{border-bottom:none;}
					>i{position: absolute;top:10px;left:6px;}
					.main{position:relative;margin-left:30px;padding:12px 16px 12px 0;border-bottom: 1px solid rgba(0,0,0,.1);
						.text{color:#090909;font-size:16px;}
						.desc{position:absolute;top:13px;right:40px;color:#BBBBBD;font-size: 14px;}
						i{position:absolute;top:12px;right:16px;color:#BBBBBD;font-size: 18px;}
					}
				}
			}
			.user_mes{
				.icon-location2{color:#459AEB;}
				.icon-favorite{color:#FE7B43;}
			}
			.activities{}
		}
	}
</style>