<template>
  <div class="wg_home">
   	<wg_header :owner="owner"></wg_header>
   	<div class="wg_tab">
   		<div class="tab_item">
   			<router-link to="/goods">商品</router-link>
   		</div>
   		<div class="tab_item">
   			<router-link to="/reviews">评价</router-link>
   		</div>
   		<div class="tab_item">
   			<router-link to="/owner">商家</router-link>
   		</div>
   	</div>
   	<router-view :owner="owner"></router-view>
  </div>
</template>

<script>
	import axios from 'axios';
	import wg_header from '../common/header/header.vue';
	const RES_OK = 'OK';
	export default{
		data(){
			return{
				owner:{}
			}		
		},
		components:{
			wg_header
		},
		created(){
			var self = this;
			axios.get('/api/data.json').then(function(response){
				if(response.statusText === RES_OK){
					self.owner = response.data.seller;
					self.$router.push('/goods');
				}
			});
		}
	}
</script>

<style lang="scss">
	.wg_home{
		.wg_tab{display:flex;width:100%;height:40px;line-height:40px;position:relative;
			&::after{content:'';position:absolute;left:0;bottom:0;width:100%;border-top:1px solid rgba(7,17,27,.1);}
			.tab_item{flex:1;text-align:center;
				a{display: block;font-size:14px;color:rgb(77,85,93);
					&.active{color:rgb(240,20,20)}
				}
			}
		}
	}
	@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
    .wg_tab{
        &::after{
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
}

	@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
    .wg_tab{
        &::after{
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
	}
</style>
