Vue.component("register", {
	data: function () {
		    return {
		      title: "Register",
		      user: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null,
		      uloga: null, istorijaTreninga: null, clanarina: 0, sportskiObjekat: null, poseceniObjekti: null, sakupljeniBodovi: 0, tipKupca: null},
		      error: '',
		      users: null
		    }
	},
	template: ` 
<div>
	<body class="background">
	<form>
		<table style="position:relative;left:150px;top:100px" class="loginTable">
			<tr><td><input type="text" placeholder="First name" v-model="user.firstName" class="inputFields"></td></tr>
			<tr><td><input type="text" placeholder="Last name" v-model="user.lastName" class="inputFields"></td></tr>
			<tr><td><input type="date" placeholder="Birth date" v-model="user.birthDate" class="inputFields"></td></tr>
			<tr><td><input type="text" placeholder="Gender" v-model="user.gender" class="inputFields"></td></tr>
			<tr><td><input type="text" placeholder="Username" v-model="user.username" class="inputFields"></td></tr>
			<tr><td><input type="password" placeholder="Password" v-model="user.password" class="inputFields"></td></tr>
			<tr><td><button value="Register" v-on:click = "registerUser" class="loginButton">Register</button>
			<p id="error">{{error}}</p></td></tr>
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
					this.error = "Postoji korisnik sa istim username-om";
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
				//ako se izostavi catch onda se samo registruje bez pogresnog ispisivanja poruke da vec postoji
				//.catch(this.error = "Vec postoji korisnik sa istim username-om");
			}
    	}
    	
    }
});