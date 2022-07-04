Vue.component("pendingComments", {
	data: function () {
		    return {
		      user: null,
		      uloga: "Administrator",
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
      			Fitpass
    		</a>  		
    	
	    	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="collapse navbar-collapse d-flex flex-row-reverse gap-2" id="navbarNav" style="font-size: 20px">
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
		          <a class="nav-link" v-on:click="Subscriptions" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Clanarine</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profil</a>
		        </li>
		        <li class="nav-item">
			      <button  class="loginButton" v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<div class="row" style="margin-top:20%">
		<div v-for="(comment, index) in pendingComments">
			<div class="col-8">
				<p>{{comment.user}}</p>
				<p>{{comment.sportsFacility}}</p>
				<p>{{comment.comment}}</p>
			</div>
			<div class="col-4">
				<button class="btn btn-success" v-on:click="approve(index)">Approve</button>
				<button class="btn btn-danger" v-on:click="disapprove(index)">Disapprove</button>
			</div>
		</div>
	</div>
	<button class="btn btn-primary" v-on:click="finish">Done</button>
	</body>
</div>		  
    	`,
    mounted() {
		axios.get('rest/currentUser')
			.then((response) => {
				this.user = response.data;
			}),
		axios
			.get('rest/comments/getAllPendingComments')
			.then(response => (this.pendingComments = response.data)
		)
	},
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
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		approve : function(index){
			for(let i=0; i<this.pendingComments.length; i++){
				if(i==index)
					this.pendingComments[i].status = "approved";
			}
		},
		disapprove : function(index){
			for(let i=0; i<this.pendingComments.length; i++){
				if(i==index)
					this.pendingComments[i].status = "disapproved";
			}
		},
		finish : function(){
			axios
			.post('rest/comments/updatePendingComments/', this.pendingComments)
			.then(response => (router.push(`/startpage`))
		)
		}
    }
});