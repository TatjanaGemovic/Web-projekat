Vue.component("pendingComments", {
	data: function () {
		    return {
		      user: null,
		      uloga: "Administrator",
		      pendingComments: null,
		      hasPendingComments: true,
		      commentsToShow: [],
			  hasReviewedAll: false
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
		          <a class="nav-link active" aria-current="page" href="#intro" v-on:click="goStartPage">Start Page</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Kupac'" v-on:click="Workouts">My Trainings</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Trener'" v-on:click="TrainersWorkouts">My Trainings</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Administrator'" v-on:click="ShowAllProfiles">Users</a>
		          <a class="nav-link" href="#" v-bind:hidden="this.user.uloga!='Menadzer'" v-on:click="goToMyFacility">My Facility</a>
		        </li>
		        <li class="nav-item" >
		          <a class="nav-link" v-on:click="Subscriptions" href="#" v-bind:hidden="this.user.uloga!='Kupac'">Subscriptions</a>
		          <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal2" href="#" v-bind:hidden="this.user.uloga!='Administrator'">Promo</a>
		        </li>
		        <li class="nav-item" v-bind:hidden="this.user.uloga!='Administrator'">
		          <a class="nav-link" href="#" v-on:click="GoToPendingComments">Pending Comments</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" v-on:click="ProfilePage" href="#">Profile</a>
		        </li>
		        <li class="nav-item">
			      <button class="loginButton"  v-on:click="LogOut" style="width: 120px; margin-left: 20px">Log out</button>
		        </li>
		      </ul>
		    </div>
	    </div>
	</nav>
	<div class="row" style="margin-top:20%" v-if="hasPendingComments">
		<div v-for="(comment, index) in commentsToShow">
			<div class="col-8">
				<p>{{comment.user}}</p>
				<p>{{comment.sportsFacility}}</p>
				<p>{{comment.comment}}</p>
			</div>
			<div class="col-4">
				<button class="btn btn-success" v-on:click="approve(index, comment.user, comment.sportsFacility)">Approve</button>
				<button class="btn btn-danger" v-on:click="disapprove(index, comment.user, comment.sportsFacility)">Disapprove</button>
			</div>
		</div>
	</div>
	<button v-if="hasPendingComments" class="btn btn-primary" v-on:click="finish">Finish</button>
	<div class="row" style="margin-top:15%"  v-if="!hasPendingComments && !hasReviewedAll">
		<h2 style="margin-left: 6%">Currently no pending comments available. <a href="#" v-on:click="goStartPage" class="text-primary">Go back to Home Page</a></h2>
	</div> 
	<div class="row" style="margin-top:15%"  v-if="hasReviewedAll">
		<h2 style="margin-left: 6%">You have reviewed all comments. <a href="#" v-on:click="finish" class="text-primary">Go back to Home Page</a></h2>
	</div> 
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
			.then((response) => {
				this.pendingComments = response.data
				
				this.SetListAndCheckIfHasPending()
			})
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
		Workouts : function(){
			event.preventDefault();
			router.push(`/customerWorkouts`);
		},
		
		TrainersWorkouts : function(){
			router.push(`/trainersWorkouts`);
		},
		goToWorkoutsPage : function(){
			router.push(`/searchWorkouts`);
		},
		Subscriptions : function(){
			event.preventDefault();
			router.push(`/subscriptionsOverview`);
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
		GoToPendingComments : function(){
			router.push(`/pendingComments`);
		},
		goStartPage: function(){
			router.push(`/startpage`);
		},
		goToMyFacility: function(){
			name = this.user.facilityId.replaceAll(" ", "_");
			router.push(`/showFacility/${name}`);
		},
		StartPage : function(){
			event.preventDefault();
			router.push(`/startpage`);
		},
		approve : function(index, user, facility){
			for(let i=0; i<this.pendingComments.length; i++){
				if(this.pendingComments[i].user==user && this.pendingComments[i].sportsFacility==facility){
					this.pendingComments[i].status = "approved";
					this.commentsToShow.splice(index, 1);
				}
			}
			if(this.commentsToShow.length==0){
				 this.hasReviewedAll = true;
				 this.hasPendingComments = false;
			}
		},
		disapprove : function(index, user, facility){
			for(let i=0; i<this.pendingComments.length; i++){
				if(this.pendingComments[i].user==user && this.pendingComments[i].sportsFacility==facility){
					this.pendingComments[i].status = "disapproved";
					this.commentsToShow.splice(index, 1);
					
				}
			}
			if(this.commentsToShow.length==0){
				this.hasReviewedAll = true;
				this.hasPendingComments = false;
			}
		},
		SetListAndCheckIfHasPending: function(){
			if(this.pendingComments.length==0){
				this.hasPendingComments = false;
				return;
			}
			for(let i=0; i<this.pendingComments.length; i++){
				this.commentsToShow.push(this.pendingComments[i]);
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