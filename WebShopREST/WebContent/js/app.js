const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Profile = { template: '<profile></profile>' }
const StartPage = { template: '<startpage></startpage>' }
const Guest = { template: '<guestUser></guestUser>' }
const AllProfiles = { template: '<profilesOverview></profilesOverview>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/',  component: Login},
		{ path: '/register', component: Register},
		{ path: '/startpage',  component: StartPage},
		{ path: '/profile',  component: Profile},
		{ path: '/guestUser',  component: Guest},
		{ path: '/profilesOverview',  component: AllProfiles},
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});