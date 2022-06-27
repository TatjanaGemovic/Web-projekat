Vue.component("addFacility", {
	data: function () {
		    return {
		      facility: { name:null, type:null, streetAndNumber:null, city:null, postal:null},
		      error: '',
		      facilities: null,
		      user : null,
		      uloga : null
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
	<form style="margin-top:10%; margin-left:15%">
		<input type="text" placeholder="Facility name" v-model="facility.name" >
		
			<select class="form-select form-select-sm" v-on:change="facilityTypeSelectionChanged($event)" :style="{ 'width': '80%'}">
  			<option selected value="GYM">Gym</option>
  			<option value="POOL">Pool</option>
  			<option value="SPORTS_CENTRE">Sports center</option>
  			<option value="DANCE_STUDIO">Dance studio</option>
			</select>
			
			<input type="text" placeholder="Facility street and number" v-model="facility.streetAndNumber">
			<input type="text" placeholder="City" v-model="facility.city">
			<input type="text" placeholder="City postal code" v-model="facility.postal">
			<input type="submit" value="Add" v-on:click = "addFacility" >
			<p id="error">{{error}}</p>
	</form>
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