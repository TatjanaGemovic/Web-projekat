Vue.component("mySubscription", {
	data: function () {
		    return {
		      user: null,
		      subs: null,
		    }
	},
	template: ` 
<div>
	<body>
	<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-lg p-3 mb-5 bg-white" style="background-color: #b4b5b3;font-size:50px; height: 80px; border-bottom: 2px solid #3e3e3e">
  		<div class="container-fluid" style="margin-bottom: 0px">
			<a class="navbar-brand" style="margin-left: 20px;margin-right: 120px; font-size: 28px">
      			<img src="pictures/barbell-2.png" alt="" width="65" height="55" style="margin-right: 10px" class="d-inline-block">
      			Fitpass
    		</a>  		
    	
	    	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="collapse navbar-collapse d-flex flex-row-reverse gap-2" id="navbarNav" style="font-size: 20px">
		      <ul class="navbar-nav d-flex gap-2">
		        <li class="nav-item">
		          <a class="nav-link" href="#intro" v-on:click="StartPage">Pocetna</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" v-on:click="Subscriptions" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link" class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<h2 class="row justify-content-center" style="margin-top: 10%;">My Subscription</h2>
	<div class="row" style="margin-top: 1%; margin-left:10%">
		<div class="col-lg-1"></div>
		<div class="col-lg-5">
			<p class="display-4 my-4 fw-bold" style="color: #F15412">{{Paket()}}</p> <br>
			<h4>Type:   {{PlanType()}}</h4> <br>
			<h4>Number of pactices included:   {{PrNum()}}</h4> <br>
			<h4>Number of pactices left:   {{PrNumLeft()}}</h4> <br>
			<h4>Duration:   {{Duration()}}</h4> <br>
			<h4>Expires on: <input type="date" v-model="this.subs.datumVazenja" style="color: #3e3e3e" disabled/></h4> <br>
		</div>
		<div class="col-lg-4" style="margin-top: 2%">
			<img src="pictures/membership.png" class="img-fluid" alt="ebook">
		</div>
		<div class="col-lg-2"></div>
	</div>
	</body>
</div>		  
    	`,
    mounted() {
		this.planId = this.$route.params.name;
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.ShowActiveSub()
			})
	},
    methods: {
		ShowActiveSub : function(){
			axios.get('rest/subscription/activeSubscriptionsForCustomer/' + this.user.username)
				.then((response) => {
				this.subs = response.data;
			})
		},
		Paket : function(){
			if(this.subs.paket == 90){
				return "Basic";
			}else if(this.subs.paket == 15){
				return "Starter";
			}else{
				return "Ultimate";
			}
		},
		PlanType: function(){
			if(this.subs.paket == 90 )
				return "Monthly";
			else if(this.subs.paket == 15)
				return "Monthly";
			else
				return "Year";
		},
		PrNum: function(){
			if(this.subs.paket == 15)
				return "15";
			else if(this.subs.paket == 90)
				return "90";
			else
				return "unlimited";
		},
		PrNumLeft: function(){
				return this.subs.brojTermina;
		},
		Duration: function(){
			if(this.subs.paket == 90)
				return "1 Month";
			else if(this.subs.paket == 15)
				return "1 Month";
			else
				return "1 Year";
		},
    	LogOut : function(event){
			event.preventDefault();
			router.push(`/`);
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
		},
		Subscriptions : function(){
			event.preventDefault();
			router.push(`/subscriptionsOverview`);
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		}
    }
});