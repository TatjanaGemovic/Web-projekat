Vue.component("showFacility", {
	data: function () {
		    return {
		      facilityName : "",
		      facility : null,
		      user: null,
		      comments: null,
		      commentsToShow: [],
		      workouts: null,
		      workouts1: [],
		      workouts2: [],
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
	<button v-on:click="addContent" v-if="facility.name==user.facilityId" class="btn btn-primary">Add New Content</button>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%">
		<div v-for="(w, index) in workouts1" class="col-md-2 card m-2"> 
		<img src="pictures/weightlifting.png" v-bind:hidden="w.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
		<img src="pictures/physical-activity.png" v-bind:hidden="w.workoutType!='T_Yoga'" class="card-img-top pt-2" /> 
		<img src="pictures/fitness-4.png" v-bind:hidden="w.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
		<img src="pictures/stationary-bike.png" v-bind:hidden="w.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
		<img src="pictures/plank.png" v-bind:hidden="w.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 	
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.naziv}}</p>
				<p class="card-text">{{w.workoutType}}</p>
				<p class="card-text">{{w.trener.firstName}} {{w.trener.lastName}}</p>
				<p class="card-text">Trajanje: {{w.trajanje}}</p>
				<p class="card-text">Cena: {{w.cena}}</p>
				<button v-if="facility.name==user.facilityId" class="btn btn-primary" v-on:click="edit(w.naziv)">Edit</button>

			</div>
		</div>
	</div>
	<h2>Additional content</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%">
		<div v-for="(w2,index) in workouts2" class="col-md-2 card m-2"> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w2.naziv}}</p>
				<p class="card-text">{{w2.workoutType}}</p>
				<p class="card-text">Doplata: {{w2.cena}}</p>
				<button v-if="facility.name==user.facilityId" class="btn btn-primary" v-on:click="edit(w2.naziv)">Edit</button>
			</div>
			
		</div>
	</div>
	</div><br>
	<h2>Comments</h2>	
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
		axios
			.get('rest/facilities/' +  this.facilityName)
			.then(response => (this.facility = response.data)
			),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			}),
		axios.get('rest/workout/allWorkoutsForFacility/' + this.facilityName)
			.then((response) => {
				this.workouts = response.data;
				this.SortContent()
			})
		axios.get('rest/comments/commentsByFacility/' +  this.facilityName)
			.then((response) => {
				this.comments = response.data;
				if(this.user.uloga=="Trener")
					for(let i=0; i<this.comments.length; i++){
						if(this.comments[i].status=="approved")
						this.commentsToShow.push(this.comments[i]);
					}
				else
					this.commentsToShow = this.comments;
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
		edit: function(naziv){
			for(let index=0; index<this.workouts.length; index++){
				if(naziv==this.workouts[index].naziv){
					router.push(`/addContent/${index}`);
				}
			}
		}, 
		addContent: function(){
			router.push(`/addContent/-1`);
		}
    }
});