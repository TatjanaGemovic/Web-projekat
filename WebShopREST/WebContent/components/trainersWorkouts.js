Vue.component("trainersWorkouts", {
	data: function () {
		    return {
		      user: null,
		      uloga: "Trener",
		      trainersWorkouts: [],
		      allWorkouts: null,
		      facilities: null,
		      workoutsworkouts: null,
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
	<h1 style="margin-top:10%">Your workouts</h1>
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
  			<option value="1">Date</option>
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
	<div class="row" style="margin-top:6%">
		<div v-for="(workout, index) in workoutsToShow">
			<div v-if="workout.status!='cancelled'" class="col-8" class="border-bottom-0">
				<p>{{workout.workout.naziv}}</p>
				<p>{{workout.workout.workoutType}}</p>
				<p>{{workout.workout.facility.name}}</p>
				<p>{{workout.workout.trajanje}}</p>
			</div>
			<div v-if="workout.status!='cancelled'" class="col-4">
				<button v-if="workout.canBeCancelled" class="btn btn-danger" v-on:click="cancel(index)">Cancel</button>
			</div>
		</div>
	</div>
	</body>
</div>		  
    	`,
    mounted() {
		axios
			.get('rest/facilities/allFacilities')
			.then(response => (this.facilities = response.data)
			),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			}),
		axios
			.get('rest/workout/allWorkouts')
			.then((response) => {
				this.workoutsworkouts = response.data;
				this.ScheduledWorkouts()
			})
	},
    methods: {
		ScheduledWorkouts : function(){
			axios
			.get('rest/scheduledWorkout/allScheduledWorkouts')
			.then((response) => {
				this.allWorkouts = response.data
				this.forPetlja()
			})
		},
		forPetlja:function(){
			for(let i=0; i<this.allWorkouts.length; i++){
					if(this.allWorkouts[i].workout.trener!=null)
						if((this.allWorkouts[i]).workout.trener.username==this.user.username){
						this.trainersWorkouts.push(this.allWorkouts[i]);
						}				
			}
			this.workoutsToShow = this.trainersWorkouts
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
		cancel : function(index){
				this.trainersWorkouts[index].status = "cancelled";
				axios.put('rest/scheduledWorkout/cancelScheduledWorkout/'+this.trainersWorkouts[index].id)
				.then((response) => {
					alert('Trening otkazan')
				})
		},
		search : function(event) {
			event.preventDefault();
			this.text = this.dateInputValueToSearchBy;
			somethingFound = false;
			this.workoutsToShow = [];
			for(let i=0; i<this.trainersWorkouts.length; i++){
				if(this.propToSearchBy==0 && (this.trainersWorkouts[i]).workout.facility.name.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.workoutsToShow.push(this.trainersWorkouts[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==1 && (this.trainersWorkouts[i]).danPrijave==this.dateInputValueToSearchBy){
					this.workoutsToShow.push(this.trainersWorkouts[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.workoutsToShow = this.trainersWorkouts;		
    	},
    	resetSearch : function(){
			this.workoutsToShow = this.trainersWorkouts;	
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
			for(let i=0; i<this.trainersWorkouts.length; i++){
				if(this.propToSearchBy2==0 && (this.trainersWorkouts[i]).workout.facility.type==this.objectType){
					this.workoutsToShow.push(this.trainersWorkouts[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy2==1 && (this.trainersWorkouts[i]).workout.workoutType==this.workoutType){
					this.workoutsToShow.push(this.trainersWorkouts[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.workoutsToShow = this.trainersWorkouts;		
    	},
    	resetFilter : function(){
			this.workoutsToShow = this.trainersWorkouts;	
		},
		propertyToSearchBySelectionChanged3 : function(event){
			if(event.target.value==1)
				this.propToSearchBy3 = "date"
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
			}
		}
		
    }
});