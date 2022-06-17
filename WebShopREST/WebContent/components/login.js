Vue.component("login", {
	data: function () {
		    return {
		      title: "Login",
		      value: "Login",
		      user: { username:null, password:null},
		      error: ''
		    }
	},
	template: ` 
<div>
	<form>
		<table>
			<tr><td>Username</td><td><input type="text" v-model="user.username"></td></tr>
			<tr><td>Password</td><td><input type="password" v-model="user.password"></td></tr>
			<tr><td><input type="submit" value="Login" v-on:click = "checkUser"></td></tr>
		</table>
		<p id="error">{{error}}</p>
		<p>Ukoliko nemate nalog, registrujte se:</p>
		<button v-on:click = "Register">Registracija</button>
	</form>
</div>		  
    	`,
    methods: {
    	checkUser : function(e) {
			//this.user.username = username.value
			//this.user.password = password.value
			//axios.post('rest/login' + this.user.username + ',' + this.user.password).
			e.preventDefault();
			axios.post('rest/login/', this.user)
				.then(response => (router.push(`/startup`)))
				.catch(this.error = 'Pogresna lozinka/username');
    	},
    	Register : function(){
			router.push(`/register`);
		}
    }
});