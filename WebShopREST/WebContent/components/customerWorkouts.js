Vue.component("customerWorkouts", {
	data: function () {
		    return {
		      user: null,
		      workoutsHistory: [],
		      workoutsHistory2: [],
		      workoutsUpcoming: [],
		      workouts: null,
		      finished: false,
		      upcoming: false
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
		          <a class="nav-link" href="#intro" v-on:click="StartPage">Pocetna</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link active" aria-current="page" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
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
	<div class="row" style="margin-top: 10%;margin-right: 27%; margin-left:27%">
		<div class="col-md-6">
			<button class="loginButton" v-on:click="ShowFinished"  style="height: 40px">Finished workouts</button>
		</div>
		<div class="col-md-6">
			<button class="loginButton" v-on:click="ShowUpcoming"  style="height: 40px">Upcoming workouts</button>
		</div>
	</div>
	<section id="intro" style="margin-top:10%;">
	<div class="row justify-content-center" v-bind:hidden="finished == false">
		<div v-for="w in workoutsHistory" class="col-md-2 card m-2"> 
			<img src="pictures/weightlifting.png" v-bind:hidden="w.workout.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
			<img src="pictures/physical-activity.png" v-bind:hidden="w.workout.workoutType!='T_Yoga'" class="card-img-top pt-2" /> 
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
		<div v-for="w1 in workoutsUpcoming" class="col-md-2 card m-2"> 
			<img src="pictures/weightlifting.png" v-bind:hidden="w1.workout.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
			<img src="pictures/physical-activity.png" v-bind:hidden="w1.workout.workoutType!='T_Yoga'" class="card-img-top pt-2" /> 
			<img src="pictures/fitness-4.png" v-bind:hidden="w1.workout.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
			<img src="pictures/stationary-bike.png" v-bind:hidden="w1.workout.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
			<img src="pictures/plank.png" v-bind:hidden="w1.workout.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w1.workout.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType(w1)}}</span></p>
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
			if(w.workoutType == 'T_Strength'){
				return 'Strength';
			}else if(w.workoutType == 'T_Cardio'){
				return 'Cardio';
			}else if(w.workoutType == 'T_Endurance'){
				return 'Endurance';
			}else if(w.workoutType == 'T_Personal'){
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
			})
		},
		LogOut : function(){
			event.preventDefault();
			router.push(`/`);
			//window.location.href = 'products.html';
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
			//window.location.href = 'products.html';
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
    },
});