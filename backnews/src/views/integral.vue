<style scoped>
	.container {
		margin: 15px;
	}
	
	.table_title {
		text-align: center;
		height: 60px;
		line-height: 60px;
	}
	
	.ivu-page {
		position: absolute;
		right: 22px;
		bottom: 5px;
	}
</style>
<template>
	<div class="container">
		<Row type="flex" justify="center" align="middle">
			<Col class="table_title" span="20" offset="2">积分统计</Col>
			<Col span="2">

			</Col>
		</Row>
		<Table border :columns="columns1" :height="tablehight" :data="data1"></Table>
		<!--分页组件-->
		<Page :total="40" size="small" show-elevator show-sizer></Page>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				clientHeight: document.documentElement.clientHeight,
				tablehight: document.documentElement.clientHeight - 188, //表格高度
				columns1: [{
						title: '用户名',
						key: 'username',
					},
					{
						title: '自愿党建培训积分',
						key: 'activity',
					},
					{
						title: '考试积分',
						key: 'exam'
					},
					{
						title: '党建活动积分',
						key: 'member'
					},
					{
						title: '阅读积分',
						key: 'study'
					},
					{
						title: '专业学堂积分',
						key: 'teach'
					},
					{
						title: '商城使用积分',
						key: 'shop'
					},
					{
						title: '总积分',
						key: 'score'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$router.push({
												name: 'recordinfo',
												params:{
													id:params.row.user_id
												}
											});
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				//获取数据修改data1
				data1: [],
			}
		},
		created() {
			this.ajaxjson();
		},
		mounted() {
			this.clientHeight = document.documentElement.clientHeight;
			const that = this;
			window.onresize = function temp() {
				that.clientHeight = document.documentElement.clientHeight;
				that.tablehight = that.clientHeight - 188,
					console.log(that.tablehight);
			};
		},
		methods: {
			//请求数据
			ajaxjson() {
				let apiUrl = this.apiUrl;
				this.$http.get(apiUrl + '/score/list').then((response) => {
					console.log(response.data.data.data);
					this.data1 = response.data.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
		},
		watch: {
			ScreenHeight(val) {
				this.ScreenHeight = val;
			}
		}
	}
</script>