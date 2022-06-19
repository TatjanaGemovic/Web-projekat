Vue.component("startup", {
	data: function () {
		    return {
		      title: "Start",
		      facilitiesToShow: null,
		      allFacilities: null,
		      valueToSearchBy: "",
		      propToSearchBy: 0
		    }
	},
	template: ` 
<div>
	<h1>Our facilities:</h1>
	<form style="font-size:20px" >
		<label>Choose a parameter to search by:</label>
		<section>
		<input type="radio" value="0" name="searchBy" v-model="propToSearchBy">name
    	<input type="radio" value="1" name="searchBy" v-model="propToSearchBy">type
    	<input type="radio" value="2" name="searchBy" v-model="propToSearchBy">location
    	<input type="radio" value="3" name="searchBy" v-model="propToSearchBy">minimum rating
    	</section>
    	<br><br>
    	<input type="text" class="inputFields" style="margin-bottom:30px;font-size: 16px;"v-model="valueToSearchBy" name="searchInput" placeholder="Search..."/> <br>
    	<button class="loginButton" style="width: 150px;font-size: 16px;" v-on:click="search">Search</button>
    	<button class="loginButton" style="width: 150px;font-size: 16px;" v-on:click="showAll">Show All</button>
	</form>
	<br>
	<br>
	<div v-for="facility in facilitiesToShow" class="facility_div" v-bind:style="{ background: 'url(' + facility.imageURI + ')' }"> 
		<p>{{facility.name}}</p>
		<p>{{facility.type.toLowerCase()}}</p>
		<p>{{facility.location.address}}</p>
		<p>{{facility.rating}}</p>
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
				if(this.propToSearchBy==0 && (this.allFacilities[i]).name.replaceAll(" ", "").toLowerCase().includes(this.valueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==1 && (this.allFacilities[i]).type.trim().toLowerCase()==this.valueToSearchBy.trim().toLowerCase()){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==2 && (this.allFacilities[i]).location.address.replaceAll(" ", "").toLowerCase().includes(this.valueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==3 && (this.allFacilities[i]).rating>=this.valueToSearchBy){
					this.facilitiesToShow.push(this.allFacilities[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.facilitiesToShow = this.allFacilities;		
    	},
    	showAll : function(){
			this.facilitiesToShow = this.allFacilities;	
		}
    }
});