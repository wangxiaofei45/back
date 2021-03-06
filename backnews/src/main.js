import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Util);
Vue.prototype.apiUrl = "http://114.67.241.156:8081";
//Vue.http.options.headers = {
//'Content-Type': 'application/text; charset=UTF-8'
//}
// 路由配置
const RouterConfig = {
	mode: 'hash',
	routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	Util.title(to.meta.title);
	next();
});

router.afterEach((to, from, next) => {
	iView.LoadingBar.finish();
	window.scrollTo(0, 0);
});


new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});
