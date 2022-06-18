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
	<form>
		<table>
			<tr><td>FirstName</td><td><input type="text" v-model="user.firstName"></td></tr>
			<tr><td>LastName</td><td><input type="text" v-model="user.lastName"></td></tr>
			<tr><td>Date of birth</td><td><input type="text" v-model="user.birthDate"></td></tr>
			<tr><td>Gender</td><td><input type="text" v-model="user.gender"></td></tr>
			<tr><td>Username</td><td><input type="text" v-model="user.username"></td></tr>
			<tr><td>Password</td><td><input type="password" v-model="user.password"></td></tr>
			<tr><td colspan="2"><input type="submit" value="Register" v-on:click = "registerUser">
			<p id="error">{{error}}</p></td></tr>
		</table>
	</form>
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