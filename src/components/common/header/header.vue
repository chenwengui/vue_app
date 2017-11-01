<template>
	<div class="wg_header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="owner.avatar" width="64" height="64"/>
			</div>
			<div class="content">
				<div class="title">			
					<span class="brand"></span>
					<span class="name">{{owner.name}}</span>
				</div>
				<div class="description">{{owner.description}}/{{owner.deliveryTime}}分钟送达</div>
				<div v-if="owner.supports" class="support">
					<span class="icon"></span>
					<div class="text">{{owner.supports[0].description}}</div>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title">公告</span>
			<span class="bulletin-text">{{owner.bulletin}}</span>
			<i class="bulletin-right_arrow">&gt;</i>
		</div>
		<div class="bgimg">
			<img :src="owner.avatar" width="100%" height="100%"/>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			owner:{type:Object}
		} 
	}
</script>

<style lang="scss">
	.wg_header{color:#fff;background-color: rgba(7,17,27,.5);position:relative;overflow:hidden;
		.content-wrapper{padding:10px 12px 8px 24px;font-size:0;
			.avatar{display: inline-block;}
			.content{display: inline-block;margin-left:16px;font-size:14px;
				.title{margin:2px 0 8px;
					.brand{display:block;width:30px;height:18px;vertical-align:top;}
					.name{font-size:16px;line-height:18px;font-weight:bold;}
				}
				.description{margin-bottom:10px;font-size:12px;line-height:12px;}
				.support{}
			}
		}
		.bulletin-wrapper{position:relative;background-color:rgba(7,17,27,.2);height:28px;line-height:28px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding:0 22px 0 12px;
			.bulletin-title{font-size:10px;background-color: #fff;color:#444;border-radius:2px;}
			.bulletin-text{margin:0 4px;font-size:10px;}
			.bulletin-right_arrow{position:absolute;right:5px;font-size:18px;font-style: normal;}
		}
		.bgimg{position: absolute;top:0;left:0;z-index: -1;width:100%;height:100%;filter:blur(10px);}
	}
</style>