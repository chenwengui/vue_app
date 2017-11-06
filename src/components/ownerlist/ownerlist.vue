<template>
	<div class="wg_ownerlist">
		<div class="ownerlist_header">
			<div class="search">
				<div class="search_before" v-show="!isShowSearch" @click="showSearch"><i class="icon-search"></i>输入商家名称</div>
				<div class="search_ing" v-show="isShowSearch"><i class="btn icon-close" @click="hideSearch"></i><input type="text" v-model="searchText" placeholder="输入商家名称"/></div>
			</div>
		</div>
		<div class="ownerlist_cont" ref="ownerlist">
			<ul class="owners" v-if="owners&&owners.length">
				<li class="owner_item" v-for="(owner,index) in owners" v-if="owner.name.indexOf(searchText) >= 0">
					<router-link to="/home">
					<img :src="'src/assets/ownerlist_imgs/'+owner.img" />
					<div class="main">
						<h2 class="name">{{owner.name}}</h2>
						<div class="desc">
							<wg_star class="star" :score="owner.star" :size="36"></wg_star><span class="starnum">{{owner.star}}</span>
							<span class="sellcount">月售{{owner.sellcount}}单</span>
						</div>
						<div class="extra">
							<span class="minprice">￥{{owner.minPrice}}起送</span><span class="sellmoney">配送费￥{{owner.cellMoney}}</span>
							<span class="sellminutes">{{owner.sellMinutes}}分钟</span>
						</div>
					</div>
					</router-link>
				</li>
			</ul>
		</div>
		<wg_footer></wg_footer>
	</div>
</template>

<script>
	import axios from 'axios';
	import storageObj from '../../utils/storage.js';
	import wg_footer from '../common/footer/footer.vue';
	import wg_star from '../star/star.vue';
	import BScroll from 'better-scroll';
	
	const RES_OK = 'OK';
	
	export default{
		components:{
			wg_footer,
			wg_star
		},
		data(){
			return {
				owners:[],
				isShowSearch:false,
				searchText:''
			}
		},
		methods:{
			showSearch(){this.isShowSearch = true;this.searchText = '';},
			hideSearch(){this.isShowSearch = false;},
			toSearch(){
				this.isShowSearch = false;
			}
		},
		mounted(){
			//缓存
			let self = this;
			if(storageObj.getSstorage("owners") == null){
				axios.get('/api/data.json').then(function(response){
					if(response.statusText === RES_OK){
						self.owners = response.data.ownerlist;
						storageObj.setSstorage("owners",self.owners);
					}
				});
			}else{
				self.owners = storageObj.getSstorage("owners");
			};
		},
		updated(){
			//设置滚动
			this.$nextTick(() => {
				this.ownerlistScroll = new BScroll(this.$refs.ownerlist,{click:true});
			});
		}
	}
</script>

<style lang="scss" scoped>
	.wg_ownerlist{
		.ownerlist_header{position: fixed;z-index:9999;top:0;left:0;width:100%;height:50px;box-sizing:border-box;padding:10px 20px;background-color: #141D27;
			.search{position:relative;background-color: #fff;height:30px;line-height: 30px;color:#8D8D8D;border-radius:2px;
				.search_before{text-align: center;
					i{position: relative;top:1px;right:4px;}
				} 
				.search_ing{position: relative;width:100%;height:100%;
					.btn{position: absolute;top:0;right:10px;z-index:2;top:4px;font-size:22px;color:#303030;}
					input{position: absolute;top:0;left:0;width:100%;height:100%;border-radius:2px;border:none;outline: 0;text-indent: 10px;}
				}
			}
		}
		.ownerlist_cont{position: absolute;top:50px;bottom:50px;left:0;width:100%;
			.owners{
				.owner_item{padding:12px 8px;border-bottom:1px solid rgba(7,17,27,.1);position:relative;
					img{position:absolute;top:10px;left:8px;width:50px;height:50px;}
					.main{margin-left:60px;
						.name{font-weight:700;font-size: 17px;color:#303030;}
						.desc{margin:10px 0;font-size: 12px;
							.star{display: inline;vertical-align: middle;}
							.starnum{margin:0 3px;vertical-align: middle;}
							.sellcount{vertical-align: middle;}
						}
						.extra{font-size:14px;position: relative;
							.minprice{padding-right:4px;line-height: 14px;}
							.sellmoney{margin-left:4px;}
							.sellminutes{position:absolute;top:2px;right:6px;font-size:10px;}
						}
					}
				}
			}
		}
	}
</style>