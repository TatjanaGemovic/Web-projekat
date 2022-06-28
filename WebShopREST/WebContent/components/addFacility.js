Vue.component("addFacility", {
	data: function () {
		    return {
		      facility: { name:null, type:null, streetAndNumber:null, city:null, postal:null},
		      error: '',
		      facilities: null,
		      user : null,
		      uloga : null,
		      managers : null,
		      hasAvailable : true,
		      newUser: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null,
				uloga: null, istorijaTreninga: null, clanarina: 0, sportskiObjekat: null, poseceniObjekti: null, sakupljeniBodovi: 0, tipKupca: null},
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
		          <a class="nav-link" href="#intro" v-on:click="StartPage">Pocetna</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'">Treninzi</a>
		          <a class="nav-link active" aria-current="page" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
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
			
			<input type="text" placeholder="Facility street and number" v-model="facility.streetAndNumber"> <br>
			<input type="text" placeholder="City" v-model="facility.city"> <br>
			<input type="text" placeholder="City postal code" v-model="facility.postal"> <br>
			
			<p class="text-danger" v-if="!hasAvailable">Looks like there are currently no available managers! <a class="text-success" data-bs-toggle="modal" data-bs-target="#addManager">Click here</a> to create a new one for this facility</p>
			<select v-else class="form-select form-select-sm" v-on:change="managerSelectionChanged($event)" :style="{ 'width': '50%'}">
			    <option v-for="manager in managers" :value="manager.username">{{manager.firstName}} {{manager.lastName}}</option>
			</select>
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
            <div class="mb-3 text-center">
            	<input type="submit" value="Save" v-on:click = "addUser" style="width: 150px" class="loginButton"/>
            </div>
          </form>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-primary" v-on:click="createManager">Create</button>
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
				else
					this.hasAvailable = true;
			})
	},
    methods: {	
    	addFacility : function(event) {
			event.preventDefault();
			facilityExists = false;
			for(let i=0; i<this.facilities.length; i++){
				if((this.facilities[i]).name==this.facility.name){
					this.error = "Facility with the same name already exists";
					facilityExists = true;
					return;
				}
			}
			
			if(!facilityExists){ 
				axios.post('rest/addFacility/', this.facility)
				.then((response) => {
					alert('Facility added successfully')
					router.push(`/`)
				})
			}
    	},
    	facilityTypeSelectionChanged : function(event){
			this.facility.type = event.target.value;
		},
		managerSelectionChanged : function(event){
			this.manager = event.target.value;
		},
		createManager : function(){
			
		},
    	LogOut : function(){
			event.preventDefault();
			router.push(`/`);
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		}   	
    }
});