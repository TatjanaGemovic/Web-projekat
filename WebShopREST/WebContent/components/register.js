Vue.component("register", {
	data: function () {
		    return {
		      title: "Register",
		      user: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null,
		      uloga: null, istorijaTreninga: null, clanarina: null, sportskiObjekat: null, poseceniObjekti: null, sakupljeniBodovi: 0, tipKupca: null},
		      error: '',
		      users: null
		    }
	},
	template: ` 
<div>
	<body class="background">
	<form>
		<table style="position:relative;left:150px;top:135px" class="loginTable">
			<tr><td style="padding-top: 60px;padding-bottom: 17px;padding-left:40px;padding-right:40px"><input type="text" placeholder="First name" v-model="user.firstName" class="inputFields" required></td></tr>
			<tr><td style="padding-bottom: 17px;padding-left:40px;padding-right:40px"><input type="text" placeholder="Last name" v-model="user.lastName" class="inputFields" required></td></tr>
			<tr><td style="padding-bottom: 17px;padding-left:40px;padding-right:40px"><input type="date" placeholder="Birth date" v-model="user.birthDate" class="inputFields" required></td></tr>
			<tr><td style="padding-bottom: 0px;padding-left:40px;padding-right:40px">
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="F" value="zensko" v-model="user.gender"/>
              <label class="form-check-label" for="F">Female</label>
            </div>
            <div class="mb-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" id="M" value="musko" v-model="user.gender"/>
              <label class="form-check-label" for="M">Male</label>
            </div></td></tr>
			<tr><td style="padding-bottom: 17px;padding-left:40px;padding-right:40px"><input type="text" placeholder="Username" v-model="user.username" class="inputFields" required></td></tr>
			<tr><td style="padding-bottom: 25px;padding-left:40px;padding-right:40px"><input type="password" placeholder="Password" v-model="user.password" class="inputFields" required></td></tr>
			<tr><td style="padding-bottom: 25px;padding-left:40px;padding-right:40px"><input type="submit" value="Register" v-on:click = "registerUser" class="loginButton">
			<p style="padding-top: 10px;" id="error">{{error}}</p></td></tr>
		</table>
	</form>
	</body>
</div>		  
    	`,
    mounted() {
		axios.get('rest/allUsers')
			.then(response => (this.users = response.data))
	},
    methods: {	
    	registerUser : function(event) {
			event.preventDefault();
			userExists = false;
			for(let i=0; i<this.users.length; i++){
				if((this.users[i]).username==this.user.username){
					this.error = "Username already exists";
					userExists = true;
					return;
				}
			}
			
			if(!userExists){ 
				axios.post('rest/registerKupac/', this.user)
				.then((response) => {
					alert('Uspesno dodat korisnik')
					this.users.push(response.data)
					router.push(`/`)
				})
			}
    	}
    	
    }
});