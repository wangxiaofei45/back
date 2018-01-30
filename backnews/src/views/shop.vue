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
			<Col class="table_title" span="20" offset="2">积分商城</Col>
			<Col span="2">
			<Button type="primary" @click="goto">添加</Button>
			</Col>
		</Row>
		<Table border :height="tablehight" :columns="columns1" :data="data1"></Table>
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
						title: '商品名称',
						key: 'name',
					},
					{
						title: '兑换所需积分',
						key: 'price_score',
					},
					{
						title: '数量',
						key: 'num'
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
									src: this.apiUrl +'/'+ params.row.picture,
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
								texts = "上架 "
							} else if(params.row.state == 2) {
								texts = "下架 "
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
												name:'goodamend',
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
											this.$http.post(this.apiUrl + '/shop/grounding', {
												id:params.row.id,
											}, {
												emulateJSON: true
											}).then((response) => {
												this.$Message.info('下降成功');
											}, (response) => {
												alert('服务器请求失败');
											});
											this.remove(params.index) 
										}
									}
								}, '下架'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.$http.post(this.apiUrl + '/shop/delete', {
												id:params.row.id,
											}, {
												emulateJSON: true
											}).then((response) => {
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
				this.$http.get(apiUrl + '/shop/list').then((response) => {
					console.log(response.data.data);
					this.data1 = response.data.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			goto(){
				this.$router.push('/integralshop');
			}
		},
		watch: {
			ScreenHeight(val) {
				this.ScreenHeight = val;
			}
		}
	}
</script>