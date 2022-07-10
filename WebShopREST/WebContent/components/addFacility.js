Vue.component("addFacility", {
	data: function () {
		    return {
		      facility: { name:null, type:null, offer: "nista", location:null, status: true, rating: 0.0, workingHours: "00:00-24:00",imageURI: null, deleted: false},
		      error: '',
		       location: {address: "", longitude: 11.0, latitude: 12.0},
		      facilities: null,
		      user : null,
		      uloga : null,
		      managers : null,
		      manager : null,
		      hasAvailable : true,
		      addedManager : false,
		      streetAndNumber: "",
		      city: "",
		      imageToUpload: "",
		      postal: "",
		      newUser: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null,
				uloga: null, istorijaTreninga: null, clanarina: null, sportskiObjekat: null, poseceniObjekti: null, sakupljeniBodovi: 0, tipKupca: null, facilityId: ""},
			  gender: null
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
	<div class="row">
	<form class="col-lg-6" style="margin-top:10%; margin-left:15%">
		<input type="text" placeholder="Facility name" v-model="facility.name" >
		
			<select class="form-select form-select-sm" v-on:change="facilityTypeSelectionChanged($event)" :style="{ 'width': '50%'}">
  			<option selected value="GYM">Gym</option>
  			<option value="POOL">Pool</option>
  			<option value="SPORTS_CENTRE">Sports center</option>
  			<option value="DANCE_STUDIO">Dance studio</option>
			</select>
			
			<input type="text" placeholder="Facility street and number" v-model="streetAndNumber"> <br>
			<input type="text" placeholder="City" v-model="city"> <br>
			<input type="text" placeholder="City postal code" v-model="postal"> <br>
			
			<p class="text-danger" v-if="!hasAvailable">Looks like there are currently no available managers! <a class="text-success" data-bs-toggle="modal" data-bs-target="#addManager">Click here</a> to create a new one for this facility</p>
			<select v-else class="form-select form-select-sm" v-on:change="managerSelectionChanged($event)" :style="{ 'width': '50%'}">
			    <option v-for="manager in managers" :value="manager.username" >{{manager.firstName}} {{manager.lastName}}</option>
			</select>
			<input type="file" name="avatar" accept="image/*" v-model="imageToUpload">
			<input type="submit" value="Add" v-on:click = "addFacility" >
			<p id="error">{{error}}</p>
	</form>
	</div>
	<div class="modal fade" id="addManager" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 	 <div class="modal-dialog modal-dialog-centered"">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create a new manager</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      		<form>
            <label class="form-label">First Name:</label>
            <div class="input-group mb-3">
              <input type="text" id="firstName" class="form-control" v-model="newUser.firstName"/>
            </div>
            <label class="form-label">Second Name:</label>
            <div class="mb-3 input-group">
              <input type="text" id="secondName" class="form-control" v-model="newUser.lastName"/>
            </div>
        	<label class="form-label">Gender:</label>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="F" value="zensko" v-model="newUser.gender"/>
              <label class="form-check-label" for="F">Female</label>
            </div>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="M" value="musko" v-model="newUser.gender"/>
              <label class="form-check-label" for="M">Male</label>
            </div>
            </br>
            <label class="form-label">Birthday:</label>
            <div class="mb-3 input-group">
              <input type="date" id="birthDay" class="form-control" v-model="newUser.birthDate"/>
            </div>  
            </br>
            <label class="form-label">Username:</label>
            <div class="mb-3 input-group">
              <input type="text" id="username" class="form-control" v-model="newUser.username"/>
            </div>
            <label class="form-label">Password</label>
            <div class="mb-3 input-group">
              <input type="password" id="password" class="form-control" v-model="newUser.password"/>
            </div>
          </form>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-primary" v-on:click="createManager" data-bs-dismiss="modal">Create</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
	</body>
</div>		  
    	`,
    mounted() {
		axios.get('rest/facilities/allFacilities')
			.then((response) => {
				this.facilities = response.data;
				this.facility.type = "GYM";
			})
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	
		axios.get('rest/availableManagers')
			.then((response) => {
				this.managers = response.data;
				if(this.managers.length==0)
					this.hasAvailable = false;
				else {
					this.hasAvailable = true;
					this.manager = this.managers[0];
				}
			})
	},
    methods: {	
    	addFacility : function(event) {
			event.preventDefault();
			parsedString = []
			parsedString = this.imageToUpload.split("\\");
			this.imageToUpload = parsedString[parsedString.length-1];
			this.facility.imageURI = "pictures/" + this.imageToUpload;
			facilityExists = false;
			for(let i=0; i<this.facilities.length; i++){
				if((this.facilities[i]).name==this.facility.name){
					this.error = "Facility with the same name already exists";
					facilityExists = true;
					return;
				}
			}
			
			if(!facilityExists){ 
				this.location.address = this.streetAndNumber + "," + this.city + "," + this.postal ;
				this.facility.location = this.location;
				this.manager.sportskiObjekat = this.facility;
				this.manager.facilityId = this.facility.name;
				if(!this.addedManager){	
					axios.put('rest/changeUser/' +this.manager.username, this.manager)
					.then((response) => {
						alert('Uspesno izmenjen korisnik')
					})
				}
				else {
					
					axios.post('rest/registerMenadzer/', this.manager)
						.then((response) => {
							alert('Uspesno dodat novi menadzer')
							this.hasAvailable = true;
					})
				}
				axios.post('rest/facilities/add/', this.facility)
				.then((response) => {
					alert('Facility added successfully')
					router.push(`/startpage`)
				})
			}
    	},
    	
    	facilityTypeSelectionChanged : function(event){
			this.facility.type = event.target.value;
		},
		managerSelectionChanged : function(event){
			for(let i=0; i<this.managers.length; i++)
				if(this.managers[i].username==event.target.value){
					this.manager = this.managers[i];
				}
		},
		createManager : function(){
			this.manager = this.newUser;
			this.managers.push(this.manager);
			this.addedManager = true;
			this.hasAvailable = true;
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