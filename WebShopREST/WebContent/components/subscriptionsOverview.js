Vue.component("subscriptionsOverview", {
	data: function () {
		    return {
		      user: null,
		    }
	},
template: ` 
<div>
	<body>
		<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-lg p-3 mb-5 bg-white" style="background-color: #b4b5b3;font-size:50px; height: 80px; border-bottom: 2px solid #3e3e3e">
  		<div class="container-fluid" style="margin-bottom: 0px">
			<a class="navbar-brand" style="margin-left: 20px;margin-right: 120px; font-size: 28px">
      			<img src="pictures/barbell-2.png" alt="" width="65" height="55" style="margin-right: 10px" class="d-inline-block">
      			FitPro
    		</a>  		
    	
	    	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="collapse navbar-collapse justify-content-end align-center gap-2" id="navbar" style="font-size: 20px">
		      <ul class="navbar-nav d-flex gap-2">
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" href="#intro" v-on:click="goStartPage">Start Page</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'" v-on:click="Workouts">My Trainings</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'" v-on:click="TrainersWorkouts">My Trainings</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'" v-on:click="ShowAllProfiles">Users</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'" v-on:click="goToMyFacility">My Facility</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" v-on:click="Subscriptions" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Subscriptions</a>
		          <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal2" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Promo</a>
		        </li>
		        <li class="nav-item" v-bind:hidden="this.user.uloga!='Administrator'">
		          <a class="nav-link" href="#" v-on:click="GoToPendingComments">Pending Comments</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profile</a>
		        </li>
		        <li class="nav-item">
			      <button class="loginButton"  v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section style="margin-top:10%;">
	<div class="row" style="margin-bottom: 35px">
		<div class="col-xs-5 col-md-9 col-sm-6"></div>
		<div class="col-xs-7 col-md-3 col-sm-6">
			<button class="loginButton" style="width: 200px;heigth: 50px; margin-right: 23%;float: right" v-on:click="MySubscription">My subscription</button>
		</div>
	</div>
	<div class="container-lg">
      <div class="text-center">
        <h2>Pricing Plans</h2>
        <p class="lead text-muted">Choose a pricing plan to suit you.</p>
      </div>

      <div class="row my-5 g-0 align-items-center justify-content-center">
        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0">
            <div class="card-body text-center py-4">
              <h3 class="card-title">Starter</h3>
              <p class="lead card-subtitle">3 times a week</p>
              <p class="display-5 my-4 fw-bold" style="color: #F15412">$21.99<span style="font-size:16px">/month</span></p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(1)">
                See plan
              </button>
            </div>
          </div>
        </div>

        <div class="col-9 col-lg-4">
          <div class="card" style="border: 2px solid #F15412">
            <div class="card-header text-center" style="color: #F15412">Most Popular</div>
            <div class="card-body text-center py-5">
              <h3 class="card-title">Basic</h3>
              <p class="lead card-subtitle">All month unlimited</p>
              <p class="display-4 my-4 fw-bold" style="color: #F15412">$29.99<span style="font-size:18px">/month</span></p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(2)">
                See plan
              </button>
            </div>
          </div>
        </div>

        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0">
            <div class="card-body text-center py-4">
              <h3 class="card-title">Ultimate</h3>
              <p class="lead card-subtitle">All year unlimited</p>
              <p class="display-5 my-4 fw-bold" style="color: #F15412">$329.99</p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(3)">
                See plan
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
	</section>
	</body>
</div>		  
    	`,
    methods: {
				LogOut : function(event){
			event.preventDefault();
			router.push(`/`);
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
		},
		Workouts : function(){
			event.preventDefault();
			router.push(`/customerWorkouts`);
		},
		
		TrainersWorkouts : function(){
			router.push(`/trainersWorkouts`);
		},
		goToWorkoutsPage : function(){
			router.push(`/searchWorkouts`);
		},
		Subscriptions : function(){
			event.preventDefault();
			router.push(`/subscriptionsOverview`);
		},
		AddPromo : function(event) {
			event.preventDefault();

				axios.post('rest/promo/addPromoCode/' + this.promoCode.trajanje, this.promoCode)
					.then((response) => {
						alert('Uspesno dodat novi promo kod')
					})
    	},
		ShowAllProfiles : function(){
			event.preventDefault();
			router.push(`/profilesOverview`);
		},
		GoToPendingComments : function(){
			router.push(`/pendingComments`);
		},
		goStartPage: function(){
			router.push(`/startpage`);
		},
		goToMyFacility: function(){
			name = this.user.facilityId.replaceAll(" ", "_");
			router.push(`/showFacility/${name}`);
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		SeePlan : function (name){
			router.push(`/showPlan/${name}`);
		},
		MySubscription : function (name){
			router.push(`/mySubscription`);
		},
    },
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	
	}
});