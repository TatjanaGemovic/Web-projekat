Vue.component("showFacility", {
	data: function () {
		    return {
		      facilityName : "",
		      facility : null
		    }
	},
	template: ` 
<div>
	<body>
	<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light" style="background-color: #e7e7e5;font-size:50px; height: 70px;">
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
		          <a class="nav-link active" aria-current="page" href="#">Pocetna</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Treninzi</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="LogOut" href="#">Profil</a>
		        </li>
		      </ul>
		    </div>
		    
		    <form class="d-flex" style="margin-left: 30px">
	      		<button class="loginButton" v-on:click="LogOut" style="width: 120px">Log out</button>
	    	</form>
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
	</body>
</div>		  
    	`,
    mounted() {
		this.facilityName = this.$route.params.name;
		axios
			.get('rest/facilities/' +  this.facilityName)
			.then(response => (this.facility = response.data))
	},
    methods: {
    	LogOut : function(event){
			event.preventDefault();
			router.push(`/`);
		}
    }
});