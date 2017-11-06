<template>
	<div class="tab_page">
    	<router-link to="/ownerlist"><i class="icon-home3"></i>外卖</router-link>
    	<router-link to="/discovery"><i class="icon-eye"></i>发现</router-link>
    	<router-link to="/orders"><i class="icon-file-text2"></i>订单</router-link>
    	<router-link to="/my"><i class="icon-user-check"></i>我的</router-link>
    </div>
</template>

<script>
	export default{}
</script>

<style lang="scss" scoped>
	.tab_page{position:fixed;z-index:9999;left:0;bottom:0;display: flex;width:100%;height:50px;background-color:#141D27;
		a{flex:1;text-align: center;color:#fff;font-size: 14px;
			&.active{color:#00A0DC;}
			i{display: block;padding:8px 0 3px 0;font-size:18px;}
		}
	}
</style>