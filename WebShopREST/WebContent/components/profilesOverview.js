Vue.component("profilesOverview", {
	data: function () {
		    return {
		      user: null,
		      users: null,
		      usersToShow: null,
		      textInputValueToSearchBy: "",
		      propToSearchBy: 0,
		      propToSearchBy2: 0,
		      propToSearchBy3: "first",
		      inputTextNeeded : true,
		      searchedUserType : "Regularni",
		      searchedUserRole : "Kupac",
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
			      <button class="nav-link" class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section id="intro" style="margin-top:10%;">
	<div class="row justify-content-center" style="margin-bottom:6%;margin-left:5%">
		<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/filter.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Filters
    	</a>	
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged2($event)" style="margin-top: 4%;">
  			<option selected value="0">User Type</option>
  			<option value="1">User role</option>
  			
		</select>
		<select class="form-select form-select-sm" v-if="inputTextNeeded" v-on:change="userTypeSelectionChanged($event)" >
  			<option value="Regularni">Regularni</option>
  			<option value="Bronzani">Bronzani</option>
  			<option value="Srebrni">Srebrni</option>
  			<option value="Zlatni">Zlatni</option>
		</select>
		<select class="form-select form-select-sm" v-else v-on:change="userRoleSelectionChanged($event)" >
  			<option selected value="Kupac">Kupac</option>
  			<option value="Menadzer">Menadzer</option>
  			<option value="Trener">Trener</option>
  			<option value="Administrator">Administrator</option>
		</select>
    	 <br>
    	<button class="loginButton" v-on:click="filter">Filter</button>
		</form>
		</div>
		<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/search.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Search
    	</a>
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged($event)" style="margin-top: 4%;">
  			<option selected value="0">Name</option>
  			<option value="1">Last Name</option>
  			<option value="2">Username</option>
		</select>
		<input type="text" class="form-control form-control-sm" v-model="textInputValueToSearchBy" style="height: 90%" name="searchInput" placeholder="Type here..." style="width:100%">
    	<button class="loginButton" v-on:click="search" style="margin-top: 15%;">Search</button>
    	</form>
    	</div>
    	<div class="col-xs-2 col-md-2 col-sm-2">
		<form style="font-size:20px;margin-bottom:3%">
		<a style="margin-left: 20px;margin-right: 120px; font-size: 30px; font-weight:bold; color:#F15412">
      			<img src="pictures/filter-2.png" alt="" width="25" height="25" style="margin-right: 10px" class="d-inline-block">
      			Sort
    	</a>	
		<select class="form-select form-select-sm" v-on:change="propertyToSearchBySelectionChanged3($event)" style="margin-top: 4%;">
  			<option selected value="0">First Name</option>
  			<option value="1">Last Name</option>
  			<option value="2">Username</option>
  			<option value="3">Points</option>
		</select>
		<br>
    	<button class="loginButton" v-on:click="sort" style="margin-top: 15%;">Sort</button>
    	</form>
    	</div>
    	<div class="col-xs-4 col-md-4 col-sm-4"></div>
		<div class="col-xs-2 col-md-2 col-sm-2">
				<button class="loginButton" v-on:click="AddUser" style="width: 200px;heigth: 50px;margin-bottom: 7%;margin-top: 25%; margin-right: 35%;float: right">Add user</button>
		    	<button class="loginButton" v-on:click="resetFilter" style="width: 200px;heigth: 50px; margin-right: 35%;float: right">Reset</button>
		</div>
	</div>
	<div class="row justify-content-center">
		<div v-for="user1 in usersToShow" class="col-md-2 card m-2"> 
			<img src="pictures/fitness-2.png" v-bind:hidden="user1.gender=='zensko'" class="card-img-top pt-2" />
			<img src="pictures/fitness.png" v-bind:hidden="user1.gender=='musko'" class="card-img-top pt-2" /> 
			<div class="card-body">
				<p class="card-title" style="font-weight: bold; font-size: 20px">{{user1.uloga}}</p>
				<p class="card-text">{{user1.firstName + " " + user1.lastName}}</p>
			</div>
		</div>
	</div>
	</section>
	</body>
</div>		  
    	`,
    methods: {
		search : function(event) {
			event.preventDefault();
			somethingFound = false;
			this.usersToShow = [];
			for(let i=0; i<this.users.length; i++){
				if(this.propToSearchBy==0 && (this.users[i]).firstName.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.usersToShow.push(this.users[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==1 && (this.users[i]).lastName.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.usersToShow.push(this.users[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy==2 && (this.users[i]).username.replaceAll(" ", "").toLowerCase().includes(this.textInputValueToSearchBy.replaceAll(" ", "").toLowerCase())){
					this.usersToShow.push(this.users[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.usersToShow = this.users;		
    	},
    	resetSearch : function(){
			this.usersToShow = this.users;	
		},
		propertyToSearchBySelectionChanged : function(event){
			this.propToSearchBy = event.target.value;
		},
		LogOut : function(){
			event.preventDefault();
			router.push(`/`);
			//window.location.href = 'products.html';
		},
		AddUser : function(){
			event.preventDefault();
			router.push(`/addUser`);
			//window.location.href = 'products.html';
		},
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
			//window.location.href = 'products.html';
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		filter : function(event) {
			event.preventDefault();
			somethingFound = false;
			this.usersToShow = [];
			for(let i=0; i<this.users.length; i++){
				if(this.propToSearchBy2==0 && (this.users[i]).tipKupca==this.searchedUserType){
					this.usersToShow.push(this.users[i]);
					somethingFound = true;
				}
				else if(this.propToSearchBy2==1 && (this.users[i]).uloga==this.searchedUserRole){
					this.usersToShow.push(this.users[i]);
					somethingFound = true;
				}
			}
			if(!somethingFound)
					this.usersToShow = this.users;		
    	},
    	resetFilter : function(){
			this.usersToShow = this.users;	
		},
		propertyToSearchBySelectionChanged3 : function(event){
			if(event.target.value==1)
				this.propToSearchBy3 = "last"
			else if(event.target.value==0)
				this.propToSearchBy3 = "first"
			else if(event.target.value==2)
				this.propToSearchBy3 = "username"
			else 
				this.propToSearchBy3 = "bodovi"
		},
		userTypeSelectionChanged : function(event){
			this.searchedUserType = event.target.value;
		},
		userRoleSelectionChanged : function(event){
			this.searchedUserRole = event.target.value;
		},
		propertyToSearchBySelectionChanged2 : function(event){
			this.propToSearchBy2 = event.target.value;
			if(event.target.value==1)
				this.inputTextNeeded = false;
			else
				this.inputTextNeeded = true;
		},
		sort: function(){
			event.preventDefault();
			if(this.propToSearchBy3 == "last"){
				this.usersToShow.sort(function(a, b){
				  if ( a.lastName.toLowerCase() < b.lastName.toLowerCase()){
				    return -1;
				  }
				  if ( a.lastName.toLowerCase() > b.lastName.toLowerCase()){
				    return 1;
				  }
				  return 0;
				})
			}else if (this.propToSearchBy3 == "first"){
				this.usersToShow.sort(function(a, b){
				  if ( a.firstName.toLowerCase() < b.firstName.toLowerCase()){
				    return -1;
				  }
				  if ( a.firstName.toLowerCase() > b.firstName.toLowerCase()){
				    return 1;
				  }
				  return 0;
				})
			}else if (this.propToSearchBy3 == "username"){
				this.usersToShow.sort(function(a, b){
				  if ( a.username.toLowerCase() < b.username.toLowerCase()){
				    return -1;
				  }
				  if ( a.username.toLowerCase() > b.username.toLowerCase()){
				    return 1;
				  }
				  return 0;
				})
			}else{
				this.usersToShow.sort(function(a, b){
				return b.sakupljeniBodovi - a.sakupljeniBodovi;})
			}
			
		}
    },
    mounted() {
		axios.get('rest/allUsers')
			.then((response) => {
				this.users = response.data;
				this.usersToShow = this.users;
			}),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				
			})	
	}
});
