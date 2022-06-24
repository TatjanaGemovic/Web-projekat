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
	<h2 style="margin-top:16%; margin-bottom:5%" class="text-center">Our facilities:</h2>
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
  			<option selected value="GYM" v-model="searchedFacilityType">Gym</option>
  			<option value="POOL" v-model="searchedFacilityType">Pool</option>
  			<option value="SPORTS_CENTRE" v-model="searchedFacilityType">Sports center</option>
  			<option value="DANCE_STUDIO" v-model="searchedFacilityType">Dance studio</option>
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