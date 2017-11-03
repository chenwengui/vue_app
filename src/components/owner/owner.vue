<template>
	<div class="wg_owner" ref="owner">
		<div class="owner_content">
			<div class="overview">
					<h1 class="title">{{owner.name}}</h1>
					<div class="desc">
						<star class="star" :score="owner.serviceScore" :size="36"></star>
						<span class="text_number">({{owner.ratingCount}})</span>
						<span class="text_count">月售{{owner.sellCount}}单</span>
					</div>
					<ul class="remark">
						<li class="block">
							<h2 class="title">起送价</h2>
							<div class="content">
								<strong class="stress">{{owner.minPrice}}</strong><span>元</span>
							</div>
						</li>
						<li class="block">
							<h2 class="title">商家配送费</h2>
							<div class="content">
								<strong class="stress">{{owner.deliveryPrice}}</strong><span>元</span>
							</div>
						</li>
						<li class="block">
							<h2 class="title">平均配送时间</h2>
							<div class="content">
								<strong class="stress">{{owner.deliveryTime}}</strong><span>分钟</span>
							</div>
						</li>
					</ul>
			</div>
			<splitgap></splitgap>
			<div class="bulletin">
				<h2 class="title">公共与活动</h2>
				<p class="content">{{owner.bulletin}}</p>
				<ul class="supports">
					<li v-for="support in owner.supports" class="support_item">
						<div class="desc" :class="{'decrease':support.type===0,'discount':support.type===1,'special':support.type===2,'invoice':support.type===3,'guarantee':support.type===4}"><span class="text">{{support.description}}</span></div>
					</li>
				</ul>
			</div>
			<splitgap></splitgap>
			<div class="pics">
				<h2 class="title">商家实景</h2>
				<div class="pics_list_wrapper" ref="picsListWrapper">
					<ul class="pics_list" ref="picsList">
						<li class="pic_item" v-for="pic in owner.pics">
							<img :src="pic" width="120" height="90"/>
						</li>
					</ul>
				</div>
			</div>
			<splitgap></splitgap>
			<div class="infos">
				<h2 class="title">商家信息</h2>
				<ul class="cont">
					<li class="info_item" v-for="info in owner.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../star/star.vue';
	import splitgap from '../splitgap/splitgap.vue';
	import BScroll from 'better-scroll';
	export default{
		props:{
			owner:{type:Object}
		},
		data(){
			return {
				supportsImgs:['decrease','discount','special','invoice','guarantee'],
				dataOwner:this.owner
			}
		},
		components:{
			star,
			splitgap
		},
		watch:{
			'owner'(){//是为了商家组件第一次加载时owner从{}到接收异步数据对象时触发
				this._initScroll();
				this._initScrollPicsX();
			}
		},
		mounted(){//因为DOM已准备好了
			this._initScroll();
			this._initScrollPicsX();
		},
		methods:{
			_initScroll(){
				this.$nextTick(() => {
					if(!this.ownerScroll){//若不存在则新建BScroll实例对象，并将其放于组件实例参数对象上
						this.ownerScroll = new BScroll(this.$refs.owner,{click:true});
					}else{//若已存在，只需调用BScroll实例对象的refresh()方法即可
						this.ownerScroll.refresh();
					}				
				});
			},
			_initScrollPicsX(){
				if(!this.owner.pics||!this.owner.pics.length){return;}
				let picWidth = 120;
				let marginRight = 6;
				let ulWidth = (picWidth+marginRight)*this.owner.pics.length-marginRight;
				this.$refs.picsList.style.width = ulWidth + 'px';
				this.$nextTick(() => {
					if(!this.picsScroll){
						this.picsScroll = new BScroll(this.$refs.picsListWrapper,{
							scrollX:true,
							eventPassthrough:'vertical'
						});
					}else{
						this.picsScroll.refresh();
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wg_owner{position:absolute;top:168px;bottom:30px;left:0;width:100%;overflow: hidden;
		.overview{padding:18px;
			.title{margin-bottom:8px;line-height:16px;font-size:16px;color:rgb(7,17,27);font-weight:bold;letter-spacing: 2px;}
			.desc{padding-bottom:18px;border-bottom:1px solid rgba(7,17,27,.1);line-height: 18px;font-size:0;
				.star{margin-right:8px;display: inline-block;vertical-align: top;}
				.text_number{margin-right:12px;color:rgb(77,85,93);font-size:12px;}
				.text_count{color:rgb(77,85,93);font-size:12px;}
			}
			.remark{display: flex;padding-top:16px;
				.block{flex:1;text-align:center;border-right:1px solid rgba(7,17,27,.1);padding:2px 0;
					&:last-of-type{border-right:none;}
					.title{margin-bottom:4px;font-size:10px;color:rgb(147,153,159);line-height: 10px;}
					.content{
						.stress{font-size:24px;color:rgb(7,17,27);}
						span{font-size:10px;}
					}
				}
			}
		}
		.bulletin{padding:18px;
			.title{margin-bottom:8px;line-height:16px;font-size:16px;color:rgb(7,17,27);font-weight:bold;letter-spacing: 2px;}
			.content{padding:0 12px 16px 12px;border-bottom:1px solid rgba(7,17,27,.1);line-height: 24px;font-size:12px;color:rgb(240,20,20);}
			.supports{
				.support_item{padding:16px 12px;border-bottom:1px solid rgba(7,17,27,.1);
					&:last-of-type{border-bottom:none;}
					.desc{line-height:20px;background-repeat: no-repeat;
						.text{margin-left:26px;font-size:12px;color:rgb(7,17,27);}
						&.decrease{background-image: url('icon_img/decrease_1@2x.png');}
						&.discount{background-image: url('icon_img/discount_1@2x.png');}
						&.special{background-image: url('icon_img/special_1@2x.png');}
						&.invoice{background-image: url('icon_img/invoice_1@2x.png');}
						&.guarantee{background-image: url('icon_img/guarantee_1@2x.png');}
					}
				}
			}
		}
		.pics{padding:18px;
			.title{margin-bottom:8px;line-height:16px;font-size:16px;color:rgb(7,17,27);font-weight:bold;letter-spacing: 2px;}
			.pics_list_wrapper{width:100%;overflow: hidden;white-space: nowrap;
				.pics_list{font-size:0;
					.pic_item{margin-right:6px;display: inline-block;
						&:last-of-type{margin-right:0;}
					}
				}
			}
		}
		.infos{padding:18px;
			.title{margin-bottom:8px;line-height:16px;font-size:16px;color:rgb(7,17,27);font-weight:bold;letter-spacing: 2px;}
			.cont{
				.info_item{padding:16px 12px;border-top:1px solid rgba(7,17,27,.1);font-size:14px;color:rgb(7,17,27);line-height: 16px;letter-spacing: 1px;}
			}
		}
	}
</style>