<template>
	<div class="splitgap" :style="{height:gapHeight+'px'}"></div>
</template>

<script>
	export default{
		props:{
			gapHeight:{
				type:String,
				default:'16'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.splitgap{width:100%;height:16px;border-top:1px solid rgba(7,17,27,.1);border-bottom:1px solid rgba(7,17,27,.1);background-color: #f3f5f7;}
</style>