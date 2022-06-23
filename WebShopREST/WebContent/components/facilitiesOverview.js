var facilitiesOverview = new Vue({
	el: '#facilitiesOverviewSection',
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
	<section id="intro">
	<h1 style="margin-top: 120px">Our facilities:</h1>
	<form style="font-size:20px" >
		<label>Search by:</label>
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged($event)">
  			<option selected value="0">Name</option>
  			<option value="1">Type</option>
  			<option value="2">Location</option>
  			<option value="3">Minimum rating</option>
		</select>
		<input type="text" v-if="inputTextNeeded" v-model="textInputValueToSearchBy" name="searchInput" placeholder="Type here..."/>
		<select class="form-select form-select-sm" v-else  v-on:change="facilityTypeSelectionChanged($event)">
  			<option selected value="GYM" v-model="searchedFacilityType">Gym</option>
  			<option value="POOL" v-model="searchedFacilityType">Pool</option>
  			<option value="SPORTS_CENTRE" v-model="searchedFacilityType">Sports center</option>
  			<option value="DANCE_STUDIO" v-model="searchedFacilityType">Dance studio</option>
		</select>
    	 
    	<button class="btn btn-primary" v-on:click="search">Search</button>
    	<button class="btn btn-secondary" v-on:click="resetSearch">Reset search</button>
	</form>
	<br>
	<br>
	<div class="row justify-content-center">
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
    mounted() {
		axios.get('rest/facilities/allFacilities')
			.then(response => (this.facilitiesToShow = response.data, this.allFacilities = response.data))
	},
    methods: {
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
		LogOut : function(){
			event.preventDefault();
			//router.push(`/startup`);
			window.location.href = 'products.html';
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
		}
    }
});