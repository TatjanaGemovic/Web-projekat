Vue.component("startpage", {
	data: function () {
		    return {
		      facilitiesToShow: null,
		      allFacilities: null,
		      textInputValueToSearchBy: "",
		      propToSearchBy: 0,
		      searchedFacilityType : "GYM",
		      inputTextNeeded : true
		    }
	},
template: ` 
<div>
	<body>
	<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light" style="background-color: #b4b5b3;font-size:50px; height: 80px; border-bottom: 3px solid #3e3e3e">
  		<div class="container-fluid" style="margin-bottom: 0px">
			<a class="navbar-brand" style="margin-left: 20px;margin-right: 120px; font-size: 28px">
      			<img src="pictures/barbell-2.png" alt="" width="65" height="55" style="margin-right: 10px" class="d-inline-block">
      			Fitpass
    		</a>  		
    	
	    	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="collapse navbar-collapse justify-content-end align-center gap-2" id="navbar" style="font-size: 20px">
		      <ul class="navbar-nav d-flex gap-2">
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" href="#">Pocetna</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Treninzi</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link" class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section id="intro">
	<h2 style="margin-top:10%; margin-bottom:5%" class="text-center">Our facilities:</h2>
	<div class="row justify-content-center">
		<div class="col-lg-7 col-xs-4 col-sm-4 col-md-4"></div>
		<form style="font-size:16px;margin-bottom:3%" class="col-lg-4 col-xs-7 col-sm-7 col-md-7">
		<label>Search by:</label>
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged($event)" :style="{ 'width': '80%'}">
  			<option selected value="0">Name</option>
  			<option value="1">Type</option>
  			<option value="2">Location</option>
  			<option value="3">Minimum rating</option>
		</select>
		<input type="text" class="form-control-sm" v-if="inputTextNeeded" v-model="textInputValueToSearchBy" name="searchInput" placeholder="Type here..." :style="{ 'width': '80%'}">
		<select class="form-select form-select-sm" v-else  v-on:change="facilityTypeSelectionChanged($event)" :style="{ 'width': '80%'}">
  			<option selected value="GYM">Gym</option>
  			<option value="POOL">Pool</option>
  			<option value="SPORTS_CENTRE">Sports center</option>
  			<option value="DANCE_STUDIO">Dance studio</option>
		</select>
    	 <br>
    	<button class="btn btn-primary btn-sm" v-on:click="search">Search</button>
    	<button class="btn btn-secondary btn-sm" v-on:click="resetSearch">Reset search</button>
	</form>
	<div class="col-1"></div>
	
		<div v-for="facility in facilitiesToShow" class="col-md-3 card m-3"> 
			<img v-bind:src="facility.imageURI" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title">{{facility.name}}</p>
				<p class="card-text ps-2">Rating: {{parseFloat(facility.rating).toFixed(1)}}/5.0</p>
			</div>
		</div>
	</div>
	</section>
	</body>
</div>		  
    	`,
    methods: {
		LogOut : function(){
			event.preventDefault();
			router.push(`/`);
			//window.location.href = 'products.html';
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
			//window.location.href = 'products.html';
		},
    	search : function(event) {
			event.preventDefault();
			somethingFound = false;
			this.facilitiesToShow = [];
			for(let i=0; i<this.allFacilities.length; i++){
				if(this.propToSearchBy==0 && (this.allFacilities[i]).name.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==1 && (this.allFacilities[i]).type==this.searchedFacilityType){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==2 && (this.allFacilities[i]).location.address.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==3 && (this.allFacilities[i]).rating>=this.textInputValueToSearchBy){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.facilitiesToShow = this.allFacilities;		
    	},
    	resetSearch : function(){
			this.facilitiesToShow = this.allFacilities;	
		},
		propertyToSearchBySelectionChanged : function(event){
			this.propToSearchBy = event.target.value;
			if(event.target.value==1)
				this.inputTextNeeded = false;
			else
				this.inputTextNeeded = true;
		},
		facilityTypeSelectionChanged : function(event){
			this.searchedFacilityType = event.target.value;
		},
		initialSort : function(){
			let tempArray = [];
			let currentTime = new Date();
			let currentFacilityWorkingHours = [];
			let start = [];
			let end = [];
			for(let i=0; i<this.allFacilities.length; i++){
				currentFacilityWorkingHours = this.allFacilities[i].workingHours.split("-");
				start = currentFacilityWorkingHours[0].split(":");
				end = currentFacilityWorkingHours[1].split(":");
				if(start[0]<=(currentTime.getHours()+1) && (currentTime.getHours()+1)<=end[0])
					tempArray.push(this.allFacilities[i]);
			}
			for(let i=0; i<this.allFacilities.length; i++){
				currentFacilityWorkingHours = this.allFacilities[i].workingHours.split("-");
				start = currentFacilityWorkingHours[0].split(":");
				end = currentFacilityWorkingHours[1].split(":");
				if(!(start[0]<=(currentTime.getHours()+1) && (currentTime.getHours()+1)<=end[0]))
					tempArray.push(this.allFacilities[i]);
			}
			this.allFacilities = [];
			this.allFacilities = tempArray;
			this.facilitiesToShow = this.allFacilities;
		}
    },
    mounted() {
		axios.get('rest/facilities/allFacilities')
			.then((response) => {
				this.allFacilities = response.data;
				this.initialSort();
			})	
	}
});
