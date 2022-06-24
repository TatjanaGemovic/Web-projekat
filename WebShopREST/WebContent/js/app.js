const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Startup = { template: '<startup></startup>' }
const StartPage = { template: '<startpage></startpage>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/',  component: Login},
		{ path: '/register', component: Register},
		{ path: '/startpage',  component: StartPage},
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});