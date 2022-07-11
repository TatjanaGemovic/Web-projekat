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
	<button v-on:click="addContent" v-if="facility.name==user.facilityId" class="btn btn-primary">Add New Content</button>
	<h2 class="row justify-content-center" style="margin-top: 2%;">Workouts</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%;margin-bottom: 5%">
		<div v-for="(w, index) in workouts1" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e"> 
		<img src="pictures/weightlifting.png" v-bind:hidden="w.workoutType!='T_Strength'" class="card-img-top pt-2" /> 
		<img src="pictures/fitness-4.png" v-bind:hidden="w.workoutType!='T_Personal'" class="card-img-top pt-2" /> 
		<img src="pictures/stationary-bike.png" v-bind:hidden="w.workoutType!='T_Cardio'" class="card-img-top pt-2" /> 
		<img src="pictures/plank.png" v-bind:hidden="w.workoutType!='T_Endurance'" class="card-img-top pt-2" /> 	
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{w.naziv}} - <span style="font-size: 15px; color: #F15412; margin-left: 2%">{{GetType(w)}}</span></p>
				<p class="card-text" style="font-size: 17px">{{w.trener.firstName}} {{w.trener.lastName}}</p>
				<p class="card-text">Trajanje: {{w.trajanje}}</p>
				<button v-if="facility.name==user.facilityId" class="btn btn-primary" v-on:click="edit(w.naziv)">Edit</button>
			</div>
		</div>
	</div>
	<h2 class="row justify-content-center">Additional content</h2>
	<div>
		<div class="row justify-content-center" style="margin-top: 5%">
		<div v-for="(w2,index) in workouts2" class="col-md-2 card m-2" style="border: 2px solid #3e3e3e; background: #e7e7e5"> 
		<img src="pictures/spa.png" v-bind:hidden="w2.workoutType!='Spa'" class="card-img-top pt-2" /> 
		<img src="pictures/swimming-pool.png" v-bind:hidden="w2.workoutType!='Pool'" class="card-img-top pt-2" /> 
		<img src="pictures/meditation.png" v-bind:hidden="w2.workoutType!='Yoga'" class="card-img-top pt-2" /> 
		<img src="pictures/massage.png" v-bind:hidden="w2.workoutType!='Massage'" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 28px">{{w2.naziv}}</p>
				<p class="card-text" style="font-weight: bold; font-size: 20px;color: #F15412">{{w2.workoutType}}</p>
				<button v-if="facility.name==user.facilityId" class="btn btn-primary" v-on:click="edit(w2.naziv)">Edit</button>
			</div>
		</div>
	</div>
	</div><br>
	<h2 class="row justify-content-center" style="margin-bottom: 5%">Comments</h2>	
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