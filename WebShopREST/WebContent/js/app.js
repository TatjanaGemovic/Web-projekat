const Login = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Profile = { template: '<profile></profile>' }
const StartPage = { template: '<startpage></startpage>' }
const Guest = { template: '<guestUser></guestUser>' }
const AllProfiles = { template: '<profilesOverview></profilesOverview>' }
const Facility = { template: '<showFacility></showFacility>' }
const FacilityForCustomer = { template: '<showFacilityForCustomer></showFacilityForCustomer>' }
const AddUser = { template: '<addUser></addUser>' }
const Subscriptions = { template: '<subscriptionsOverview></subscriptionsOverview>' }
const AddFacility = {template: '<addFacility></addFacility>'}
const Plan = { template: '<showPlan></showPlan>' }
const CustomerWorkouts = { template: '<customerWorkouts></customerWorkouts>' }
const PendingComments = { template: '<pendingComments></pendingComments>' }
const MySubscription = { template: '<mySubscription></mySubscription>' }


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
		{ path: '/showFacilityForCustomer/:name',  component: FacilityForCustomer},
		{ path: '/addUser',  component: AddUser},
		{ path: '/subscriptionsOverview',  component: Subscriptions},
		{ path: '/addFacility',  component:  AddFacility},
		{ path: '/showPlan/:name',  component: Plan},
		{ path: '/customerWorkouts',  component:  CustomerWorkouts},
		{ path: '/pendingComments',  component: PendingComments},
		{ path: '/mySubscription',  component:  MySubscription},
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});