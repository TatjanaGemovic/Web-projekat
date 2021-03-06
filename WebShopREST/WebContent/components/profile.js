Vue.component("profile", {
	data: function () {
		    return {
			user: null,
			gender: null,
			subs: null,
			k:0
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
	<section style="margin-top: 8%">
		<div class="container-lg">
      	<div class="row g-5 justify-content-center align-items-center" style="margin-right: 40px">
      		<div class="col-md-4 text-start d-none d-md-block" style="margin-right: 40px" >
	          <img src="pictures/fitness.png" class="img-fluid" alt="ebook" v-bind:hidden="user.gender=='musko'">
	       	  <img src="pictures/fitness-2.png" class="img-fluid" alt="ebook" v-bind:hidden="user.gender=='zensko'">
	        </div>

        <div class="col-md-4">
          
          <form @submit="Save">
            <label class="form-label">First Name:</label>
            <div class="input-group mb-3">
              <input type="text" id="firstName" class="form-control" v-model="user.firstName"/>
            </div>
            <label class="form-label">Second Name:</label>
            <div class="mb-3 input-group">
              <input type="text" id="secondName" class="form-control" v-model="user.lastName"/>
            </div>
        	<label class="form-label">Gender:</label>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="F" value="zensko" v-model="user.gender"/>
              <label class="form-check-label" for="F">Female</label>
            </div>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="M" value="musko" v-model="user.gender"/>
              <label class="form-check-label" for="M">Male</label>
            </div>
            </br>
            <label class="form-label">Birth Day:</label>
            <div class="mb-3 input-group">
              <input type="date" id="birthDay" class="form-control" v-model="user.birthDate"/>
            </div>
            <label class="form-label" v-bind:hidden="this.user.uloga!='Kupac'">Type:</label>
            <div class="mb-3 input-group">
              <input type="text" id="username" class="form-control" v-bind:hidden="this.user.uloga!='Kupac'" v-model="TipKupca()" disabled/>
            </div>
            <label class="form-label">Username:</label>
            <div class="mb-3 input-group">
              <input type="text" id="username" class="form-control" v-model="user.username" disabled/>
            </div>
            <label class="form-label">Password</label>
            <div class="mb-3 input-group">
              <input type="password" id="password" class="form-control" v-model="user.password"/>
            </div>
            <div class="mb-3 text-center">
            	<input type="submit" value="Save" style="width: 150px" class="loginButton"/>
            </div>
          </form>
        </div>
      </div>
      	</div>
      	</div>
	</section>
	</body>
</div>		  
    	`,
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.ShowActiveSub()
				this.gender = this.user.gender
			})
	},
    methods: {
		ShowActiveSub : function(){
			axios.get('rest/subscription/activeSubscriptionsForCustomer/' + this.user.username)
				.then((response) => {
				this.subs = response.data;
			})
		},
		TipKupca : function(){
			if(this.subs != null){
				if(this.k==0){
					this.k=1;
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
				}
			}
			return this.user.tipKupca + "   (bodovi: " + this.user.sakupljeniBodovi + ")";
		},
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
		Save : function(event){
			axios.put('rest/changeUser/' + this.user.username, this.user)
				.then((response) => {
					alert('Uspesno izmenjen korisnik')
				}),
			axios.post('rest/login/', this.user);
			event.preventDefault();
		},
	},   
});