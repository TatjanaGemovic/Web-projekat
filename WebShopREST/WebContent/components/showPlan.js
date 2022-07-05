Vue.component("showPlan", {
	data: function () {
		    return {
		      planId : "",
		      user: null,
		      codes: null,
		      newSubs: { id: null, tip: null, datumPlacanja: null, datumVazenja: null, cena: 0,
		      kupac: null, status: null, brojTermina: 0},
		      popust: 1.0,
		      Kod: "",
		      cena:0,
		      error: '',
		      dodatniPopust: 0.0,
		      subs: null
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
			<h3>Price: </h3><p class="display-5 my-4 fw-bold" style="color: #F15412">{{cena}}</p>
		</div>
		<div class="col-lg-1"></div>
		<div class="col-lg-6" style="margin-top: 2%;">
			<p class="display-5 my-4 fw-bold" style="color: #F15412; font-size: 30px">{{user.tipKupca}} kupac   <span style="font-size: 22px; color: black; margin-left: 2%">+ {{getDodatniPopust()}}%  popusta</span></p>
			<h3 class="fw-bold" style="color: #F15412">Promo code:</h3>
			<form>
				<input type="text" placeholder="Enter code..." class="inputFields" v-model="Kod">
				<button class="loginButton" style="width: 140px; height:40px; margin-left:4%" v-on:click="ApplyCode">
                	Apply code
            	</button>
			</form>
			<p style="padding-top: 10px;" id="error">{{error}}</p>
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
				this.ShowActiveSub()
			}),
		axios.get('rest/promo/allPromoCodes')
			.then((response) => {
				this.codes = response.data;
			})
		
	},
    methods: {
		ShowActiveSub : function(){
			axios.get('rest/subscription/activeSubscriptionsForCustomer/' + this.user.username)
				.then((response) => {
				this.subs = response.data;
			})
			if(this.subs != null){
				if(this.subs.status == 'neaktivna'){
					if(this.subs.paket/3*2 < this.subs.brojTermina){
						bodovi = this.subs.cena/1000 *133*4
						this.user.sakupljeniBodovi -= bodovi
					}else{
						bodovi = this.subs.cena/1000 * (this.subs.paket-this.subs.brojTermina)
						this.user.sakupljeniBodovi += bodovi
					}
				}
				axios.put('rest/changeUser/' + this.user.username, this.user)
				.then((response) => {
					//alert('Uspesno izmenjeni bodovi kod korisnika1')
				}),
				axios.post('rest/login/', this.user);
				event.preventDefault();
			}
			
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
		},
		getDodatniPopust: function(){
			if(this.user.tipKupca == "Regularni"){
				this.dodatniPopust = 0;
				this.p = 1
			}else if(this.user.tipKupca == "Bronzani"){
				this.dodatniPopust = 3;
				this.p = 0.97;
			}else if(this.user.tipKupca == "Srebrni"){
				this.dodatniPopust = 5;
				this.p = 0.95;
			}else if(this.user.tipKupca == "Zlatni"){
				this.dodatniPopust = 10;
				this.p = 0.9;
			}
			if(this.planId == 1)
				this.cena = 21.99*this.p*this.popust;
			else if(this.planId == 2)
				this.cena = 29.99*this.p*this.popust;
			else
				this.cena = 329.99*this.p*this.popust;
			this.cena = "$" + parseFloat(this.cena).toFixed(2)
			return this.dodatniPopust
		},
		ApplyCode : function(){
			event.preventDefault();
			this.error = "";
			codeExists = false;
			for(let i=0; i<this.codes.length; i++){
				if(this.codes[i].oznaka==this.Kod){
					this.popust = 1.0-this.codes[i].popust;
					codeExists = true;
					break;
				}
			}
			if(!codeExists){
				this.error = "Code expired or doesn't exists";
				return;
			}
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
		BuyPlan : function(event) {
			event.preventDefault();
			bodovi = 0;
			if(this.subs != null){
				if(this.subs.status == 'aktivna'){
					if(this.subs.paket/3*2 < this.subs.brojTermina){
						bodovi = this.subs.cena/1000 *133*4
						this.user.sakupljeniBodovi -= bodovi
					}else{
						bodovi = this.subs.cena/1000 * (this.subs.paket-this.subs.brojTermina)
						this.user.sakupljeniBodovi += bodovi
					}	
				}
				axios.put('rest/changeUser/' + this.user.username, this.user)
				.then((response) => {
					//alert('Uspesno izmenjeni bodovi korisnika2')
				}),
				axios.post('rest/login/', this.user);
				event.preventDefault();
			}
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