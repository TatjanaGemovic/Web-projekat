Vue.component("profile", {
	data: function () {
		    return {
			user: null,
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
		          <a class="nav-link" v-on:click="StartPage"  href="#">Pocetna</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Treninzi</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" v-on:click="ProfilePage"  href="#" style="">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button class="nav-link" class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<section>
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
	},   
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	
	}
});