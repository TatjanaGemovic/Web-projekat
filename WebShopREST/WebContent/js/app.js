const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Profile = { template: '<profile></profile>' }
const StartPage = { template: '<startpage></startpage>' }
const Guest = { template: '<guestUser></guestUser>' }
const AllProfiles = { template: '<profilesOverview></profilesOverview>' }
const Facility = { template: '<showFacility></showFacility>' }
const AddUser = { template: '<addUser></addUser>' }
const Subscriptions = { template: '<subscriptionsOverview></subscriptionsOverview>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/',  component: Login},
		{ path: '/register', component: Register},
		{ path: '/startpage',  component: StartPage},
		{ path: '/profile',  component: Profile},
		{ path: '/guestUser',  component: Guest},
		{ path: '/profilesOverview',  component: AllProfiles},
		{ path: '/showFacility/:name',  component: Facility},
		{ path: '/addUser',  component: AddUser},
		{ path: '/subscriptionsOverview',  component: Subscriptions},
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});