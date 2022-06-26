Vue.component("profile", {
	data: function () {
		    return {
			user: null,
			gender: null,
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
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'" v-on:click="ShowAllProfiles">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link" class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section style="margin-top: 10%">
		<div class="container-lg">
      	<div class="row g-5 justify-content-center align-items-center" style="margin-right: 40px">
      		<div class="col-md-4 text-start d-none d-md-block" style="margin-right: 40px" >
	          <img src="pictures/fitness.png" class="img-fluid" alt="ebook" v-bind:hidden="this.gender=='musko'">
	       	  <img src="pictures/fitness-2.png" class="img-fluid" alt="ebook" v-bind:hidden="this.gender=='zensko'">
	        </div>

        <div class="col-md-4">
          
          <form @submit="Save">
            <label class="form-label">First Name:</label>
            <div class="input-group mb-3">
              <input type="text" id="firstName" class="form-control" v-model="user.firstName"/>
            </div>
            <label class="form-label">Second Name:</label>
            <div class="mb-3 input-group">
              <input type="text" id="secondName" class="form-control" v-model="user.lastName"/>
            </div>
        	<label class="form-label">Gender:</label>
            <div class="mb-3 input-group">
              <input type="text" id="gender" class="form-control" v-model="user.gender"/>
            </div>
            <label class="form-label">Birth Day:</label>
            <div class="mb-3 input-group">
              <input type="date" id="birthDay" class="form-control" v-model="user.birthDate"/>
            </div>
            <label class="form-label">Username:</label>
            <div class="mb-3 input-group">
              <input type="text" id="username" class="form-control" v-model="user.username" disabled/>
            </div>
            <label class="form-label">Password</label>
            <div class="mb-3 input-group">
              <input type="password" id="password" class="form-control" v-model="user.password"/>
            </div>
            <div class="mb-3 text-center">
            	<input type="submit" value="Save" style="width: 150px" class="loginButton"/>
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
		Save : function(event){
			axios.put('rest/changeUser/' + this.user.username, this.user)
				.then((response) => {
					alert('Uspesno izmenjen korisnik')
				}),
			axios.post('rest/login/', this.user);
			event.preventDefault();
		},
	},   
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
				this.gender = this.user.gender;
			})	
	}
});