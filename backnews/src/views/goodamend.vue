<style scoped="" type="text/css">
	.form {
		margin: 25px;
	}
</style>
<template>
	<div class="form">
		<Row>
			<Col span="12" offset="6">
				<Form :model="formItem" :label-width="100">
			<FormItem label="商品名称">
				<Input v-model="formItem.name"></Input>
			</FormItem>
			<FormItem label="兑换积分">
				<Input v-model="formItem.price_score"></Input>
			</FormItem>
			<FormItem label="商品数量">
				<Input v-model="formItem.num"></Input>
			</FormItem>
			<!--上传图片-->
			<Upload multiple action="地址/posts/">
				<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
			</Upload>
			<!--上传图片结束-->
			<FormItem>
				 <Button type="primary" @click="submit">修改</Button>
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
					name: '',
					price_score: '',
					num:'',
//					uploadimg:'',
				}
			}
		},
		created() {
			this.ajaxjson();
		},
		methods: {
			ajaxjson() {
				let apiUrl = this.apiUrl;
				this.$http.get(apiUrl + '/shop/update?id='+this.$route.params.id).then((response) => {
					console.log(response.data.data);
					this.formItem = response.data.data;
				}, (response) => {
					alert('服务器请求失败');
				});
			},
			submit() {
				let obj = {
					name: this.formItem.name,
					price_score: this.formItem.price_score,
					num: this.formItem.num,
//					uploadimg: "1275467800"
				}
				let apiUrl = this.apiUrl;
				this.$http.post(apiUrl + '/shop/update?id='+this.$route.params.id, obj, {
					emulateJSON: true
				}).then((response) => {
					this.$Message.info('添加成功');

				}, (response) => {
					alert('服务器请求失败');
				});
			},
		}
	}
</script>