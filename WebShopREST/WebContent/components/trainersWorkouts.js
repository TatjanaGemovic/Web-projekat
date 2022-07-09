Vue.component("trainersWorkouts", {
	data: function () {
		    return {
		      user: null,
		      uloga: "Trener",
		      trainersWorkouts: [],
		      allWorkouts: null,
		      facilities: null,
		      workoutsworkouts: null
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
			      <button  class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<h1>Your workouts</h1>
	<div class="row" style="margin-top:20%">
		<div v-for="(workout, index) in trainersWorkouts">
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
		cancel : function(index){
				this.trainersWorkouts[index].status = "cancelled";
				axios.put('rest/scheduledWorkout/cancelScheduledWorkout/'+this.trainersWorkouts[index].id)
				.then((response) => {
					alert('Trening otkazan')
				})
		}
		
		
    }
});