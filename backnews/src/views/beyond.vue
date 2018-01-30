<template>
	<div class="hello">
		<div class="table_title">
			城东学堂/任务发布
		</div>
		<Row>
			<Col span="12" offset="6">
				<Form :model="formItem" :label-width="100">
			<FormItem label="标题">
				<Input v-model="formItem.goodname" placeholder="输入商品名称"></Input>
			</FormItem>
			<FormItem label="奖励积分">
				<Input v-model="formItem.integral" placeholder="输入兑换积分"></Input>
			</FormItem>
			<FormItem label="阅读所需时间">
				<Input v-model="formItem.time" placeholder="请输入"></Input>
			</FormItem>
		</Form>
			</Col>
		</Row>
		<div id="editor" type="text/plain" style="width:1024px;height:500px;"></div>
		<div class="bottom">
			
				<Button @click="submits">保存</Button>
		        <Button @click="xieru">写入</Button>

		</div>
		
	</div>
</template>
<script>
	import '../../static/utf8-php/ueditor.config.js';
	import '../../static/utf8-php/ueditor.all.js';
	import '../../static/utf8-php/lang/zh-cn/zh-cn.js';
	import '../../static/utf8-php/ueditor.parse.min.js'
	export default {
		name: 'hello',
		data() {
			return {
				formItem: {
					goodname: '',
					integral: '',
					time:''
				},
				//富文本初始化
				ue: '',
				uedata: [],
				xierudata: []
			}
		},
		mounted() {
			this.ue = UE.getEditor('editor', {
				BaseUrl: '',
				UEDITOR_HOME_URL: 'static/utf8-php/',
				// toolbars:[] 
			});
		},
		methods: {
			submits() {
				this.uedata.push(UE.getEditor('editor').getContent());
				console.log(this.uedata.join("\n"));
			},
			xieru() {
				UE.getEditor('editor').setContent('欢迎使用ueditor');
			}
		},
		//离开时销毁对象;避免重复渲染
		destroyed() {
			UE.getEditor('editor').destroy();
		},
	}
</script>
<style scoped type="text/css">
	#editor {
		margin: 0 auto;
	}
	.table_title {
		text-align: center;
		height: 60px;
		line-height: 60px;
	}
	.bottom{
		text-align: center;
		margin-top: 25px;
		margin-bottom: 50px;
	}
</style>