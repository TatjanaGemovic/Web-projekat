Vue.component("showFacilityForCustomer", {
	data: function () {
		    return {
		      facilityName : "",
		      facility : null,
		      user: null,
		      workouts: null,
		      workoutHistory: {id: null, vremePrijave: null, workout: null, kupac: null, trener: null},
		      comments: null,
		      commentsToShow: [],
		      commentText: "",
		      rating: 0,
		      usersComment: {user: null, sportsFacility: null, comment: "", mark: 0, status: "pending"},
		      firstTimeHere: true
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
        <p>Map goes here</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  	</div>
	</div>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%">
		<div v-for="w in workouts" class="col-md-2 card m-2"> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.naziv}}</p>
				<p class="card-text">{{w.workoutType}}</p>
				<p class="card-text">{{w.trajanje}}</p>
				<button class="loginButton" v-on:click="JoinWorkout(w)">Join</button>
			</div>
		</div>
	</div>
	</div>
	<h2>Comments</h2>
	<div v-if="firstTimeHere" class="row border-bottom-2">
		<div class="col-md-7">
			<form>
				<textarea class="form-control" v-model="commentText" rows="3"></textarea>
			</form>
		</div>
		<div class="col-md-3">
			<div class="rating">
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="5" id="5"><label for="5">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="4" id="4"><label for="4">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="3" id="3"><label for="3">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="2" id="2"><label for="2">&#10025;</label>
  				<input v-on:change="ratingChanged($event)" type="radio" name="rating" value="1" id="1"><label for="1">&#10025;</label>
			</div>
		</div>
		<div class="col-md-2">
			<button class="btn btn-success" v-on:click="PostComment">Post</button>
			<button class="btn btn-danger" v-on:click="ClearForm">Cancel</button>
		</div>
	</div>
    <div class="row">
    	<div v-for="comment in commentsToShow" class="col-md-8 border-bottom-2">
    		<p class="fw-bold">{{comment.user}}</p>
    		<p class="ps-3">{{comment.comment}}</p>
    		<p class="fw-bold">Rated: {{comment.mark}}/5</p>
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
		JoinWorkout: function(workout) {
			event.preventDefault();
			this.workoutHistory.workout = workout;
			this.workoutHistory.kupac = this.user;
			axios.post('rest/workoutHistory/addWorkoutHistory/', this.workoutHistory)
						.then((response) => {
							alert('Uspesno dodat novi trening')
						})
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