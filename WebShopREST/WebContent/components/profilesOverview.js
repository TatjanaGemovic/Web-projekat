Vue.component("profilesOverview", {
	data: function () {
		    return {
		      user: null,
		      users: null
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
	<div class="row justify-content-center">
		<div v-for="user1 in users" class="col-md-2 card m-2"> 
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
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
    },
    mounted() {
		axios.get('rest/allUsers')
			.then((response) => {
				this.users = response.data;
			}),
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	
	}
});
