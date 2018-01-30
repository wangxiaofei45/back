<style scoped>
	.header {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-align: center;
		background-color: #666666;
		color: #FFFFFF;
		font-size: 44px;
	}
	
	a {
		color: #333;
	}
	.layout {
		background: #f5f7f9;
		overflow: hidden;
		position: absolute;
		left: 0px;
		top: 80px;
		right: 0px;
		bottom: 0px;
		background-color: #FFF;
	}
	.row{
		width: 100%;
		height: 100%;
	}
	.layout-content {
		height: 100%;
		Overflow-y:scroll;
	}
</style>
<template>
	<div>
		<div class="header">
			后台管理
		</div>
		<div class="layout">
		<Row class="row">
			<Col span="3">
			<Menu active-name="/index" @on-select="change" style="width: 100%;">
				<MenuItem name="/index">员工列表</MenuItem>
				<MenuItem name="/testinline">在线测试</MenuItem>
				<MenuItem name="/partyactivity">党建活动</MenuItem>
				<MenuItem name="/lecturehistory">专业讲堂</MenuItem>
				<MenuItem name="/trainhistory">党建培训(自愿)</MenuItem>
				<MenuItem name="/history">历史任务</MenuItem>
				<MenuItem name="/integral"> 积分列表</MenuItem>
				<MenuItem name="/shop">积分商城</MenuItem>
				<MenuItem name="/beyond">文本编辑</MenuItem>
			</Menu>
			</Col>
			<Col span="21" class="layout-content">
			<router-view>

			</router-view>
			</Col>
		</Row>
        </div>
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
			change: function(name) {
				console.log(name);
				this.$router.push({
					path: name
				});
			}
		}
	}
</script>