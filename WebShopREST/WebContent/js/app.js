const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Startup = { template: '<startup></startup>' }
//const Product = { template: '<edit-product></edit-product>' }
//const Products = { template: '<products></products>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/',  component: Login},
		{ path: '/register', component: Register},
		{ path: '/startup', component: Startup},
	    //{ path: '/registration/:id', component: Registration},
	    //{ path: '/login', name: 'home', component: Login}
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});