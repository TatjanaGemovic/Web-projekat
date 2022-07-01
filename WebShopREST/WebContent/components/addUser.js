Vue.component("addUser", {
	data: function () {
		    return {
			user: null,
			newUser: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null,
			uloga: null, istorijaTreninga: null, clanarina: null, sportskiObjekat: null, poseceniObjekti: null, sakupljeniBodovi: 0, tipKupca: null},
			gender: null,
			users: null,
			error: ''
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
		          <a class="nav-link active" aria-current="page" href="#" v-bind:hidden="this.user.uloga!='Administrator'" v-on:click="ShowAllProfiles">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section style="margin-top: 10%">
		<div class="container-lg">
      	<div class="row g-5 justify-content-center align-items-center" style="margin-right: 40px">
      		<div class="col-md-4 text-start d-none d-md-block" style="margin-right: 40px" >
	          <img src="pictures/trainer-2.png" class="img-fluid" alt="ebook"">
	        </div>

        <div class="col-md-4">
          
          <form @submit="Save">
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
            <label class="form-label">Birth Day:</label>
            <div class="mb-3 input-group">
              <input type="date" id="birthDay" class="form-control" v-model="newUser.birthDate"/>
            </div>
            <label class="form-label">Type:</label>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="Manager" value="Manager" v-model="gender"/>
              <label class="form-check-label" for="Manager">Manager</label>
            </div>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="Coach" value="Coach" v-model="gender"/>
              <label class="form-check-label" for="Coach">Coach</label>
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
			},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		ShowAllProfiles : function(){
			event.preventDefault();
			router.push(`/profilesOverview`);
		},
		addUser : function(event) {
			event.preventDefault();
			userExists = false;
			for(let i=0; i<this.users.length; i++){
				if((this.users[i]).username==this.newUser.username){
					this.error = "Username already exists";
					userExists = true;
					return;
				}
			}
			
			if(!userExists){ 
				if(this.gender == "Manager"){
					axios.post('rest/registerMenadzer/', this.newUser)
						.then((response) => {
							alert('Uspesno dodat novi menadzer')
							this.users.push(response.data)
							router.push(`/profilesOverview`)
						})
				}else{
					axios.post('rest/registerTrener/', this.newUser)
						.then((response) => {
							alert('Uspesno dodat novi trener')
							this.users.push(response.data)
							router.push(`/profilesOverview`)
						})
				}
				
			}
			
			router.push(`/profilesOverview`)
    	}
	},   
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	,
		axios.get('rest/allUsers')
			.then(response => (this.users = response.data))
	}
});