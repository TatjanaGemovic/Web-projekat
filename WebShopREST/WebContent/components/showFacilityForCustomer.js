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
		      workoutHistory: {id: null, vremePrijave: null, workout: null, kupac: null, trener: null},
		   	map : new ol.Map({
        		target: 'map',
        		layers: [
          			new ol.layer.Tile({
            		source: new ol.source.OSM()
		          })
		        ],
		        view: new ol.View({
		          center: ol.proj.fromLonLat([37.41, 8.82]),
		          zoom: 4
		        })
     	 })
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
			      <button class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<div class="row" style="margin-top: 12%; margin-left:6%">
		<div class="col-lg-5">
			<h1>{{this.facility.name}}</h1> <br>
			<p>Type: {{this.facility.type}}</p>
			<p>Location: {{this.facility.location.address}}</p>
			<p>This object offers: {{this.facility.offer}}</p>
			<p v-if="this.facility.status" class="text-success">Currently open</p>
			<p v-else class="text-danger">Not open</p>
			<p>Working hours: {{this.facility.workingHours}}</p>
			<p>Rating: {{this.facility.rating}}</p>
			<button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Show on map</button>
		</div>
		<div class="col-lg-7"">
			<img v-bind:src="this.facility.imageURI" style="width:90%; height:100%;">
		</div>
	</div>
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 	 <div class="modal-dialog modal-dialog-centered"">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{this.facility.name}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <h6>{{this.facility.location.address}}</h6>
        <div id="map" style="width:300px; height:300px" class="map"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  	</div>
	</div>
	<h2 class="row justify-content-center" style="margin-top: 7%;">Workouts</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%;margin-bottom: 5%">
		<div v-for="w in workouts1" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e"> 
		<img src="pictures/weightlifting.png" v-bind:hidden="w.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
		<img src="pictures/fitness-4.png" v-bind:hidden="w.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
		<img src="pictures/stationary-bike.png" v-bind:hidden="w.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
		<img src="pictures/plank.png" v-bind:hidden="w.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 	
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType(w)}}</span></p>
				<p class="card-text" style="font-size: 17px">{{w.trener.firstName}} {{w.trener.lastName}}</p>
				<p class="card-text">Trajanje: {{w.trajanje}}, cena: {{w.cena}}</p>
				<button class="loginButton" v-on:click="JoinWorkout(w)">Join</button>
				<p style="padding-top: 5px;" id="error">{{error}}</p>
			</div>
		</div>
	</div>
	<h2 class="row justify-content-center">Additional content</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%;margin-bottom: 5%">
		<div v-for="w2 in workouts2" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e; background: #e7e7e5"> 
		<img src="pictures/spa.png" v-bind:hidden="w2.workoutType!='Spa'" class="card-img-top pt-2" /> 
		<img src="pictures/swimming-pool.png" v-bind:hidden="w2.workoutType!='Pool'" class="card-img-top pt-2" /> 
		<img src="pictures/meditation.png" v-bind:hidden="w2.workoutType!='Yoga'" class="card-img-top pt-2" /> 
		<img src="pictures/massage.png" v-bind:hidden="w2.workoutType!='Massage'" class="card-img-top pt-2" /> 
			<div class="card-body">
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
	<div class="row" style="margin-top: 5%;margin-bottom: 5%;margin-left: 8%">
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
    
	</body>
</div>		  
    	`,
    mounted() {
		this.facilityName = this.$route.params.name;
		axios.get('rest/facilities/' +  this.facilityName)
			.then(response => (this.facility = response.data)
			),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
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
				}
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
			event.preventDefault();
			this.error = "";
			axios.get('rest/subscription/allActiveSubscriptionsForCustomer/' + this.user.username)
				.then((response) => {
					this.subscription = response.data;
				})
			if(this.subscription != null){
				this.workoutHistory.workout = workout;
				this.workoutHistory.kupac = this.user;
				event.preventDefault();
				axios.post('rest/workoutHistory/addWorkoutHistory/', this.workoutHistory)
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
			/*let count = 0;
			let average = 0;
			for(let i = 0; i<this.comments.length; i++){
				if(this.comments[i].mark!=0){
					count++;
					average += parseInt(this.comments[i].mark);
				}
			}
			this.facility.rating = average/count;
			axios.post('rest/facilities/add/', this.facility)
				.then((response) => {
				})*/
		},
		ClearForm : function(){
			this.commentText = "";
		},
		ratingChanged : function(event){
			this.rating = event.target.value;
		}
    }
});