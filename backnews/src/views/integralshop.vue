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
				<Input v-model="formItem.goodname" placeholder="输入商品名称"></Input>
			</FormItem>
			<FormItem label="兑换积分">
				<Input v-model="formItem.integral" placeholder="输入兑换积分"></Input>
			</FormItem>
			<FormItem label="商品数量">
				<Input v-model="formItem.num" placeholder="输入商品数量"></Input>
			</FormItem>
			<!--上传图片-->
			<Upload multiple action="地址/posts/">
				<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
			</Upload>
			<!--上传图片结束-->
			<FormItem>
				 <Button type="primary" @click="submit">上传</Button>
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
		methods: {
			submit() {
				let obj = {
					name: this.formItem.name,
					price_score: this.formItem.price_score,
					num: this.formItem.num,
//					uploadimg: "1275467800"
				}
				let apiUrl = this.apiUrl;
				this.$http.post(apiUrl + '/shop/add', obj, {
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