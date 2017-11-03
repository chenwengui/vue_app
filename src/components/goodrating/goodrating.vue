<template>
	<div class="goodrating">
		<div class="rating_type">
			<span class="all" :class="{'active':selectType===2}" @click="chooseType(2)">{{desc.all}}<i>{{ratings.length}}</i></span>
			<span class="positive" :class="{'active':selectType===0}" @click="chooseType(0)">{{desc.positive}}<i>{{posRatings.length}}</i></span>
			<span class="negative" :class="{'active':selectType===1}" @click="chooseType(1)">{{desc.negative}}<i>{{negRatings.length}}</i></span>
		</div>
		<div class="rating_switch" :class="{'on':onlyContent}" @click="toggleCont">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
		<div class="rating_list_box">
			<ul class="rating_list" v-show="showRatings && showRatings.length">
				<li class="rating_item" v-for="rating in showRatings">
					<div class="user">
						<span class="name">{{rating.username}}</span>
						<img class="avatar" :src="rating.avatar" width="12" height="12" />
					</div>
					<div class="time">{{rating.rateTime | formatDate}}</div>
					<p class="text">
						<i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>{{rating.text}}
					</p>
				</li>
			</ul>
			<div class="no_ratings" v-show="!showRatings || !showRatings.length">暂无该评价喔！</div>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL=2;
	export default{
		props:{
			ratings:{type:Array,default(){return [];}},
			desc:{
				type:Object,
				default(){
					return {positive:'满意',negative:'不满意',all:'全部'}
				}
			},
			selectType:{type:Number,default:ALL},
			onlyContent:{type:Boolean,default:false}
		},
		computed:{
			posRatings(){
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negRatings(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			},
			showRatings(){
				let ratings = [];
				switch(this.selectType){
					case 0:ratings = this.posRatings;break;
					case 1:ratings = this.negRatings;break;
					case 2:ratings = this.ratings;break;
				}
				if(this.onlyContent){
					ratings = ratings.filter(rating => {
						return rating.text;
					});
				}
				return ratings;
			}
		},
		methods:{
			chooseType(type){
				this.selectType = type;
			},
			toggleCont(){
				this.onlyContent = !this.onlyContent;
			}
		},
		filters:{
			formatDate(time){
				return new Date(time+31536000000*1.27).toLocaleString();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodrating{width: 100%;;
		.rating_type{margin:0 18px;padding:18px 0;border-bottom:1px solid rgba(7,17,27,.1);font-size:0;
			span{display: inline-block;padding:8px 12px;margin-right:8px;font-size:16px;color:rgb(77,85,93);border-radius:4px;
				i{font-size:12px;font-style: normal;padding-left:4px;}
				&.all{background-color: #7FBC82;}
				&.positive{background-color: #CCECF8;}
				&.negative{background-color: #E9EBEC;}
				&.active{background-color: #00A0DC;color:#fff;}
			}
		}
		.rating_switch{padding:12px 18px;border-bottom:1px solid  rgba(7,17,27,.1);line-height: 24px;color:rgb(147,153,159);font-size: 0;
			i{display: inline-block;margin-right:4px;font-size:24px;vertical-align: top;}
			.text{display: inline-block;vertical-align: top;font-size: 12px;}
			&.on{
				i{color:#00c850}
			}
		}
		.rating_list_box{
			.rating_list{padding:0 18px;
				.rating_item{position: relative;padding:16px 0;border-bottom:1px solid rgba(7,17,27,.1);
					.user{position:absolute;right:0;top:16px;font-size:0;line-height: 12px;
						.name{display: inline-block;vertical-align:top;margin-right:6px;font-size: 10px;color:rgb(147,153,157);}
						.avatar{border-radius:50%;}
					}
					.time{margin-bottom: 6px;line-height:12px;font-size: 10px;color:rgb(147,153,159);}
					.text{line-height: 16px;color:rgb(7,17,27);font-size: 14px;
						i{margin-right:4px;line-height: 16px;font-size: 12px;
							&.icon-thumb_down{color:rgb(147,153,159);}
							&.icon-thumb_up{color:rgb(0,160,220);}
						}
					}
				}
			}
			.no_ratings{padding:16px 22px;font-size: 20px;color:rgb(147,153,159);}
		}
	}
</style>