const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Startup = { template: '<startup></startup>' }
const StartPage = { template: '<startpage></startpage>' }
const Facility = { template: '<showFacility></showFacility>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/',  component: Login},
		{ path: '/register', component: Register},
		{ path: '/startpage',  component: StartPage},
		{ path: '/showFacility/:name',  component: Facility},
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});