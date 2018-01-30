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
		<div class="table_title">
			员工列表
		</div>
		<Table border :height="tablehight"  :columns="columns1" :data="data1"></Table>
		<!--分页组件-->
		<Page :total="40" size="small"  show-elevator show-sizer></Page>
	</div>

</template>
<script>
	import  axios from 'axios';
	export default {
		data() {
			return {
				 clientHeight: document.documentElement.clientHeight,
				tablehight: document.documentElement.clientHeight - 188,//表格高度
				columns1: [{
						title: '姓名',
						key: 'username',
					},
					{
						title: '部门',
						key: 'department',
					},
					{
						title: '职位',
						key: 'position'
					},

					{
						title: '积分',
						key: 'score'
					},
					{
						title: '最新登陆时间',
						key: 'logintime'
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
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
				data1: []
			}
		},
		 created(){
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
			//请求本地的数据
			ajaxjson() {
				axios.get('http://114.67.241.156:8081/user/list').then((response) => {
					this.data1 = response.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `姓名：${this.data1[index].username}<br>部门：${this.data1[index].department}<br>职位：${this.data1[index].position}<br>积分：${this.data1[index].score}<br>最新登陆时间：${this.data1[index].logintime}`
                })
            },
            remove (index) {
                this.data1.splice(index, 1);
            }
		},
		watch: {
			ScreenHeight(val) {
				this.ScreenHeight = val;
			}
		}
	}
</script>