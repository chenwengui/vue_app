<template>
	<div class="wg_my">
		<h1 class="my_title"><i class="icon-bell"></i>{{my.title}}<i class="icon-cog"></i></h1>
		<div class="my_cont">
			<div class="user_box" v-if="my.user">
				<div class="head">
					<i class="user_icon icon-user"></i>
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
					<div class="text"><span>收货地址</span><i class="icon-keyboard_arrow_right"></i></div>
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
	</div>
</template>

<script>
	import axios from 'axios';
	import splitgap from '../splitgap/splitgap.vue';
	const RES_OK = 'OK';
	export default{
		data(){
			return {
				my:{}
			}
		},
		created(){
			let self = this;
			axios.get('/api/data.json').then(function(response){
				if(response.statusText === RES_OK){
					self.my = response.data.my;
					console.log(self.my);
				}
			});
		},
		components:{
			splitgap
		}
	}
</script>

<style lang="scss" scoped>
	.wg_my{position: absolute;top:0;bottom:30px;left:0;width:100%;
		.my_title{position:fixed;top:0;left:0;width:100%;font-weight: bold;letter-spacing: 4px;height:40px;line-height: 40px;text-align: center;color:#fff;font-size:20px;background-color: #141D27;
			.icon-bell{}
			.icon-cog{}
		}
		.my_cont{margin-top:40px;
			.user_box{
				.head{
					.name{}
					.phone{
						i{}
					}
					.user_icon{}
					.arrow{}
				}
				.cont{
					li{
						&:last-of-type{}
						.text{
							strong{}
						}
						.title{}
						&.money .text{}
						&.favorable .text{}
						&.golds .text{}
					}
				}
			}
			.superuser{
				.title{
					strong{}
				}
				.desc{}
				.icon-cool{}
			}
			.slip_list{
				.slip_item{
					>i{}
					.main{
						.text{}
						.desc{}
						i{}
					}
				}
			}
			.user_mes{}
			.activities{}
		}
	}
</style>