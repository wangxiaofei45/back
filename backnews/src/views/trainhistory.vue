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
			<Col class="table_title" span="20" offset="2">党建活动</Col>
			<Col span="2">
			<Button type="primary" @click="goto">添加</Button>
			</Col>
		</Row>
		<Table border :columns="columns1" :height="tablehight" :data="data1"></Table>
		<!--弹出框-->
		<Modal v-model="modal1" title="添加测试" @on-ok="ok" @on-cancel="cancel">
			<Form :model="test" label-position="right" :label-width="100">
				<FormItem label="测试标题：">
					<Input v-model="test.title"></Input>
				</FormItem>
				<FormItem label="测试时长：">
					<Input v-model="test.time"></Input>
				</FormItem>
				<FormItem label="积分数：">
					<Input v-model="test.integral"></Input>
				</FormItem>
			</Form>
		</Modal>
		<!--分页组件-->
		<Page :total="40" size="small"  show-elevator show-sizer></Page>
	</div>

</template>
<script>
	export default {
		data() {
			return {
                clientHeight: document.documentElement.clientHeight,
				tablehight: document.documentElement.clientHeight - 188,//表格高度
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
									src: this.apiUrl +'/'+params.row.picture,
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
											this.$router.push(
												{
													name:'trainamend',
													params:{
														id:params.row.id
													}
												}
											);
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
											
											this.$http.post(this.apiUrl + '/teach/delete', {
												id:params.row.id,
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
				this.$http.get(apiUrl + '/teach/list').then((response) => {
					console.log(response.data.data.data);
					this.data1 = response.data.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `姓名：${this.data1[index].username}<br>部门：${this.data1[index].department}<br>职位：${this.data1[index].position}<br>积分：${this.data1[index].score}<br>最新登陆时间：${this.data1[index].logintime}`
				})
			},
			goto() {
				this.$router.push('/train');
			},
			remove(index) {
				this.data1.splice(index, 1);
			},
			ok() {
				let that = this;
				let apiUrl = this.apiUrl;
				this.$http.post(apiUrl + '/examList/add', {
					title: this.test.title,
					time: this.test.time,
					score: this.test.integral
				}, {
					emulateJSON: true
				}).then((response) => {
					//添加成功后重新请求
					this.$Message.info('添加成功');
					this.ajaxjson();
				}, (response) => {
					alert('服务器请求失败');
					console.log(this.test.integral);
				});
				console.log(this.test);
			},
			cancel() {
				this.$Message.info('点击取消');
			}
		},
			watch: {
			ScreenHeight(val) {
				this.ScreenHeight = val;
			}
		}
	}
</script>