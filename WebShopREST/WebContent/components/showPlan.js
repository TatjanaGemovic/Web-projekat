Vue.component("showPlan", {
	data: function () {
		    return {
		      planId : "",
		      user: null,
		      newSubs: { id: null, tip: null, datumPlacanja: null, datumVazenja: null, cena: 0,
		      kupac: null, status: null, brojTermina: 0}
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
	<div class="row" style="margin-top: 9%; margin-left:10%">
		<div class="col-lg-5">
			<p class="display-4 my-4 fw-bold" style="color: #F15412">{{PlanName()}}</p> <br>
			<h4>Type:   {{PlanType()}}</h4> <br>
			<h4>Number of pactices included:   {{PrNum()}}</h4> <br>
			<h4>Duration:   {{Duration()}}</h4> <br>
			<h3>Price: </h3><p class="display-5 my-4 fw-bold" style="color: #F15412">{{Price()}}</p>
		</div>
		<div class="col-lg-1"></div>
		<div class="col-lg-6" style="margin-top: 2%;">
			<p class="display-5 my-4 fw-bold" style="color: #F15412; font-size: 32px">Promo code:</p>
			<form>
				<input type="text" placeholder="Enter code..." class="inputFields">
			</form><br><br>
			<h4>Note</h4>
			<p>- Kupovinom nove clanarine automatski ponistavate prethodno kupljenu<br>
			- Clanarina postaje aktivna na dan kupovine i traje odredjen period<br>
			- Clanarina je istekla ukoliko ste iskoristili max broj treninge predvidjen<br>
			- Clanarina je istekla ukoliko je prosao predvidjen period koriscena</p>
			<button class="loginButton" style="width: 160px; height:50px; margin-top:6%" v-on:click="BuyPlan">
                Buy plan
            </button>
		</div>
	</div>
	</body>
</div>		  
    	`,
    mounted() {
		this.planId = this.$route.params.name;
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})
	},
    methods: {
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
		},
		PlanName: function(){
			if(this.planId == 1)
				return "Starter";
			else if(this.planId == 2)
				return "Basic";
			else
				return "Ultimate";
		},
		PlanType: function(){
			if(this.planId == 1)
				return "Monthly";
			else if(this.planId == 2)
				return "Monthly";
			else
				return "Year";
		},
		PrNum: function(){
			if(this.planId == 1)
				return "15";
			else if(this.planId == 2)
				return "90";
			else
				return "unlimited";
		},
		Duration: function(){
			if(this.planId == 1)
				return "1 Month";
			else if(this.planId == 2)
				return "1 Month";
			else
				return "1 Year";
		},
		Price: function(){
			if(this.planId == 1)
				return "$21.99";
			else if(this.planId == 2)
				return "$29.99";
			else
				return "$329.99";
		},
		BuyPlan : function(event) {
			event.preventDefault();
			if(this.planId == 1){
				axios.post('rest/subscription/addSubscription/' + 1, this.user)
					.then((response) => {
						alert('Uspesno kupljena clanarina')
						router.push(`/subscriptionsOverview`)
					})
			}else if(this.planId == 2) {
				axios.post('rest/subscription/addSubscription/' + 2, this.user)
					.then((response) => {
						alert('Uspesno kupljena clanarina')
						router.push(`/subscriptionsOverview`)
					})
			} else{
				axios.post('rest/subscription/addSubscription/' + 3, this.user)
					.then((response) => {
						alert('Uspesno kupljena clanarina')
					})
			}
			
    	}
    }
});