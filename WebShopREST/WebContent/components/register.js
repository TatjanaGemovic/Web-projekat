Vue.component("register", {
	data: function () {
		    return {
		      title: "Register",
		      user: { firstName:null, lastName:null, gender:null, birthDate:null, username:null, password:null},
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
			<tr><td><input type="submit" value="Register" v-on:click = "registerUser"></td></tr>
		</table>
		<p id="error">{{error}}</p>
	</form>
</div>		  
    	`,
    mounted() {
		axios.get('rest/allUsers')
			.then(response => (this.users = response.data))
	},
    methods: {
    	registerUser : function() {
			userExists = false;
			for(let i=0; i<this.users.length; i++){
				if((this.users[i]).username==this.user.username){
					this.error = "Vec postoji korisnik sa istim username-om";
					userExists = true;
				}
			}
			//ovako se ne salje zahtev ukoliko je vec registrovan
			if(!userExists){
				axios.post('rest/add/', this.user)
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