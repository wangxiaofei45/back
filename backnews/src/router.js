const routers = [{
		path: '/',
		component: (resolve) => require(['./views/login.vue'], resolve)
	},
	{
		path: '/root',
		component: (resolve) => require(['./views/root.vue'], resolve),
		children: [
		    {
		    	path:'/',
		    	redirect: '/index'
		    },
		    {
				path: '/index',
				component: (resolve) => require(['./views/index.vue'], resolve)
			},
			{
				path: '/integral',
				component: (resolve) => require(['./views/integral.vue'], resolve)
			},
			{   
				name:'recordinfo',
				path: '/recordinfo',
				component: (resolve) => require(['./views/recordinfo.vue'], resolve)
			},
			//积分商城
			{
				path: '/shop',
				component: (resolve) => require(['./views/shop.vue'], resolve)
			},
			{
				path: '/integralshop',
				component: (resolve) => require(['./views/integralshop.vue'], resolve)
			},
			//商品修改
			{
				name:'goodamend',
				path: '/goodamend',
				component: (resolve) => require(['./views/goodamend.vue'], resolve)
			},
			{
				path: '/testinline',
				component: (resolve) => require(['./views/testinline.vue'], resolve)
			},
			{
				name:'testhistory',
				path: '/testhistory',
				component: (resolve) => require(['./views/testhistory.vue'], resolve)
			},
			//添加党建活动
			{
				path: '/activity',
				component: (resolve) => require(['./views/activity.vue'], resolve)
			},
			//党建活动列表
			{
				path: '/partyactivity',
				component: (resolve) => require(['./views/partyactivity.vue'], resolve)
			},
            //党建活动修改
			{
				name:'activityamend',
				path: '/activityamend',
				component: (resolve) => require(['./views/activityamend.vue'], resolve)
			},
			{
				path: '/train',
				component: (resolve) => require(['./views/train.vue'], resolve)
			},
			{
				path: '/trainhistory',
				component: (resolve) => require(['./views/trainhistory.vue'], resolve)
			},
			{
				name:'trainamend',
				path: '/trainamend',
				component: (resolve) => require(['./views/trainamend.vue'], resolve)
			},
			{
				path: '/history',
				component: (resolve) => require(['./views/history.vue'], resolve)
			},
			{
				path: '/beyond',
				component: (resolve) => require(['./views/beyond.vue'], resolve)
			},
			{
				path: '/lecture',
				component: (resolve) => require(['./views/lecture.vue'], resolve)
			},
			{
				path: '/lecturehistory',
				component: (resolve) => require(['./views/lecturehistory.vue'], resolve)
			},
			//专业讲堂修改
			{
				name:'lectureamend',
				path: '/lectureamend',
				component: (resolve) => require(['./views/lectureamend.vue'], resolve)
			},
		]
	},

];
export default routers;