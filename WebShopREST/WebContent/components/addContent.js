Vue.component("addContent", {
	data: function () {
		    return {
		      workout: { naziv: "", workoutType: "T_Strength", facilityId: "", facility: null, trajanje: "",
		      trener: null, userId: "", opis: "", imageURI: "", cena: 0}, 
		      workouts: null,
		      user : null,
		      uloga : null,
			  gender: null,
			  trainers: [],
			  trainingToBeAdded: true,
			  workoutIndex: -1,
			  buttonContent: "Add",
			  headerText: "Add a new facility",
			  selectedTrainer: null,
			  sameNameExists: "",
			  imageToUpload: ""
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
	<div class="row justify-content-center" style="margin-top: 10%">
	<h3 style="margin-left:8%; margin-top:2%;margin-botton:6%">{{headerText}}</h3>
	<form class="col-lg-6" style="margin-left:15%">
			<input type="text" placeholder="Workout name" v-model="workout.naziv" >
			<p class="text-danger" style="display:inline-block">{{sameNameExists}}</p><br><br>
			<label>Choose content type:</label>
			<select class="form-select form-select-sm" v-on:change="workoutTypeSelectionChanged($event)" :style="{ 'width': '50%'}">
  			<option selected value="T_Strength">Strength Training</option>
  			<option value="T_Cardio">Cardio</option>
  			<option value="Yoga">Yoga</option>
  			<option value="T_Endurance">Endurance training</option>
  			<option value="T_Personal">Personal training</option>
  			<option value="T_Group">Group training</option>
  			<option value="Spa">Spa</option>
  			<option value="Massage">Massage</option>
  			<option value="Pool">Pool</option>
			</select><br>
			<div  v-if="trainingToBeAdded">
			<label>Choose trainer:</label>
			<select class="form-select form-select-sm" v-on:change="trainerSelectionChanged($event)" :style="{ 'width': '50%'}">
			    <option v-for="trainer in trainers" :value="trainer.username" >{{trainer.firstName}} {{trainer.lastName}}</option>
			</select>
			</div><br>
			<textarea placeholder="Description" v-model="workout.opis"></textarea><br><br>
			<input type="text" placeholder="Duration" v-model="workout.trajanje"><br><br>
			<input type="file" name="avatar" accept="image/*" v-model="imageToUpload"><br><br>

			<button class="loginButton" style="width:15%" v-on:click = "addContent">{{buttonContent}}</button>
	</form>
	</div>
	</body>
</div>		  
    	`,
    mounted() {
		this.workoutIndex = this.$route.params.index;
		if(this.workoutIndex==-1){
			this.buttonContent = "Add";
			this.headerText = "Add new content";
		}
		else {
			this.buttonContent = "Apply Changes";
			this.headerText = "Edit " + this.workout.naziv;
		}
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.SetProperties();
			})
	},
    methods: {	
		SetProperties: function(){	
			axios.get('rest/facilities/' +  this.user.facilityId)
			.then(response => (this.workout.facility = response.data)
			),
		axios.get('rest/workout/allWorkoutsForFacility/' + this.user.facilityId)
			.then((response) => {
				this.workouts = response.data;
				this.GetTrainers();
			})
		},
		GetTrainers: function(){		
			axios.get('rest/trainers')
			.then((response) => {
				this.trainers = response.data;
				this.SetWorkout();
			})	
		},
		SetWorkout: function(){
			
			if(this.workoutIndex==-1){
					this.selectedTrainer = this.trainers[0];
			}
				else {
					this.workout = this.workouts[this.workoutIndex];
					this.selectedTrainer = this.workout.trener;
				}
		},
    	addContent : function(event) {
			event.preventDefault();
			contentExists = false;
			parsedString = []
			parsedString = this.imageToUpload.split("\\");
			this.imageToUpload = parsedString[parsedString.length-1];
			this.workout.imageURI = "pictures/" + this.imageToUpload;
			for(let i=0; i<this.workouts.length; i++){
				if((this.workouts[i]).naziv==this.workout.naziv && i!=this.workoutIndex){
					this.sameNameExists = "Content with the same name is already available in this object";
					contentExists = true;
					return;
				}
			}
			
			if(!contentExists){ 		
				this.workout.facilityId = this.user.facilityId;
				axios.post('rest/workout/addWorkout/', this.workout)
				.then((response) => {
					alert('Workout added to facility')
					name = this.user.facilityId.replaceAll(" ", "_");
					router.push(`/showFacility/${name}`);
				})
			}
    	}, 	
    	workoutTypeSelectionChanged : function(event){
			this.workout.workoutType = event.target.value;
			if(this.workout.workoutType.includes("T_"))
				this.trainingToBeAdded = true;
			else 
				this.trainingToBeAdded = false;
		},
		trainerSelectionChanged : function(event){
			for(let i=0; i<this.trainers.length; i++)
				if(this.trainers[i].username==event.target.value){
					this.workout.trener = this.trainers[i];
				//	this.selectedTrainer = this.trainers[i];
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
		}	
    }
});