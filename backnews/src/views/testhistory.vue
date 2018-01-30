<style scoped="" type="text/css">
	.form {
		margin: 25px;
	}
	
	.table_title {
		text-align: center;
		height: 60px;
		line-height: 60px;
	}
	.answer {
		margin-top: 15px;
	}
</style>
<template>
	<div class="form">
		<div class="table_title">
			{{this.$route.params.title}}
		</div>
		<Form ref="formDynamic" :model="formDynamic" label-position="right" :label-width="100" style="width: 800px;margin: 0 auto;">
			<FormItem v-for="(item, index) in formDynamic.items"  :key="index" :label="'题目' + (index+1)" :prop="'items.' + index + '.value'" :rules="{required: true, message: '题目' + item.index +'不能为空', trigger: 'blur'}">
				<Row>
					<Col span="21">
					<Row type="flex" justify="center" align="middle">
						<Col span="24">
						<Input type="text" v-model="item.value" clearable  placeholder="输入题目"></Input>
						</Col>
						<Col span="24">
						<Row style="margin-top: 15px;">
							<Col span="11" class="answer">
								<Input v-model="item.answer.A">
								<span slot="prepend">A:</span>
								</Input>
							</Col>
							<Col span="11" offset="2" class="answer">
							<Input v-model="item.answer.B">
							<span slot="prepend">B:</span>
							</Input>
							</Col>
							<Col span="11" class="answer">
							<Input v-model="item.answer.C">
							<span slot="prepend">C:</span>
							</Input>
							</Col>
							<Col span="11" offset="2" class="answer">
							<Input v-model="item.answer.D">
							<span slot="prepend">D:</span>
							</Input>
							</Col>
							<Col span="11" class="answer">
							<Input v-model="item.answer.success">
							<span slot="prepend">正确答案：</span>
							</Input>
							</Col>
						</Row>
						</Col>
					</Row>
					</Col>
					<Col span="2" offset="1">
					<Button type="ghost" @click="handleRemove(index)">删除</Button>
					</Col>
				</Row>
			</FormItem>
			<FormItem>
				<Row>
					<Col span="12">
					<Button type="dashed" long @click="handleAdd" icon="plus-round">添加题目</Button>
					</Col>
				</Row>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title:"",//初始化修改标题
				formDynamic: {
					items: [{
						value: '',
						index: 1,
						answer: {
							A: '',
							B: '',
							C: '',
							D: '',
							success:'',
						}
					}]
				},
			}
		},
		methods: {
			//提交
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						console.log(valid);
						this.$Message.success('Success!');
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			//添加
			handleAdd() {
				this.index++;
				this.formDynamic.items.push({
					value: '',
					index: this.index,
					answer: {
						A: '',
						B: '',
						C: '',
						D: '',
						success:'',
					}
				});
			},
			//删除
			handleRemove(index) {
				this.formDynamic.items.splice(index, 1);
			}
		}
	}
</script>