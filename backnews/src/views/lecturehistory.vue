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
			<Col class="table_title" span="20" offset="2">专业讲堂</Col>
			<Col span="2">
			<Button type="primary" @click="goto">添加</Button>
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
				modal1: false,
				test: {
					title: '',
					time: '',
					integral: ''
				},
				columns1: [{
						title: '标题',
						key: 'title',
					},
					{
						title: '积分',
						key: 'score',
					},
					{
						title: '开始时间',
						key: 'start_time'
					},
					{
						title: '结束时间',
						key: 'end_time'
					},
					{
						title: '活动地址',
						key: 'address'
					},
					{
						title: '设置的参与人数',
						key: 'setting_num'
					},
					{
						title: '实际的参与人数',
						key: 'reality_num'
					},
					{
						title: '简介',
						key: 'comment'
					},
					{
						title: '发布人',
						key: 'submiter'
					},
					{
						title: '图片',
						key: 'picture',
						render: (h, params) => {
							let _this = this;
							let src = params.row.picture;
							return h('img', {
								props: {
									type: 'primary',
									size: 'small'
								},
								attrs: {
									src: this.apiUrl + '/' + params.row.picture,
									style: 'width: 40px;height: 40px;border-radius: 2px;'
								},
							})
						}
					},

					{
						title: '状态',
						key: 'state',
						render: (h, params) => {
							let _this = this;
							let texts = '';
							if(params.row.state == 1) {
								texts = "待发布 "
							} else if(params.row.state == 2) {
								texts = "开始 "
							} else if(params.row.state == 3) {
								texts = "结束"
							}
							return h('div', {
								props: {},
							}, texts)
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 300,
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
											this.show(params.index)
										}
									}
								}, '查看'),
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
												name: 'lectureamend',
												params: {
													id: params.row.id
												}
											});
										}
									}
								}, '修改'),
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
											this.$router.push('/testhistory');
										}
									}
								}, '发布'),
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
											this.show(params.index)
										}
									}
								}, '撤销'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.$http.post(this.apiUrl + '/activity/delete', {
												id: params.row.id,
											}, {
												emulateJSON: true
											}).then((response) => {
												//添加成功后重新请求
												this.$Message.info('删除成功');
											}, (response) => {
												alert('服务器请求失败');
											});
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
				this.$http.get(apiUrl + '/activity/list').then((response) => {
					console.log(response.data.data.data);
					this.data1 = response.data.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			goto() {
				this.$router.push('/lecture');
			},
			remove(index) {
				this.data1.splice(index, 1);
			},
		},
		watch: {
			ScreenHeight(val) {
				this.ScreenHeight = val;
			}
		}
	}
</script>