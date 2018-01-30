<template>
	<div class="login">
		<div class="login_con">
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
				<Row style="margin-top: 50px;">
					<Col span="20" offset="2">
							<FormItem prop="user">
					<Input type="text" v-model="formInline.user" placeholder="Username">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
					</Col>
					<Col span="20" offset="2">
							<FormItem prop="password">
					<Input type="password" v-model="formInline.password" placeholder="Password">
					<Icon type="ios-locked-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
					</Col>
				</Row>
			
			
				<FormItem>
					<div class="submit">
						<Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
					</div>
					
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	 export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('登陆成功!');
                         this.$router.push({path:'/root'});
                    } else {
                        this.$Message.error('登陆失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100%;
		background-color: #333333;
	}
	.login_con {
		width: 500px;
		height: 350px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -175px;
		margin-left: -250px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.submit{
		width: 100%;
		text-align: center;
	}
	.submit button{
		width: 80%;
		height: 50px;
		font-size: 28px;
	}
	.ivu-input-group{
		font-size: 24px;
		height: 60px;
		line-height: 60px;
	}

</style>
<style type="text/css">
	.login .ivu-input{
		height: 60px!important;
		line-height: 60px!important;
	}
    .login .ivu-input-group-prepend{
	 	width: 60px!important;
	 }
</style>