Vue.component("customerWorkouts", {
	data: function () {
		    return {
		      user: null,
		      workoutsHistory: [],
		      workoutsHistory2: [],
		      workoutsUpcoming: [],
		      workouts: null,
		      finished: false,
		      upcoming: false,
		      workoutsToShow: null,
		      textInputValueToSearchBy: "",
		      dateInputValueToSearchBy: null,
		      propToSearchBy: 0,
		      propToSearchBy2: 0,
		      propToSearchBy3: "first",
		      inputTextNeeded : true,
		      inputDateNeeded : true,
		      objectType : "GYM",
		      workoutType : "T_Personal",
		      text: "",
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
	<div class="row" style="margin-top: 10%;margin-right: 27%; margin-left:27%">
		<div class="col-md-6">
			<button class="loginButton" v-on:click="ShowFinished"  style="height: 40px">Finished workouts</button>
		</div>
		<div class="col-md-6">
			<button class="loginButton" v-on:click="ShowUpcoming"  style="height: 40px">Upcoming workouts</button>
		</div>
	</div>
	<div class="row justify-content-center" style="margin-bottom:6%;margin-left:5%;margin-top:4%" v-bind:hidden="upcoming == false">
		<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/filter.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Filters
    	</a>	
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged2($event)" style="margin-top: 4%;">
  			<option selected value="0">Object Type</option>
  			<option value="1">Workout Type</option>
  			
		</select>
		<select class="form-select form-select-sm" v-if="inputTextNeeded" v-on:change="objectTypeSelectionChanged($event)" >
  			<option value="GYM">Gym</option>
  			<option value="POOL">Pool</option>
  			<option value="SPORTS_CENTRE">Sport Centre</option>
  			<option value="DANCE_STUDIO">Dance Studio</option>
		</select>
		<select class="form-select form-select-sm" v-else v-on:change="workoutTypeSelectionChanged($event)" >
  			<option selected value="T_Strength">Strength</option>
  			<option value="T_Cardio">Cardio</option>
  			<option value="T_Endurance">Endurance</option>
  			<option value="T_Personal">Personal</option>
  			<option value="T_Group">Group</option>
		</select>
    	 <br>
    	<button class="loginButton" v-on:click="filter">Filter</button>
		</form>
		</div>
		<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/search.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Search
    	</a>
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged($event)" style="margin-top: 4%;">
  			<option selected value="0">Object</option>
  			<option value="1">Date</option>
		</select>
		
		<input type="text" class="form-control form-control-sm" v-if="inputDateNeeded" v-model="textInputValueToSearchBy" style="height: 90%" name="searchInput" placeholder="Type here..." style="width:100%">
		<input type="date" class="form-control form-control-sm" v-else v-model="dateInputValueToSearchBy" style="height: 90%" name="searchInput" placeholder="Type here..." style="width:100%">
    	<button class="loginButton" v-on:click="search" style="margin-top: 15%;">Search</button>
    	</form>
    	</div>
    	<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/filter-2.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Sort
    	</a>	
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged3($event)" style="margin-top: 4%;">
  			<option value="0">Object name</option>
  			<option value="1">Price</option>
  			<option value="2">Date</option>
		</select>
		<br>
    	<button class="loginButton" v-on:click="sort" style="margin-top: 15%;">Sort</button>
    	</form>
    	</div>
    	<div class="col-xs-4 col-md-4 col-sm-4"></div>
		<div class="col-xs-2 col-md-2 col-sm-2">
		    	<button class="loginButton" v-on:click="resetFilter" style="width: 200px;heigth: 50px; margin-right: 35%;float: right;margin-top:30%">Reset</button>
		</div>
	</div>
	<section id="intro" style="margin-top:3%;">
	<div class="row justify-content-center" v-bind:hidden="finished == false">
		<div v-for="w in workoutsHistory" class="col-md-2 card m-2"> 
			<img src="pictures/weightlifting.png" v-bind:hidden="w.workout.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
			<img src="pictures/physical-activity.png" v-bind:hidden="w.workout.workoutType!='T_Group'" class="card-img-top pt-2" /> 
			<img src="pictures/fitness-4.png" v-bind:hidden="w.workout.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
			<img src="pictures/stationary-bike.png" v-bind:hidden="w.workout.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
			<img src="pictures/plank.png" v-bind:hidden="w.workout.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.workout.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType(w)}}</span></p>
				<p class="card-text">{{w.workout.facility.name}}</p>
				<p class="card-text">{{w.vremePrijave}}</p>
			</div>
		</div>
	</div>
	<div class="row justify-content-center" v-bind:hidden="upcoming == false">
		<div v-for="w1 in workoutsToShow" class="col-md-2 card m-2"> 
			<img src="pictures/weightlifting.png" v-bind:hidden="w1.workout.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
			<img src="pictures/physical-activity.png" v-bind:hidden="w1.workout.workoutType!='T_Group'" class="card-img-top pt-2" /> 
			<img src="pictures/fitness-4.png" v-bind:hidden="w1.workout.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
			<img src="pictures/stationary-bike.png" v-bind:hidden="w1.workout.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
			<img src="pictures/plank.png" v-bind:hidden="w1.workout.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w1.workout.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType2(w1)}}</span></p>
				<p class="card-text">{{w1.workout.facility.name}}</p>
				<p class="card-text">{{w1.danOdrzavanja}}</p>
				<p class="card-text" style="font-weight: bold; font-size: 20px;color: #F15412">{{w1.status}}</p>
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
			}),
		axios.get('rest/workout/allWorkouts')
			.then((response) => {
				this.workouts = response.data;
				this.ShowWorkouts()
			})
	},
    methods: {
		GetType : function(w){
			if(w.workout.workoutType == 'T_Strength'){
				return 'Strength';
			}else if(w.workout.workoutType == 'T_Cardio'){
				return 'Cardio';
			}else if(w.workout.workoutType == 'T_Endurance'){
				return 'Endurance';
			}else if(w.workoutType == 'T_Personal'){
				return 'Personal';
			}else {
				return 'Group';
			}
		},
		GetType2 : function(w){
			if(w.workout.workoutType == 'T_Strength'){
				return 'Strength';
			}else if(w.workout.workoutType == 'T_Cardio'){
				return 'Cardio';
			}else if(w.workout.workoutType == 'T_Endurance'){
				return 'Endurance';
			}else if(w.workout.workoutType == 'T_Personal'){
				return 'Personal';
			}else {
				return 'Group';
			}
		},
		ShowWorkouts : function(){
			event.preventDefault();
			axios.get('rest/workoutHistory/allWorkoutsHistoryForCustomer/'+ this.user.username)
			.then((response) => {
				this.workoutsHistory = response.data;
			})
		},
		ShowFinished : function(){
			this.finished = true;
			this.upcoming = false;
		},
		ShowUpcoming : function(){
			this.upcoming = true;
			this.finished = false;
			event.preventDefault();
			axios.get('rest/scheduledWorkout/allScheduledWorkoutsForUserInFuture/'+ this.user.username)
			.then((response) => {
				this.workoutsUpcoming = response.data;
				this.workoutsToShow = this.workoutsUpcoming;
			})
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
		search : function(event) {
			event.preventDefault();
			this.text = this.dateInputValueToSearchBy;
			somethingFound = false;
			this.workoutsToShow = [];
			for(let i=0; i<this.workoutsUpcoming.length; i++){
				if(this.propToSearchBy==0 && (this.workoutsUpcoming[i]).workout.facility.name.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.workoutsToShow.push(this.workoutsUpcoming[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==1 && (this.workoutsUpcoming[i]).danPrijave==this.dateInputValueToSearchBy){
					this.workoutsToShow.push(this.workoutsUpcoming[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.workoutsToShow = this.workoutsUpcoming;		
    	},
    	resetSearch : function(){
			this.workoutsToShow = this.workoutsUpcoming;	
		},
		propertyToSearchBySelectionChanged : function(event){
			this.propToSearchBy = event.target.value;
			if(event.target.value == 0){
				this.inputDateNeeded = true;
			}else{
				this.inputDateNeeded = false;
			}
		},
		filter : function(event) {
			event.preventDefault();
			somethingFound = false;
			this.workoutsToShow = [];
			for(let i=0; i<this.workoutsUpcoming.length; i++){
				if(this.propToSearchBy2==0 && (this.workoutsUpcoming[i]).workout.facility.type==this.objectType){
					this.workoutsToShow.push(this.workoutsUpcoming[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy2==1 && (this.workoutsUpcoming[i]).workout.workoutType==this.workoutType){
					this.workoutsToShow.push(this.workoutsUpcoming[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.workoutsToShow = this.workoutsUpcoming;		
    	},
    	resetFilter : function(){
			this.workoutsToShow = this.workoutsUpcoming;	
		},
		propertyToSearchBySelectionChanged3 : function(event){
			if(event.target.value==1)
				this.propToSearchBy3 = "price"
			else if(event.target.value==0)
				this.propToSearchBy3 = "name"
			else 
				this.propToSearchBy3 = "date"
		},
		objectTypeSelectionChanged : function(event){
			this.objectType = event.target.value;
		},
		workoutTypeSelectionChanged : function(event){
			this.workoutType = event.target.value;
		},
		propertyToSearchBySelectionChanged2 : function(event){
			this.propToSearchBy2 = event.target.value;
			if(event.target.value==1)
				this.inputTextNeeded = false;
			else
				this.inputTextNeeded = true;
		},
		sort: function(){
			event.preventDefault();
			if(this.propToSearchBy3 == "name"){
				this.workoutsToShow.sort(function(a, b){
				  if ( a.workout.naziv.toLowerCase() < b.workout.naziv.toLowerCase()){
				    return -1;
				  }
				  if ( a.workout.naziv.toLowerCase() > b.workout.naziv.toLowerCase()){
				    return 1;
				  }
				  return 0;
				})
			}else if (this.propToSearchBy3 == "date"){
				this.workoutsToShow.sort(function(a, b){
				  if ( a.danPrijave.toLowerCase() < b.danPrijave.toLowerCase()){
				    return 1;
				  }
				  if ( a.danPrijave.toLowerCase() > b.danPrijave.toLowerCase()){
				    return -1;
				  }
				  return 0;
				})
			}else{
				this.workoutsToShow.sort(function(a, b){
				return b.workout.cena - a.workout.cena;})
			}
			
		}
    },
});