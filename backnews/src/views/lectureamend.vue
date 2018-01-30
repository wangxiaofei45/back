<style scoped="" type="text/css">
	.form {
		margin: 25px;
	}
	
	.table_title {
		text-align: center;
		height: 60px;
		line-height: 60px;
	}
</style>
<template>
	<div class="form">
		<div class="table_title">
			专业讲堂修改
		</div>
		<Row>
			<Col span="12" offset="6">
			<Form :model="formItem" :label-width="120">
				<FormItem label="活动名称">
					<Input v-model="formItem.title" :value="formItem.title" placeholder="输入商品名称"></Input>
				</FormItem>
				<FormItem label="积分数">
					<Input v-model="formItem.score" placeholder="输入兑换积分"></Input>
				</FormItem>
				<Row>
					<Col span="12">
					<FormItem label="开始时间">
						<DatePicker type="datetime" v-model="start_time" placeholder="Select date and time" style="width: 200px"></DatePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="结束时间">
						<DatePicker type="datetime" v-model="end_time"placeholder="Select date and time" style="width: 200px"></DatePicker>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="活动地点">
					<Input v-model="formItem.address" placeholder="地点"></Input>
				</FormItem>
				<FormItem label="设定参与人数">
					<Input v-model="formItem.setting_num" placeholder="设定参与人数"></Input>
				</FormItem>
				<FormItem label="活动简介">
					<Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="输入活动简介"></Input>
				</FormItem>
				<FormItem label="发布人" >
					<Input v-model="formItem.submiter" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="输入活动简介"></Input>
				</FormItem>
				<!--上传图片-->
				<Upload multiple action="地址/posts/">
					<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
				</Upload>
				<!--上传图片结束-->
				<FormItem>
					<Button type="primary" @click="submit">发布</Button>
				</FormItem>
			</Form>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				start_time: '',
				end_time:'',
				formItem: {}
			}
		},
		created() {
			this.ajaxjson();
			this.start_time = this.timestampToTime(this.start_time);
			this.end_time = this.timestampToTime(this.end_time);
		},
		methods: {
			ajaxjson() {
				let apiUrl = this.apiUrl;
				this.$http.get(apiUrl + '/activity/update?id=' + this.$route.params.id).then((response) => {
					console.log(response.data.data);
					this.formItem = response.data.data;
					this.start_time = parseInt(this.formItem.start_time);
					this.end_time = parseInt(this.formItem.end_time);
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			//格式化时间戳
			timestampToTime(timestamp) {
				let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let h = date.getHours() + ':';
				let m = date.getMinutes() + ':';
				let s = date.getSeconds();
				return Y + M + D + h + m + s;
			},
			submit() {
				console.log();
				let obj = {
					title: this.formItem.title,
					score: this.formItem.score,
					start_time: this.start_time,
					end_time:this.end_time,
					address: this.formItem.address,
					setting_num: this.formItem.setting_num,
					comment: this.formItem.comment,
					submiter: this.formItem.submiter
					//					uploadimg: "1275467800"
				}
				let apiUrl = this.apiUrl;
				this.$http.post(apiUrl + '/activity/update?id=' + this.$route.params.id, obj, {
					emulateJSON: true
				}).then((response) => {
					this.$Message.info('修改成功');
					this.ajaxjson();
				}, (response) => {
					alert('服务器请求失败');
				});
//				console.log(obj);
//				let objs = JSON.stringify(obj);
//				let apiUrl = this.apiUrl;
//				console.log(obj);
//				this.$http.post(apiUrl + '/teach/update', objs, {
//						headers: {
//							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//						},
//					})
//					.then((response) => {
//						//添加成功后重新请求
//						this.$Message.info('修改成功');
//					}, (response) => {
//						alert('服务器请求失败');
//					});
			},
		}
	}
</script>