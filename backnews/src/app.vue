<template>
	<div class="app">
		<router-view>
		
	    </router-view>
	</div>
	
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
         
		},
		beforeDestroy() {

		},
		methods: {
           change:function(name){
           	  console.log(name);
           	  this.$router.push({path: name});
           }
		}
	}
</script>
<style scoped type="text/css">
	.app{
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		background-color: #fff;
		overflow: hidden;
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
	}
</style>