Vue.component("subscriptionsOverview", {
	data: function () {
		    return {
		      user: null,
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
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Korisnici</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'">Moj objekat</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link active" aria-current="page" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
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
	<section style="margin-top:10%;">
	<div class="row" style="margin-bottom: 35px">
		<div class="col-xs-5 col-md-9 col-sm-6"></div>
		<div class="col-xs-7 col-md-3 col-sm-6">
			<button class="loginButton" style="width: 200px;heigth: 50px; margin-right: 23%;float: right">My subscription</button>
		</div>
	</div>
	<div class="container-lg">
      <div class="text-center">
        <h2>Pricing Plans</h2>
        <p class="lead text-muted">Choose a pricing plan to suit you.</p>
      </div>

      <div class="row my-5 g-0 align-items-center justify-content-center">
        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0">
            <div class="card-body text-center py-4">
              <h3 class="card-title">Starter</h3>
              <p class="lead card-subtitle">3 times a week</p>
              <p class="display-5 my-4 fw-bold" style="color: #F15412">$21.99<span style="font-size:16px">/month</span></p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(1)">
                See plan
              </button>
            </div>
          </div>
        </div>

        <div class="col-9 col-lg-4">
          <div class="card" style="border: 2px solid #F15412">
            <div class="card-header text-center" style="color: #F15412">Most Popular</div>
            <div class="card-body text-center py-5">
              <h3 class="card-title">Basic</h3>
              <p class="lead card-subtitle">All month unlimited</p>
              <p class="display-4 my-4 fw-bold" style="color: #F15412">$29.99<span style="font-size:18px">/month</span></p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(2)">
                See plan
              </button>
            </div>
          </div>
        </div>

        <div class="col-8 col-lg-4 col-xl-3">
          <div class="card border-0">
            <div class="card-body text-center py-4">
              <h3 class="card-title">Ultimate</h3>
              <p class="lead card-subtitle">All year unlimited</p>
              <p class="display-5 my-4 fw-bold" style="color: #F15412">$329.99</p>
              <button href="#" class="loginButton" style="width: 140px" v-on:click="SeePlan(3)">
                See plan
              </button>
            </div>
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
		ProfilePage : function(){
			event.preventDefault();
			router.push(`/profile`);
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		SeePlan : function (name){
			router.push(`/showPlan/${name}`);
		}
    },
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			})	
	}
});