<template>
  <div id="app">
    <router-view></router-view>
    <div class="tab_page">
    	<router-link to="/goods">点菜</router-link>
    	<router-link to="/discovery">发现</router-link>
    	<router-link to="/orders">订单</router-link>
    	<router-link to="/my">我的</router-link>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
	#app{
		.tab_page{position:fixed;z-index:9999;left:0;bottom:0;display: flex;width:100%;height:30px;line-height:30px;background-color:#141D27;
			a{flex:1;text-align: center;color:#fff;font-size: 14px;
				&.active{color:#00A0DC;}
			}
		}
	}
</style>