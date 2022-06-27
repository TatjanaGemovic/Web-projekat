Vue.component("showFacility", {
	data: function () {
		    return {
		      facilityName : "",
		      facility : null
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
	<p>{{facility.name}}</p>
	</body>
</div>		  
    	`,
    mounted() {
		this.facilityName = this.$route.params.name;
		axios
			.get('rest/facilities/' + this.facilityName)
			.then(response => (this.facility = response.data))
	},
    methods: {
    	LogOut : function(event){
			event.preventDefault();
			router.push(`/`);
		}
    }
});