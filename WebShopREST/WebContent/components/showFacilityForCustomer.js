Vue.component("showFacilityForCustomer", {
	data: function () {
		    return {
		      facilityName : "",
		      facility : null,
		      user: null,
		      workouts: null,
		      workouts1: [],
		      workouts2: [],
		      comments: null,
		      commentsToShow: [],
		      commentText: "",
		      rating: 0,
		      usersComment: {user: null, sportsFacility: null, comment: "", mark: 0, status: "pending"},
		      firstTimeHere: true,
		      subscription: null,  
		      error: '',
		      workoutToShow: null,
		      pocetak: null,
		      workoutHistory: {id: 0, user: null, workout: null, danPrijave: null, danOdrzavanja: null, status: null}
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
	<div class="row" style="margin-top: 5%">
	     <div id="map" class="map" style="border: 2px solid black"></div>
	</div>
	<div class="row" style="margin-top: 6%; margin-left:6%">
		<div class="col-lg-5">
			<h1>{{this.facility.name}}</h1> <br>
			<p>Type: {{this.facility.type}}</p>
			<p>Location: {{this.facility.location.address}}</p>
			<p>This object offers: {{this.facility.offer}}</p>
			<p v-if="this.facility.status" class="text-success">Currently open</p>
			<p v-else class="text-danger">Not open</p>
			<p>Working hours: {{this.facility.workingHours}}</p>
			<p>Rating: {{this.facility.rating}}</p>
		</div>
		<div class="col-lg-7"">
			<img v-bind:src="this.facility.imageURI" style="width:90%; height:100%;">
		</div>
	</div>
	<h2 class="row justify-content-center" style="margin-top: 7%;">Workouts</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%;margin-bottom: 5%">
		<div v-for="(w,index) in workouts1" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e"> 
			<img v-bind:src="w.imageURI"  class="card-img-top pt-2" /> 	
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType(w)}}</span></p>
				<p class="card-text" style="font-size: 17px">{{w.trener.firstName}} {{w.trener.lastName}}</p>
				<p class="card-text">Trajanje: {{w.trajanje}}</p>
				<button v-on:click="OpenModalFor(index)" data-bs-toggle="modal" data-bs-target="#exampleModal2" class="loginButton">Join</button>
				<p style="padding-top: 5px;" id="error">{{error}}</p>
			</div>
		</div>
	</div>
	<h2 class="row justify-content-center">Additional content</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%;margin-bottom: 5%">
		<div v-for="w2 in workouts2" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e; background: #e7e7e5"> 
				<img v-bind:src="w2.imageURI"  class="card-img-top pt-2" /> 	

			<div class="card-body" style="background: #e7e7e5">
				<p class="card-title" style="font-weight: bold; font-size: 28px">{{w2.naziv}}</p>
				<p class="card-text" style="font-weight: bold; font-size: 20px;color: #F15412">{{w2.workoutType}}</p>
				<p class="card-text">Doplata: {{w2.cena}}</p>
			</div>
		</div>
	</div>
	</div><br>
	<h2 class="row justify-content-center" style="margin-bottom: 5%">Comments</h2>
	<div class="row border-bottom-2" style="margin-top: 5%;margin-bottom: 5%" v-if="firstTimeHere">
		<div class="col-md-6" style="margin-left:9%">
			<form>
				<textarea class="form-control" v-model="commentText" rows="3"></textarea>
			</form>
		</div>
		<div class="col-md-1"><p style="font-weight: bold; font-size: 20px;padding-top:6%;padding-left:10%">Rating: </p></div>
		<div class="col-md-2">
			<div class="rating">
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="5" id="5"><label for="5">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="4" id="4"><label for="4">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="3" id="3"><label for="3">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="2" id="2"><label for="2">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="1" id="1"><label for="1">&#10025;</label>
			</div>
		</div>
		<div class="col-md-3"></div>
	</div>
	<div class="row" v-if="firstTimeHere" style="margin-top: 5%;margin-bottom: 5%;margin-left: 8%">
		<div class="col-md-4">
			<button class="loginButton2" v-on:click="PostComment" style="margin-left: 2%">Post</button>
			<button class="loginButton2" v-on:click="ClearForm" style="margin-left: 3%">Cancel</button>
		</div>
	</div>
    <div class="row" style="margin-top: 5%;margin-bottom: 5%;margin-left: 8%">
    	<div v-for="comment in commentsToShow" class="col-md-7 border-bottom-2" style="margin-bottom:2%;margin-right:20%">
    		<p class="fw-bold" style="font-weight: bold; font-size: 20px;">from: <span style="font-size: 26px; color: #F15412; margin-left: 2%">{{comment.user}}</span></p>
    		<div style="border: 2px solid #3e3e3e;padding:2%;padding-bottom:0%">
    			<p class="ps-3" style="font-size: 18px;">{{comment.comment}}</p>
    			<p class="fw-bold" style="font-weight: bold;text-align: right; font-size: 17px;color: #F15412">Rated: {{comment.mark}}/5</p>
    		</div>
    	</div>
    </div>
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 	 <div class="modal-dialog modal-dialog-centered"">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Schedule Workout</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Add Code"></button>
      </div>
      <div class="modal-body">
   		<div class="row g-3 align-items-center">
   			<div class="col-auto">
		    <label for="birthDay" class="col-form-label">Date of workout: </label>
		  </div>
		  <div class="col-auto">
			<input type="date" id="birthDay" class="form-control" v-model="pocetak"/>		
		  </div>
		</div>
      </div>
      <div class="modal-footer text-center">
        <button v-on:click="JoinWorkout(workoutToShow)" class="loginButton" data-bs-dismiss="modal" style="width: 150px;margin-right:2%">Schedule</button>
      </div>
    </div>
  </div>
</div>
	</body>
</div>		  
    	`,
    mounted() {
		this.facilityName = this.$route.params.name;
		axios.get('rest/facilities/' +  this.facilityName)
			.then((response) => {
				this.facility = response.data;
			}),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.GetSubscription()
				//ovde proveriti na osnovu istorije trenigna da li je bio nekad pre, ako nije onda firstTimeHere ostaje true
			}),
		axios.get('rest/workout/allWorkoutsForFacility/' + this.facilityName)
			.then((response) => {
				this.workouts = response.data;
				this.SortContent()
			})
		axios.get('rest/comments/commentsByFacility/' +  this.facilityName)
			.then((response) => {
				this.comments = response.data;
				
				for(let i=0; i<this.comments.length; i++){
					if(this.comments[i].status=="approved")
						this.commentsToShow.push(this.comments[i]);
					if(this.comments[i].user==this.user.username)
						this.firstTimeHere = false;
				}
				this.calculateRating();
				this.showMap()
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
		showMap : function(){
			var myStyle = new ol.style.Style({
			  image: new ol.style.Icon({
			    anchor: [0.5, 1],
			    anchorXUnits: 'fraction',
    			anchorYUnits: 'fraction',
    			scale: [0.05, 0.05],
			    src: 'pictures/placeholder.png',
			  }),
		    })
			var map = new ol.Map({
	        target: 'map',
	        layers: [
	          new ol.layer.Tile({
	            source: new ol.source.OSM()
	          	}),
	        ],
	        view: new ol.View({
	          center: ol.proj.fromLonLat([19.824220, 45.256469]),
	          zoom: 12
	          })
      		})
			var layer = new ol.layer.Vector({
		     source: new ol.source.Vector({
		         features: [
		             new ol.Feature({
		                 geometry: new ol.geom.Point(ol.proj.fromLonLat([this.facility.location.latitude, this.facility.location.longitude]))
		             })
			         ],
			     }),
			     style: myStyle
			 });
 			map.addLayer(layer);
		},
		calculateRating : function(){
			if(this.commentsToShow.length==0){
				this.facility.rating = 0;
				return;
			}
			let ratingSum = 0;
			for(let i=0; i<this.commentsToShow.length; i++){
				ratingSum += this.commentsToShow[i].mark;
			}	
			this.facility.rating = (parseFloat(ratingSum) / this.commentsToShow.length).toFixed(1);
		},
		GetSubscription : function(){
			axios.get('rest/subscription/allActiveSubscriptionsForCustomer/' + this.user.username)
				.then((response) => {
					this.subscription = response.data;
				})
		},
		OpenModalFor : function(index){
			this.workoutToShow = this.workouts1[index];
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
		SortContent : function(){
			event.preventDefault();
			for(let i=0; i<this.workouts.length; i++){
				if((this.workouts[i]).workoutType =='Yoga' || (this.workouts[i]).workoutType =='Massage' 
				|| (this.workouts[i]).workoutType =='Spa' || (this.workouts[i]).workoutType =='Pool'){
					this.workouts2.push(this.workouts[i])
				}else{
					this.workouts1.push(this.workouts[i])
				}
			}
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		JoinWorkout: function(workout) {
			this.error = "";
			if(this.subscription != null){
				this.workoutHistory.workout = this.workoutToShow;
				this.workoutHistory.user = this.user;
				this.workoutHistory.danOdrzavanja = this.pocetak;
				axios.post('rest/scheduledWorkout/addScheduledWorkout/', this.workoutHistory)
							.then((response) => {
								alert('Uspesno dodat novi trening')
							})
			}else{
				this.error = "Subscription expired or doesn't exists";
			}
		},
		PostComment : function(){
			this.usersComment.user = this.user.username;
			this.usersComment.sportsFacility = this.facility.name;
			this.usersComment.comment = this.commentText;
			this.usersComment.mark = this.rating;
			
			//this.comments.push(this.usersComment);
			this.commentText = "";
			axios.post('rest/comments/addComment/', this.usersComment)
				.then((response) => {
					alert('Comment sent for review')			
					
			});
			this.firstTimeHere = false;
		},
		ClearForm : function(){
			this.commentText = "";
		},
		ratingChanged : function(event){
			this.rating = event.target.value;
		}
    }
});