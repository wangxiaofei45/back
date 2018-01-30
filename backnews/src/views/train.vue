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
			党建培训
		</div>
		<Row>
			<Col span="12" offset="6">
			<Form :model="formItem" :label-width="120">
				<FormItem label="活动名称">
					<Input v-model="formItem.goodname" placeholder="输入商品名称"></Input>
				</FormItem>
				<FormItem label="积分数">
					<Input v-model="formItem.integral" placeholder="输入兑换积分"></Input>
				</FormItem>
				<Row>
					<Col span="12">
					<FormItem label="开始时间">
						<DatePicker type="datetime" v-model="formItem.starttime" placeholder="Select date and time" style="width: 200px"></DatePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="结束时间">
						<DatePicker type="datetime" v-model="formItem.endtime" placeholder="Select date and time" style="width: 200px"></DatePicker>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="活动地点">
					<Input v-model="formItem.site" placeholder="地点"></Input>
				</FormItem>
				<FormItem label="设定参与人数">
					<Input v-model="formItem.number" placeholder="设定参与人数"></Input>
				</FormItem>
				<FormItem label="活动简介" prop="desc">
					<Input v-model="formItem.synopsis" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="输入活动简介"></Input>
				</FormItem>
				<FormItem label="发布人" prop="desc">
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
				formItem: {
					goodname: '',
					integral: '',
					starttime: '',
					endtime: '',
					site: '',
					number: '',
					synopsis: '',
					submiter:''
				}
			}
		},

		methods: {
			submit() {
				let obj = {
					title: this.formItem.goodname,
					score: this.formItem.integral,
					start_time:  Date.parse(this.formItem.starttime)/1000,
					end_time: Date.parse(this.formItem.endtime)/1000,
					address: this.formItem.site,
					setting_num: this.formItem.number,
					comment: this.formItem.synopsis,
					submiter: this.formItem.submiter
//					uploadimg: "1275467800"
				}
				let apiUrl = this.apiUrl;
				this.$http.post(apiUrl + '/teach/add', obj, {
					emulateJSON: true
				}).then((response) => {
					this.$Message.info('添加成功');
					this.ajaxjson();
				}, (response) => {
					alert('服务器请求失败');
				});
			},
		}
	}
</script>