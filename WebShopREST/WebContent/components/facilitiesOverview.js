Vue.component("startpage", {
	data: function () {
		    return {
		      facilitiesToShow: null,
		      allFacilities: null,
		      textInputValueToSearchBy: "",
		      propToSearchBy: 0,
		      searchedFacilityType : "GYM",
		      inputTextNeeded : true,
		      user: null,
		      uloga: null,
		      promoCode: {oznaka: null, period:null, brojIskoriscenih: 0, popust: 0.0, trajanje: 0},
		      showAlert: false,
		      pendingComments: null
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
		          <a class="nav-link active" aria-current="page" href="#intro">Pocetna</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'">Treninzi</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'" v-on:click="ShowAllProfiles">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" v-on:click="Subscriptions" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		          <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal2" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Promo</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link loginButton"  v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section class="sc1" style="margin-top:5%;">
		<h1 class="sc2">#FitPro</h1>
	</section>
	<section id="intro">
	<h2 style="margin-top:7%; margin-bottom:5%" class="text-center">Our facilities:</h2>
	<div class="row justify-content-center">
		<div class="col-lg-7 col-xs-4 col-sm-4 col-md-4">
			<button v-on:click="goToAddPage" v-bind:hidden="this.user.uloga!='Administrator'">Add a facility</button>
		</div>
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
				<button class="btn" v-on:click="goFacilityPage(facility.name)">View facility</button>
			</div>
		</div>
	</div>
	<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 	 <div class="modal-dialog modal-dialog-centered"">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Promo Code</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Add Code"></button>
      </div>
      <div class="modal-body">
      	<div class="row g-3 align-items-center">
		  <div class="col-5">
		    <label for="input1" class="col-form-label">Oznaka koda: </label>
		  </div>
		  <div class="col-auto">
		    <input type="text" id="input1" class="form-control" v-model="promoCode.oznaka">
		  </div>
		</div><br>
		<div class="row g-3 align-items-center">
		  <div class="col-5">
		    <label for="input1" class="col-form-label">Kraj vazenja koda: </label>
		  </div>
		  <div class="col-auto">
		    <input type="number" id="input1" class="form-control" v-model="promoCode.trajanje">
		  </div>
		</div><br>
		<div class="row g-3 align-items-center">
		  <div class="col-5">
		    <label for="input1" class="col-form-label">Broj koriscenja: </label>
		  </div>
		  <div class="col-auto">
		    <input type="number" id="input1" class="form-control" v-model="promoCode.brojIskoriscenih">
		  </div>
		</div><br>
		<div class="row g-3 align-items-center">
		  <div class="col-5">
		    <label for="input1" class="col-form-label">Popust (format 0.x): </label>
		  </div>
		  <div class="col-auto">
		    <input type="number" id="input1" class="form-control" v-model="promoCode.popust">
		  </div>
		</div>
      </div>
      <div class="modal-footer text-center">
        <button class="loginButton" v-on:click="AddPromo" data-bs-dismiss="modal" style="width: 160px;margin-right:10%">Add Code</button>
      </div>
    </div>
  </div>
</div>
	</section>
	<div v-if="showAlert" class="alert alert-primary alert-dismissible fade show shadow-primary" role="alert" data-tor-parent="hover" data-tor="hover:shadow(sm)">
 		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
  			<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  			<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
		</svg>
  		<div>There are comments that need to be reviewed! <a class="text-decoration-underline" v-on:click="GoToPendingComments">Click here</a> to see pending comments
  		</div>
  		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" data-tor="hover(p):[fade.in rotate.from(180deg)]"></button>
	</div>
	</body>
</div>		  
    	`,
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
			//window.location.href = 'products.html';
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
		},
		goFacilityPage : function (name){
			if(this.user.uloga == "Kupac"){
				name = name.replaceAll(" ", "_");
				router.push(`/showFacilityForCustomer/${name}`);
			}else{
				name = name.replaceAll(" ", "_");
				router.push(`/showFacility/${name}`);
			}
		},
		goToAddPage : function (){
			router.push(`/addFacility`);
		},
		GoToPendingComments : function(){
			router.push(`/pendingComments`);
		}
    },
    mounted() {
		axios.get('rest/facilities/allFacilities')
			.then((response) => {
				this.allFacilities = response.data;
				this.initialSort();
			}),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.uloga = this.user.uloga2;
			})	
		//srediti ovo i alert u template (bez alert vec samo link u navbar?)
		if(this.user.uloga=="Administrator"){
			axios.get('rest/comments/getAllPendingComments')
			.then((response) => {
				this.pendingComments = response.data;
				if(this.pendingComments.length!=0)
					this.showAlert = true;
			})	
		}	
		
	}
});
